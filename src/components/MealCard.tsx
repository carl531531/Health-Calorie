import React from 'react';
import { motion } from 'motion/react';
import { Plus, Clock } from 'lucide-react';
import { LoggedMeal, MealType } from '../types';

interface MealCardProps {
  type: MealType;
  meals: LoggedMeal[];
  onAdd: (type: MealType) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ type, meals, onAdd }) => {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <Clock className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800">{type}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-green-600">{totalCalories} kcal</span>
          <button 
            onClick={() => onAdd(type)}
            className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {meals.length > 0 ? (
        <div className="space-y-2">
          {meals.map((meal) => (
            <div key={meal.id} className="flex justify-between items-center py-2 border-t border-gray-50 first:border-0">
              <div>
                <p className="text-sm font-medium text-gray-700">{meal.name}</p>
                <p className="text-xs text-gray-400">{meal.servingSize}g</p>
              </div>
              <span className="text-sm text-gray-500">{meal.calories} kcal</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic">No items logged yet</p>
      )}
    </div>
  );
};
