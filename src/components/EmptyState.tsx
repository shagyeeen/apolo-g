import { motion } from "framer-motion";
import { Feather } from "lucide-react";

interface EmptyStateProps {
  onApologize: () => void;
}

const EmptyState = ({ onApologize }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center px-6"
    >
      <motion.div
        animate={{ 
          y: [0, -8, 0],
          rotate: [-2, 2, -2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
      >
        <Feather className="w-16 h-16 text-muted-foreground/50" />
      </motion.div>
      
      <h2 className="font-handwritten text-3xl md:text-4xl text-foreground mb-4">
        No apologies left to read
      </h2>
      
      <p className="font-serif text-lg text-muted-foreground max-w-md mb-8 italic">
        The world is waiting for words of healing. Perhaps you have something to say?
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onApologize}
        className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-serif text-base shadow-lg hover:shadow-xl transition-shadow"
      >
        Write an Apology
      </motion.button>
    </motion.div>
  );
};

export default EmptyState;
