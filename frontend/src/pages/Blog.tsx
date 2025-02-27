const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B6746]/20 to-[#4B6746]/40 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 dark:text-neutral-200">
          Blog
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article key={post.title} className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post.date}</div>
              <h2 className="text-xl font-semibold mb-3 dark:text-neutral-200">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
              <a href="#" className="text-[#4B6746] hover:underline">Read more →</a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const blogPosts = [
  {
    title: "The Benefits of AI-Powered Meal Planning",
    date: "March 15, 2024",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we plan and prepare our meals...",
  },
  {
    title: "5 Tips for Healthy Meal Prep",
    date: "March 10, 2024",
    excerpt: "Learn the essential strategies for efficient and healthy meal preparation...",
  },
  {
    title: "Understanding Macro and Micronutrients",
    date: "March 5, 2024",
    excerpt: "A comprehensive guide to understanding the importance of various nutrients in your diet...",
  },
  {
    title: "Sustainable Eating with AI",
    date: "March 1, 2024",
    excerpt: "How AI can help you make more environmentally conscious food choices...",
  },
];

export default Blog; 