"use client";

import { motion } from "framer-motion";
import { urlForImage } from "@/lib/sanity.image";

interface AboutProps {
  lang: string;
  data: any;
}

export default function About({ lang, data }: AboutProps) {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl scale-95 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl" />
              <img
                src={urlForImage(data.image)}
                alt="About us"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {data.heading[lang]}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {data.description[lang]}
            </p>
            <div className="flex gap-4">
               <div className="h-1 w-20 bg-blue-600 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
