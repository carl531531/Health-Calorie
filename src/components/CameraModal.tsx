import React, { useRef, useState } from 'react';
import { Camera, X, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { recognizeFood } from '../services/qwenService';

interface CameraModalProps {
  onClose: () => void;
  onRecognized: (foodData: { name: string; calories: number; protein: number; carbs: number; fat: number }) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ onClose, onRecognized }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    
    // Extract base64 part
    const base64 = image.split(',')[1];
    const result = await recognizeFood(base64);
    
    setIsAnalyzing(false);
    if (result) {
      onRecognized(result);
    } else {
      alert("Could not recognize food. Please try again with a clearer image.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-6"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-md aspect-square bg-gray-900 rounded-3xl overflow-hidden relative border-2 border-white/20">
        {image ? (
          <img src={image} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/40 gap-4">
            <Camera className="w-16 h-16" />
            <p className="text-sm">Take a photo of your meal</p>
          </div>
        )}

        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-green-500" />
            <p className="font-medium">AI is analyzing your food...</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-4 w-full max-w-md">
        {!image ? (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Open Camera
          </button>
        ) : (
          <>
            <button 
              onClick={() => setImage(null)}
              className="flex-1 py-4 bg-white/10 text-white rounded-2xl font-bold"
              disabled={isAnalyzing}
            >
              Retake
            </button>
            <button 
              onClick={handleAnalyze}
              className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-green-900/20"
              disabled={isAnalyzing}
            >
              <Check className="w-5 h-5" />
              Analyze
            </button>
          </>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        capture="environment"
        className="hidden" 
      />
    </motion.div>
  );
};
