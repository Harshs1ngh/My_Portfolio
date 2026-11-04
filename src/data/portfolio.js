export const portfolioData = {
  name: "Harsh Singh",
  role: "Software Developer",
  stack: "Full stack , C++",
  location: "Delhi, India",
  email: "harshsinghram22@gmail.com",
  github: "https://github.com/Harshs1ngh",
  linkedin: "https://www.linkedin.com/in/harsh-s1ngh/",
  githubUrl: "https://github.com/Harshs1ngh",
  linkedinUrl: "https://www.linkedin.com/in/harsh-s1ngh/",

  heroLines: ["CURIOUS", "LOGICAL", "CREATIVE."],
  heroAccentWord: "LOGICAL",

  heroBio:
    "I explore computer science through software development, algorithms, and systems-oriented problem-solving. My projects reflect an interest in understanding how software works beneath the interface, from application architecture to the logic that connects complex systems.",

  heroRoles: ["COMPUTER SCIENCE", "SOFTWARE ENGINEERING", "SYSTEMS & APPLICATION DEVELOPMENT"],

  about:
    "I'm Harsh, a computer science graduate fascinated by the logic behind technology and the engineering of intelligent systems. I turn curiosity into practical software, exploring everything from low-level programming to full-stack applications. For me, every project is an opportunity to understand something deeper about systems.",

  stats: [
    { number: "2+", label: "Years Building" },
    { number: "6+", label: "Projects Shipped" },
    { number: "3", label: "Hackathon runner-up" },
    { number: "∞", label: "Coffee Consumed" },
  ],

  skills: [
    {
      icon: "⬡",
      title: "FRONTEND",
      tags: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Redux", "Framer Motion"],
    },
    {
      icon: "◈",
      title: "BACKEND",
      tags: ["Node.js", "Express", "REST APIs", "cron", "JWT Auth", "WebSockets"],
    },
    {
      icon: "◉",
      title: "DATABASE",
      tags: ["MongoDB", "Mongoose", "PostgreSQL", "Firebase"],
    },
    {
      icon: "[*]",
      title: "COMPUTER SCIENCE",
      tags: ["Data Structures & Algorithms", "OOPs", "DBMS", "Computer network", "Software Engineering", "Operating system"],
    },
    {
      icon: "▣",
      title: "SYSTEMS / C++",
      tags: ["C++17/20", "STL", "Data Structures", "Algorithms", "Memory Mgmt", "Multithreading"],
    },
    {
      icon: "◫",
      title: "DEVOPS / TOOLS",
      tags: ["Git", "AWS", "CI/CD", "Postman"],
    },
    {
      icon: "◌",
      title: "DESIGN",
      tags: ["Figma", "UI/UX Principles", "Responsive Design", "Component Systems"],
    },
  ],

  projects: [
    {
      id: "01",
      name: "MeshUP",
      image: "/images/meshup.png",
      description:
        "Developed and deployed a LinkedIn-inspired social platform using Next.js, Redux, and Express — featuring JWT refresh token strategy, Cloudinary CDN integration, database indexing, and a responsive mobile UI.",
      tech: ["React", "Node.js", "MongoDB", "Next.js", "redux", "Vercel (frontend) + Render (backend)"],
      github: "https://github.com/Harshs1ngh/MeshUp",
      live: "https://mesh-up-olive.vercel.app/",
      color: "#ec7e43",
    },
    {
      id: "02",
      name: "InnerSpace",
      image: "/images/innerspace.png",
      description:
        "Built a full-stack journaling app featuring a custom point-scoring engine (Depth, Emotion & Reflection metrics), cron-based leaderboard scheduling, and an analytics dashboard — deployed on Vercel with JWT auth and MongoDB.",
      tech: ["JWT auth", "Express.js", "MongoDB", "Rest api", "Node.js"],
      github: "https://github.com/Harshs1ngh/LifeLog",
      live: "https://innerspace-iota.vercel.app/",
      color: "#8131c4",
    },
    {
      id: "03",
      name: "Leon — Offline AI Assistant",
      image: "/images/leon.png",
      description:
        "Built a privacy-focused, offline-first Windows voice assistant inspired by Jarvis. Combines voice interaction, local AI processing, contextual responses, and memory management to create a desktop assistant without relying on cloud services for its core functionality.",
      tech: [
        "Windows",
        "Voice Recognition",
        "Local LLM",
        "Text-to-Speech",
        "Context & Memory Management",
      ],
      github: "https://github.com/Harshs1ngh/Leon___my-offline-assistent",
      live: null,
      color: "#4ade80",
    },
    {
      id: "04",
      name: "Automated Video Editing Pipeline",
      image: "/images/video-editor.png",
      description:
        "Developed a video-editing automation system to reduce 3–4 hours of manual work per YouTube video. Evolved from a Node.js tool that generated editable XML timelines using stock-media APIs into a seven-stage Python pipeline integrating AI script processing, voice generation, transcription, media retrieval, and automated video assembly.",
      tech: [
        "Python",
        "Node.js",
        "Ollama / DeepSeek",
        "XTTS-v2",
        "WhisperX",
        "MoviePy",
        "FFmpeg",
        "Pexels / Pixabay / Giphy APIs",
      ],
      github: "https://github.com/Harshs1ngh?tab=repositories",
      live: null,
      color: "#fb923c",
    },
    {
      id: "05",
      name: "TourConnect",
      image: "/images/tour_connect.png",
      description:
        "Contributed to a hackathon project designed to connect travellers with travel agents and simplify vacation planning. Focused on backend development and API creation to support communication between the platform's users and service providers.",
      tech: [
        "Backend Development",
        "REST APIs",
        "API Integration",
        "Hackathon Project",
      ],
      github: "https://github.com/Harshs1ngh/hackthon-project",
      live: "https://harshs1ngh.github.io/hackthon-project/",
      color: "#a78bfa",
    },
    {
      id: "06",
      name: "3D Earth — Weather Explorer",
      image: "/images/3d-earth.png",
      description:
        "Created an interactive 3D globe that lets users search for countries, smoothly zoom into selected locations, and explore location-specific weather and related information through external APIs.",
      tech: [
        "3D Visualization",
        "JavaScript",
        "Weather API",
        "Geographical Data",
        "Interactive UI",
      ],
      github: "https://github.com/Harshs1ngh/Project-earth",
      live: "https://harshs1ngh.github.io/Project-earth/",
      color: "#38bdf8",
    },
  ],

  timeline: [
    {
      year: "2023 — Starting",
      role: "BCA — BACHELOR OF COMPUTER APPLICATIONS",
      company: "Institute of Management Studies, Ghaziabad",
      location: "Ghaziabad, India",
      description:
        "Studied computer applications with an emphasis on programming, computational problem-solving, database systems, and software development. Developed foundational knowledge of computer science through academic coursework and practical projects.",
      tags: ["Programming", "DSA", "DBMS", "Computer Science"],
    },

    {
      year: "2024 — 2025",
      role: "INNERSPACE — MAJOR ACADEMIC PROJECT",
      company: "Institute of Management Studies",
      location: "Ghaziabad, India",
      description:
        "Developed a full-stack journaling and mood intelligence platform as a major academic project. Explored application architecture, database management, data processing, and the integration of intelligent features.",
      tags: ["Full Stack", "Database Design", "Software Engineering"],
    },
    {
      year: "2025 — 2026",
      role: "IIT Kanpur — FULL STACK DEVELOPMENT",
      company: "E&ICT Academy, WINTER TRAINING",
      location: "IIT Kanpur, India",
      description:
        "Completed a structured Winter Training Program offline in Full Stack Web Development with MERN Stack, covering MongoDB, Express.js, React.js, and Node.js through practical application development.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    },

    {
      year: "2026",
      role: "DESIGN AND ANALYSIS OF ALGORITHMS",
      company: "NPTEL — in-person examination Certification",
      location: "India",
      description:
        "Completed an 8-week NPTEL course in Design and Analysis of Algorithms beyond the regular undergraduate curriculum, with an in-person examination. Explored algorithmic problem-solving and the analysis of computational efficiency.",
      tags: ["Algorithms", "Problem Solving", "NPTEL", "3 Credits"],
    },

    {
      year: "2026 — Present",
      role: "ACADEMIC DEVELOPMENT",
      company: "Personal Projects",
      location: "Delhi, India",
      description:
        "Developing independent software projects exploring application architecture, systems programming, and full-stack engineering. Building Leon, an offline-first Windows voice assistant, and MeshUp, a social networking platform.",
      tags: ["C++", "React", "Node.js", "System Design"],
    },

  ],

  standoutLines: [
    { text: "(A question,)", align: "left", size: 50, color: "var(--text)", weight: 400 },
    { text: "explored through", align: "right", size: 140, color: "var(--accent)", weight: 900 },
    { text: "logic,,", align: "left", size: 120, color: "var(--text)", weight: 900 },
    { text: "ALGORITHMS.", align: "center", size: 160, color: "var(--text)", weight: 900 },
  ],
};