import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "motion/react";
import { Mail, MessageSquare, Phone, Clock, CheckCircle2 } from "lucide-react";

const Support = () => {
  return (
    <PageLayout>
      <motion.div
        className="max-w-6xl mx-auto py-8 lg:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SupportData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-card backdrop-blur-lg h-full">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-accent-foreground border flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.icon}
                  </motion.div>
                  <CardTitle className="text-foreground">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.p className="text-muted-foreground mb-4">
                    {item.text}
                  </motion.p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" className="w-full">
                      {item.button}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          {SupportData2.map((item, index) => (
            <Card key={index} className="bg-card backdrop-blur-lg">
              <CardHeader>
                <motion.div
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <CardTitle className="text-foreground">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.ul className="space-y-2 text-muted-foreground">
                  {item.items.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-2"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Support;

const SupportData = [
  {
    title: "Email Support",
    icon: <Mail className="w-6 h-6 text-accent" />,
    description: "Get help via email",
    text: "support@mealplanner.com",
    button: "Send Email",
  },
  {
    title: "Live Chat",
    icon: <MessageSquare className="w-6 h-6 text-accent" />,
    description: "Chat with our support team",
    text: "24/7",
    button: "Start Chat",
  },
  {
    title: "Phone Support",
    icon: <Phone className="w-6 h-6 text-accent" />,
    description: "Call our support team",
    text: "+1 (555) 123-4567",
    button: "Call Now",
  },
];

const SupportData2 = [
  {
    title: "Response Time",
    description: "Typical response times",
    icon: <Clock className="w-6 h-6 text-accent" />,
    items: ["Email: Within 24 hours", "Live Chat: Instant", "Phone: Immediate"],
  },
  {
    title: "Common Solutions",
    description: "Quick answers to common questions",
    icon: <CheckCircle2 className="w-6 h-6 text-accent" />,
    items: [
      "Account access issues",
      "Billing and subscription",
      "Technical support",
    ],
  },
];
