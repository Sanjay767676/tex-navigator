import { motion } from "framer-motion";

const CATEGORIES = [
  "All",
  "Events",
  "Workshops",
  "Hackathons"
];

interface FilterChipsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FilterChips({ selectedCategory, onSelectCategory }: FilterChipsProps) {
  return (
    <div className="relative w-full">
      {/* Fade edges for scrollability indication */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 md:hidden"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 md:hidden"></div>
      
      <div className="flex w-full items-center justify-start gap-4 overflow-x-auto px-2 py-6 hide-scrollbar md:justify-center md:px-0">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`
                relative flex-shrink-0 border-3 border-black px-6 py-2 text-sm font-black uppercase tracking-widest transition-all duration-200
                ${isSelected 
                  ? 'bg-primary text-black shadow-neo' 
                  : 'bg-white text-black hover:bg-primary/20 hover:shadow-neo'}
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
