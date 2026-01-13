import { motion } from "framer-motion";

interface ApologyCardProps {
  text: string;
  isVisible: boolean;
}

const ApologyCard = ({ text, isVisible }: ApologyCardProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotate: 0,
      }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {/* Paper shadow layer */}
      <div className="absolute inset-0 bg-foreground/5 rounded-sm transform translate-x-2 translate-y-2 blur-sm" />
      
      {/* Main paper */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [-0.5, 0.5, -0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="paper-card relative w-[320px] sm:w-[380px] md:w-[420px] min-h-[280px] p-8 md:p-10"
      >
        {/* Paper fold effect - top right corner */}
        <div className="absolute top-0 right-0 w-12 h-12">
          <div 
            className="absolute top-0 right-0 w-0 h-0"
            style={{
              borderStyle: 'solid',
              borderWidth: '0 48px 48px 0',
              borderColor: 'transparent hsl(var(--background)) transparent transparent',
            }}
          />
          <div 
            className="absolute top-0 right-0 w-0 h-0"
            style={{
              borderStyle: 'solid',
              borderWidth: '0 46px 46px 0',
              borderColor: 'transparent hsl(var(--paper-edge) / 0.3) transparent transparent',
            }}
          />
        </div>

        {/* Paper lines (subtle) */}
        <div className="absolute inset-x-8 top-16 bottom-8 flex flex-col gap-8 pointer-events-none opacity-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-px bg-primary/30" />
          ))}
        </div>

        {/* Apology text */}
        <div className="relative z-10 flex items-center justify-center min-h-[200px]">
          <p className="font-handwritten text-2xl md:text-3xl text-ink leading-relaxed text-center ink-text">
            {text}
          </p>
        </div>

        {/* Paper grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-sm overflow-hidden">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApologyCard;
