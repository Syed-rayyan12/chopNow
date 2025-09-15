"use client"
import React from "react";
import { motion } from "framer-motion";
import { Utensils, Truck, Zap, ShieldCheck } from "lucide-react"; // ✅ Lucide icons

export default function FeatureSection({
  imageSrc = "/mobile.png",
  alt = "Feature image",
  items = null,
}) {
  const defaultItems = [
    {
      icon: <Utensils className="w-6 h-6" />, // 🍽️ Fresh Meals
      title: "Freshly Prepared Meals",
      desc: "Delicious food made fresh, just the way you like it—every order, every time",
    },
    {
      icon: <Truck className="w-6 h-6" />, // 🚚 Delivery
      title: "Fast & Reliable Delivery",
      desc: "Enjoy hot, fresh meals brought straight to your door—always on time.",
    },
    {
      icon: <Zap className="w-6 h-6" />, // ⚡ Speed
      title: "Speed You Can Trust",
      desc: "Connect with popular tools and APIs with minimal setup. Blazing fast load times and optimized rendering for every device.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />, // 🛡️ Quality
      title: "Trusted Quality & Service",
      desc: "Partnering with the best restaurants to bring you meals you can count on.",
    },
  ];

  const features = items || defaultItems;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // delay between each child
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 }, // start slightly to the right
    visible: {
      opacity: 1,
      x: 0, // slide into place
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative mx-auto px-12 py-12 bg-white">
      {/* Decorative top-left SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 160 160"
        className="absolute top-4 left-8"
      >
        <g stroke="#FF7A00" strokeWidth="4" fill="none">
          <polygon points="30,30 50,50 30,70 10,50" className="float-1" />
          <polygon points="70,70 90,90 70,110 50,90" className="float-2" />
          <circle
            cx="90"
            cy="40"
            r="6"
            fill="#FF7A00"
            className="roll-dot"
          />
        </g>
      </svg>

      {/* Decorative bottom-right SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 160 160"
        className="absolute bottom-0 max-sm:-bottom-20 max-sm:w-22 max-sm:h-22 right-0 opacity-[1px]"
      >
        <g stroke="#FF7A00" strokeWidth="5" fill="none">
          <path d="M20 40 L40 20 L60 40 L80 20 L100 40" />
          <line x1="30" y1="70" x2="80" y2="70" />
          <line x1="30" y1="90" x2="80" y2="90" />
          <circle
            cx="60"
            cy="110"
            r="6"
            fill="#FF7A00"
            className="roll-left-right"
          />
        </g>
      </svg>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left: Image */}
        <div className="flex justify-center md:w-1/2 w-full">
          <img
            src={imageSrc}
            alt={alt}
            className="w-[50%] max-sm:w-full h-auto rounded-2xl object-cover swing-animation"
          />
        </div>

        {/* Right: Features list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="md:w-1/2 w-full flex max-md:flex-col justify-center pl-20 max-md:pl-0 flex-col gap-18"
        >
          {features.map((f, i) => (
            <motion.div
              variants={itemVariants}
              key={i}
              className="flex max-md:flex-col items-start leading-5 gap-4"
            >
              {/* Icon */}
              <div className="flex-none w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-white">
                {f.icon}
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold leading-tight">{f.title}</h3>
                <p className="mt-1 w-[70%] max-md:w-full text-sm text-gray-600">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
