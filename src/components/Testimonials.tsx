"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  lang: string;
  data: any;
}

export default function Testimonials({ lang, data }: TestimonialsProps) {
  return (
    <section className="py-24 bg-blue-600 overflow-hidden relative">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-700 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            {data.heading[lang]}
          </h2>
          <div className="h-1 w-20 bg-white/30 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {data.items.map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl"
            >
              <Quote className="w-12 h-12 text-blue-200 mb-8 opacity-50" />
              <p className="text-2xl text-white italic leading-relaxed mb-10">
                "{item.feedback[lang]}"
              </p>
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20"
                />
                <div>
                  <h4 className="text-xl font-bold text-white">{item.name}</h4>
                  <p className="text-blue-100">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
