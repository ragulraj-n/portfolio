import { motion } from "motion/react";
import { Mail, Github, Linkedin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "../data/profile";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A] text-[#F5F0E8] scroll-mt-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
        .tooltip-label {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          font-family: 'Caveat', cursive;
          font-size: 24px;
          font-weight: 700;
          color: #F0E040;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .social-icon-wrapper:hover .tooltip-label,
        .social-icon-wrapper:focus-within .tooltip-label {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .social-icon-wrapper:hover .icon-scale,
        .social-icon-wrapper:focus-within .icon-scale {
          transform: scale(1.15);
          transition: transform 0.2s ease;
        }
        .icon-scale {
          transition: transform 0.2s ease;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            style={{ fontFamily: "var(--font-display)" }}
            className="font-black text-5xl sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Let's build something.
          </motion.h2>

          <motion.p
            style={{ fontFamily: "var(--font-display)" }}
            className="text-xl sm:text-2xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {profile.availability}
          </motion.p>

          <motion.a
            href={profile.contact.emailHref}
            style={{
              boxShadow: "5px 5px 0px #00B4D8",
              fontFamily: "var(--font-mono)",
            }}
            className="inline-flex items-center max-w-full bg-[#00B4D8] text-[#F5F0E8] border-[3px] border-[#00B4D8] px-5 sm:px-8 py-4 font-bold uppercase tracking-wider break-all"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            whileHover={{
              y: -2,
              boxShadow: "8px 8px 0px #00B4D8",
              transition: { type: "spring", stiffness: 400 },
            }}
            aria-label={`Email ${profile.fullName}`}
          >
            <Mail className="inline w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" />
            {profile.contact.email}
          </motion.a>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <SocialLink
              href={profile.contact.github}
              label="GitHub"
              tooltip="See my code"
              icon={<Github className="w-5 h-5 icon-scale" aria-hidden="true" />}
            />
            <SocialLink
              href={profile.contact.linkedIn}
              label="LinkedIn"
              tooltip="Connect with me"
              icon={<Linkedin className="w-5 h-5 icon-scale" aria-hidden="true" />}
            />
            <SocialLink
              href={profile.contact.phoneHref}
              label={profile.contact.phone}
              tooltip="Call me"
              icon={<Phone className="w-5 h-5 icon-scale" aria-hidden="true" />}
            />
            <SocialLink
              href={profile.contact.emailHref}
              label="Email"
              tooltip="Say hello"
              icon={<Mail className="w-5 h-5 icon-scale" aria-hidden="true" />}
            />
          </motion.div>

          <motion.div
            className="pt-16 border-t-[3px] border-[#F5F0E8]/20 mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <p style={{ fontFamily: "var(--font-mono)" }} className="text-sm opacity-70">
              Built by {profile.fullName}
              <br />
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00B4D8", textDecoration: "none" }}
                className="hover:underline"
              >
                GitHub profile
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  tooltip,
  icon,
}: {
  href: string;
  label: string;
  tooltip: string;
  icon: ReactNode;
}) {
  const isExternal = href.startsWith("http");

  return (
    <motion.div className="social-icon-wrapper relative" whileHover={{ y: -2 }}>
      <span className="tooltip-label">{tooltip}</span>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        style={{ fontFamily: "var(--font-mono)" }}
        className="flex items-center gap-2 border-[3px] border-[#F5F0E8] px-5 sm:px-6 py-3 uppercase text-sm hover:bg-[#00B4D8] hover:text-[#1A1A1A] hover:border-[#00B4D8] transition-colors"
      >
        {icon}
        <span className="break-all">{label}</span>
      </a>
    </motion.div>
  );
}
