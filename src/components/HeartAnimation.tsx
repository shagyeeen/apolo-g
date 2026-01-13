import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartAnimationProps {
  isPlaying: boolean;
  onComplete: () => void;
}

const HeartAnimation = ({ isPlaying, onComplete }: HeartAnimationProps) => {
  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm"
          onAnimationComplete={() => {
            setTimeout(onComplete, 1200);
          }}
        >
          {/* Glow backdrop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0.3], scale: [0.5, 1.3, 1] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-64 h-64 rounded-full bg-heart-glow/30 blur-3xl"
          />

          {/* Heart pop up */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: [0, 1.2, 1],
            }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut",
              times: [0, 0.6, 1]
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ 
                duration: 0.4, 
                delay: 0.5, 
                ease: "easeInOut",
                repeat: 1
              }}
            >
              <Heart 
                className="w-24 h-24 text-heart-whole fill-heart-whole"
                style={{ filter: "drop-shadow(0 0 30px hsl(350 60% 60% / 0.6))" }}
              />
            </motion.div>
          </motion.div>

          {/* Particle effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                x: 0, 
                y: 0,
                scale: 0 
              }}
              animate={{ 
                opacity: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 80,
                y: Math.sin((i * Math.PI * 2) / 8) * 80,
                scale: [0, 1, 0.5]
              }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="absolute w-2 h-2 rounded-full bg-heart-glow"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeartAnimation;
