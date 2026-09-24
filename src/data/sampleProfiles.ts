import { SampleProfile } from '../types';

export const sampleProfiles: SampleProfile[] = [
  {
    id: 'student',
    name: 'Alex Chen',
    avatar: 'school',
    roleTitle: 'Student',
    budget: 1000,
    category: 'Laptops',
    purpose: 'Software Engineering',
    priorities: ['Lightweight & Portable', '20h+ Battery', '16GB RAM'],
    description: 'Computer Science undergrad needing an ultra-portable laptop with all-day battery life for campus lectures and code compiling.',
    suggestedPrompt: 'Lightweight laptop for college and coding under $1000 with long battery life'
  },
  {
    id: 'gamer',
    name: 'Marcus Vance',
    avatar: 'sports_esports',
    roleTitle: 'Gamer',
    budget: 1800,
    category: 'Laptops',
    purpose: 'Creative Production',
    priorities: ['High-Performance GPU', 'Advanced Thermal Cooling', '120Hz+ Display'],
    description: 'Competitive esports player and streamer requiring high refresh rate visuals, dedicated RTX graphics, and robust thermal cooling.',
    suggestedPrompt: 'High performance gaming laptop under $1800 with dedicated GPU, 144Hz display, and fast thermal cooling'
  },
  {
    id: 'photographer',
    name: 'Elena Rostova',
    avatar: 'photo_camera',
    roleTitle: 'Photographer',
    budget: 2000,
    category: 'Cameras',
    purpose: 'Street Photography',
    priorities: ['40MP+ Pro Sensor', 'Display Accuracy / 100% DCI-P3', 'Fast Autofocus'],
    description: 'Commercial and street photographer needing exceptional color reproduction, high dynamic range sensor, and weather-sealed build.',
    suggestedPrompt: 'Mirrorless camera under $2000 for photography with 40MP sensor, color accuracy, and weather sealing'
  },
  {
    id: 'office-professional',
    name: 'Sarah Jenkins',
    avatar: 'badge',
    roleTitle: 'Office Professional',
    budget: 900,
    category: 'Headphones',
    purpose: 'Office Productivity',
    priorities: ['Noise Cancellation (ANC)', '20h+ Battery', 'Voice Clarity / Mics'],
    description: 'Hybrid remote worker needing distraction-free ANC headphones with crisp beamforming microphones for constant Zoom client calls.',
    suggestedPrompt: 'Noise-cancelling headphones under $900 for office productivity with crystal clear video call microphones'
  }
];
