import { LucideIcon } from 'lucide-react';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  unit: string;
  servingSize: number;
  category: string;
  image?: string;
}

export interface LoggedMeal {
  id: string;
  foodId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number;
  mealType: MealType;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  dailyGoal: number;
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
  id: string;
}
