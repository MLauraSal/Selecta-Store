import { motion } from "framer-motion";

const categories = [
  {
    title: "Technology & Electro",
    image: "/img/featured/23555986-real-estate-9564043_1920.jpg",
  },
  {
    title: "Home & Decoración",
    image: "/img/featured/pexels-living-room-1835923.jpg",
  },
  {
    title: "Fashion & Style",
    image: "/img/featured/1643606-fashion-2309519.jpg",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        
        {/* TITLE */}
        <div className="text-center mb-14">
          <span className="text-accent uppercase tracking-[6px] text-sm">
            Categories
          </span>

          <h2 className="text-text text-4xl lg:text-5xl font-black mt-4">
            Featured Collections
          </h2>

          <div className="w-24 h-[2px] bg-accent mx-auto mt-5 rounded-full"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="
                group
                relative
                h-[500px]
                rounded-[32px]
                overflow-hidden
                border
                border-[#2A2A2A]
                cursor-pointer
              "
            >
              {/* IMAGE */}
              <img
                src={category.image}
                alt={category.title}
                className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-700
                "
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-accent uppercase tracking-[4px] text-xs">
                  Premium Collection
                </p>

                <h3 className="text-text text-3xl font-black mt-3">
                  {category.title}
                </h3>

                <button
                  className="
                    mt-6
                    bg-accent
                    text-primary
                    px-6
                    py-3
                    rounded-2xl
                    font-semibold
                    hover:scale-105
                    transition
                  "
                >
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}