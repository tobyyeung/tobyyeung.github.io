export const initialProjects = [
  {
    id: "1",
    title: "Aleago",
    shortDescription: "A dynamic web application powering a unique virtual economy using deterministic probability models.",
    description: "Aleago is a dynamic web application built with <strong>Next.js</strong> and <strong>Supabase</strong> that powers a unique virtual economy. I designed it to execute complex deterministic probability models using <strong>server-side edge functions</strong>, and structured the backend with asynchronous <strong>PostgreSQL</strong> pipelines to seamlessly handle mathematical value-matching algorithms in real-time.",
    technologies: ["Next.js", "Supabase", "PostgreSQL"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  },
  {
    id: "2",
    title: "Tacho Tasks",
    shortDescription: "A task management platform bidirectionally synchronizing events across Google Calendar and Google Tasks.",
    description: "Tacho Tasks is a comprehensive task management platform designed to unify your daily scheduling. I developed a custom two-pronged sync engine that seamlessly integrates with the <strong>Google API</strong> to bidirectionally synchronize events and to-dos across both <strong>Google Calendar</strong> and <strong>Google Tasks</strong>, leveraging a <strong>React</strong> frontend and robust <strong>REST APIs</strong>.",
    technologies: ["REST APIs", "React", "Google API"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  },
  {
    id: "3",
    title: "Computer Vision Emotion Recognition",
    shortDescription: "A real-time facial expression analysis pipeline that classifies human emotions from live video feeds.",
    description: "This project explores real-time facial expression analysis through a <strong>Python</strong>-based computer vision pipeline. Using <strong>OpenCV</strong> and custom <strong>Machine Learning</strong> models, the system continuously processes live video feeds to extract key facial features and accurately classify human emotions on the fly.",
    technologies: ["Python", "OpenCV", "Machine Learning"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  },
  {
    id: "4",
    title: "Keating Framework (INVITE AI)",
    shortDescription: "An intelligent platform designed to proactively identify at-risk students using RAG and local ML inference.",
    description: "The Keating Framework is an intelligent platform designed to empower educators by proactively identifying at-risk students. I structured the application around a powerful <strong>RAG (Retrieval-Augmented Generation)</strong> system using <strong>DuckDB</strong> and <strong>ChromaDB</strong>. To ensure deep data privacy and high performance, I also engineered a local inference pipeline running quantized <strong>Local LLMs (Ollama)</strong> via <strong>FastAPI</strong>.",
    technologies: ["FastAPI", "Python", "DuckDB", "ChromaDB", "Ollama"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  },
  {
    id: "5",
    title: "Cloud Calendar System (KesselWorks)",
    shortDescription: "A scalable calendar system for project timeline tracking and contractor coordination.",
    description: "Developed for internal teams at KesselWorks, this scalable calendar system centralizes project timeline tracking and contractor coordination. The application features a <strong>React</strong> frontend backed by highly optimized <strong>MySQL</strong> queries and streamlined <strong>REST APIs</strong>. I containerized the entire microservice architecture using <strong>Docker</strong> and <strong>Kubernetes</strong>, deploying it securely on <strong>AWS</strong> infrastructure.",
    technologies: ["React", "AWS", "MySQL", "Docker", "Kubernetes"],
    demoUrl: "",
    repoUrl: "",
    imageUrl: ""
  }
];

export const getProjects = () => {
  const stored = localStorage.getItem('portfolio_projects_v5');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('portfolio_projects_v5', JSON.stringify(initialProjects));
  return initialProjects;
};

export const saveProjects = (projects) => {
  localStorage.setItem('portfolio_projects_v5', JSON.stringify(projects));
};
