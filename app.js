// frontend/src/App.js
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function CertificationLogo({ modelPath, link }) {
  const { scene } = useGLTF(modelPath);
  const handleClick = () => {
    window.open(link, "_blank");
  };

  return (
    <primitive
      object={scene}
      scale={1.5}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    />
  );
}

function Certifications({ certifications }) {
  return (
    <section id="certifications">
      <h2>Certifications</h2>
      <div style={{ height: 300, display: "flex", gap: "2rem" }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            {certifications.map((cert, idx) => (
              <group key={idx} position={[idx * 3 - 3, 0, 0]}>
                <CertificationLogo
                  modelPath={cert.logoUrl}
                  link={cert.link}
                />
              </group>
            ))}
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </section>
  );
}

export default function App() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/portfolio")
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch(console.error);
  }, []);

  if (!portfolio) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <header>
        <h1>{portfolio.name}</h1>
        <p>{portfolio.title}</p>
        <p>{portfolio.location}</p>
      </header>

      <section id="about">
        <h2>About Me</h2>
        <p>{portfolio.about}</p>
      </section>

      <section id="experience">
        <h2>Experience</h2>
        {portfolio.experience.map((exp, i) => (
          <div key={i}>
            <strong>{exp.role}</strong> - {exp.company}, {exp.location} ({exp.period})
          </div>
        ))}
      </section>

      <section id="education">
        <h2>Education</h2>
        {portfolio.education.map((edu, i) => (
          <div key={i}>
            <strong>{edu.degree}</strong>
            {edu.institute ? `, ${edu.institute}` : ""}
          </div>
        ))}
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <ul>
          {portfolio.skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </section>

      <Certifications certifications={portfolio.certifications} />

      <section id="contact">
        <h2>Contact</h2>
        <p>Email: <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a></p>
        <p>LinkedIn: <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">{portfolio.contact.linkedin}</a></p>
      </section>
    </div>
  );
}
