"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

interface MediaSectionProps {
  lang: string;
  data: any;
}

export default function MediaSection({ lang, data }: MediaSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setIsPlaying(true)}>
          {!isPlaying ? (
            <>
              <img
                src={data.thumbnail}
                alt="Video thumbnail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform"
                >
                  <Play className="w-10 h-10 text-white fill-white" />
                </motion.div>
              </div>
            </>
          ) : (
            <iframe
              src={`${data.url}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
}
