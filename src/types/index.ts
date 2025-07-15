// Core type definitions for the Decision Maker App

export interface Decision {
  id: string;
  title: string;
  description?: string;
  options: DecisionOption[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'completed' | 'archived';
  result?: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  weight?: number;
  pros: string[];
  cons: string[];
}

export interface DecisionCriteria {
  id: string;
  name: string;
  weight: number;
  description?: string;
}

export interface DecisionAnalysis {
  decisionId: string;
  criteria: DecisionCriteria[];
  optionScores: Record<string, Record<string, number>>;
  recommendedOption?: string;
  confidence: number;
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  CreateDecision: undefined;
  DecisionDetail: { decisionId: string };
  Analysis: { decisionId: string };
};