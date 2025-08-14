
// API Integration Layer with Mock Fallbacks
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api/mock';

export interface PersonaTrait {
  name: string;
  score: number;
  confidence: number;
  evidence: string[];
}

export interface PersonaData {
  traits: PersonaTrait[];
  summary: string;
  top_interests: string[];
  sample_quotes: string[];
}

export interface IdentityAccount {
  platform: string;
  handle: string;
  url: string;
  confidence: number;
  why: string[];
  evidence: Array<{ text: string; url: string }>;
}

export interface Contradiction {
  dimension: string;
  delta: number;
  a_snippet: string;
  b_snippet: string;
  sources: string[];
}

export interface SimilarAccount {
  platform: string;
  handle: string;
  url: string;
  similarity: number;
  why: string;
}

export interface SeedResponse {
  seed_id: string;
  status: 'queued' | 'running' | 'done' | 'failed';
  stage?: string;
}

// Mock data for development
const mockPersonaData: PersonaData = {
  traits: [
    { name: 'Openness', score: 0.81, confidence: 0.75, evidence: ['Frequently discusses new ideas and experiences'] },
    { name: 'Conscientiousness', score: 0.67, confidence: 0.82, evidence: ['Shows organized approach to tasks'] },
    { name: 'Extraversion', score: 0.73, confidence: 0.68, evidence: ['Active in social discussions'] },
    { name: 'Agreeableness', score: 0.59, confidence: 0.71, evidence: ['Balanced approach to disagreements'] },
    { name: 'Neuroticism', score: 0.34, confidence: 0.77, evidence: ['Generally stable emotional responses'] }
  ],
  summary: 'Creative and curious individual with strong organizational skills and active social engagement.',
  top_interests: ['artificial intelligence', 'travel', 'photography', 'startups', 'design'],
  sample_quotes: [
    'I love exploring new places and meeting interesting people.',
    'The intersection of AI and creativity fascinates me.',
    'Organization is key to achieving ambitious goals.'
  ]
};

const mockIdentityData = {
  accounts: [
    {
      platform: 'Twitter',
      handle: '@johndoe',
      url: 'https://twitter.com/johndoe',
      confidence: 0.87,
      why: ['Writing style match', 'Similar interests', 'Timeline consistency'],
      evidence: [
        { text: 'Just visited an amazing coffee shop in Portland...', url: 'https://twitter.com/johndoe/status/123' }
      ]
    },
    {
      platform: 'LinkedIn',
      handle: 'john-doe-design',
      url: 'https://linkedin.com/in/john-doe-design',
      confidence: 0.92,
      why: ['Professional background match', 'Network overlap', 'Skill endorsements'],
      evidence: [
        { text: 'Excited to share my latest UX project...', url: 'https://linkedin.com/in/john-doe-design/post/456' }
      ]
    }
  ]
};

// API Functions
export async function createSeed(input: string): Promise<SeedResponse> {
  try {
    const response = await fetch(`${API_BASE}/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });
    
    if (!response.ok) throw new Error('Failed to create seed');
    return await response.json();
  } catch (error) {
    console.log('Using mock seed creation');
    // Mock response
    return {
      seed_id: `s_${Date.now()}`,
      status: 'queued'
    };
  }
}

export async function getSeedStatus(seedId: string): Promise<SeedResponse> {
  try {
    const response = await fetch(`${API_BASE}/seed/${seedId}/status`);
    if (!response.ok) throw new Error('Failed to get status');
    return await response.json();
  } catch (error) {
    console.log('Using mock status');
    return { seed_id: seedId, status: 'done' };
  }
}

export async function getPersonaData(seedId: string): Promise<PersonaData> {
  try {
    const response = await fetch(`${API_BASE}/seed/${seedId}/persona`);
    if (!response.ok) throw new Error('Failed to get persona');
    return await response.json();
  } catch (error) {
    console.log('Using mock persona data');
    return mockPersonaData;
  }
}

export async function getIdentityData(seedId: string) {
  try {
    const response = await fetch(`${API_BASE}/seed/${seedId}/identity`);
    if (!response.ok) throw new Error('Failed to get identity');
    return await response.json();
  } catch (error) {
    console.log('Using mock identity data');
    return mockIdentityData;
  }
}

export async function getContradictions(seedId: string) {
  try {
    const response = await fetch(`${API_BASE}/seed/${seedId}/contradictions`);
    if (!response.ok) throw new Error('Failed to get contradictions');
    return await response.json();
  } catch (error) {
    console.log('Using mock contradictions');
    return {
      contradictions: [
        {
          dimension: 'Formality',
          delta: 0.45,
          a_snippet: 'Professional post about quarterly results',
          b_snippet: 'Casual tweet about weekend plans',
          sources: ['LinkedIn', 'Twitter']
        }
      ]
    };
  }
}

export async function getSimilarAccounts(seedId: string) {
  try {
    const response = await fetch(`${API_BASE}/seed/${seedId}/similar`);
    if (!response.ok) throw new Error('Failed to get similar accounts');
    return await response.json();
  } catch (error) {
    console.log('Using mock similar accounts');
    return {
      similar: [
        {
          platform: 'Twitter',
          handle: '@designguru',
          url: 'https://twitter.com/designguru',
          similarity: 0.83,
          why: 'Similar design interests and career trajectory'
        }
      ]
    };
  }
}

export async function generateReport(seedId: string): Promise<{ url: string }> {
  try {
    const response = await fetch(`${API_BASE}/report/${seedId}`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to generate report');
    return await response.json();
  } catch (error) {
    console.log('Using mock report generation');
    return { url: '/mock-report.pdf' };
  }
}

export async function savePersona(seedId: string, personaData: PersonaData) {
  try {
    const response = await fetch(`${API_BASE}/personas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seed_id: seedId, ...personaData })
    });
    if (!response.ok) throw new Error('Failed to save persona');
    return await response.json();
  } catch (error) {
    console.log('Mock: Persona saved locally');
    return { success: true };
  }
}
