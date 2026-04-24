"use client";

import { Mail, Phone, MapPin } from "lucide-react";

interface ContactProps {
  lang: string;
  data: any;
  footerData: any;
}

export default function Contact({ lang, data, footerData }: ContactProps) {
  return (
    <section className="bg-white">
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">{data.heading[lang]}</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Email</p>
                  <p className="text-xl font-medium text-gray-900">{data.details.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Phone</p>
                  <p className="text-xl font-medium text-gray-900">{data.details.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Address</p>
                  <p className="text-xl font-medium text-gray-900">{data.details.address}</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea rows={4} className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} LOGO. {footerData.rights[lang]}
          </p>
        </div>
      </footer>
    </section>
  );
}
