import { Link } from "react-router-dom";

import {
  FaUser,
  FaBox,
  FaHome,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
  FaTags,
  FaComments,
} from "react-icons/fa";

export default function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
  tab,
  setTab,
}) {
  const buttonClass = (active) =>
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
      w-full
      ${
        active
          ? "bg-accent text-primary border-accent shadow-[0_0_20px_rgba(200,169,106,0.25)]"
          : "text-gray-300 border-transparent hover:border-[#2A2A2A] hover:bg-[#181818] hover:text-accent"
      }
    `;

  return (
    <aside
      className={`
        hidden lg:flex flex-col bg-[#111111] border-r border-[#2A2A2A]
        min-h-screen p-4 transition-all duration-300
        ${sidebarOpen ? "w-72" : "w-24"}
      `}
    >
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
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-11 h-11 rounded-2xl border border-[#2A2A2A] bg-[#181818] flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all"
        >
          {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setTab("products")}
          className={buttonClass(tab === "products")}
        >
          <FaChartLine />
          {sidebarOpen && "Dashboard"}
        </button>

        <button
          type="button"
          onClick={() => setTab("products")}
          className={buttonClass(tab === "products")}
        >
          <FaBox />
          {sidebarOpen && "Products"}
        </button>

        <button
          type="button"
          onClick={() => setTab("category")}
          className={buttonClass(tab === "category")}
        >
          <FaTags />
          {sidebarOpen && "Categories"}
        </button>

        <button
          type="button"
          onClick={() => setTab("users")}
          className={buttonClass(tab === "users")}
        >
          <FaUser />
          {sidebarOpen && "Users"}
        </button>

        <button
  type="button"
  onClick={() => setTab("reviews")}
  className={buttonClass(tab === "reviews")}
>
  <FaComments />
  {sidebarOpen && "Reviews"}
</button>

        <Link to="/" className={buttonClass(false)}>
          <FaHome />
          {sidebarOpen && "Return to site"}
        </Link>
      </nav>
    </aside>
  );
}