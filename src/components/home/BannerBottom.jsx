import { MdLocalShipping } from "react-icons/md";
import { CgRedo } from "react-icons/cg";
import { FaShieldAlt } from "react-icons/fa";

export default function BannerBottom() {
  return (
    <div
      className="
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-[32px]
        p-6
        shadow-[0_10px_40px_rgba(0,0,0,0.45)]
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* WARRANTY */}
        <div
          className="
            group
            bg-[#181818]
            border
            border-[#2A2A2A]
            rounded-3xl
            p-6
            hover:border-accent
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-accent/10
                flex
                items-center
                justify-center
                text-accent
                text-2xl
                group-hover:bg-accent
                group-hover:text-primary
                transition
              "
            >
              <FaShieldAlt />
            </div>

            <div>
              <h3 className="text-text text-lg font-bold">
              Premium Guarantee
              </h3>

              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              Original products with guaranteed warranty.
              </p>
            </div>
          </div>
        </div>

        {/* SHIPPING */}
        <div
          className="
            group
            bg-[#181818]
            border
            border-[#2A2A2A]
            rounded-3xl
            p-6
            hover:border-accent
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-accent/10
                flex
                items-center
                justify-center
                text-accent
                text-2xl
                group-hover:bg-accent
                group-hover:text-primary
                transition
              "
            >
              <MdLocalShipping />
            </div>

            <div>
              <h3 className="text-text text-lg font-bold">
              Free Shipping
              </h3>

              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              On selected purchases nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* RETURNS */}
        <div
          className="
            group
            bg-[#181818]
            border
            border-[#2A2A2A]
            rounded-3xl
            p-6
            hover:border-accent
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-accent/10
                flex
                items-center
                justify-center
                text-accent
                text-2xl
                group-hover:bg-accent
                group-hover:text-primary
                transition
              "
            >
              <CgRedo />
            </div>

            <div>
              <h3 className="text-text text-lg font-bold">
              Changes
              </h3>

              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              Simple and quick changes within 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}