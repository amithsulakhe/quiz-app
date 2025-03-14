import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// fade in from bottom to top
export const FadeIn = ({ children ,delay=2,className}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};


// fade from top to bottom
export const FadeUp = ({ children, delay = 0.2, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      className={cn(className)}

    >
      {children}
    </motion.div>
  );
};

// animate from left to right 
export const SlideLeft = ({ children,delay=2,x=-100,duration=0.5,className}) => {
  return (
    <motion.div
    initial={{ opacity: 0, x }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay: delay* 0.1 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

// animate from right to left 
export const SlideRight = ({ children,delay=2,x=100,duration=0.5,className}) => {
  return (
    <motion.div
    initial={{ opacity: 0, x }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay: delay* 0.1 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
