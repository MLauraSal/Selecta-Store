import { Link } from "react-router-dom";
import {
  FaShippingFast,
  FaShieldAlt,
  FaStar,
  FaHeadset,
} from "react-icons/fa";

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            About Us
          </p>

          <h1 className="text-4xl lg:text-6xl font-black text-text">
            Selecta Store
          </h1>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
            We are an online store designed to offer selected products,

            a simple shopping experience, and a modern, elegant, and

            reliable style.
          </p>
        </div>

        
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-20">
          <div className="bg-[#181818] border border-[#2A2A2A] rounded-[36px] p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            <p className="text-accent uppercase tracking-[4px] text-xs mb-4">
              Our story
            </p>

            <h2 className="text-3xl lg:text-4xl font-black text-text mb-6">
              A store created for better shopping
            </h2>

            <p className="text-gray-400 leading-relaxed mb-5">
              Selecta Store was born with the idea of bringing together products from different
              categories in one place, taking care of both the quality and the
              visual presentation of each item.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Our goal is to make every purchase quick, clear, and enjoyable,
              with a premium aesthetic and simple navigation from any device.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-accent text-primary font-bold px-8 py-3 rounded-2xl hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(200,169,106,0.35)] transition-all"
            >
              View products
            </Link>
          </div>

          <div className="relative rounded-[36px] overflow-hidden border border-[#2A2A2A] shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            <img
              src="/img/banners/erikawittlieb-living-room-2155376.jpg"
              alt="Selecta Store"
              className="w-full h-[480px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-accent uppercase tracking-[4px] text-xs mb-3">
                Premium Experience
              </p>

              <h3 className="text-text text-3xl font-black">
              Design, quality and trust
              </h3>
            </div>
          </div>
        </div>

    
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: FaStar,
              title: "Selected products",
              text: "We choose items designed for different styles and needs.",
            },
            {
              icon: FaShieldAlt,
              title: "Secure purchase",
              text: "We prioritize a reliable and clear experience for every customer.",
            },
            {
              icon: FaShippingFast,
              title: "Fast shipping",
              text: "We strive to ensure your orders arrive quickly and safely..",
            },
            {
              icon: FaHeadset,
              title: "Close attention",
              text: "We'll be with you before, during, and after your purchase.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 hover:border-accent hover:shadow-[0_0_30px_rgba(200,169,106,0.15)] transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center text-2xl mb-5">
                  <Icon />
                </div>

                <h3 className="text-text text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      
        <div className="bg-[#181818] border border-[#2A2A2A] rounded-[36px] p-8 lg:p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            Selecta Store
          </p>

          <h2 className="text-3xl lg:text-5xl font-black text-text">
          Find your next favorite product
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
          Explore our store and discover a selection designed for you.
          </p>

          <Link
            to="/products"
            className="inline-block mt-8 border border-accent text-accent px-10 py-4 rounded-2xl font-semibold hover:bg-accent hover:text-primary transition-all"
          >
           Go to Shop
          </Link>
        </div>
      </div>
    </section>
  );
}