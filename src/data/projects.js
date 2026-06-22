export const initialProjects = [
  {
    id: "1",
    title: "Aleago",
    description: "Engineered a Next.js and Supabase web application utilizing server-side edge functions to execute deterministic probability models. Architected asynchronous PostgreSQL pipelines and designed a virtual economy integrating a mathematical value-matching algorithm.",
    technologies: ["Next.js", "Supabase", "PostgreSQL"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  },
  {
    id: "2",
    title: "Tacho Tasks",
    description: "Engineered a full-stack task management application integrating a custom two-pronged sync engine to synchronize events across Google Calendar and Google Tasks.",
    technologies: ["REST APIs", "React", "Google API"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  },
  {
    id: "3",
    title: "Computer Vision Emotion Recognition",
    description: "Built a Python-based CV system using OpenCV and machine learning to detect and classify facial expressions, featuring real-time video processing and feature extraction.",
    technologies: ["Python", "OpenCV", "Machine Learning"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  },
  {
    id: "4",
    title: "Keating Framework (INVITE AI)",
    description: "A full-stack AI web application to assist educators in identifying at-risk students. Architected a RAG system using DuckDB and ChromaDB, and engineered a local ML inference pipeline deploying quantized LLMs.",
    technologies: ["FastAPI", "Python", "DuckDB", "ChromaDB", "Ollama"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  },
  {
    id: "5",
    title: "Cloud Calendar System (KesselWorks)",
    description: "A cloud-based calendar system enabling internal teams to track project timelines. Optimized MySQL queries, refactored REST APIs, and deployed containerized microservices on AWS via Docker and Kubernetes.",
    technologies: ["React", "AWS", "MySQL", "Docker", "Kubernetes"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  }
];

export const getProjects = () => {
  const stored = localStorage.getItem('portfolio_projects_v3');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('portfolio_projects_v3', JSON.stringify(initialProjects));
  return initialProjects;
};

export const saveProjects = (projects) => {
  localStorage.setItem('portfolio_projects_v3', JSON.stringify(projects));
};
