import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import ProductTable from "../components/dashboard/ProductTable";
import UserTable from "../components/dashboard/UserTable";
import CategoryTable from "../components/dashboard/CategoryTable";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ReviewsTable from "../components/dashboard/ReviewsTable";
import {getAllReviews} from "../services/reviewService";

import { FaBox, FaUsers, FaArrowLeft,FaComments } from "react-icons/fa";

import { useProducts } from "../hooks/useProducts";
import { useCategory } from "../hooks/useCategory";
import { useUser } from "../hooks/useUser";



export default function Dashboard() {
  const [tab, setTab] = useState("products", "users", "category", "reviews");
  const { products = [] } = useProducts();
  const {categories = []} = useCategory();
  const { users = [] } = useUser();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [reviews, setReviews] = useState([]);

useEffect(() => {
  getAllReviews().then(setReviews);
}, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] flex">
    <DashboardSidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  tab={tab}
  setTab={setTab}
/>
      <div className="flex-1 flex flex-col min-w-0">
      <DashboardHeader
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
            <div>
              <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
                Admin Panel
              </p>

              <h1 className="text-4xl lg:text-5xl font-black text-text">
                Dashboard
              </h1>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-[#2A2A2A] bg-[#181818] text-text hover:border-accent hover:text-accent transition-all duration-300 w-fit"
            >
              <FaArrowLeft />
              Return to Store
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between">
                <div>
                <button onClick={() => setTab("products")} className="text-left">
                <p className="text-gray-400 uppercase text-xs tracking-[4px]">
                    Products
                  </p>

                  <h3 className="text-4xl font-black text-text mt-3">
                    {products.length}
                  </h3>
                </button>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center text-2xl">
                  <FaBox />
                </div>
              </div>
            </div>
            <div className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between">
                <div>
                <button onClick={() => setTab("category")} className="text-left">
                <p className="text-gray-400 uppercase text-xs tracking-[4px]">
                    Categories
                  </p>

                  <h3 className="text-4xl font-black text-text mt-3">
                    {categories.length}
                  </h3>

                </button>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center text-2xl">
                  <FaBox />
                </div>
              </div>
            </div>
             <div className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between">
                <div>
                <button onClick={() => setTab("reviews")} className="text-left">
                <p className="text-gray-400 uppercase text-xs tracking-[4px]">
                    Reviews
                  </p>

                  <h3 className="text-4xl font-black text-text mt-3">
                    {reviews.length}
                  </h3>

                </button>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center text-2xl">
                  <FaComments />
                </div>
              </div>
            </div>

            <div className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between">
                <div>
                 <button onClick={() => setTab("users")} className="text-left">
                 <p className="text-gray-400 uppercase text-xs tracking-[4px]">
                    Users
                  </p>

                  <h3 className="text-4xl font-black text-text mt-3">
                    {users.length}
                  </h3>
                 </button>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center text-2xl">
                  <FaUsers />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setTab("products")}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
                tab === "products"
                  ? "bg-accent text-primary border-accent shadow-[0_0_25px_rgba(200,169,106,0.25)]"
                  : "bg-[#181818] text-text border-[#2A2A2A] hover:border-accent hover:text-accent"
              }`}
            >
              Products
            </button>

            <button
              onClick={() => setTab("users")}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
                tab === "users"
                  ? "bg-accent text-primary border-accent shadow-[0_0_25px_rgba(200,169,106,0.25)]"
                  : "bg-[#181818] text-text border-[#2A2A2A] hover:border-accent hover:text-accent"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setTab("category")}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
                tab === "category"
                  ? "bg-accent text-primary border-accent shadow-[0_0_25px_rgba(200,169,106,0.25)]"
                  : "bg-[#181818] text-text border-[#2A2A2A] hover:border-accent hover:text-accent"
              }`}
            >
              Categories
            </button>
            <button
  onClick={() => setTab("reviews")}
  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
    tab === "reviews"
      ? "bg-accent text-primary border-accent shadow-[0_0_25px_rgba(200,169,106,0.25)]"
      : "bg-[#181818] text-text border-[#2A2A2A] hover:border-accent hover:text-accent"
  }`}
>
  Reviews
</button>
          </div>

          <div className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-4 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">
            {tab === "products" && <ProductTable />}
            {tab === "category" && <CategoryTable />}
            {tab === "users" && <UserTable />}
            {tab === "reviews" && <ReviewsTable />}

          </div>
        </main>
      </div>
    </section>
  );
}