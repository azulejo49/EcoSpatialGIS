import React, { useState, useEffect } from 'react';
import { X, Leaf, User, Calendar, Tag, FileText, MapPin } from 'lucide-react';
import { reverseGeocode } from '../utils';

interface RecordWildlifeFormProps {
  coordinates: [number, number];
  onSave: (data: {
    species: string;
    category: 'Mammal' | 'Bird' | 'Reptile/Amphibian' | 'Fish' | 'Insect/Invertebrate' | 'Plant' | 'Fungi';
    observer: string;
    dateObserved: string;
    notes: string;
    locationName: string;
    image: string | null;
  }) => void;
  onCancel: () => void;
}

export function RecordWildlifeForm({ coordinates, onSave, onCancel }: RecordWildlifeFormProps) {
  const [species, setSpecies] = useState('');
  const [category, setCategory] = useState<'Mammal' | 'Bird' | 'Reptile/Amphibian' | 'Fish' | 'Insect/Invertebrate' | 'Plant' | 'Fungi'>('Mammal');
  const [observer, setObserver] = useState('');
  const [dateObserved, setDateObserved] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [locationName, setLocationName] = useState('Detecting location...');
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setImage(dataUrl);
        }
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchCity = async () => {
      const city = await reverseGeocode(coordinates[1], coordinates[0]);
      setLocationName(city || 'Unknown Location');
    };
    fetchCity();
  }, [coordinates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!species.trim()) return;
    onSave({ species, category, observer, dateObserved, notes, locationName, image });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/40">
          <div className="flex items-center space-x-3">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold tracking-tight text-white">Record Wildlife</h2>
          </div>
          <button 
            onClick={onCancel}
            className="p-1 -mr-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-sky-400 mt-0.5" />
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Auto-Detected Location</div>
              <div className="text-sm font-medium text-slate-200">{locationName}</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-500" /> Species Name *
            </label>
            <input
              type="text"
              required
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              placeholder="e.g. Red Fox, Quercus robur..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none transition-all appearance-none"
              >
                <option value="Mammal">Mammal</option>
                <option value="Bird">Bird</option>
                <option value="Reptile/Amphibian">Reptile / Amphibian</option>
                <option value="Fish">Fish</option>
                <option value="Insect/Invertebrate">Insect / Invertebrate</option>
                <option value="Plant">Plant / Flora</option>
                <option value="Fungi">Fungi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-500" /> Date
              </label>
              <input
                type="date"
                required
                value={dateObserved}
                onChange={(e) => setDateObserved(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" /> Observer Name
            </label>
            <input
              type="text"
              value={observer}
              onChange={(e) => setObserver(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              placeholder="Your name or organization..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" /> Notes / Habitat
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white resize-none h-24 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              placeholder="Any additional observations..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" /> Reference Photo (Base64 Compressed)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
            />
            {image && (
              <div className="mt-2 text-xs text-emerald-400">Image attached and compressed successfully.</div>
            )}
          </div>
          
          <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-all text-sm font-medium shadow-lg shadow-emerald-900/20 active:scale-95"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
