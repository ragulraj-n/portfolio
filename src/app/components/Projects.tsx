import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { profile } from "../data/profile";

type Project = (typeof profile.projects)[number];

function ViewProjectButton({ url, label }: { url: string; label: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ boxShadow: "3px 3px 0px #1A1A1A", fontFamily: "var(--font-mono)" }}
      className="inline-flex items-center gap-2 bg-transparent border-[2px] border-[#1A1A1A] py-2 px-4 text-xs font-bold uppercase tracking-wider"
      whileHover={{ y: -2, boxShadow: "5px 5px 0px #1A1A1A", transition: { type: "spring", stiffness: 400 } }}
      aria-label={`Open ${label}`}
    >
      View Project <ExternalLink className="w-3 h-3" />
    </motion.a>
  );
}

function GitHubButton({ url }: { url: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ boxShadow: "3px 3px 0px #1A1A1A", fontFamily: "var(--font-mono)" }}
      className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white border-[2px] border-[#1A1A1A] py-2 px-4 text-xs font-bold uppercase tracking-wider"
      whileHover={{ y: -2, boxShadow: "5px 5px 0px #1A1A1A", transition: { type: "spring", stiffness: 400 } }}
      aria-label={`View GitHub repository`}
    >
      <Github className="w-3 h-3" /> github
    </motion.a>
  );
}

function ProjectCard({ project, index, isFeatured = false }: { project: Project; index: number; isFeatured?: boolean }) {
  return (
    <motion.div
      className={`project-card bg-[#F5F0E8] border-[2px] border-[#1A1A1A] p-5 flex flex-col overflow-hidden ${isFeatured ? 'border-[3px]' : ''}`}
      style={{ 
        boxShadow: isFeatured ? "7px 7px 0px #1A1A1A" : "3px 3px 0 #1A1A1A", 
        borderRadius: 0,
        minHeight: isFeatured ? 180 : 'auto'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ 
        y: -6, 
        boxShadow: isFeatured ? "10px 10px 0px #1A1A1A" : "8px 8px 0px #1A1A1A", 
        transition: { duration: 0.2, ease: "easeOut" } 
      }}
    >
      {isFeatured && (
        <p
          style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em" }}
          className="uppercase opacity-50 mb-2"
        >
          Featured Project | {project.date}
        </p>
      )}

      <h3 style={{ fontFamily: "var(--font-display)" }} className="font-black text-xl mb-2 leading-tight">
        {project.title}
      </h3>

      {!isFeatured && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10 }} className="opacity-60 mb-3 uppercase">
          {project.date}
        </p>
      )}

      {/* Tags in blue boxes like featured project */}
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              background: "#00B4D8",
              border: "2px solid #1A1A1A",
              padding: "2px 8px",
              color: "#1A1A1A",
            }}
            className="uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      <p style={{ fontFamily: "var(--font-display)", fontSize: 14 }} className="leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      <div
        style={{
          paddingTop: 10,
          borderTop: "1px solid rgba(26,26,26,0.12)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          lineHeight: 1.6,
        }}
        className="mb-4"
      >
        <p style={{ marginBottom: 6 }}>
          <span style={{ fontWeight: 700, opacity: 0.7, letterSpacing: "0.08em" }}>PROBLEM - </span>
          <span style={{ opacity: 0.85, fontWeight: 400 }}>{project.problem}</span>
        </p>
        <p>
          <span style={{ fontWeight: 700, opacity: 0.7, letterSpacing: "0.08em" }}>SOLUTION - </span>
          <span style={{ opacity: 0.85, fontWeight: 400 }}>{project.solution}</span>
        </p>
      </div>
      <div className="flex gap-3 mt-auto">
        <ViewProjectButton url={project.url} label={project.title} />
        {project.githubUrl && <GitHubButton url={project.githubUrl} />}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [featured, ...otherProjects] = profile.projects;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <span
            style={{ fontFamily: "var(--font-display)" }}
            className="absolute -left-4 -top-8 font-black text-[140px] leading-none opacity-[0.06] select-none z-0"
          >
            05
          </span>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="relative z-10 font-black text-4xl sm:text-5xl">
            Projects
          </h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12 }} className="mt-2 opacity-60">
            Resume-backed full-stack projects.
          </p>
        </motion.div>

        {/* All projects in one grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          {profile.projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
              isFeatured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}