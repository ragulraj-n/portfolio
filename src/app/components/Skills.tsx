import { motion } from "motion/react";
import { useState } from "react";
import { profile } from "../data/profile";

const skillsPerRow = Math.ceil(profile.skills.length / 3);
const marqueeRows = [
  { chips: profile.skills.slice(0, skillsPerRow), dir: "left" as const },
  { chips: profile.skills.slice(skillsPerRow, skillsPerRow * 2), dir: "right" as const },
  { chips: profile.skills.slice(skillsPerRow * 2), dir: "left" as const },
];

function ToolTile({ tool, index }: { tool: (typeof profile.tools)[number]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="bg-[#F5F0E8] border-[2px] border-[#1A1A1A] flex flex-col items-center justify-center gap-2 p-3"
      style={{ boxShadow: "3px 3px 0px #1A1A1A", width: "86px", height: "86px" }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + index * 0.05 }}
      whileHover={{
        backgroundColor: "#00B4D8",
        boxShadow: "5px 5px 0px #1A1A1A",
        transition: { type: "spring", stiffness: 400 },
      }}
    >
      {tool.img && !imgError ? (
        <img src={tool.img} alt="" className="w-7 h-7 object-contain" onError={() => setImgError(true)} />
      ) : (
        <span style={{ fontFamily: "var(--font-mono)" }} className="text-sm font-black">
          {tool.abbr}
        </span>
      )}
      <span style={{ fontFamily: "var(--font-mono)" }} className="text-[9px] text-center uppercase leading-tight">
        {tool.name}
      </span>
    </motion.div>
  );
}

function MarqueeRow({ chips, dir }: { chips: string[]; dir: "left" | "right" }) {
  const tripled = [...chips, ...chips, ...chips];
  const animClass = dir === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="overflow-hidden">
      <div className={`flex gap-3 ${animClass}`} style={{ width: "max-content" }}>
        {tripled.map((chip, index) => (
          <span
            key={`${chip}-${index}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 700,
              backgroundColor: "#F5F0E8",
              color: "#1A1A1A",
              border: "2px solid #1A1A1A",
              padding: "6px 16px",
              borderRadius: 0,
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-20 scroll-mt-20">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        .marquee-left:hover,
        .marquee-right:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-left,
          .marquee-right {
            animation: none;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{ fontFamily: "var(--font-display)" }}
            className="absolute -left-4 -top-8 font-black text-[140px] leading-none opacity-[0.06] select-none z-0"
          >
            06
          </span>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="relative z-10 font-black text-4xl sm:text-5xl">
            Skills
          </h2>
        </motion.div>
      </div>

      <motion.div
        className="mb-16 space-y-4"
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {marqueeRows.map((row) => (
          <MarqueeRow key={`${row.dir}-${row.chips[0]}`} chips={row.chips} dir={row.dir} />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {profile.skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-[#FFFFFF] border-[2px] border-[#1A1A1A] p-4"
              style={{ boxShadow: "3px 3px 0px #1A1A1A" }}
            >
              <h3 style={{ fontFamily: "var(--font-mono)" }} className="font-bold text-xs uppercase tracking-wider mb-3 opacity-70">
                {group.category}
              </h3>
              <ul style={{ fontFamily: "var(--font-display)" }} className="space-y-2 text-sm">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex gap-2">
                    <span className="text-[#00B4D8] font-black">-</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {profile.tools.map((tool, index) => (
            <ToolTile key={tool.name} tool={tool} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
