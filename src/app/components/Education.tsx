import { motion } from "motion/react";
import { profile } from "../data/profile";

export function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0E8] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-12">
            <span
              style={{ fontFamily: "var(--font-display)" }}
              className="absolute -left-4 -top-8 font-black text-[140px] leading-none opacity-[0.06] select-none z-0"
            >
              04
            </span>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="relative z-10 font-black text-4xl sm:text-5xl">
              Education
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {profile.education.map((item, index) => (
              <motion.div
                key={`${item.degree}-${item.period}`}
                className="bg-[#FFFFFF] border-[2px] border-[#000000] p-6 sm:p-8"
                style={{ boxShadow: "4px 4px 0px #000000", borderRadius: 0 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "6px 6px 0px #000000",
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <h3 style={{ fontFamily: "var(--font-display)" }} className="font-black text-2xl sm:text-3xl mb-3">
                  {item.degree}
                </h3>
                <p style={{ fontFamily: "var(--font-mono)" }} className="text-base sm:text-lg mb-3">
                  {item.institution}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="inline-block bg-[#F0E040] border-[2px] border-[#000000] px-4 py-1 text-xs uppercase tracking-wider"
                  >
                    {item.period}
                  </span>
                  {item.detail && (
                    <span
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="inline-block bg-[#00B4D8] border-[2px] border-[#000000] px-4 py-1 text-xs uppercase tracking-wider"
                    >
                      {item.detail}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-[#FFFFFF] border-[2px] border-[#000000] p-6 sm:p-8 mt-8"
            style={{ boxShadow: "4px 4px 0px #000000", borderRadius: 0 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 style={{ fontFamily: "var(--font-mono)" }} className="font-bold text-sm uppercase tracking-wider mb-4 opacity-70">
              Awards and Achievements
            </h3>
            <ul style={{ fontFamily: "var(--font-mono)" }} className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {profile.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-2">
                  <span className="text-[#00B4D8] font-black">-</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
