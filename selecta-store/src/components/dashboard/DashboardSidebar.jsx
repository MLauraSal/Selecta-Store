import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaBox,
  FaHome,
  FaChartLine,
} from "react-icons/fa";

export default function DashboardSidebar () {
  const linkClass = ({ isActive }) =>
    `
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-2xl
      transition-all
      duration-300
      border
      ${
        isActive
          ? "bg-accent text-primary border-accent shadow-[0_0_20px_rgba(200,169,106,0.25)]"
          : "text-gray-300 border-transparent hover:border-[#2A2A2A] hover:bg-[#181818] hover:text-accent"
      }
    `;

  return (
    <aside className="w-72 bg-[#111111] border-r border-[#2A2A2A] min-h-screen p-6 hidden lg:block">
      {/* LOGO */}
      <div className="mb-10">
        <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
          Admin Panel
        </p>

        <h1 className="text-3xl font-black text-text">
          Selecta Store
        </h1>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard" end className={linkClass}>
          <FaChartLine />
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/products" className={linkClass}>
          <FaBox />
          Productos
        </NavLink>

        <NavLink to="/dashboard/users" className={linkClass}>
          <FaUser />
          Usuarios
        </NavLink>

        <NavLink to="/" className={linkClass}>
          <FaHome />
          Volver al sitio
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="mt-16 p-5 rounded-3xl border border-[#2A2A2A] bg-[#181818]">
        <p className="text-accent text-xs uppercase tracking-[4px] mb-2">
          Ecommerce
        </p>

        <h3 className="text-text font-bold text-lg">
          Premium Dashboard
        </h3>

        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          Administrá productos, usuarios y contenido desde un panel moderno y elegante.
        </p>
      </div>
    </aside>
  );
};

