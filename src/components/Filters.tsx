import { Settings2, Tag } from 'lucide-react';

interface FiltersProps {
  fuelType: 'gasoline' | 'diesel';
  setFuelType: (type: 'gasoline' | 'diesel') => void;
  radius: number;
  setRadius: (radius: number) => void;
  useLoyaltyDiscounts: boolean;
  setUseLoyaltyDiscounts: (use: boolean) => void;
}

export function Filters({ fuelType, setFuelType, radius, setRadius, useLoyaltyDiscounts, setUseLoyaltyDiscounts }: FiltersProps) {
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

        {/* Loyalty Discount Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <Tag className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium">Aplicar descuentos de fidelización</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={useLoyaltyDiscounts}
              onChange={(e) => setUseLoyaltyDiscounts(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
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
