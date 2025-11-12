import type { ApiResponse, DilemmaData, Question } from '../types';

const API_URL = 'https://mupojq1z1uu.map.azionedge.net/';

export class ApiService {
  static async fetchDilemma(): Promise<Question> {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResponse: ApiResponse = await response.json();
      
      // Parse the content from the API response
      const content = apiResponse.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content in API response');
      }
      
      // Parse the JSON content
      const dilemmaData: DilemmaData = JSON.parse(content);
      
      // Transform to our Question format
      const question: Question = {
        id: Date.now(), // Use timestamp as unique ID
        question: `Você prefere: ${dilemmaData.optionA} ou ${dilemmaData.optionB}?`,
        optionA: dilemmaData.optionA,
        optionB: dilemmaData.optionB,
        theme: dilemmaData.theme,
        difficulty: dilemmaData.difficulty,
      };
      
      return question;
    } catch (error) {
      console.error('Error fetching dilemma:', error);
      throw new Error('Failed to fetch dilemma from API');
    }
  }
}

// Local storage utilities
export class StorageService {
  private static STORAGE_KEY = 'azion-would-you-rather-answers';
  
  static saveAnswers(answers: any[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(answers));
    } catch (error) {
      console.error('Error saving answers to localStorage:', error);
    }
  }
  
  static loadAnswers(): any[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading answers from localStorage:', error);
      return [];
    }
  }
  
  static clearAnswers(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing answers from localStorage:', error);
    }
  }
}

export const difficultyOptions = {
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Dificil',
} as const;