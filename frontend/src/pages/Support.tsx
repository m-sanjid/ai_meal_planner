import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B6746]/20 to-[#4B6746]/40 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 dark:text-neutral-200">
            How Can We Help?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get the support you need through our various support channels
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel) => (
            <div key={channel.title} className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <channel.icon className="w-12 h-12 mx-auto mb-4 text-[#4B6746]" />
              <h3 className="text-xl font-semibold mb-3 dark:text-neutral-200">{channel.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{channel.description}</p>
              <Button variant="outline">{channel.buttonText}</Button>
            </div>
          ))}
        </div>

        <div className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 dark:text-neutral-200">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold mb-2 dark:text-neutral-300">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team through live chat.",
    buttonText: "Start Chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us an email and we'll get back to you within 24 hours.",
    buttonText: "Send Email",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Call us directly for immediate assistance with your issues.",
    buttonText: "Call Now",
  },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page...",
  },
  {
    question: "Can I customize my meal plans?",
    answer: "Yes, you can customize your meal plans by adjusting your preferences and dietary restrictions...",
  },
  {
    question: "How do I share my shopping list?",
    answer: "You can share your shopping list by clicking the share button and choosing your preferred method...",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay for premium subscriptions...",
  },
];

export default Support; 