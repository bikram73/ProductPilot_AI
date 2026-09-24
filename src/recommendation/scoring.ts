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

export interface ColdStartAnalysis {
  isColdStart: boolean;
  missingFields: ('category' | 'budget' | 'purpose' | 'features')[];
  followUpQuestions: {
    field: 'category' | 'budget' | 'purpose' | 'features';
    question: string;
    options: string[];
  }[];
}

/**
 * Detects whether the user's query or current filter state is a cold-start with missing parameters (REQ-06 & Change 2).
 */
export function detectMissingPreferences(query?: string, filters?: FilterState): ColdStartAnalysis {
  const q = (query || '').trim().toLowerCase();
  const missing: ('category' | 'budget' | 'purpose' | 'features')[] = [];

  // Check Category
  const hasCategoryInQuery = ['laptop', 'headphone', 'phone', 'smartphone', 'watch', 'wearable', 'camera', 'speaker', 'audio'].some(c => q.includes(c));
  const hasCategoryInFilter = filters && filters.category !== 'All';
  if (!hasCategoryInQuery && !hasCategoryInFilter) {
    missing.push('category');
  }

  // Check Budget
  const hasBudgetInQuery = /\$?\d{2,5}/.test(q) || q.includes('under') || q.includes('budget') || q.includes('cheap') || q.includes('affordable');
  const hasBudgetInFilter = filters && filters.maxBudget < 2400;
  if (!hasBudgetInQuery && !hasBudgetInFilter) {
    missing.push('budget');
  }

  // Check Purpose / Use case
  const hasPurposeInQuery = ['travel', 'flight', 'commute', 'coding', 'code', 'program', 'game', 'gaming', 'photo', 'video', 'college', 'student', 'office', 'sport', 'run'].some(p => q.includes(p));
  const hasPurposeInFilter = filters && filters.purpose !== 'All';
  if (!hasPurposeInQuery && !hasPurposeInFilter) {
    missing.push('purpose');
  }

  // Check Features
  const hasFeatureInQuery = ['battery', 'anc', 'noise', 'lightweight', 'oled', 'gps', 'water', 'wireless', 'mic'].some(f => q.includes(f));
  const hasFeatureInFilter = filters && filters.selectedFeatures && filters.selectedFeatures.length > 0;
  if (!hasFeatureInQuery && !hasFeatureInFilter) {
    missing.push('features');
  }

  const isColdStart = q.length < 15 || missing.length >= 2;

  const followUpQuestions: {
    field: 'category' | 'budget' | 'purpose' | 'features';
    question: string;
    options: string[];
  }[] = [];

  if (missing.includes('category')) {
    followUpQuestions.push({
      field: 'category',
      question: 'What type of product are you searching for?',
      options: ['Laptops', 'Headphones', 'Smartphones', 'Wearables', 'Cameras', 'Audio']
    });
  }

  if (missing.includes('budget')) {
    followUpQuestions.push({
      field: 'budget',
      question: 'What is your target budget range?',
      options: ['Under $300', 'Under $800', 'Under $1200', 'Under $2000']
    });
  }

  if (missing.includes('purpose')) {
    followUpQuestions.push({
      field: 'purpose',
      question: 'What is your primary use-case or workflow?',
      options: ['Software & Coding', 'Travel & Commuting', 'Creative & 4K Media', 'Fitness & Outdoor', 'Office Productivity']
    });
  }

  if (missing.includes('features')) {
    followUpQuestions.push({
      field: 'features',
      question: 'Which hardware priority matters most?',
      options: ['20h+ Battery', 'Noise Cancellation (ANC)', 'OLED / 4K Display', 'Lightweight & Portable']
    });
  }

  return {
    isColdStart,
    missingFields: missing,
    followUpQuestions
  };
}

/**
 * Rationale Guarantee (PRD REQ-04, REQ-12, Change 5):
 * Ensures that EVERY recommendation returned has an explicit, attribute-grounded explanation.
 */
