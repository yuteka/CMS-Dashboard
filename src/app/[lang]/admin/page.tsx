"use client";

import { useState, useEffect, use } from "react";
import { Save, Globe, Image as ImageIcon, Video, Type, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const [content, setContent] = useState<any>(null);
  const [activeLang, setActiveLang] = useState(lang || "en");
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
    setContent((prev: any) => {
      const deepUpdate = (obj: any, p: string[], v: any): any => {
        if (p.length === 0) return v;
        const [first, ...rest] = p;
        if (Array.isArray(obj)) {
          const newArr = [...obj];
          newArr[Number(first)] = deepUpdate(obj[Number(first)], rest, v);
          return newArr;
        }
        return {
          ...obj,
          [first]: deepUpdate(obj ? obj[first] : undefined, rest, v)
        };
      };
      return deepUpdate(prev, path, value);
    });
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
            onChange={(v: string) => updateText(["home", "hero", "title", activeLang], v)} 
          />
          <Textarea 
            label="Subtitle" 
            value={content.home.hero.subtitle[activeLang]} 
            onChange={(v: string) => updateText(["home", "hero", "subtitle", activeLang], v)} 
          />
          <Input 
            label="CTA Text" 
            value={content.home.hero.cta.text[activeLang]} 
            onChange={(v: string) => updateText(["home", "hero", "cta", "text", activeLang], v)} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Media URL (Image/YouTube)" 
              value={content.home.hero.media.url} 
              onChange={(v: string) => updateText(["home", "hero", "media", "url"], v)} 
            />
            <FileUpload 
              onUpload={(url: string) => updateText(["home", "hero", "media", "url"], url)} 
            />
          </div>
          <Select 
            label="Media Type" 
            value={content.home.hero.media.type} 
            options={["image", "video"]}
            onChange={(v: string) => updateText(["home", "hero", "media", "type"], v)} 
          />
        </Section>

        {/* About Section */}
        <Section title="About Section" icon={<ImageIcon className="w-5 h-5" />}>
          <Input 
            label="Heading" 
            value={content.home.about.heading[activeLang]} 
            onChange={(v: string) => updateText(["home", "about", "heading", activeLang], v)} 
          />
          <Textarea 
            label="Description" 
            value={content.home.about.description[activeLang]} 
            onChange={(v: string) => updateText(["home", "about", "description", activeLang], v)} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Image URL" 
              value={content.home.about.image} 
              onChange={(v: string) => updateText(["home", "about", "image"], v)} 
            />
            <FileUpload 
              onUpload={(url: string) => updateText(["home", "about", "image"], url)} 
            />
          </div>
        </Section>

        {/* Media Section */}
        <Section title="Media Section (Featured Video)" icon={<Video className="w-5 h-5" />}>
          <Input 
            label="Video URL (Embed)" 
            value={content.home.media_section.url} 
            onChange={(v: string) => updateText(["home", "media_section", "url"], v)} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Thumbnail URL" 
              value={content.home.media_section.thumbnail} 
              onChange={(v: string) => updateText(["home", "media_section", "thumbnail"], v)} 
            />
            <FileUpload 
              onUpload={(url: string) => updateText(["home", "media_section", "thumbnail"], url)} 
            />
          </div>
        </Section>

        {/* Contact Details */}
        <Section title="Contact Details" icon={<Globe className="w-5 h-5" />}>
           <Input 
            label="Email" 
            value={content.home.contact.details.email} 
            onChange={(v: string) => updateText(["home", "contact", "details", "email"], v)} 
          />
           <Input 
            label="Phone" 
            value={content.home.contact.details.phone} 
            onChange={(v: string) => updateText(["home", "contact", "details", "phone"], v)} 
          />
        </Section>
      </main>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

function Input({ label, value, onChange }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold text-gray-900 shadow-sm placeholder:text-gray-400"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: InputProps & { rows?: number }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold text-gray-900 shadow-sm placeholder:text-gray-400"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }: InputProps & { options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold text-gray-900 shadow-sm cursor-pointer"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
        ))}
      </select>
    </div>
  );
}

function FileUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onUpload(data.url);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">Upload File</label>
      <div className="relative">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all font-medium text-gray-600"
        >
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
          {uploading ? "Uploading..." : "Click to upload"}
        </label>
      </div>
    </div>
  );
}
