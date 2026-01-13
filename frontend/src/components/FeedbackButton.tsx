import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    
    toast.success("Thank you for your feedback", {
      description: "Your words help us create a more healing space.",
    });
    setFeedback("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Feedback trigger button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl transition-shadow"
        title="Share feedback"
      >
        <MessageCircleHeart className="w-5 h-5" />
      </motion.button>

      {/* Feedback modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm paper-card p-6 mb-20 sm:mb-0"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-handwritten text-2xl text-ink">
                  Share your thoughts
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="How does this experience make you feel?"
                className="w-full h-32 p-3 bg-transparent font-serif text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-0 border border-border rounded-md"
                maxLength={500}
              />

              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleSubmit}
                  variant="ghost"
                  size="sm"
                  disabled={!feedback.trim()}
                  className="font-serif gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackButton;
