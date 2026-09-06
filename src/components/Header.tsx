import { Fuel } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-center gap-2">
        <div className="bg-emerald-100 p-1.5 rounded-lg">
          <Fuel className="w-6 h-6 text-emerald-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Gasolineras Baratas</h1>
      </div>
    </header>
  );
}
