import { PageLayout } from "@/components/layout/PageLayout";
import { IconArrowRight, IconClock, IconTags } from "@tabler/icons-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold">BefitAI Blog</h1>
          <p className="text-muted-foreground text-lg">
            Discover insights, tips, and the latest in AI-powered nutrition
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card hover:bg-card/80 group overflow-hidden rounded-xl border transition-colors duration-200"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="bg-muted relative aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <IconClock className="h-4 w-4" />
                      {post.readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <IconTags className="h-4 w-4" />
                      {post.category}
                    </span>
                  </div>
                  <h3 className="group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="text-primary flex items-center gap-2">
                    Read more
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

const blogPosts = [
  {
    title: "The Future of AI in Personalized Nutrition",
    slug: "future-of-ai-nutrition",
    date: "March 15, 2024",
    readTime: 5,
    category: "AI & Technology",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt:
      "Discover how artificial intelligence is revolutionizing personalized nutrition and meal planning, making healthy eating more accessible than ever before.",
  },
  {
    title: "5 Essential Tips for Sustainable Meal Prep",
    slug: "sustainable-meal-prep",
    date: "March 10, 2024",
    readTime: 4,
    category: "Meal Planning",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt:
      "Learn how to make your meal prep more sustainable with these practical tips that will help you reduce waste and save time in the kitchen.",
  },
  {
    title: "Understanding Macro and Micronutrients",
    slug: "macro-micronutrients",
    date: "March 5, 2024",
    readTime: 6,
    category: "Nutrition",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt:
      "A comprehensive guide to understanding the importance of various nutrients in your diet and how they contribute to your overall health.",
  },
  {
    title: "Sustainable Eating with AI",
    slug: "sustainable-eating-ai",
    date: "March 1, 2024",
    readTime: 5,
    category: "Sustainability",
    image:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    excerpt:
      "How AI can help you make more environmentally conscious food choices while maintaining a balanced and nutritious diet.",
  },
  {
    title: "The Science Behind AI Meal Planning",
    slug: "science-ai-meal-planning",
    date: "February 25, 2024",
    readTime: 7,
    category: "AI & Technology",
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt:
      "Explore the technology and algorithms that power our AI meal planning system and how it personalizes recommendations for each user.",
  },
  {
    title: "Meal Planning for Different Dietary Needs",
    slug: "dietary-needs-meal-planning",
    date: "February 20, 2024",
    readTime: 5,
    category: "Meal Planning",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt:
      "Learn how to adapt meal planning strategies for various dietary requirements, from vegan to keto and everything in between.",
  },
];

export default Blog;
