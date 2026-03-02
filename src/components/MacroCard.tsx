import React from 'react';
import { motion } from 'motion/react';

interface MacroCardProps {
  label: string;
  value: number;
  target: number;
  unit: string;
  color: string;
}

export const MacroCard: React.FC<MacroCardProps> = ({ label, value, target, unit, color }) => {
  const percentage = Math.min((value / target) * 100, 100);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{Math.round(value)}{unit}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <span className="text-[10px] text-gray-400 text-right">Goal: {target}{unit}</span>
    </div>
  );
};
