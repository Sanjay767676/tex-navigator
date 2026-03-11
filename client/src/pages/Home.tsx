import { useState, useMemo } from "react";
import { Compass, Search, Map, CalendarOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvents } from "@/hooks/use-events";
import { EventCard } from "@/components/EventCard";
import { FilterChips } from "@/components/FilterChips";

export default function Home() {
  const { data: events = [], isLoading } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Map UI label → database category value
  const CATEGORY_MAP: Record<string, string> = {
    "Events": "Event",
    "Workshops": "Workshop",
    "Hackathons": "Hackathon",
  };

  // Live filter logic
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase());
        
      const dbCategory = CATEGORY_MAP[selectedCategory];
      const matchesCategory = selectedCategory === "All" || event.category === dbCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b-3 border-black bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-black">
            <Compass className="h-6 w-6 text-black fill-primary" />
            <span className="font-display text-2xl font-black uppercase tracking-tighter">
              Texperia <span className="bg-primary px-1">Navigator</span>
            </span>
          </div>
          <div className="border-3 border-black bg-black px-4 py-1 text-xs font-black tracking-widest text-primary">
            SNSCT 2026
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-8xl font-black uppercase mb-6 leading-[0.9] tracking-tighter text-black">
              Find Your <span className="bg-primary text-black px-2">Event.</span><br />
              Navigate Now.
            </h1>
            <p className="text-lg md:text-xl font-bold text-black/80 mb-10 max-w-2xl mx-auto uppercase tracking-wide">
              Official navigator for Texperia 2026. <br className="hidden md:block" /> Search and get live directions instantly.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="relative flex items-center bg-white border-3 border-black shadow-neo-primary focus-within:shadow-neo transition-all">
              <div className="pl-5 text-black">
                <Search className="h-6 w-6" />
              </div>
              <input
                type="text"
                placeholder="SEARCH EVENTS, WORKSHOPS, VENUES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-4 py-5 text-lg font-black uppercase text-black placeholder:text-black/30 focus:outline-none"
              />
            </div>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="mb-10">
          <FilterChips 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </section>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between text-xs font-black uppercase tracking-widest text-black/60">
          <p>Result: <span className="text-black">{filteredEvents.length} Events</span></p>
        </div>

        {/* Events Grid */}
        <section className="relative min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-black">
              <Compass className="h-12 w-12 animate-spin fill-primary" />
              <p className="font-black uppercase tracking-widest">Scanning Campus...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center border-4 border-black bg-white shadow-neo"
            >
              <div className="bg-primary border-3 border-black p-4 mb-4">
                <Map className="h-12 w-12 text-black" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-black mb-2">No results found</h3>
              <p className="font-bold text-black/60 max-w-md uppercase tracking-wide">
                We couldn't find any events matching "{searchQuery}" in the {selectedCategory} category.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="btn-neo mt-8"
              >
                Reset Search
              </button>
            </motion.div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-10 border-t-3 border-black bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-black uppercase tracking-widest">
            © 2026 <span className="text-primary">Texperia Navigator</span>
          </p>
          <div className="text-xs font-bold uppercase tracking-widest opacity-60">
            SNS College of Technology
          </div>
        </div>
      </footer>
    </div>
  );
}
