import { Ionicons } from "@expo/vector-icons";

export const categories: {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
  {
    id: "1",
    title: "Beach",
    icon: "umbrella-outline",
    color: "#3B82F6",
  },
  {
    id: "2",
    title: "Mountains",
    icon: "triangle-outline",
    color: "#10B981",
  },
  {
    id: "3",
    title: "Adventure",
    icon: "compass-outline",
    color: "#F97316",
  },
  {
    id: "4",
    title: "Luxury",
    icon: "diamond-outline",
    color: "#8B5CF6",
  },
  {
    id: "5",
    title: "Camping",
    icon: "bonfire-outline",
    color: "#EF4444",
  },
  {
    id: "6",
    title: "Road Trip",
    icon: "car-sport-outline",
    color: "#F59E0B",
  },
];