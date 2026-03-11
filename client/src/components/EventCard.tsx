import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import type { Event } from "@shared/schema";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  // Determine badge color based on category
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'workshop': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'cultural': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'sports': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'management': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const mapsUrl = `https://www.google.com/maps?q=${event.lat},${event.lon}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-30"></div>
      
      {/* Card Content */}
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xl transition-all duration-300 group-hover:border-primary/50 group-hover:-translate-y-1">
        
        {/* Top Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>
          
          <h3 className="mb-2 font-display text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
            {event.name}
          </h3>
          
          <p className="mb-6 line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent-foreground" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-4 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/40 active:scale-[0.98]"
          >
            Get Directions
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
