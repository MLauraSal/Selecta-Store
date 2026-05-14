import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowBigRight, LuArrowBigLeft } from "react-icons/lu";

const slides = [
  {
    id: 1,
    image: "/img/banners/joshuaworoniecki-laptop-5673901.jpg",
    title: "Technology Premium",
    subtitle: "The latest in modern gadgets and accessories",
  },
  {
    id: 2,
    image: "/img/banners/erikawittlieb-living-room-2155376.jpg",
    title: "Design & Home",
    subtitle: "Minimalism, comfort and style for your space",
  },
  {
    id: 3,
    image: "/img/banners/tienpts-woman-8164186.jpg",
    title: "Exclusive Fashion",
    subtitle: "Trends that define your personality",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* IMAGE */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl"
              >
                <span className="uppercase tracking-[6px] text-accent text-xs sm:text-sm font-semibold">
                  Luxury Ecommerce
                </span>

                <h1
                  className="
                    text-text
                    text-4xl
                    sm:text-6xl
                    lg:text-7xl
                    font-black
                    leading-tight
                    mt-4
                  "
                >
                  {slides[current].title}
                </h1>

                <p
                  className="
                    text-gray-300
                    text-base
                    sm:text-xl
                    mt-6
                    leading-relaxed
                    max-w-xl
                  "
                >
                  {slides[current].subtitle}
                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    className="
                      bg-accent
                      text-primary
                      px-7
                      py-4
                      rounded-2xl
                      font-semibold
                      hover:scale-105
                      hover:shadow-[0_0_30px_rgba(200,169,106,0.35)]
                      transition-all
                    "
                  >
                    Buy now
                  </button>

                  <button
                    className="
                      border
                      border-accent
                      text-accent
                      px-7
                      py-4
                      rounded-2xl
                      font-semibold
                      hover:bg-accent
                      hover:text-primary
                      transition-all
                    "
                  >
                   View
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ARROWS */}
      <button
        onClick={prevSlide}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          w-12
          h-12
          rounded-full
          bg-black/40
          backdrop-blur-lg
          border
          border-white/10
          text-text
          flex
          items-center
          justify-center
          hover:bg-accent
          hover:text-primary
          transition
        "
      >
        <LuArrowBigLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          w-12
          h-12
          rounded-full
          bg-black/40
          backdrop-blur-lg
          border
          border-white/10
          text-text
          flex
          items-center
          justify-center
          hover:bg-accent
          hover:text-primary
          transition
        "
      >
        <LuArrowBigRight size={24} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              transition-all duration-300 rounded-full
              ${
                current === index
                  ? "w-10 h-3 bg-accent"
                  : "w-3 h-3 bg-white/40"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}