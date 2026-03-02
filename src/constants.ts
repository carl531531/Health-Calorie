import { FoodItem } from './types';

export const FOOD_DATABASE: FoodItem[] = [
  {
    id: '1',
    name: 'Apple',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    unit: 'medium',
    servingSize: 1,
    category: 'Fruit',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    unit: 'g',
    servingSize: 100,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'White Rice',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    unit: 'g',
    servingSize: 100,
    category: 'Grain',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Egg',
    calories: 78,
    protein: 6.3,
    carbs: 0.6,
    fat: 5.3,
    unit: 'large',
    servingSize: 1,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Avocado',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    unit: 'medium',
    servingSize: 1,
    category: 'Fruit',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'Salmon',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    unit: 'g',
    servingSize: 100,
    category: 'Fish',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop'
  },
  {
    id: '7',
    name: 'Banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    unit: 'medium',
    servingSize: 1,
    category: 'Fruit',
    image: 'https://images.unsplash.com/photo-1571771894821-ad9902d7364a?w=400&h=400&fit=crop'
  },
  {
    id: '8',
    name: 'Broccoli',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    unit: 'g',
    servingSize: 100,
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop'
  }
];

export const CATEGORIES = ['All', 'Fruit', 'Meat', 'Grain', 'Dairy', 'Fish', 'Vegetable'];
