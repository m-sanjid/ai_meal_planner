import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#4B6746]/10 dark:backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((i) => (
                <li key={i.name}>
                  <a href={i.href}>{i.name}</a>
                </li>
              ))}
            </ul>
          </div>{" "}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((i) => (
                <li key={i.name}>
                  <a href={i.href}>{i.name}</a>
                </li>
              ))}
            </ul>
          </div>{" "}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              About
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((i) => (
                <li key={i.name}>
                  <a href={i.href}>{i.name}</a>
                </li>
              ))}
            </ul>
          </div>{" "}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Resource
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((i) => (
                <li key={i.name}>
                  <a href={i.href}>{i.name}</a>
                </li>
              ))}
            </ul>
          </div>{" "}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and Copyright */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl font-bold mb-2">BefitAI</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} BefitAI. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span className="sr-only">{link.name}</span>
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Preview", href: "/preview" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "Support", href: "/support" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];
