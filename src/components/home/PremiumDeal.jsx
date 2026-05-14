import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const featured = {
  image: "/img/premiumdeal/stevepb-hygiene-870763_1920.jpg",
  title: "Luxury Collection",
  subtitle: "Premium skincare & fashion products",
  description:
   "Discover our exclusive collection with special discounts for a limited time.",
  price: 89.99,
  oldPrice: 129.99,
};

export default function PremiumDeal() {
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="bg-primary py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            bg-[#181818]
            border
            border-[#2A2A2A]
            rounded-[40px]
            overflow-hidden
            shadow-[0_10px_50px_rgba(0,0,0,0.45)]
          "
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            {/* IMAGE */}
            <div className="relative h-full">
              <img
                src={featured.image}
                alt={featured.title}
                className="
                  w-full
                  h-full
                  object-cover
                  min-h-[500px]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* CONTENT */}
            <div className="p-8 lg:p-14">
              
              <span className="text-accent uppercase tracking-[6px] text-sm">
                Deal Of The Week
              </span>

              <h2 className="text-text text-4xl lg:text-5xl font-black mt-5 leading-tight">
                {featured.title}
              </h2>

              <p className="text-gray-400 mt-6 text-lg leading-relaxed">
                {featured.description}
              </p>

              {/* STARS */}
              <div className="flex gap-1 text-accent text-xl mt-6">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>

              {/* PRICES */}
              <div className="flex items-center gap-4 mt-8">
                <span className="text-accent text-5xl font-black">
                  ${featured.price}
                </span>

                <del className="text-gray-500 text-2xl">
                  ${featured.oldPrice}
                </del>
              </div>

              {/* PROGRESS */}
              <div className="mt-10">
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <p>Sold: 20</p>
                  <p>Available: 40</p>
                </div>

                <div className="w-full h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div className="w-[40%] h-full bg-accent rounded-full"></div>
                </div>
              </div>

              {/* COUNTDOWN */}
              <div className="flex flex-wrap gap-4 mt-10">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Sec", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="
                      w-24
                      h-24
                      rounded-3xl
                      bg-black/40
                      backdrop-blur-xl
                      border
                      border-[#2A2A2A]
                      flex
                      flex-col
                      justify-center
                      items-center
                    "
                  >
                    <span className="text-accent text-3xl font-black">
                      {item.value}
                    </span>

                    <span className="text-gray-400 text-xs uppercase tracking-[3px] mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* BUTTON */}
              <button
                className="
                  mt-10
                  bg-accent
                  text-primary
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  hover:scale-105
                  hover:shadow-[0_0_30px_rgba(200,169,106,0.35)]
                  transition-all
                "
              >
                Shop Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}