import { motion, AnimatePresence } from "framer-motion";

interface PaperTearAnimationProps {
  isPlaying: boolean;
  text: string;
  onComplete: () => void;
}

const PaperTearAnimation = ({ isPlaying, text, onComplete }: PaperTearAnimationProps) => {
  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onAnimationComplete={() => {
            setTimeout(onComplete, 800);
          }}
        >
          <div className="relative flex">
            {/* Left torn piece */}
            <motion.div
              initial={{ x: 0, rotate: 0, opacity: 1 }}
              animate={{ 
                x: -150, 
                rotate: -25, 
                opacity: 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="paper-card w-[160px] sm:w-[190px] md:w-[210px] min-h-[280px] p-8 origin-right overflow-hidden"
              style={{
                clipPath: "polygon(0 0, 100% 0, 85% 15%, 100% 30%, 90% 45%, 100% 60%, 85% 75%, 100% 90%, 95% 100%, 0 100%)"
              }}
            >
              <div className="font-handwritten text-2xl md:text-3xl text-ink leading-relaxed ink-text">
                {text.slice(0, Math.ceil(text.length / 2))}
              </div>
            </motion.div>

            {/* Right torn piece */}
            <motion.div
              initial={{ x: 0, rotate: 0, opacity: 1 }}
              animate={{ 
                x: 150, 
                rotate: 25, 
                opacity: 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="paper-card w-[160px] sm:w-[190px] md:w-[210px] min-h-[280px] p-8 origin-left overflow-hidden -ml-2"
              style={{
                clipPath: "polygon(15% 0, 100% 0, 100% 100%, 5% 100%, 0% 90%, 15% 75%, 0% 60%, 10% 45%, 0% 30%, 15% 15%)"
              }}
            >
              <div className="font-handwritten text-2xl md:text-3xl text-ink leading-relaxed ink-text text-right">
                {text.slice(Math.ceil(text.length / 2))}
              </div>
            </motion.div>
          </div>

          {/* Paper fragments */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 1, 
                x: 0, 
                y: 0,
                rotate: 0,
                scale: 1
              }}
              animate={{ 
                opacity: 0,
                x: (Math.random() - 0.5) * 200,
                y: 100 + Math.random() * 100,
                rotate: (Math.random() - 0.5) * 90,
                scale: 0.5
              }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: "easeOut" }}
              className="absolute w-4 h-6 bg-paper rounded-sm"
              style={{
                left: `calc(50% + ${(Math.random() - 0.5) * 40}px)`,
                top: `calc(50% + ${(Math.random() - 0.5) * 100}px)`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaperTearAnimation;
