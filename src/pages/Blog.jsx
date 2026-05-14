import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "Premium Ecommerce Trends for 2026",
    category: "Ecommerce",
    date: "May 2026",
    image: "/img/banners/tienpts-woman-8164186.jpg",
    excerpt:
      "Discover how to improve your online store’s visual experience with modern design, premium colors, and smooth animations.",
  },
  {
    id: 2,
    title: "How to Choose Featured Products for Your Home Page",
    category: "Marketing",
    date: "May 2026",
    image: "/img/banners/joshuaworoniecki-laptop-5673901.jpg",
    excerpt:
      "Not every product should appear on the homepage. Learn how to select the most attractive ones to increase conversions.",
  },
  {
    id: 3,
    title: "The Importance of the Cart in an Online Store",
    category: "UX Design",
    date: "May 2026",
    image: "/img/banners/erikawittlieb-living-room-2155376.jpg",
    excerpt:
      "A well-designed cart improves customer trust and helps increase sales conversions.",
  },
  ];
export default function Blog() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            Blog
          </p>

          <h1 className="text-4xl lg:text-5xl font-black text-text">
          News and Trends
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Tips, news and resources to improve your online shopping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-[#181818] border border-[#2A2A2A] rounded-[30px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.45)] hover:border-accent hover:shadow-[0_0_30px_rgba(200,169,106,0.15)] transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <span className="absolute top-4 left-4 bg-accent text-primary font-bold text-[10px] tracking-widest px-4 py-2 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <p className="text-gray-500 text-sm mb-3">{post.date}</p>

                <h2 className="text-text text-xl font-bold group-hover:text-accent transition line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-400 text-sm mt-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  to="#"
                  className="inline-block mt-6 text-accent font-semibold hover:underline"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}