import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed sample data for Texperia
  const seedDatabase = async () => {
    try {
      const existing = await storage.getEvents();
      if (existing.length > 0) return;

      const sampleEvents = [
        { name: "Appathon", category: "Hackathon", description: "CSE department event: Appathon.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "8 Hours Software Hackathon", category: "Hackathon", description: "AIML department event: 8 Hours Software Hackathon.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Idea to Impact(Ideathon)", category: "Hackathon", description: "AERO department event: Idea to Impact(Ideathon).", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Innovatrix (Hackathon)", category: "Hackathon", description: "ECE department event: Innovatrix (Hackathon).", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Protothon", category: "Hackathon", description: "EEE department event: Protothon.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "AquaHack", category: "Hackathon", description: "CIVIL department event: AquaHack.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "AM Ideathon", category: "Hackathon", description: "MMCT department event: AM Ideathon.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Webathon", category: "Hackathon", description: "IT department event: Webathon.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "BioGenesis (Ideathon)", category: "Hackathon", description: "BME department event: BioGenesis (Ideathon).", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Idea Pitching", category: "Event", description: "CSE department event: Idea Pitching.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Paper Presentation", category: "Event", description: "CSE department event: Paper Presentation.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Capture the Flag", category: "Event", description: "CSE department event: Capture the Flag.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Mastermind -Quiz", category: "Event", description: "CSE department event: Mastermind -Quiz.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "AIXperience Design Challenge", category: "Event", description: "CSE department event: AIXperience Design Challenge.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Code Debugging", category: "Event", description: "AIML department event: Code Debugging.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Ad zap", category: "Event", description: "AIML department event: Ad zap.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "IPL Auction", category: "Event", description: "AIML department event: IPL Auction.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Memathon 3.0", category: "Event", description: "IT department event: Memathon 3.0.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Technical Quiz \"Small questions.Big brains\"", category: "Event", description: "IT department event: Technical Quiz \"Small questions.Big brains\".", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Hunt the code “Find it. Fix it. Finish it.”", category: "Event", description: "IT department event: Hunt the code “Find it. Fix it. Finish it.”.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Emoji Story Challenge", category: "Event", description: "IT department event: Emoji Story Challenge.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Logic2visual", category: "Event", description: "IT department event: Logic2visual.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "3D design contest", category: "Event", description: "AI&DS department event: 3D design contest.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "AI Comic Strip", category: "Event", description: "AI&DS department event: AI Comic Strip.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Crack the Code", category: "Event", description: "AI&DS department event: Crack the Code.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "AI-Artathon", category: "Event", description: "AI&DS department event: AI-Artathon.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Turning Heist", category: "Event", description: "CST/CSD/IoT department event: Turning Heist.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Stranger  Things", category: "Event", description: "CST/CSD/IoT department event: Stranger  Things.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Runtime Rumble", category: "Event", description: "CST/CSD/IoT department event: Runtime Rumble.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Connection - (Tech Quiz)", category: "Event", description: "CST/CSD/IoT department event: Connection - (Tech Quiz).", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Water Rocketry", category: "Event", description: "AERO department event: Water Rocketry.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Glide Craft", category: "Event", description: "AERO department event: Glide Craft.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Quiz Arena", category: "Event", description: "AERO department event: Quiz Arena.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Mach Hunt", category: "Event", description: "AERO department event: Mach Hunt.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Plough Your Brain - Quiz Quest", category: "Event", description: "AGRI department event: Plough Your Brain - Quiz Quest.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Farm Gear Flash", category: "Event", description: "AGRI department event: Farm Gear Flash.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Photo Flash", category: "Event", description: "AGRI department event: Photo Flash.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Auto Show", category: "Event", description: "AUTO department event: Auto Show.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Bionexus (Poster Presentation)", category: "Event", description: "BME department event: Bionexus (Poster Presentation).", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Medxplore (Paper Presentation)", category: "Event", description: "BME department event: Medxplore (Paper Presentation).", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Once upon a Mic", category: "Event", description: "BME department event: Once upon a Mic.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Movie Scene Recreation", category: "Event", description: "BME department event: Movie Scene Recreation.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Dumb Civil Charades", category: "Event", description: "CIVIL department event: Dumb Civil Charades.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Construct your Dream", category: "Event", description: "CIVIL department event: Construct your Dream.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Paper Fest", category: "Event", description: "CIVIL department event: Paper Fest.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Prompt AI", category: "Event", description: "ECE department event: Prompt AI.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Electroverse", category: "Event", description: "ECE department event: Electroverse.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "E-Sports", category: "Event", description: "ECE department event: E-Sports.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Paper Presentation", category: "Event", description: "EEE department event: Paper Presentation.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Gaming", category: "Event", description: "EEE department event: Gaming.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Short Film", category: "Event", description: "EEE department event: Short Film.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Reverse Debate", category: "Event", description: "EEE department event: Reverse Debate.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Paper Presenation", category: "Event", description: "FT department event: Paper Presenation.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Flameless Cooking", category: "Event", description: "FT department event: Flameless Cooking.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Be a Chef", category: "Event", description: "FT department event: Be a Chef.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Fruit and Vegetable Carving", category: "Event", description: "FT department event: Fruit and Vegetable Carving.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Ideafest", category: "Event", description: "FT department event: Ideafest.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Line Follower", category: "Event", description: "MCT department event: Line Follower.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Paper presentation", category: "Event", description: "MCT department event: Paper presentation.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "No Code Automation", category: "Event", description: "MCT department event: No Code Automation.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Public Speaking", category: "Event", description: "MECH department event: Public Speaking.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Tool finder", category: "Event", description: "MECH department event: Tool finder.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Connections", category: "Event", description: "MECH department event: Connections.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "TECH TALKS - Paper Presentation", category: "Event", description: "MECH department event: TECH TALKS - Paper Presentation.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Screensmith (CAD Modeling)", category: "Event", description: "MECH department event: Screensmith (CAD Modeling).", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Mechamind(Technical Event)", category: "Event", description: "MECH department event: Mechamind(Technical Event).", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "CAD Design Challenge", category: "Event", description: "MMCT department event: CAD Design Challenge.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Innoventure", category: "Event", description: "MMCT department event: Innoventure.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Paper presentation", category: "Event", description: "MMCT department event: Paper presentation.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "RC Car Race", category: "Event", description: "MMCT department event: RC Car Race.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Junk wars", category: "Event", description: "MMCT department event: Junk wars.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "AI Prompt", category: "Event", description: "CSE department event: AI Prompt.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Battle of Minds", category: "Event", description: "CSE department event: Battle of Minds.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Leet Code Challenge", category: "Event", description: "CSE department event: Leet Code Challenge.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Multimedia Presentation (Neuroscope:Visual Exposure to AI)", category: "Event", description: "CSE department event: Multimedia Presentation (Neuroscope:Visual Exposure to AI).", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Treasure Hunt", category: "Event", description: "CSE department event: Treasure Hunt.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Solo Singining & Group Singing", category: "Event", description: "AIML department event: Solo Singining & Group Singing.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Reels Context", category: "Event", description: "AIML department event: Reels Context.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Replica", category: "Event", description: "AIML department event: Replica.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Vibe Ops", category: "Event", description: "IT department event: Vibe Ops.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Rapid Chess “Blink and you blunder”", category: "Event", description: "IT department event: Rapid Chess “Blink and you blunder”.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Title to Tale", category: "Event", description: "IT department event: Title to Tale.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Code Rush", category: "Event", description: "AI&DS department event: Code Rush.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Prompt Engineer Idol", category: "Event", description: "AI&DS department event: Prompt Engineer Idol.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "AI Blitz", category: "Event", description: "AI&DS department event: AI Blitz.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Ideathon", category: "Event", description: "AI&DS department event: Ideathon.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Paper Presenrtation", category: "Event", description: "CST/CSD/IoT department event: Paper Presenrtation.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Bug Bounty", category: "Event", description: "CST/CSD/IoT department event: Bug Bounty.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Prompt Designing", category: "Event", description: "CST/CSD/IoT department event: Prompt Designing.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Short Film", category: "Event", description: "CST/CSD/IoT department event: Short Film.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "PaintX", category: "Event", description: "CST/CSD/IoT department event: PaintX.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Poster Presentation", category: "Event", description: "AERO department event: Poster Presentation.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "SkySketch 3D", category: "Event", description: "AERO department event: SkySketch 3D.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "AeroGenesis Expo", category: "Event", description: "AERO department event: AeroGenesis Expo.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Project Presentation", category: "Event", description: "AGRI department event: Project Presentation.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Seed Detectives", category: "Event", description: "AGRI department event: Seed Detectives.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Mission Discovary", category: "Event", description: "AGRI department event: Mission Discovary.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Auto Quiz", category: "Event", description: "AUTO department event: Auto Quiz.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Paper Presentation", category: "Event", description: "AUTO department event: Paper Presentation.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Slow Bike Race", category: "Event", description: "AUTO department event: Slow Bike Race.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Blind Fold", category: "Event", description: "BME department event: Blind Fold.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Biofluxtron", category: "Event", description: "BME department event: Biofluxtron.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Code Cracking", category: "Event", description: "CIVIL department event: Code Cracking.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "CAD Modelling Quest", category: "Event", description: "CIVIL department event: CAD Modelling Quest.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Colour Your Thoughts", category: "Event", description: "CIVIL department event: Colour Your Thoughts.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Tech Showcase (Project Expo)", category: "Event", description: "ECE department event: Tech Showcase (Project Expo).", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Electroforge", category: "Event", description: "ECE department event: Electroforge.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Solo and Group dance", category: "Event", description: "ECE department event: Solo and Group dance.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "App Pitching", category: "Event", description: "ECE department event: App Pitching.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "SparkX (Paper Presentation)", category: "Event", description: "ECE department event: SparkX (Paper Presentation).", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "IPL Team Builder Auction", category: "Event", description: "ECE department event: IPL Team Builder Auction.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Build it in 60", category: "Event", description: "EEE department event: Build it in 60.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Quad Killer Quest", category: "Event", description: "EEE department event: Quad Killer Quest.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Reel Creation", category: "Event", description: "EEE department event: Reel Creation.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Treasure Hunt", category: "Event", description: "FT department event: Treasure Hunt.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Dark Kitchen Detectives", category: "Event", description: "FT department event: Dark Kitchen Detectives.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Short film", category: "Event", description: "FT department event: Short film.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Technical Quiz", category: "Event", description: "FT department event: Technical Quiz.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Robo Racers", category: "Event", description: "MCT department event: Robo Racers.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Battle Zone(Esports) ", category: "Event", description: "MCT department event: Battle Zone(Esports) .", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Memerush", category: "Event", description: "MCT department event: Memerush.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Ad-Zap", category: "Event", description: "MCT department event: Ad-Zap.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Lathe Master", category: "Event", description: "MECH department event: Lathe Master.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "NexGen Tech Quiz (Technical Quiz )", category: "Event", description: "MECH department event: NexGen Tech Quiz (Technical Quiz ).", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Mechanical QUIZ", category: "Event", description: "MECH department event: Mechanical QUIZ.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Esports", category: "Event", description: "MMCT department event: Esports.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Best Manager", category: "Event", description: "MMCT department event: Best Manager.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Agentic AI Workshop", category: "Workshop", description: "CSE department event: Agentic AI Workshop.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Workshop on Stream Lit", category: "Workshop", description: "CST/CSD/IoT department event: Workshop on Stream Lit.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "ThreatX(Workshop-Cyber Security)", category: "Workshop", description: "CST/CSD/IoT department event: ThreatX(Workshop-Cyber Security).", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Workshop on Plough to Processor:Robotics in Modern Farming", category: "Workshop", description: "AGRI department event: Workshop on Plough to Processor:Robotics in Modern Farming.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Workshop on Electric Vehicle(EV) Technology", category: "Workshop", description: "AUTO department event: Workshop on Electric Vehicle(EV) Technology.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Workshop on Industrial Automation with PLC", category: "Workshop", description: "MCT department event: Workshop on Industrial Automation with PLC.", date: "12-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Workshop On Hands on Exposure to AI Agents", category: "Workshop", description: "AIML department event: Workshop On Hands on Exposure to AI Agents.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Workshop on 3D Printing ", category: "Workshop", description: "AERO department event: Workshop on 3D Printing .", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Workshop on Intelligent EV Monitoring and Diagnostics", category: "Workshop", description: "EEE department event: Workshop on Intelligent EV Monitoring and Diagnostics.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "From Engineering Blueprint to Reality : A Workshop on GD&T Essentials", category: "Workshop", description: "MECH department event: From Engineering Blueprint to Reality : A Workshop on GD&T Essentials.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Hands On Training in IoT", category: "Workshop", description: "BME department event: Hands On Training in IoT.", date: "13-03-2026", time: "09:00 AM", venue: "TBA", lat: "11.0500", lon: "77.0000" },
        { name: "Gamestrom Workshop On Game Design", category: "Workshop", description: "CST/CSD/IoT department event: Gamestrom Workshop On Game Design.", date: "13-03-2026", time: "09:00 AM", venue: "TBA soon", lat: "11.0500", lon: "77.0000" }
      ];

      for (const event of sampleEvents) {
        await storage.createEvent(event);
      }
      console.log("Database seeded successfully with all events.");
    } catch (error) {
      console.error("Error during database seeding:", error);
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
