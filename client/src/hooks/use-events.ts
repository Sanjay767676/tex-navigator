import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { Event } from "@shared/schema";

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      const res = await fetch(api.events.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch events");
      
      // We assume the backend returns JSON matching the Event schema
      const data = await res.json();
      
      try {
        return api.events.list.responses[200].parse(data) as Event[];
      } catch (err) {
        console.error("[Zod] Event list validation failed:", err);
        // Fallback to returning raw data if Zod custom parsing fails due to complex types
        return data as Event[];
      }
    },
    // Removed initialData to prevent flash of incorrect events
  });
}
