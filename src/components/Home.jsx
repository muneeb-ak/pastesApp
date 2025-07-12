import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router"; 
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toLocaleString(),
    };


    if(paste.title.length !== 0  && paste.content.length !== 0){
    pasteId ? dispatch(updateToPaste(paste)) : dispatch(addToPaste(paste));
    }else{toast("Fill all fields!")}


    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl px-4 lg:mt-16 lg:px-0">
      <motion.div
        className="flex flex-col gap-4 sm:flex-row sm:items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          className="flex-1 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-sm shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:text-base"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="rounded-xl border border-emerald-600 bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-700 sm:text-sm"
          onClick={createPaste}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </motion.button>
      </motion.div>

      <textarea
        className="mt-6 w-full resize-y rounded-xl border border-gray-300 bg-gray-100 p-4 text-sm shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:text-base"
        value={value}
        placeholder="Enter content here"
        onChange={(e) => setValue(e.target.value)}
        rows={18}
      />
    </div>
  );
};

export default Home;