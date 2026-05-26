import { NavLink } from "react-router-dom";

import {
  FaUser,
  FaBox,
  FaHome,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
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
    <aside
      className={`
        hidden
        lg:flex
        flex-col
        bg-[#111111]
        border-r
        border-[#2A2A2A]
        min-h-screen
        p-4
        transition-all
        duration-300
        ${
          sidebarOpen
            ? "w-72"
            : "w-24"
        }
      `}
    >
      {/* TOP */}
      <div className="flex items-center justify-between mb-10">
        {sidebarOpen && (
          <div>
            <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
              Admin Panel
            </p>

            <h1 className="text-3xl font-black text-text">
              Selecta Store
            </h1>
          </div>
        )}

        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
          className="
            w-11
            h-11
            rounded-2xl
            border
            border-[#2A2A2A]
            bg-[#181818]
            flex
            items-center
            justify-center
            text-accent
            hover:bg-accent
            hover:text-primary
            transition-all
          "
        >
          {sidebarOpen ? (
            <FaChevronLeft />
          ) : (
            <FaChevronRight />
          )}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/dashboard"
          end
          className={linkClass}
        >
          <FaChartLine />

          {sidebarOpen && "Dashboard"}
        </NavLink>

        <NavLink
          to="/dashboard/products"
          className={linkClass}
        >
          <FaBox />

          {sidebarOpen && "Products"}
        </NavLink>

        <NavLink
          to="/dashboard/users"
          className={linkClass}
        >
          <FaUser />

          {sidebarOpen && "Users"}
        </NavLink>

        <NavLink
          to="/"
          className={linkClass}
        >
          <FaHome />

          {sidebarOpen && "Return to site"}
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="mt-auto">
        <div className="p-5 rounded-3xl border border-[#2A2A2A] bg-[#181818]">
          {sidebarOpen ? (
            <>
              <p className="text-accent text-xs uppercase tracking-[4px] mb-2">
                Selecta Store
              </p>

            </>
          ) : (
            <div className="flex justify-center text-accent text-xl">
              <FaBox />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}