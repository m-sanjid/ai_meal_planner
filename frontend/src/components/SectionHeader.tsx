import React from "react";
import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
}) => {

  return (
    <div className="mx-auto my-10 max-w-5xl text-center">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="z-10 text-4xl font-semibold tracking-tight text-black md:text-5xl dark:text-white"
      >
        {title.split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            className="mr-2 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground z-10 mx-auto mt-4 max-w-2xl text-lg md:text-xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
