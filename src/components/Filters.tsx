import { Settings2 } from 'lucide-react';

interface FiltersProps {
  fuelType: 'gasoline' | 'diesel';
  setFuelType: (type: 'gasoline' | 'diesel') => void;
  radius: number;
  setRadius: (radius: number) => void;
}

export function Filters({ fuelType, setFuelType, radius, setRadius }: FiltersProps) {
  return (
    <div className="bg-white border-b border-gray-100 p-4 sticky top-14 z-40">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* Fuel Type Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setFuelType('gasoline')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              fuelType === 'gasoline' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Gasolina 95
          </button>
          <button
            onClick={() => setFuelType('diesel')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              fuelType === 'diesel' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Diésel
          </button>
        </div>

        {/* Radius Slider */}
        <div className="flex items-center gap-3">
          <Settings2 className="w-5 h-5 text-gray-400" />
          <div className="flex-1 flex items-center gap-3">
            <input 
              type="range" 
              min="2" 
              max="50" 
              step="1"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-sm font-medium text-gray-700 min-w-[4ch] text-right">
              {radius}km
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
