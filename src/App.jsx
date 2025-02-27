import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";


export default function WaterCraftWorkshop() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: false, amount: 0.3 });

  const ref3 = useRef(null);
  const isInView3 = useInView(ref3, { once: false, amount: 0.3 });


  return (
    <div className="min-h-screen bg-gray-50 text-gray-100 flex flex-col items-center font-sans">
      {/* Hero Section */}
      <div
        className="relative w-full h-screen flex items-center justify-center text-center bg-cover bg-center bg-gray-900"
        style={{ backgroundImage: "url('/hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-wide uppercase"
          >
            WaterCraft Workshop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-3xl pt-6 md:pt-10 max-w-3xl font-semibold text-blue-200"
          >
            Explore the future of marine robotics with hands-on experience in design and programming.
          </motion.p>
        </div>
      </div>

      {/* about the event + purpose */}
      <div ref={ref} className="w-full flex items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, scale: 1.2 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ color: "#2563EB" }}
          className="text-lg md:text-2xl pt-10 mt-6 max-w-5xl font-mono text-blue-800 tracking-wide"
        >Join us for an <span className="text-amber-700">immersive WaterCraft Workshop </span>, where innovation meets the ocean! Dive into a hands-on experience that takes you through the design, construction, and programming of a cutting-edge robotic marine vessel.Perfect for engineering students, robotics enthusiasts, and innovators, this workshop welcomes all skill levels—no prior experience needed, just curiosity and creativity!By the end, you'll have built a fully functional robotic watercraft, capable of navigating autonomously or via remote control. You'll also gain essential programming skills, enabling your vessel to tackle real-world challenges like obstacle avoidance, path planning, and beyond.
        </motion.p>
      </div>

      {/* Content Section with Cards */}
      <h2 className="text-4xl text-gray-900 pt-18 font-bold">What you'll learn?</h2>
      <div className="max-w-7xl py-20 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center bg-gray-50 text-gray-900">

        {[
          { title: "Fundamentals of Marine Robotics", image: "/waterprof.jpg", desc: "Learn the core principles behind marine robotics and its applications." },
          { title: "Hands-on Watercraft Assembly", image: "/2.jpg", desc: "Build and test your own robotic watercraft with expert guidance." },
          { title: "Coding the Future of Marine Robotics", image: "/nav.webp", desc: "Learn the core programming skills behind autonomous marine robots." },

        ].map((item, index) => (
          <motion.div key={index} className="bg-white border border-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow" whileHover={{ scale: 1.05 }}>
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
              {/* <pre className="text-2xl font-sans font-semibold text-gray-900 mb-4">{item.title}</pre> */}
              <p className="text-gray-700">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* clash of robots */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-10 md:mt-15 mb-10 pb-10 md:pb-25 px-4">
        <div ref={ref2} className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-auto items-center">
          <motion.div
            className="w-full md:w-1/2 text-left md:mr-20 text-white flex flex-col items-center md:items-start"
            initial={{ x: -100, opacity: 0 }}
            animate={isInView2 ? { x: 0, opacity: 0.8 } : {}}
            transition={{ duration: 1 }}
          >
            <img src="/game1.png" alt="Aquabots in battle" className="w-full h-auto bg-gray-50 max-w-md" />
            <p className="mt-4 text-lg md:text-2xl text-center md:text-left text-gray-900 max-w-md">
              Enter the high-stakes world of aquatic warfare, where pirate-controlled robots battle for dominance beneath the waves.
            </p>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView2 ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img src="/game.jpeg" className="w-full max-w-md h-auto rounded-4xl shadow-2xl blur-md hover:blur-none transition-all duration-500" />
          </motion.div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-gray-200 py-24 w-full text-center text-gray-900">
        <h2 className="text-4xl font-bold">Workshop Details</h2>
        <div className="mt-12 text-xl space-y-6">
          <p>📍 Venue: NAB (New Academic Building)</p>
          <p>📅 Date: March 15-17, 2025</p>
          <p>⏰ Time: 10:00 AM - 4:00 PM</p>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full px-4 sm:px-10 py-20 text-center bg-gray-900 text-gray-100">
        <h2
          className="text-3xl md:text-4xl font-bold text-white"
        >
          About Us
        </h2>
        <p
          className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto"
        >
          WaterCraft Workshop is dedicated to educating individuals on the latest advancements in marine robotics. Our goal is to provide an engaging, hands-on experience where participants can build, test, and innovate in the field of water-based robotics.
        </p>
      </div>

    </div>
  );
}
