import {
  Calculator,
  Atom,
  FlaskConical,
  Brain,
  Code2,
  TestTube2,
} from "lucide-react";

export const subjects = [
  {
    id: "math",
    title: "Mathematics",
    description:
      "Test your mathematical skills with algebra, geometry, and more",
    icon: Calculator,
    color: "bg-blue-500/10",
  },
  {
    id: "physics",
    title: "Physics",
    description: "Explore the laws of nature and physical phenomena",
    icon: Atom,
    color: "bg-purple-500/10",
  },
  {
    id: "chemistry",
    title: "Chemistry",
    description: "Discover the world of chemical reactions and compounds",
    icon: TestTube2,
    color: "bg-green-500/10",
  },
  {
    id: "biology",
    title: "Biology",
    description: "Learn about living organisms and life processes",
    icon: Brain,
    color: "bg-red-500/10",
  },
  {
    id: "computer-science",
    title: "Computer Science",
    description: "Test your programming and computer science knowledge",
    icon: Code2,
    color: "bg-yellow-500/10",
  },
  {
    id: "science",
    title: "General Science",
    description: "Test your knowledge across all scientific disciplines",
    icon: FlaskConical,
    color: "bg-orange-500/10",
  },
];
