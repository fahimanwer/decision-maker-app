import AsyncStorage from '@react-native-async-storage/async-storage';
import { Decision } from '../types';

const DECISIONS_KEY = 'decisions';

export class DecisionStorage {
  static async getDecisions(): Promise<Decision[]> {
    try {
      const decisionsJson = await AsyncStorage.getItem(DECISIONS_KEY);
      if (decisionsJson) {
        const decisions = JSON.parse(decisionsJson);
        // Convert date strings back to Date objects
        return decisions.map((decision: any) => ({
          ...decision,
          createdAt: new Date(decision.createdAt),
          updatedAt: new Date(decision.updatedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading decisions:', error);
      return [];
    }
  }

  static async saveDecision(decision: Decision): Promise<void> {
    try {
      const decisions = await this.getDecisions();
      const existingIndex = decisions.findIndex(d => d.id === decision.id);
      
      if (existingIndex >= 0) {
        decisions[existingIndex] = decision;
      } else {
        decisions.push(decision);
      }
      
      await AsyncStorage.setItem(DECISIONS_KEY, JSON.stringify(decisions));
    } catch (error) {
      console.error('Error saving decision:', error);
      throw error;
    }
  }

  static async deleteDecision(decisionId: string): Promise<void> {
    try {
      const decisions = await this.getDecisions();
      const filteredDecisions = decisions.filter(d => d.id !== decisionId);
      await AsyncStorage.setItem(DECISIONS_KEY, JSON.stringify(filteredDecisions));
    } catch (error) {
      console.error('Error deleting decision:', error);
      throw error;
    }
  }

  static async getDecision(decisionId: string): Promise<Decision | null> {
    try {
      const decisions = await this.getDecisions();
      return decisions.find(d => d.id === decisionId) || null;
    } catch (error) {
      console.error('Error getting decision:', error);
      return null;
    }
  }
}