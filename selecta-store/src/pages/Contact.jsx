

export default function Contact () {
  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] px-4 py-16">
      <div className="max-w-3xl mx-auto bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
        <div className="text-center mb-10">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            Contact
          </p>

          <h2 className="text-4xl font-black text-text">
          Contact us
          </h2>

          <p className="text-gray-400 mt-4">
          Write to us and we will respond as soon as possible.
          </p>
        </div>

        <form
          action="https://formspree.io/f/movljpdw"
          method="POST"
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
          />

          <textarea
            name="message"
            placeholder="Your message"
            required
            className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 h-36 resize-none focus:outline-none focus:border-accent transition"
          />

          <input type="text" name="_gotcha" style={{ display: "none" }} />

          <button
            type="submit"
            className="w-full bg-accent text-primary font-bold py-3 rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,169,106,0.35)] transition-all"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

