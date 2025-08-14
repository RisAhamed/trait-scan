// Mock API base URL - replace with actual API URL in production
const API_BASE = import.meta.env.VITE_API_BASE || '/api/mock';

// Type definitions
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
  evidence: { text: string; url: string }[];
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

// Utility function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Mock data fallback for development
const mockResponses = {
  '/seed': () => ({ seed_id: `s_${Date.now()}`, status: 'queued' }),
  '/seed/status': () => ({ status: 'done', stage: 'complete' }),
  '/seed/persona': () => ({
    traits: [
      { name: 'openness', score: 0.81, confidence: 0.7, evidence: ['Enjoys exploring new ideas and experiences'] },
      { name: 'conscientiousness', score: 0.65, confidence: 0.8, evidence: ['Shows organized approach to tasks'] },
      { name: 'extraversion', score: 0.72, confidence: 0.6, evidence: ['Active in social interactions'] },
      { name: 'agreeableness', score: 0.58, confidence: 0.7, evidence: ['Generally cooperative in discussions'] },
      { name: 'neuroticism', score: 0.43, confidence: 0.5, evidence: ['Maintains emotional stability'] }
    ],
    summary: 'Creative and curious individual with strong organizational skills',
    top_interests: ['technology', 'travel', 'photography'],
    sample_quotes: ['I love discovering new places and technologies']
  }),
  '/seed/identity': () => ({
    accounts: [
      {
        platform: 'Twitter',
        handle: '@techexplorer',
        url: 'https://twitter.com/techexplorer',
        confidence: 0.85,
        why: ['Similar writing style', 'Shared interests in tech'],
        evidence: [{ text: 'Just discovered this amazing new framework!', url: 'https://twitter.com/techexplorer/status/123' }]
      }
    ]
  }),
  '/seed/contradictions': () => ({
    contradictions: [
      {
        dimension: 'extraversion',
        delta: 0.3,
        a_snippet: 'Love meeting new people at conferences',
        b_snippet: 'Prefer quiet evenings at home',
        sources: ['Twitter', 'LinkedIn']
      }
    ]
  }),
  '/seed/similar': () => ({
    similar: [
      {
        platform: 'LinkedIn',
        handle: 'john-doe-dev',
        url: 'https://linkedin.com/in/john-doe-dev',
        similarity: 0.78,
        why: 'Similar career path and interests'
      }
    ]
  }),
  '/report': () => ({ url: 'https://example.com/report.pdf' })
};

// API functions
export async function createSeed(input: string) {
  try {
    return await apiCall('/seed', {
      method: 'POST',
      body: JSON.stringify({ input }),
    });
  } catch (error) {
    console.warn('Using mock data for createSeed');
    return mockResponses['/seed']();
  }
}

export async function getSeedStatus(seedId: string) {
  try {
    return await apiCall(`/seed/${seedId}/status`);
  } catch (error) {
    console.warn('Using mock data for getSeedStatus');
    return mockResponses['/seed/status']();
  }
}

export async function getPersonaData(seedId: string): Promise<PersonaData> {
  try {
    return await apiCall(`/seed/${seedId}/persona`);
  } catch (error) {
    console.warn('Using mock data for getPersonaData');
    return mockResponses['/seed/persona']();
  }
}

export async function getIdentityData(seedId: string) {
  try {
    return await apiCall(`/seed/${seedId}/identity`);
  } catch (error) {
    console.warn('Using mock data for getIdentityData');
    return mockResponses['/seed/identity']();
  }
}

export async function getContradictions(seedId: string) {
  try {
    return await apiCall(`/seed/${seedId}/contradictions`);
  } catch (error) {
    console.warn('Using mock data for getContradictions');
    return mockResponses['/seed/contradictions']();
  }
}

export async function getSimilarAccounts(seedId: string) {
  try {
    return await apiCall(`/seed/${seedId}/similar`);
  } catch (error) {
    console.warn('Using mock data for getSimilarAccounts');
    return mockResponses['/seed/similar']();
  }
}

export async function generateReport(seedId: string) {
  try {
    return await apiCall(`/report/${seedId}`, { method: 'POST' });
  } catch (error) {
    console.warn('Using mock data for generateReport');
    return mockResponses['/report']();
  }
}

export async function savePersona(seedId: string, personaData: any) {
  try {
    return await apiCall('/personas', {
      method: 'POST',
      body: JSON.stringify({ seedId, ...personaData }),
    });
  } catch (error) {
    console.warn('Using mock data for savePersona');
    return { success: true, id: `persona_${Date.now()}` };
  }
}
