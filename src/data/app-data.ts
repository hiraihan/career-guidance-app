import type { Career, Mentor, Question } from "../contexts/app-context"

export const careers: Career[] = [
  {
    id: 1,
    title: "UX/UI Designer",
    company: "Tech Startup",
    match: 95,
    salary: "$65k - $95k",
    location: "Remote",
    tags: ["Creative", "Tech", "Design"],
    icon: "🎨",
    description:
      "Create intuitive and beautiful user experiences for digital products. Work closely with product managers and developers to bring designs to life.",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    outlook: "Growing 13% faster than average",
    requirements: "Bachelor's in Design or related field",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Fortune 500",
    match: 88,
    salary: "$80k - $120k",
    location: "New York",
    tags: ["Analytics", "Tech", "Research"],
    icon: "📊",
    description:
      "Analyze complex data to drive business decisions and insights. Build machine learning models and create data visualizations.",
    skills: ["Python", "Machine Learning", "Statistics", "SQL"],
    outlook: "Growing 22% faster than average",
    requirements: "Master's in Data Science or Statistics",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "SaaS Company",
    match: 82,
    salary: "$90k - $130k",
    location: "San Francisco",
    tags: ["Strategy", "Tech", "Leadership"],
    icon: "🚀",
    description:
      "Lead product development from conception to launch. Work with cross-functional teams to deliver products that users love.",
    skills: ["Product Strategy", "Agile", "Analytics", "Communication"],
    outlook: "Growing 19% faster than average",
    requirements: "Bachelor's degree + 3+ years experience",
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Big Tech",
    match: 78,
    salary: "$100k - $150k",
    location: "Seattle",
    tags: ["Programming", "Tech", "Problem Solving"],
    icon: "💻",
    description: "Build scalable software solutions and work on cutting-edge technology projects.",
    skills: ["JavaScript", "React", "Node.js", "System Design"],
    outlook: "Growing 25% faster than average",
    requirements: "Bachelor's in Computer Science",
  },
]

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior UX Designer at Google",
    experience: "8 years",
    rating: 4.9,
    sessions: 127,
    price: "$45/hour",
    avatar: "/placeholder.svg?height=60&width=60",
    expertise: ["UX Design", "Career Transition", "Portfolio Review"],
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Data Science Manager at Netflix",
    experience: "10 years",
    rating: 4.8,
    sessions: 89,
    price: "$60/hour",
    avatar: "/placeholder.svg?height=60&width=60",
    expertise: ["Data Science", "Machine Learning", "Leadership"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Director at Spotify",
    experience: "12 years",
    rating: 5.0,
    sessions: 156,
    price: "$75/hour",
    avatar: "/placeholder.svg?height=60&width=60",
    expertise: ["Product Strategy", "Team Building", "Startup Advice"],
  },
  {
    id: 4,
    name: "David Kim",
    role: "Engineering Manager at Meta",
    experience: "9 years",
    rating: 4.7,
    sessions: 203,
    price: "$55/hour",
    avatar: "/placeholder.svg?height=60&width=60",
    expertise: ["Software Engineering", "Technical Leadership", "System Design"],
  },
]

export const questions: Question[] = [
  {
    question: "What type of work environment energizes you most?",
    options: [
      "Collaborative team settings",
      "Independent, focused work",
      "Dynamic, fast-paced environments",
      "Structured, organized spaces",
    ],
  },
  {
    question: "Which activity sounds most appealing to you?",
    options: [
      "Solving complex problems",
      "Creating something new",
      "Helping others succeed",
      "Analyzing data and trends",
    ],
  },
  {
    question: "What motivates you most in your career?",
    options: ["Making a positive impact", "Financial success", "Creative expression", "Continuous learning"],
  },
  {
    question: "How do you prefer to learn new skills?",
    options: ["Hands-on practice", "Reading and research", "Learning from others", "Trial and error"],
  },
  {
    question: "What's your ideal work-life balance?",
    options: [
      "Clear boundaries between work and personal time",
      "Flexible schedule that varies",
      "Work that feels like a passion",
      "Traditional 9-5 structure",
    ],
  },
]
