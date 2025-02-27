const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B6746]/20 to-[#4B6746]/40 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 dark:text-neutral-200">Terms of Service</h1>
        
        {terms.map((term) => (
          <section key={term.title} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-neutral-300">{term.title}</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-400">{term.content}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

const terms = [
  {
    title: "Acceptance of Terms",
    content: "By accessing and using BefitAI, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
  },
  {
    title: "User Accounts",
    content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    title: "Service Usage",
    content: "Our service provides AI-powered meal planning recommendations. While we strive for accuracy, we cannot guarantee that all recommendations will be perfect for your specific needs.",
  },
  {
    title: "Intellectual Property",
    content: "All content and functionality on BefitAI, including but not limited to text, graphics, logos, and software, is the property of BefitAI or its licensors.",
  },
];

export default Terms; 