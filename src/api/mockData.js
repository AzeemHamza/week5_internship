import hamzaPfp from '../assets/hamzapfp.jpg';

// Profile
export const mockProfile = {
  name: "Hamza Azeem",
  title: "Internship Seeker – Computer Science",
  bio: "Actively seeking internship opportunities in Software Development, Web/Application Development, Data Science / Machine Learning, and Backend Engineering.",
  avatar: hamzaPfp,
  location: "Lahore, Pakistan",
  email: "m.hamza.azeem2507@gmail.com",
  phone: "03280493214",
  linkedin: "https://www.linkedin.com/in/hamza-azeem-298373404",
  github: "https://github.com/AzeemHamza",
};

// Skills with additional tech
export const mockSkills = [
  { id: 1, name: "C++", level: 85 },
  { id: 2, name: "Python", level: 80 },
  { id: 3, name: "Node.js", level: 75 },
  { id: 4, name: "RESTful APIs", level: 70 },
  { id: 5, name: "Data Cleaning", level: 82 },
  { id: 6, name: "EDA", level: 78 },
  { id: 7, name: "Classification Models", level: 72 },
  { id: 8, name: "Model Evaluation", level: 74 },
  { id: 9, name: "MongoDB", level: 76 },
  { id: 10, name: "SQL", level: 80 },
  { id: 11, name: "Data Structures & Algorithms", level: 88 },
  { id: 12, name: "Object-Oriented Programming", level: 87 },
  { id: 13, name: "Database Design", level: 80 },
  { id: 14, name: "Problem Solving", level: 90 },
  { id: 15, name: "Java", level: 82 },
  { id: 16, name: "Docker", level: 70 },
  { id: 17, name: "Kubernetes", level: 60 },
  { id: 18, name: "Azure DevOps", level: 65 },
  { id: 19, name: "CI/CD", level: 72 },
  { id: 20, name: "Information Security", level: 75 },
];

// Projects – now including your new projects
export const mockProjects = [
  // Previous 4 projects
  {
    id: 1,
    name: "Personal Finance Management App",
    description: "DSA-Based Optimization Project. Designed optimized searching algorithms for transaction retrieval, improved account management efficiency using appropriate data structures, and applied algorithmic complexity analysis to enhance performance.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&fm=webp",
    technologies: ["C++", "Data Structures", "Algorithm Analysis"],
    category: "Desktop / Console",
    github: null,
    liveDemo: null,
  },
  {
    id: 2,
    name: "Sports News Website",
    description: "Full-stack sports news platform. Frontend: HTML, CSS, JavaScript. Backend: Node.js. Database: SQL / MongoDB. Implemented CRUD operations and database connectivity.",
    image: "https://images.unsplash.com/photo-1495563923587-bdc4282494d0?w=600&auto=format&fit=crop&fm=webp",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB", "SQL"],
    category: "Full Stack Web",
    github: null,
    liveDemo: null,
  },
  {
    id: 3,
    name: "Data Science Pipeline Project",
    description: "Performed data preprocessing and cleaning, conducted Exploratory Data Analysis (EDA), applied classification algorithms, evaluated model performance using standard metrics, and implemented end-to-end data pipeline in Python.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&fm=webp",
    technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "EDA", "Classification"],
    category: "Data Science",
    github: null,
    liveDemo: null,
  },
  {
    id: 4,
    name: "E-Commerce Mobile App (Flutter)",
    description: "Developed a basic cross-platform e-commerce application using Flutter. Implemented product listing, product detail view, and cart functionality.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&fm=webp",
    technologies: ["Flutter", "Dart", "Mobile Development"],
    category: "Mobile App",
    github: null,
    liveDemo: null,
  },

  // New projects
  {
    id: 5,
    name: "Chess Game (Java OOP)",
    description: "A fully functional chess game developed using object‑oriented programming principles in Java. Includes move validation, check/checkmate detection, and a clean console interface. Demonstrates strong OOP design with classes for pieces, board, and game logic.",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=600&auto=format&fit=crop&fm=webp",
    technologies: ["Java", "OOP", "Swing (optional)", "Game Logic"],
    category: "Desktop / Console",
    github: null,
    liveDemo: null,
  },
  {
    id: 6,
    name: "Information Security Toolkit (Python)",
    description: "A Python application that implements classical and modern ciphering techniques: Caesar, Vigenère, Playfair, AES encryption/decryption, and hashing (SHA‑256). Built with a modular architecture for easy extension and testing.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&fm=webp",
    technologies: ["Python", "Cryptography", "PyCryptodome", "Flask (optional UI)"],
    category: "Cybersecurity",
    github: null,
    liveDemo: null,
  },
  {
    id: 7,
    name: "Generic Survey Dashboard Generator",
    description: "An end‑to‑end analytics platform that ingests structured survey data (CSV/Excel), auto‑profiles columns, and renders an interactive React dashboard with KPI cards, charts, NLP sentiment analysis, and a downloadable HTML report. Features dark mode, guided tour, and custom aliases.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&fm=webp",
    technologies: ["Python", "FastAPI", "React", "Recharts", "Tailwind CSS", "NLP", "Pandas"],
    category: "Data Science",
    github: null,
    liveDemo: null,
  },
  {
    id: 8,
    name: "DevOps CI/CD Pipeline on Azure Kubernetes",
    description: "Built a complete CI/CD pipeline using GitHub Actions to build a Docker image, push it to Azure Container Registry, and deploy to Azure Kubernetes Service (AKS). A sample landing page was deployed to demonstrate the automated workflow.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&fm=webp",
    technologies: ["Docker", "Kubernetes", "Azure", "GitHub Actions", "CI/CD", "AKS"],
    category: "DevOps",
    github: null,
    liveDemo: "https://your-aks-app.azurewebsites.net",
  },
];

export const mockContact = {
  email: "m.hamza.azeem2507@gmail.com",
  phone: "03280493214",
  location: "Lahore, Pakistan",
  linkedin: "https://www.linkedin.com/in/hamza-azeem-298373404",
  github: "https://github.com/AzeemHamza",
};