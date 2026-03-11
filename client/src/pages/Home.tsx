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

  // Live filter logic
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none"></div>

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-foreground">
            <Compass className="h-6 w-6 text-primary animate-pulse" />
            <span className="font-display text-xl font-bold tracking-tight">
              Texperia <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Navigator</span>
            </span>
          </div>
          <div className="rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1 text-xs font-bold tracking-widest text-secondary text-glow-secondary">
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
            <h1 className="font-display text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Find Your Event.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Navigate Instantly.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Welcome to the official interactive map and schedule for Texperia 2026. Search, filter, and get live directions to any venue on campus.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 to-secondary/50 opacity-20 blur transition duration-300 group-focus-within:opacity-50"></div>
            <div className="relative flex items-center bg-card border-2 border-border rounded-2xl overflow-hidden focus-within:border-primary/50 transition-colors">
              <div className="pl-5 text-muted-foreground">
                <Search className="h-6 w-6" />
              </div>
              <input
                type="text"
                placeholder="Search events, workshops, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-4 py-4 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
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
        <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing <span className="font-bold text-foreground">{filteredEvents.length}</span> events</p>
        </div>

        {/* Events Grid */}
        <section className="relative min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-muted-foreground">
              <Compass className="h-10 w-10 animate-spin text-primary" />
              <p className="font-medium animate-pulse">Mapping out events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-3xl bg-card/50"
            >
              <div className="bg-accent/50 p-4 rounded-full mb-4">
                <Map className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any events matching "{searchQuery}" in the {selectedCategory} category. Try adjusting your filters.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-6 px-6 py-2 rounded-full bg-border text-foreground hover:bg-muted transition-colors font-medium"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-border/50 bg-background/50 text-center">
        <p className="text-muted-foreground text-sm font-medium">
          © 2026 <span className="text-foreground">Texperia Navigator</span> · SNS College of Technology
        </p>
      </footer>
    </div>
  );
}
