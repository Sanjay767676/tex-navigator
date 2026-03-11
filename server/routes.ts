import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed sample data for Texperia
  const seedDatabase = async () => {
    const existing = await storage.getEvents();
    if (existing.length === 0) {
      const sampleEvents = [
        {
          name: "Code Relay",
          category: "Technical",
          description: "A team-based competitive programming event where members take turns to code.",
          date: "Oct 15, 2026",
          time: "10:00 AM",
          venue: "Main Computer Lab",
          lat: "11.0500",
          lon: "77.0000"
        },
        {
          name: "Robo Race",
          category: "Technical",
          description: "Design and build a remote-controlled robot to navigate our custom obstacle course.",
          date: "Oct 16, 2026",
          time: "11:30 AM",
          venue: "Open Ground",
          lat: "11.0510",
          lon: "77.0010"
        },
        {
          name: "AI & ML Workshop",
          category: "Workshop",
          description: "Hands-on session covering the latest in Generative AI and Machine Learning models.",
          date: "Oct 15, 2026",
          time: "02:00 PM",
          venue: "Seminar Hall",
          lat: "11.0495",
          lon: "77.0020"
        },
        {
          name: "Battle of Bands",
          category: "Cultural",
          description: "Top college bands compete for the ultimate title in an electrifying musical showdown.",
          date: "Oct 17, 2026",
          time: "06:00 PM",
          venue: "Main Stage",
          lat: "11.0520",
          lon: "76.9990"
        },
        {
          name: "Paper Presentation",
          category: "Technical",
          description: "Present your innovative ideas and research papers to a panel of industry experts.",
          date: "Oct 15, 2026",
          time: "09:30 AM",
          venue: "Conference Room A",
          lat: "11.0485",
          lon: "77.0030"
        },
        {
          name: "Business Pitch",
          category: "Management",
          description: "Pitch your startup idea to investors and win seed funding.",
          date: "Oct 16, 2026",
          time: "10:00 AM",
          venue: "MBA Block",
          lat: "11.0505",
          lon: "77.0040"
        },
        {
          name: "Futsal Tournament",
          category: "Sports",
          description: "5-a-side football tournament with fast-paced action and amazing prizes.",
          date: "Oct 15, 2026",
          time: "04:00 PM",
          venue: "Sports Complex",
          lat: "11.0530",
          lon: "76.9980"
        },
        {
          name: "Hackathon 2026",
          category: "Technical",
          description: "24-hour coding marathon to build solutions for real-world problems.",
          date: "Oct 16, 2026",
          time: "08:00 AM",
          venue: "Innovation Hub",
          lat: "11.0490",
          lon: "77.0015"
        },
        {
          name: "Dance Fiesta",
          category: "Cultural",
          description: "Showcase your dance moves in solo and group categories.",
          date: "Oct 17, 2026",
          time: "04:30 PM",
          venue: "Open Auditorium",
          lat: "11.0515",
          lon: "77.0005"
        },
        {
          name: "Cyber Security Workshop",
          category: "Workshop",
          description: "Learn ethical hacking and network security basics from experts.",
          date: "Oct 17, 2026",
          time: "10:00 AM",
          venue: "Lab 3",
          lat: "11.0498",
          lon: "77.0025"
        }
      ];

      for (const event of sampleEvents) {
        await storage.createEvent(event);
      }
    }
  };

  // Run seed function but don't block startup
  seedDatabase().catch(console.error);

  app.get(api.events.list.path, async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.events.get.path, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
