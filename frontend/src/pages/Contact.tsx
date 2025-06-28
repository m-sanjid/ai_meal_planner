import { motion } from "motion/react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <SectionHeader title="Contact" description="Get in touch with us" />
        <ContactForm />
      </motion.div>
    </PageLayout>
  );
};

export default Contact;