export function ensureProductRationale(product: Product, filters: FilterState, extracted?: ExtractedPreferences): string {
  if (product.aiReason && product.aiReason.trim().length > 15) {
    return product.aiReason;
  }

  const targetBudget = extracted?.budget || filters.maxBudget;
  const budgetStatus = product.price <= targetBudget
    ? `Fits comfortably within your $${targetBudget} budget at $${product.price}`
    : `Priced at $${product.price} (exceeds budget of $${targetBudget} by $${product.price - targetBudget})`;

  const topSpecs = Object.entries(product.specs).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(', ');
  const topStrength = product.pros && product.pros.length > 0 ? product.pros[0] : 'High build reliability';
  const tradeOff = product.cons && product.cons.length > 0 ? `Trade-off: ${product.cons[0]}` : '';

  return `Matched based on ${product.category} criteria. ${budgetStatus}. Key hardware: ${topSpecs}. Primary strength: ${topStrength}. ${tradeOff}`;
}

/**
 * Weighted Content-Based Filtering Algorithm (PRD Section 8 & REQ-05):
 * - Budget Weight = 30%
 * - Feature & Purpose Weight = 30%
 * - Category Weight = 20%
 * - Brand Weight = 10%
 * - Rating Weight = 10%
 */
export function calculateProductScore(product: Product, filters: FilterState, extracted?: ExtractedPreferences): ScoredProduct {
  const targetCategory = extracted?.category || filters.category;
  const targetBudget = extracted?.budget || filters.maxBudget;
  const targetBrand = extracted?.brand || filters.brand;
  const targetPurpose = extracted?.purpose || filters.purpose;
  const targetFeatures = (extracted?.features && extracted.features.length > 0)
    ? extracted.features
    : filters.selectedFeatures;

  // 1. Budget Score (30%)
  let budgetScoreRatio = 1.0;
  if (targetBudget && targetBudget > 0) {
    if (product.price <= targetBudget) {
      // Within budget gets full score
      budgetScoreRatio = 1.0;
    } else {
      // Constraint Penalty for exceeding budget (REQ-06 & TC-018)
      const over = product.price - targetBudget;
      budgetScoreRatio = Math.max(0.05, 1 - (over / (targetBudget * 0.4)));
    }
  }

  // 2. Feature & Purpose Score (30%)
  let featureScoreRatio = 1.0;
  const textBlob = `${product.name} ${product.summary} ${product.aiReason} ${JSON.stringify(product.specs)} ${product.pros.join(' ')}`.toLowerCase();

  let featureMatches = 0;
  let totalCriteria = 0;

  if (targetFeatures && targetFeatures.length > 0) {
    totalCriteria += targetFeatures.length;
    targetFeatures.forEach((feat) => {
      const featKeywords = feat.toLowerCase().split(/\s+/);
      const isMatch = featKeywords.some((kw) => kw.length > 2 && textBlob.includes(kw));
      if (isMatch) featureMatches++;
    });
  }

  if (targetPurpose && targetPurpose !== 'All') {
    totalCriteria += 1;
    const purposeKeywords = targetPurpose.toLowerCase().split(/[\s,&]+/);
    const purposeMatched = purposeKeywords.some((kw) => kw.length > 3 && textBlob.includes(kw));
    if (purposeMatched) featureMatches++;
  }

  if (totalCriteria > 0) {
    featureScoreRatio = Math.max(0.4, featureMatches / totalCriteria);
  }

  // 3. Category Score (20%)
  let categoryScoreRatio = 1.0;
  if (targetCategory && targetCategory !== 'All') {
    if (product.category.toLowerCase() === targetCategory.toLowerCase() ||
        product.category.toLowerCase().includes(targetCategory.toLowerCase()) ||
        targetCategory.toLowerCase().includes(product.category.toLowerCase())) {
      categoryScoreRatio = 1.0;
    } else {
      categoryScoreRatio = 0.15;
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

  // Compute final weighted sum (Bound between 0 and 100, TC-017)
  const rawScore = (
    budgetScoreRatio * 0.30 +
    featureScoreRatio * 0.30 +
    categoryScoreRatio * 0.20 +
    brandScoreRatio * 0.10 +
    ratingScoreRatio * 0.10
  ) * 100;

  const finalScore = Math.min(99, Math.max(20, Math.round(rawScore)));

  // Guaranteed rationale
  const guaranteedReason = ensureProductRationale(product, filters, extracted);

  return {
    ...product,
    aiReason: guaranteedReason,
    calculatedMatchScore: finalScore,
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
