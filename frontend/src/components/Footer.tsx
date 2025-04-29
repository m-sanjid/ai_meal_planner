import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#191919]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-6 text-lg">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((i) => (
                <li key={i.name}>
                  <a 
                    href={i.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                  >
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-6 text-lg">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((i) => (
                <li key={i.name}>
                  <a 
                    href={i.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                  >
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-6 text-lg">
              About
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((i) => (
                <li key={i.name}>
                  <a 
                    href={i.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                  >
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-6 text-lg">
              Resource
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((i) => (
                <li key={i.name}>
                  <a 
                    href={i.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                  >
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Logo and Copyright */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                BefitAI
              </div>
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
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
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
  { name: "GitHub", icon: IconBrandGithub, href: "https://github.com" },
  { name: "Twitter", icon: IconBrandX, href: "https://twitter.com" },
  { name: "LinkedIn", icon: IconBrandLinkedin, href: "https://linkedin.com" },
];
