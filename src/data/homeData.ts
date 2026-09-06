import plant from "@/assets/project-plant.jpg";
import waste from "@/assets/project-waste.jpg";
import winding from "@/assets/project-winding.jpg";
import drone from "@/assets/project-drone.jpg";

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "Ideas", href: "#ideas" },
  { label: "Problems", href: "#problems" },
  { label: "Find Builders", href: "#builders" },
  { label: "About", href: "#about" },
];

export type Project = {
  title: string;
  category: string;
  technology: string;
  difficulty: string;
  cost: string;
  alt: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Smart Plant Monitoring System",
    category: "IoT",
    technology: "ESP32 · Sensors",
    difficulty: "Beginner",
    cost: "₹2,500",
    alt: "Soil moisture sensor board wired to a potted plant",
    image: plant,
  },
  {
    title: "AI Waste Classification",
    category: "Automation",
    technology: "Python · Vision",
    difficulty: "Intermediate",
    cost: "₹6,000",
    alt: "Conveyor sorting bin with a camera module above it",
    image: waste,
  },
  {
    title: "Automatic Filament Winding System",
    category: "Mechanical",
    technology: "Stepper · CNC",
    difficulty: "Advanced",
    cost: "₹14,000",
    alt: "Rotating mandrel winding composite filament",
    image: winding,
  },
  {
    title: "Drone-Based Tree Monitoring",
    category: "Robotics",
    technology: "Pixhawk · GPS",
    difficulty: "Advanced",
    cost: "₹22,000",
    alt: "Quadcopter drone flying above a tree canopy",
    image: drone,
  },
];

export const ideaDomains = [
  "Mechanical",
  "Robotics",
  "IoT",
  "Automation",
  "Thermal",
  "Design & CAD",
  "Manufacturing",
  "EV & Mobility",
];

export const builderFlow = [
  "Your Idea",
  "Project Request",
  "Builders / Vendors",
  "Proposals",
  "Your Project",
];

export const communityFlow = [
  "Student Question",
  "Community",
  "Possible Solutions",
  "Working Project",
];

export const steps = [
  { no: "01", title: "Discover", text: "Find projects and ideas." },
  { no: "02", title: "Choose", text: "Decide what you want to build." },
  { no: "03", title: "Connect", text: "Ask questions or find someone to help." },
  { no: "04", title: "Build", text: "Turn the idea into a working project." },
  { no: "05", title: "Complete", text: "Review, finish, and share the result." },
];

export const footerColumns = [
  {
    heading: "Platform",
    links: ["Projects", "Ideas", "Problems", "Find Builders"],
  },
  {
    heading: "Resources",
    links: ["FAQ", "Help", "Report a Bug", "Help Us Improve"],
  },
  { heading: "Company", links: ["About", "Contact"] },
  { heading: "Legal", links: ["Privacy Policy", "Terms & Conditions"] },
  { heading: "Community", links: ["Discord", "LinkedIn", "YouTube", "GitHub"] },
];
