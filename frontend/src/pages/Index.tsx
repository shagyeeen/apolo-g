import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { collection, getDocs, orderBy, query, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, increment } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApologyCard from "@/components/ApologyCard";
import ActionButtons from "@/components/ActionButtons";
import HeartAnimation from "@/components/HeartAnimation";
import PaperTearAnimation from "@/components/PaperTearAnimation";
import ApologyModal from "@/components/ApologyModal";
import FeedbackButton from "@/components/FeedbackButton";
import EmptyState from "@/components/EmptyState";

import { db } from "@/lib/firebase";

type Apology = {
  id: string;
  text: string;
  createdAt?: any;
  status?: string;
};

const Index = () => {
  const [apologies, setApologies] = useState<Apology[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [isTearAnimating, setIsTearAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const currentApology = apologies[currentIndex];
  const hasApologies = currentIndex < apologies.length;

  /* 🔄 FETCH APOLOGIES FROM FIRESTORE */
  useEffect(() => {
    const fetchApologies = async () => {
      const q = query(
        collection(db, "apologies"),
        orderBy("createdAt", "asc")
      );

      const snapshot = await getDocs(q);

      const data: Apology[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Apology, "id">),
      }));

      setApologies(data);
      setCurrentIndex(0);
    };

    fetchApologies();
  }, []);

  /* 👤 DETECT ADMIN USER */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user?.email === "shagyeeen@gmail.com");
    });
    return () => unsub();
  }, []);

  /* ➡️ GO TO NEXT APOLOGY */
  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(false);
    }, 400);
  }, []);

  /* ❤️ ACCEPT */
  const handleAccept = useCallback(async () => {
    if (isHeartAnimating || isTearAnimating || isTransitioning || !currentApology) return;
    
    await updateDoc(doc(db, "apologies", currentApology.id), {
      acceptCount: increment(1),
    });
    
    setIsHeartAnimating(true);
  }, [isHeartAnimating, isTearAnimating, isTransitioning, currentApology]);

  /* 📄 SKIP */
  const handleSkip = useCallback(async () => {
    if (isHeartAnimating || isTearAnimating || isTransitioning || !currentApology) return;
    
    await updateDoc(doc(db, "apologies", currentApology.id), {
      skipCount: increment(1),
    });
    
    setIsTearAnimating(true);
  }, [isHeartAnimating, isTearAnimating, isTransitioning, currentApology]);

  const handleHeartComplete = useCallback(() => {
    setIsHeartAnimating(false);
    goToNext();
  }, [goToNext]);

  const handleTearComplete = useCallback(() => {
    setIsTearAnimating(false);
    goToNext();
  }, [goToNext]);

  /* ✍️ SUBMIT NEW APOLOGY → FIRESTORE */
  const handleNewApology = useCallback(async (
    text: string,
    meta?: { isAdminTrigger?: boolean }
  ) => {
    // 🚫 Admin trigger → DO NOTHING
    if (meta?.isAdminTrigger) {
      return;
    }

    await addDoc(collection(db, "apologies"), {
      text,
      status: "unread",
      createdAt: serverTimestamp(),
    });

    // Optimistic UI update
    setApologies((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text },
    ]);
  }, []);

  /* 🗑️ DELETE APOLOGY (ADMIN ONLY) */
  const deleteApology = async (id: string) => {
    await deleteDoc(doc(db, "apologies", id));
    setApologies(prev => prev.filter(a => a.id !== id));
  };

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
                text={currentApology?.text || ""}
                isVisible={!isHeartAnimating && !isTearAnimating}
              />

              {isAdmin && currentApology && (
                <button
                  onClick={() => deleteApology(currentApology.id)}
                  className="mt-4 text-xs text-red-600 hover:underline"
                >
                  Delete (Admin)
                </button>
              )}

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
        text={currentApology?.text || ""}
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
