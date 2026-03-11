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
      case 'technical': return 'bg-primary text-black border-black';
      case 'workshop': return 'bg-white text-black border-black';
      case 'cultural': return 'bg-primary text-black border-black';
      case 'sports': return 'bg-white text-black border-black';
      case 'management': return 'bg-primary text-black border-black';
      default: return 'bg-primary text-black border-black';
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
      {/* Card Content */}
      <div className="relative flex h-full flex-col justify-between overflow-hidden border-3 border-black bg-card p-6 shadow-neo transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000000]">
        
        {/* Top Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className={`inline-flex items-center border-2 px-3 py-1 text-xs font-bold uppercase tracking-widest ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>
          
          <h3 className="mb-2 font-display text-2xl font-black uppercase text-foreground transition-all duration-300">
            {event.name}
          </h3>
          
          <p className="mb-6 line-clamp-2 text-sm font-medium text-black/70">
            {event.description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-sm font-bold text-black">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neo mt-2 flex w-full items-center justify-center gap-2"
          >
            Get Directions
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
