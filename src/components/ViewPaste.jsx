import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { motion } from "framer-motion";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <p className="mt-10 text-center text-gray-500">Paste not found.</p>;
  }

  return (
    <motion.div
      className="mx-auto mt-10 w-full max-w-4xl px-4 lg:mt-16 lg:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <input
        disabled
        className="w-full rounded-xl border border-gray-300 bg-white/60 px-4 py-2 text-lg font-semibold text-gray-800 shadow-sm"
        value={paste.title}
      />

      <textarea
        disabled
        className="mt-6 w-full resize-y rounded-xl border border-gray-300 bg-white/70 p-4 text-sm shadow-sm"
        value={paste.content}
        rows={18}
      />

      <p className="mt-4 text-right text-xs text-gray-500">Created at: {paste.createdAt}</p>
    </motion.div>
  );
};

export default ViewPaste;