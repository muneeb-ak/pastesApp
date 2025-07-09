import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = pastes.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => dispatch(removeFromPaste(pasteId));

  return (
    <div className="mx-auto mt-10 w-full max-w-6xl px-4 lg:px-0">
      <input
        className="w-full rounded-xl border border-gray-300 bg-white/70 px-4 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-base"
        type="search"
        placeholder="Search pastes by title…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filterData.length ? (
          filterData.map((paste, i) => (
            <motion.div
              key={paste._id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-lg"
            >
              <div>
                <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-indigo-700">
                  {paste.title}
                </h3>
                <p className="mb-4 line-clamp-4 whitespace-pre-wrap text-sm text-gray-700">
                  {paste.content}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
                <span className="text-gray-500">{paste.createdAt}</span>
                <div className="flex gap-2">
                  <NavLink
                    className="rounded bg-indigo-600 px-3 py-1 font-medium text-white hover:bg-indigo-700"
                    to={`/?pasteId=${paste._id}`}
                  >
                    Edit
                  </NavLink>
                  <NavLink
                    className="rounded bg-emerald-600 px-3 py-1 font-medium text-white hover:bg-emerald-700"
                    to={`/pastes/${paste._id}`}
                  >
                    View
                  </NavLink>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="rounded bg-red-600 px-3 py-1 font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="rounded bg-gray-700 px-3 py-1 font-medium text-white hover:bg-gray-800"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;