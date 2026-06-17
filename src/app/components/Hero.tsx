import { motion } from "motion/react";
import { profile } from "../data/profile";

const tagPositions = [
  { top: "8%", left: "55%" },
  { top: "25%", left: "10%" },
  { top: "45%", left: "60%" },
  { top: "65%", left: "15%" },
  { top: "80%", left: "50%" },
];

export function Hero() {
  // Get tags with fallback to empty array
  const tags = profile?.hero?.tags || [];
  const headline = profile?.hero?.headline || "";
  const subheadline = profile?.hero?.subheadline || "";
  const intro = profile?.hero?.intro || "";

  return (
    <section className="min-h-[85vh] pt-32 pb-[60px] px-4 sm:px-6 lg:px-8 relative">
      <span
        style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#888" }}
        className="absolute top-4 right-4 sm:right-6 lg:right-8"
      >
        01
      </span>

      <style>{`
        .heading-with-underline {
          position: relative;
          display: inline-block;
        }
        .heading-with-underline::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 3px;
          background-color: #00B4D8;
          transition: width 0.3s ease;
        }
        .heading-with-underline:hover::after {
          width: 100%;
        }
        .tag-chip-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .tag-chip {
          position: absolute;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          white-space: nowrap;
        }
        .tag-chip-container:hover .tag-chip {
          left: 50% !important;
          transform: translate(-50%, 0);
          width: 140px;
          text-align: center;
        }
        .tag-chip-container:hover .tag-chip:nth-child(1) {
          top: calc(50% - 80px) !important;
        }
        .tag-chip-container:hover .tag-chip:nth-child(2) {
          top: calc(50% - 40px) !important;
        }
        .tag-chip-container:hover .tag-chip:nth-child(3) {
          top: calc(50%) !important;
        }
        .tag-chip-container:hover .tag-chip:nth-child(4) {
          top: calc(50% + 40px) !important;
        }
        .tag-chip-container:hover .tag-chip:nth-child(5) {
          top: calc(50% + 80px) !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            className="lg:col-span-3 space-y-8 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2 pb-4">
              {headline.split("\n").map((line, lineIndex) => (
                <div key={lineIndex} className="overflow-visible">
                  <motion.h1
                    style={{ fontFamily: "var(--font-display)" }}
                    className="heading-with-underline font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.1]"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: lineIndex * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    {line.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: lineIndex * 0.2 + charIndex * 0.03 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h1>
                </div>
              ))}
            </div>

            <motion.p
              style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
              className="text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {subheadline}
            </motion.p>

            <motion.p
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl sm:text-2xl max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {intro}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                style={{
                  boxShadow: "5px 5px 0px #1A1A1A",
                  fontFamily: "var(--font-mono)",
                }}
                className="px-8 py-4 bg-[#00B4D8] border-[3px] border-[#1A1A1A] font-bold uppercase tracking-wider"
                whileHover={{
                  y: -2,
                  boxShadow: "8px 8px 0px #1A1A1A",
                  transition: { type: "spring", stiffness: 400 },
                }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Scroll to projects"
              >
                View Projects -&gt;
              </motion.button>

              <motion.a
                  href={profile.resumePath}
                  download="Ragul_Raj_N_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    boxShadow: "5px 5px 0px #1A1A1A",
                    fontFamily: "var(--font-mono)",
                  }}
                  className="inline-flex items-center px-8 py-4 bg-transparent border-[3px] border-[#1A1A1A] font-bold uppercase tracking-wider"
                  whileHover={{
                    y: -2,
                    boxShadow: "8px 8px 0px #1A1A1A",
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  aria-label="Download Ragul Raj N resume"
                >
                  Download Resume
            </motion.a>

            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="tag-chip-container relative h-[400px] lg:h-[500px]">
              {tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  className="tag-chip absolute bg-[#F5F0E8] border-[2px] border-[#1A1A1A] px-4 py-2"
                  style={{
                    boxShadow: "3px 3px 0px #1A1A1A",
                    top: tagPositions[index]?.top || "0%",
                    left: tagPositions[index]?.left || "0%",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    opacity: { delay: 1 + index * 0.15, duration: 0.3 },
                    scale: { delay: 1 + index * 0.15, duration: 0.3 },
                    y: {
                      duration: 3 + index * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15,
                    },
                    rotate: {
                      duration: 4 + index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15,
                    },
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600 }}>
                    {tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}