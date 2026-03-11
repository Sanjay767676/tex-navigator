import { motion } from "framer-motion";

const CATEGORIES = [
  "All",
  "Technical",
  "Workshop",
  "Cultural",
  "Sports",
  "Management"
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
      
      <div className="flex w-full items-center justify-start gap-3 overflow-x-auto px-2 py-4 hide-scrollbar md:justify-center md:px-0">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`
                relative flex-shrink-0 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300
                ${isSelected 
                  ? 'text-white shadow-[0_0_15px_rgba(0,243,255,0.3)]' 
                  : 'bg-accent/50 text-muted-foreground hover:bg-accent hover:text-foreground border border-border'}
              `}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {/* If selected, render a dark background inset slightly to make the gradient look like a border, 
                  OR just leave the solid gradient if preferred. Let's do solid gradient for strong neon feel */}
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
