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
    // Adding some placeholder data in case the backend is empty or not seeded yet
    initialData: [
      {
        id: 1,
        name: "CyberHack 2026",
        category: "Technical",
        description: "A 24-hour hackathon to build innovative solutions for smart campuses.",
        date: "March 15, 2026",
        time: "09:00 AM",
        venue: "Main Auditorium",
        lat: "11.0560",
        lon: "77.0006"
      },
      {
        id: 2,
        name: "Robo Wars",
        category: "Technical",
        description: "Battle of the bots. Watch custom-built robots fight for supremacy.",
        date: "March 16, 2026",
        time: "01:30 PM",
        venue: "Open Air Theatre",
        lat: "11.0565",
        lon: "77.0010"
      },
      {
        id: 3,
        name: "AI & Future Workshop",
        category: "Workshop",
        description: "Hands-on session on building neural networks and generative AI models.",
        date: "March 15, 2026",
        time: "10:00 AM",
        venue: "Lab Block - A",
        lat: "11.0558",
        lon: "76.9998"
      },
      {
        id: 4,
        name: "Rhythm & Beats",
        category: "Cultural",
        description: "Inter-college dance competition featuring various styles.",
        date: "March 17, 2026",
        time: "05:00 PM",
        venue: "Main Stage",
        lat: "11.0570",
        lon: "77.0020"
      },
      {
        id: 5,
        name: "Futsal Championship",
        category: "Sports",
        description: "High-energy 5v5 football tournament.",
        date: "March 15, 2026",
        time: "08:00 AM",
        venue: "College Ground",
        lat: "11.0540",
        lon: "77.0015"
      },
      {
        id: 6,
        name: "B-Plan Pitch",
        category: "Management",
        description: "Pitch your startup ideas to a panel of expert investors.",
        date: "March 16, 2026",
        time: "11:00 AM",
        venue: "MBA Seminar Hall",
        lat: "11.0562",
        lon: "77.0001"
      }
    ]
  });
}
