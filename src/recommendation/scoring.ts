import { Product, FilterState } from '../types';

export interface ExtractedPreferences {
  category?: string | null;
  budget?: number | null;
  brand?: string | null;
  purpose?: string | null;
  features?: string[];
  rawQuery?: string;
}

export interface ScoredProduct extends Product {
  calculatedMatchScore: number;
  scoreBreakdown: {
    budgetScore: number; // 0 - 100
    featureScore: number; // 0 - 100
    categoryScore: number; // 0 - 100
    brandScore: number; // 0 - 100
    ratingScore: number; // 0 - 100
  };
}

/**
 * Weighted Content-Based Filtering Algorithm (PRD Section 8):
 * - Budget Weight = 30%
 * - Feature Weight = 30%
 * - Category Weight = 20%
 * - Brand Weight = 10%
 * - Rating Weight = 10%
 */
export function calculateProductScore(product: Product, filters: FilterState, extracted?: ExtractedPreferences): ScoredProduct {
  const targetCategory = extracted?.category || filters.category;
  const targetBudget = extracted?.budget || filters.maxBudget;
  const targetBrand = extracted?.brand || filters.brand;
  const targetFeatures = (extracted?.features && extracted.features.length > 0)
    ? extracted.features
    : filters.selectedFeatures;

  // 1. Budget Score (30%)
  let budgetScoreRatio = 1.0;
  if (targetBudget && targetBudget > 0) {
    if (product.price <= targetBudget) {
      // Reward staying nicely within budget
      budgetScoreRatio = 1.0;
    } else {
      // Penalty for exceeding budget
      const over = product.price - targetBudget;
      budgetScoreRatio = Math.max(0, 1 - over / (targetBudget * 0.5));
    }
  }

  // 2. Feature Score (30%)
  let featureScoreRatio = 1.0;
  if (targetFeatures && targetFeatures.length > 0) {
    const textBlob = `${product.name} ${product.summary} ${product.aiReason} ${JSON.stringify(product.specs)} ${product.pros.join(' ')}`.toLowerCase();
    let matchedCount = 0;
    targetFeatures.forEach((feat) => {
      const featKeywords = feat.toLowerCase().split(/\s+/);
      const isMatch = featKeywords.some((kw) => kw.length > 2 && textBlob.includes(kw));
      if (isMatch) matchedCount++;
    });
    featureScoreRatio = matchedCount / targetFeatures.length;
    // Base boost if at least 1 feature matches
    if (matchedCount > 0 && featureScoreRatio < 0.5) {
      featureScoreRatio = 0.5;
    }
  }

  // 3. Category Score (20%)
  let categoryScoreRatio = 1.0;
  if (targetCategory && targetCategory !== 'All') {
    if (product.category.toLowerCase() === targetCategory.toLowerCase() ||
        product.category.toLowerCase().includes(targetCategory.toLowerCase()) ||
        targetCategory.toLowerCase().includes(product.category.toLowerCase())) {
      categoryScoreRatio = 1.0;
    } else {
      categoryScoreRatio = 0.2;
    }
  }

  // 4. Brand Score (10%)
  let brandScoreRatio = 1.0;
  if (targetBrand && targetBrand !== 'All') {
    if (product.brand.toLowerCase() === targetBrand.toLowerCase()) {
      brandScoreRatio = 1.0;
    } else {
      brandScoreRatio = 0.4;
    }
  }

  // 5. Rating Score (10%)
  const ratingScoreRatio = Math.min(1.0, product.rating / 5.0);

  // Compute final weighted sum
  const finalScore = Math.round(
    (budgetScoreRatio * 0.30 +
      featureScoreRatio * 0.30 +
      categoryScoreRatio * 0.20 +
      brandScoreRatio * 0.10 +
      ratingScoreRatio * 0.10) *
      100
  );

  return {
    ...product,
    calculatedMatchScore: Math.min(99, Math.max(60, finalScore)),
    scoreBreakdown: {
      budgetScore: Math.round(budgetScoreRatio * 100),
      featureScore: Math.round(featureScoreRatio * 100),
      categoryScore: Math.round(categoryScoreRatio * 100),
      brandScore: Math.round(brandScoreRatio * 100),
      ratingScore: Math.round(ratingScoreRatio * 100),
    },
  };
}

export function rankProducts(products: Product[], filters: FilterState, extracted?: ExtractedPreferences): ScoredProduct[] {
  return products
    .map((p) => calculateProductScore(p, filters, extracted))
    .sort((a, b) => b.calculatedMatchScore - a.calculatedMatchScore);
}
