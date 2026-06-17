import { motion } from "motion/react";
import profileImage from "../../profileImage.jpg";
import { profile } from "../data/profile";

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="border-[3px] border-[#1A1A1A] overflow-hidden max-w-sm mx-auto lg:mx-0"
              style={{ boxShadow: "8px 8px 0px #1A1A1A" }}
              whileHover={{
                rotate: 2,
                boxShadow: "12px 12px 0px #1A1A1A",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <img
                src={profileImage}
                alt={`${profile.fullName} profile placeholder`}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

          <div className="relative">
            <div
              style={{ fontFamily: "var(--font-display)" }}
              className="absolute -left-4 -top-16 font-black text-[140px] leading-none opacity-[0.06] select-none z-0"
            >
              02
            </div>

            <motion.div
              className="relative z-10 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h2 style={{ fontFamily: "var(--font-display)" }} className="font-black text-4xl sm:text-5xl mb-6">
                About
              </h2>
              {profile.about.map((paragraph) => (
                <p
                  key={paragraph}
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="flex flex-wrap gap-4 mt-8 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {profile.quickFacts.map((fact, index) => (
              <motion.div
                key={fact}
                className="bg-[#00B4D8] border-[2px] border-[#1A1A1A] px-[14px] py-2"
                style={{
                  boxShadow: "3px 3px 0px #1A1A1A",
                  rotate: [-2, 1, -1.5, 1.5][index % 4],
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{
                  y: -3,
                  transition: { type: "spring", stiffness: 400 },
                }}
              >
                {fact}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
