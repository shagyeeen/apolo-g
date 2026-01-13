import { motion } from "framer-motion";
import { Heart, SkipForward } from "lucide-react";

interface ActionButtonsProps {
  onAccept: () => void;
  onSkip: () => void;
  disabled?: boolean;
}

const ActionButtons = ({ onAccept, onSkip, disabled }: ActionButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex items-center gap-6 mt-10"
    >
      {/* Accept Button */}
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={onAccept}
        disabled={disabled}
        className="group relative flex items-center gap-3 px-8 py-4 bg-secondary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-heart-glow/0 group-hover:bg-heart-glow/20 transition-colors duration-300" />
        
        <Heart className="w-5 h-5 text-heart-whole group-hover:fill-heart-whole transition-all duration-300" />
        <span className="font-serif text-base text-secondary-foreground">
          Accept Apology
        </span>
      </motion.button>

      {/* Skip Button */}
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={onSkip}
        disabled={disabled}
        className="group flex items-center gap-3 px-8 py-4 bg-muted rounded-full shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SkipForward className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
        <span className="font-serif text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          Skip
        </span>
      </motion.button>
    </motion.div>
  );
};

export default ActionButtons;
