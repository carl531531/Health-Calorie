import React, { useState } from 'react';
import { Search as SearchIcon, X, Camera } from 'lucide-react';
import { FoodItem } from '../types';
import { FOOD_DATABASE, CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface FoodSearchProps {
  onSelect: (food: FoodItem) => void;
  onCameraClick: () => void;
}

export const FoodSearch: React.FC<FoodSearchProps> = ({ onSelect, onCameraClick }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFood = FOOD_DATABASE.filter(food => {
    const matchesQuery = food.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-white sticky top-0 z-10">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search food..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 transition-all outline-none"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          <button 
            onClick={onCameraClick}
            className="p-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
          >
            <Camera className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pt-0">
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredFood.map((food) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={food.id}
                onClick={() => onSelect(food)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <img 
                  src={food.image} 
                  alt={food.name}
                  className="w-full h-32 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3">
                  <h4 className="font-semibold text-gray-800 truncate">{food.name}</h4>
                  <p className="text-xs text-gray-400 mb-2">{food.calories} kcal / {food.servingSize}{food.unit}</p>
                  <div className="flex gap-1">
                    <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">P: {food.protein}g</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded">C: {food.carbs}g</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
