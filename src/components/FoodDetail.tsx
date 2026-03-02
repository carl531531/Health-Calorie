import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { FoodItem, MealType } from '../types';
import { motion } from 'motion/react';

interface FoodDetailProps {
  food: FoodItem;
  onClose: () => void;
  onAdd: (food: FoodItem, amount: number, mealType: MealType) => void;
  initialMealType?: MealType;
}

export const FoodDetail: React.FC<FoodDetailProps> = ({ food, onClose, onAdd, initialMealType = 'Breakfast' }) => {
  const [amount, setAmount] = useState(food.servingSize);
  const [mealType, setMealType] = useState<MealType>(initialMealType);

  const multiplier = amount / food.servingSize;
  const calories = Math.round(food.calories * multiplier);
  const protein = (food.protein * multiplier).toFixed(1);
  const carbs = (food.carbs * multiplier).toFixed(1);
  const fat = (food.fat * multiplier).toFixed(1);

  const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      <div className="relative h-72">
        <img 
          src={food.image} 
          alt={food.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="flex-1 bg-white rounded-t-[32px] -mt-8 p-8 shadow-2xl overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{food.name}</h2>
            <p className="text-gray-400">{food.category}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-600">{calories}</p>
            <p className="text-sm text-gray-400">kcal total</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-2xl text-center">
            <p className="text-xs text-blue-600 font-medium mb-1">Protein</p>
            <p className="text-lg font-bold text-blue-900">{protein}g</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-2xl text-center">
            <p className="text-xs text-orange-600 font-medium mb-1">Carbs</p>
            <p className="text-lg font-bold text-orange-900">{carbs}g</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-2xl text-center">
            <p className="text-xs text-pink-600 font-medium mb-1">Fat</p>
            <p className="text-lg font-bold text-pink-900">{fat}g</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Select Meal</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {mealTypes.map(type => (
              <button
                key={type}
                onClick={() => setMealType(type)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  mealType === type 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-gray-100 text-gray-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Portion Size ({food.unit})</h3>
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
            <button 
              onClick={() => setAmount(Math.max(0, amount - 10))}
              className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-800">{amount}</span>
              <span className="text-gray-400 ml-1">{food.unit}</span>
            </div>
            <button 
              onClick={() => setAmount(amount + 10)}
              className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-600"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <button 
          onClick={() => onAdd(food, amount, mealType)}
          className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-green-200 hover:bg-green-700 transition-all active:scale-95"
        >
          Add to {mealType}
        </button>
      </div>
    </motion.div>
  );
};
