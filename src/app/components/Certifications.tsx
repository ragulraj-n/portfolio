import { motion } from "motion/react";
import { Award } from "lucide-react";
import { profile } from "../data/profile";

export function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
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
              07
            </span>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="relative z-10 font-black text-4xl sm:text-5xl">
              Certifications
            </h2>
          </div>

          <div className="sm:hidden flex gap-4 overflow-x-auto pb-4 scroll-snap-x snap-x snap-mandatory scrollbar-hide">
            {profile.certifications.map((cert, index) => (
              <CertificationCard key={cert.title} cert={cert} index={index} mobile />
            ))}
          </div>

          <div className="hidden sm:grid grid-cols-2 gap-6">
            {profile.certifications.map((cert, index) => (
              <CertificationCard key={cert.title} cert={cert} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CertificationCard({
  cert,
  index,
  mobile = false,
}: {
  cert: (typeof profile.certifications)[number];
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.div
      className={`bg-[#FFFFFF] border-[3px] border-[#1A1A1A] p-6 ${mobile ? "flex-shrink-0 w-[280px] snap-start" : ""}`}
      style={{ boxShadow: "4px 4px 0px #1A1A1A" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={
        mobile
          ? undefined
          : {
              scale: 1.02,
              boxShadow: "6px 6px 0px #1A1A1A",
              transition: { type: "spring", stiffness: 300 },
            }
      }
    >
      <div className="flex items-start gap-4">
        <div className="bg-[#00B4D8] border-[2px] border-[#1A1A1A] p-2 flex-shrink-0">
          <Award className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 style={{ fontFamily: "var(--font-display)" }} className="font-bold text-lg mb-2 leading-tight">
            {cert.title}
          </h3>
          <p style={{ fontFamily: "var(--font-mono)" }} className="text-sm text-gray-700">
            {cert.issuer} | {cert.date}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
