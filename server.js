// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Simple API to provide portfolio data (optional for frontend dynamic content)
app.get('/api/portfolio', (req, res) => {
  res.json({
    name: "Aman Bastia",
    title: "DevOps Engineer @ Tata Elxsi",
    location: "Bengaluru, Karnataka, India",
    about: "AWS Certified DevOps Engineer passionate about cloud computing and automation.",
    experience: [
      { role: "DevOps Engineer", company: "Tata Elxsi", location: "Bengaluru", period: "2023 - Present" }
    ],
    education: [
      { degree: "Marine Engineering", institute: "International Maritime Academy, Chennai" },
      { degree: "Studies at Indira Gandhi National Open University" }
    ],
    skills: [
      "AWS", "Docker", "Kubernetes", "CI/CD", "Git", "Linux", "Python"
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        logoUrl: "/logos/aws-logo.gltf",
        link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
      },
      {
        name: "Docker Certified Associate",
        logoUrl: "/logos/docker-logo.gltf",
        link: "https://www.docker.com/certification/"
      },
      {
        name: "Certified Kubernetes Administrator",
        logoUrl: "/logos/kubernetes-logo.gltf",
        link: "https://www.cncf.io/certification/cka/"
      }
    ],
    contact: {
      email: "aman.bastia@example.com",
      linkedin: "https://www.linkedin.com/in/aman-bastia/"
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
