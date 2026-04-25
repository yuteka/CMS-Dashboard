"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity.image";

interface HeroProps {
  lang: string;
  data: any;
}

export default function Hero({ lang, data }: HeroProps) {
  const isVideo = data.media.type === "video" || (data.media.url && data.media.url.includes("youtube.com"));
  const imageUrl = urlForImage(data.media.image) || data.media.url;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <div className="absolute inset-0 bg-gray-900">
            <iframe
              src={`${data.media.url}?autoplay=1&mute=1&loop=1&controls=0&playlist=${data.media.url.split("/").pop()}`}
              className="w-full h-full object-cover opacity-40 scale-150 pointer-events-none"
              allow="autoplay; encrypted-media"
            />
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {data.title[lang]}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 mb-10 leading-relaxed"
          >
            {data.subtitle[lang]}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href={data.cta.link}
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-500/20"
            >
              {data.cta.text[lang]}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
