import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Search, 
  BarChart2, 
  User, 
  Calendar,
  ChevronRight,
  Bell
} from 'lucide-react';

import { CircularProgress } from './components/CircularProgress';
import { MacroCard } from './components/MacroCard';
import { MealCard } from './components/MealCard';
import { FoodSearch } from './components/FoodSearch';
import { FoodDetail } from './components/FoodDetail';
import { CameraModal } from './components/CameraModal';

import { FoodItem, LoggedMeal, MealType, UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [userProfile] = useState<UserProfile>({
    name: '健康达人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Health',
    dailyGoal: 1200
  });

  const totalCalories = loggedMeals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = loggedMeals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = loggedMeals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = loggedMeals.reduce((sum, m) => sum + m.fat, 0);

  const macroGoals = {
    protein: 60,
    carbs: 150,
    fat: 40
  };

  const handleAddMeal = (food: FoodItem, amount: number, mealType: MealType) => {
    const multiplier = amount / food.servingSize;
    const newMeal: LoggedMeal = {
      id: Math.random().toString(36).substr(2, 9),
      foodId: food.id,
      name: food.name,
      calories: Math.round(food.calories * multiplier),
      protein: food.protein * multiplier,
      carbs: food.carbs * multiplier,
      fat: food.fat * multiplier,
      servingSize: amount,
      mealType,
      timestamp: Date.now()
    };
    setLoggedMeals([...loggedMeals, newMeal]);
    setSelectedFood(null);
    setActiveTab('dashboard');
  };

  const handleRecognizedFood = (data: any) => {
    const virtualFood: FoodItem = {
      id: 'ai-' + Date.now(),
      name: data.name,
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
      unit: 'serving',
      servingSize: 1,
      category: 'AI Recognized',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop'
    };
    setIsCameraOpen(false);
    setSelectedFood(virtualFood);
  };

  const renderDashboard = () => (
    <div className="p-6 pb-24 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={userProfile.avatar} alt="Avatar" className="w-12 h-12 rounded-2xl bg-green-100 p-1" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Hi, {userProfile.name}!</h1>
            <p className="text-sm text-gray-400">Ready to track your day?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <Calendar className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <Bell className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center py-4">
        <CircularProgress 
          value={totalCalories} 
          max={userProfile.dailyGoal}
          size={240}
          strokeWidth={16}
        >
          <span className="text-4xl font-black text-gray-900">{userProfile.dailyGoal - totalCalories}</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">kcal left</span>
        </CircularProgress>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-4">
        <MacroCard label="Protein" value={totalProtein} target={macroGoals.protein} unit="g" color="#3b82f6" />
        <MacroCard label="Carbs" value={totalCarbs} target={macroGoals.carbs} unit="g" color="#f97316" />
        <MacroCard label="Fat" value={totalFat} target={macroGoals.fat} unit="g" color="#ec4899" />
      </div>

      {/* Meals */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Today's Meals</h2>
          <button className="text-sm font-medium text-green-600 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as MealType[]).map(type => (
          <MealCard 
            key={type} 
            type={type} 
            meals={loggedMeals.filter(m => m.mealType === type)}
            onAdd={() => {
              setActiveTab('search');
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 max-w-md mx-auto relative shadow-2xl overflow-hidden flex flex-col">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {renderDashboard()}
            </motion.div>
          )}
          {activeTab === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <FoodSearch 
                onSelect={setSelectedFood} 
                onCameraClick={() => setIsCameraOpen(true)} 
              />
            </motion.div>
          )}
          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-8 flex flex-col items-center justify-center h-full text-center"
            >
              <BarChart2 className="w-16 h-16 text-green-200 mb-4" />
              <h2 className="text-xl font-bold">Weekly Progress</h2>
              <p className="text-gray-400 mt-2">Coming soon! Track your long-term health trends here.</p>
            </motion.div>
          )}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <div className="flex flex-col items-center gap-4 mb-8">
                <img src={userProfile.avatar} alt="Avatar" className="w-24 h-24 rounded-3xl bg-green-100 p-2 shadow-lg" />
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                  <p className="text-gray-400">Premium Member</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <span className="font-medium">Daily Calorie Goal</span>
                  <span className="text-green-600 font-bold">{userProfile.dailyGoal} kcal</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <span className="font-medium">Weight Goal</span>
                  <span className="text-green-600 font-bold">Maintain</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="bg-white/80 backdrop-blur-lg border-t border-gray-100 px-6 py-4 flex justify-between items-center sticky bottom-0 z-40">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'search' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Search</span>
        </button>
        <button 
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'progress' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <BarChart2 className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Stats</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </button>
      </nav>

      {/* Modals */}
      <AnimatePresence>
        {selectedFood && (
          <FoodDetail 
            food={selectedFood} 
            onClose={() => setSelectedFood(null)} 
            onAdd={handleAddMeal}
          />
        )}
        {isCameraOpen && (
          <CameraModal 
            onClose={() => setIsCameraOpen(false)} 
            onRecognized={handleRecognizedFood}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
