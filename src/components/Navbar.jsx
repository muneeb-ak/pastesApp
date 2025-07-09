import React from "react";
import { NavLink } from "react-router"; 
import { motion } from "framer-motion";

const navItem = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Navbar = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/pastes", label: "Pastes" },
  ];

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-gray-900 shadow-md"
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <motion.h1
          className="text-2xl font-bold tracking-wide text-white sm:text-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Paste<span className="text-emerald-400">App</span>
        </motion.h1>

        <ul className="flex gap-6">
          {links.map((l, i) => (
            <motion.li key={l.to} custom={i} variants={navItem} initial="hidden" animate="visible">
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `font-medium transition-colors sm:text-lg ${
                    isActive ? "text-emerald-400" : "text-white hover:text-emerald-300"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;