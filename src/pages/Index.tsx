import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApologyCard from "@/components/ApologyCard";
import ActionButtons from "@/components/ActionButtons";
import HeartAnimation from "@/components/HeartAnimation";
import PaperTearAnimation from "@/components/PaperTearAnimation";
import ApologyModal from "@/components/ApologyModal";
import FeedbackButton from "@/components/FeedbackButton";
import EmptyState from "@/components/EmptyState";

// Sample apologies for demo
const sampleApologies = [
  "I am sorry for the words I never said when you needed to hear them most",
  "I apologize for leaving without saying goodbye I think about it every day",
  "Im sorry I wasnt there when you needed me I was scared but thats no excuse",
  "I regret not telling you how much you meant to me before it was too late",
  "Sorry for breaking the promise I made I know trust is hard to rebuild",
  "I apologize for the silence that grew between us It was never what I wanted",
  "Im sorry for taking you for granted I didnt realize until you were gone",
  "I apologize for the hurt I caused I was going through something but you didnt deserve that",
];

const Index = () => {
  const [apologies, setApologies] = useState<string[]>(sampleApologies);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [isTearAnimating, setIsTearAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentApology = apologies[currentIndex];
  const hasApologies = currentIndex < apologies.length;

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(false);
    }, 400);
  }, []);

  const handleAccept = useCallback(() => {
    if (isHeartAnimating || isTearAnimating || isTransitioning) return;
    setIsHeartAnimating(true);
  }, [isHeartAnimating, isTearAnimating, isTransitioning]);

  const handleSkip = useCallback(() => {
    if (isHeartAnimating || isTearAnimating || isTransitioning) return;
    setIsTearAnimating(true);
  }, [isHeartAnimating, isTearAnimating, isTransitioning]);

  const handleHeartComplete = useCallback(() => {
    setIsHeartAnimating(false);
    goToNext();
  }, [goToNext]);

  const handleTearComplete = useCallback(() => {
    setIsTearAnimating(false);
    goToNext();
  }, [goToNext]);

  const handleNewApology = useCallback((text: string) => {
    setApologies((prev) => [...prev, text]);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-secondary/30 pointer-events-none" />

      <Navbar onApologize={() => setIsModalOpen(true)} />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-24">
        <AnimatePresence mode="wait">
          {hasApologies && !isTearAnimating ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <ApologyCard 
                text={currentApology} 
                isVisible={!isHeartAnimating && !isTearAnimating} 
              />
              
              <ActionButtons
                onAccept={handleAccept}
                onSkip={handleSkip}
                disabled={isHeartAnimating || isTearAnimating || isTransitioning}
              />
            </motion.div>
          ) : !hasApologies && !isTearAnimating ? (
            <EmptyState onApologize={() => setIsModalOpen(true)} />
          ) : null}
        </AnimatePresence>
      </main>

      <Footer />
      <FeedbackButton />

      {/* Heart merge animation */}
      <HeartAnimation 
        isPlaying={isHeartAnimating} 
        onComplete={handleHeartComplete} 
      />

      {/* Paper tear animation */}
      <PaperTearAnimation
        isPlaying={isTearAnimating}
        text={currentApology || ""}
        onComplete={handleTearComplete}
      />

      {/* Apology submission modal */}
      <ApologyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewApology}
      />
    </div>
  );
};

export default Index;
