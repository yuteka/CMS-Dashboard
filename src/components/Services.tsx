"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface ServicesProps {
  lang: string;
  data: any;
}

export default function Services({ lang, data }: ServicesProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900"
          >
            {data.heading[lang]}
          </motion.h2>
          <div className="mt-4 h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((service: any, index: number) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.Code;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-3xl border border-gray-100 hover:border-blue-100 transition-all hover:shadow-2xl hover:shadow-blue-500/5 group"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
                  <IconComponent className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title[lang]}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description[lang]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
