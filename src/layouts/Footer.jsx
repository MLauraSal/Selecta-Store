
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const team = [
  {
    name: "Mariana Salgueiro",
    role: "Foundress & Frontend Developer",
    image: "/img/team/338472_2758228403239_1279515901_o.jpg",
  },
  {
    name: "Valentina Gómez",
    role: "UX/UI Designer",
    image: "/img/team/pexels-gabby-k-5876695.jpg",
  },
  {
    name: "Lucas Pérez",
    role: "Customer service",
    image: "/img/team/pexels-gabby-k-5384445.jpg",
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-text border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* EMPRESA */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          <div>
            <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
              Selecta Store
            </p>

            <h2 className="text-3xl font-black text-text mb-4">
            About our company
            </h2>

            <p className="text-gray-400 leading-relaxed">
            Selecta Store is an online store dedicated to offering selected products in technology, fashion, home goods, and lifestyle. Our goal is to provide a modern, simple, secure shopping experience with a premium aesthetic.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {team.map((person, index) => (
              <div
                key={index}
                className="bg-[#181818] border border-[#2A2A2A] rounded-3xl p-4 text-center hover:border-accent transition"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-accent mb-2"
                />

                <h3 className="text-text font-bold text-sm">
                  {person.name}
                </h3>

                <p className="text-gray-400 text-xs mt-1">
                  {person.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-[#2A2A2A] pt-12">
          <div>
            <Link to="/">
              <img
                src="/img/logo.png"
                alt="logo"
                className="w-[170px] h-auto mb-5"
              />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
            Premium e-commerce with selected products and a fast, clear, and secure shopping experience.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {[FaFacebookF, FaInstagram, FaTiktok, FaYoutube].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-white hover:bg-accent hover:text-primary hover:border-accent transition"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-accent uppercase tracking-[4px] text-xs font-bold mb-5">
              Shop
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/products" className="hover:text-accent transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-accent transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-accent transition">
                  Checkout
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-accent uppercase tracking-[4px] text-xs font-bold mb-5">
            Company
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/about" className="hover:text-accent transition">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition">
                Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                Return policies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-accent uppercase tracking-[4px] text-xs font-bold mb-5">
            Contact
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-accent" />
                <a href="tel:+54119368058" className="hover:text-accent transition">
                  (+54) 11-936-8058
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaEnvelope className="text-accent" />
                <a
                  href="mailto:contacto@selectastore.com"
                  className="hover:text-accent transition"
                >
                  contacto@selectastore.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent mt-1" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-[#2A2A2A] mt-12 pt-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © 2026 Selecta Store — All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-accent transition">
            Privacy
            </a>
            <a href="#" className="hover:text-accent transition">
            Terms
            </a>
            <a href="#" className="hover:text-accent transition">
            Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;