"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Image as ImageIcon, Video, Type, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [content, setContent] = useState<any>(null);
  const [activeLang, setActiveLang] = useState("en");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await fetch("/api/content", {
      method: "POST",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setIsSaving(false);
  };

  const updateText = (path: string[], value: string) => {
    const newContent = { ...content };
    let current = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setContent(newContent);
  };

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">CMS Dashboard</h1>
            <div className="flex bg-gray-100 p-1 rounded-lg ml-8">
              {["en", "ta", "hi"].map((l) => (
                <button
                  key={l}
                  onClick={() => setActiveLang(l)}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                    activeLang === l ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg ${
              saveSuccess 
                ? "bg-green-500 text-white shadow-green-200" 
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : saveSuccess ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saveSuccess ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12 space-y-12">
        {/* Hero Section */}
        <Section title="Hero Section" icon={<Type className="w-5 h-5" />}>
          <Input 
            label="Title" 
            value={content.home.hero.title[activeLang]} 
            onChange={(v) => updateText(["home", "hero", "title", activeLang], v)} 
          />
          <Textarea 
            label="Subtitle" 
            value={content.home.hero.subtitle[activeLang]} 
            onChange={(v) => updateText(["home", "hero", "subtitle", activeLang], v)} 
          />
          <Input 
            label="CTA Text" 
            value={content.home.hero.cta.text[activeLang]} 
            onChange={(v) => updateText(["home", "hero", "cta", "text", activeLang], v)} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Media URL (Image/YouTube)" 
              value={content.home.hero.media.url} 
              onChange={(v) => updateText(["home", "hero", "media", "url"], v)} 
            />
            <Select 
              label="Media Type" 
              value={content.home.hero.media.type} 
              options={["image", "video"]}
              onChange={(v) => updateText(["home", "hero", "media", "type"], v)} 
            />
          </div>
        </Section>

        {/* About Section */}
        <Section title="About Section" icon={<ImageIcon className="w-5 h-5" />}>
          <Input 
            label="Heading" 
            value={content.home.about.heading[activeLang]} 
            onChange={(v) => updateText(["home", "about", "heading", activeLang], v)} 
          />
          <Textarea 
            label="Description" 
            value={content.home.about.description[activeLang]} 
            onChange={(v) => updateText(["home", "about", "description", activeLang], v)} 
          />
          <Input 
            label="Image URL" 
            value={content.home.about.image} 
            onChange={(v) => updateText(["home", "about", "image"], v)} 
          />
        </Section>

        {/* Media Section */}
        <Section title="Media Section (Featured Video)" icon={<Video className="w-5 h-5" />}>
          <Input 
            label="Video URL (Embed)" 
            value={content.home.media_section.url} 
            onChange={(v) => updateText(["home", "media_section", "url"], v)} 
          />
          <Input 
            label="Thumbnail URL" 
            value={content.home.media_section.thumbnail} 
            onChange={(v) => updateText(["home", "media_section", "thumbnail"], v)} 
          />
        </Section>

        {/* Contact Details */}
        <Section title="Contact Details" icon={<Globe className="w-5 h-5" />}>
           <Input 
            label="Email" 
            value={content.home.contact.details.email} 
            onChange={(v) => updateText(["home", "contact", "details", "email"], v)} 
          />
           <Input 
            label="Phone" 
            value={content.home.contact.details.phone} 
            onChange={(v) => updateText(["home", "contact", "details", "phone"], v)} 
          />
        </Section>
      </main>
    </div>
  );
}

function Section({ title, icon, children }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );
}

function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
        ))}
      </select>
    </div>
  );
}
