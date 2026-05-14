import { useState } from "react";

import ProductTable from "../components/dashboard/ProductTable";
import UserTable from "../components/dashboard/UserTable";

export default function Dashboard () {
  const [tab, setTab] = useState("products");

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] px-4 py-10">
      <div className="max-w-7xl mx-auto">
       
        <div className="mb-10">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            Admin Panel
          </p>

          <h1 className="text-4xl lg:text-5xl font-black text-text">
            Dashboard
          </h1>

         
        </div>

      
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setTab("products")}
            className={`
              px-6
              py-3
              rounded-2xl
              font-semibold
              transition-all
              duration-300
              border
              ${
                tab === "products"
                  ? "bg-accent text-primary border-accent shadow-[0_0_25px_rgba(200,169,106,0.25)]"
                  : "bg-[#181818] text-text border-[#2A2A2A] hover:border-accent hover:text-accent"
              }
            `}
          >
            Products
          </button>

          <button
            onClick={() => setTab("users")}
            className={`
              px-6
              py-3
              rounded-2xl
              font-semibold
              transition-all
              duration-300
              border
              ${
                tab === "users"
                  ? "bg-accent text-primary border-accent shadow-[0_0_25px_rgba(200,169,106,0.25)]"
                  : "bg-[#181818] text-text border-[#2A2A2A] hover:border-accent hover:text-accent"
              }
            `}
          >
            Users
          </button>
        </div>

      
        <div className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">
          {tab === "products" && <ProductTable />}
          {tab === "users" && <UserTable />}
        </div>
      </div>
    </section>
  );
};

