import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const ApologyModal = ({ isOpen, onClose, onSubmit }: ApologyModalProps) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const MAX_CHARS = 200;

  const validateInput = (value: string): boolean => {
    // Only allow letters (A-Z, a-z), numbers (0-9), and spaces
    const validPattern = /^[A-Za-z0-9\s]*$/;
    return validPattern.test(value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (value.length > MAX_CHARS) {
      return;
    }

    if (!validateInput(value)) {
      setError("Only letters and numbers are allowed");
      return;
    }

    setError("");
    setText(value);
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      setError("Please write your apology");
      return;
    }

    if (!validateInput(text)) {
      setError("Only letters and numbers are allowed");
      return;
    }

    onSubmit(text.trim());
    setText("");
    setError("");
    onClose();
    toast.success("Your apology has been sent into the world", {
      description: "Someone will read it with an open heart.",
    });
  };

  const handleClose = () => {
    setText("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            {/* Paper shadow */}
            <div className="absolute inset-0 bg-foreground/10 rounded-sm transform translate-x-2 translate-y-2 blur-sm" />
            
            {/* Main paper */}
            <div className="paper-card relative p-6 md:p-8">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <h2 className="font-handwritten text-3xl text-ink mb-6 text-center">
                Write your apology
              </h2>

              {/* Instructions */}
              <p className="text-sm text-muted-foreground text-center mb-4 font-serif italic">
                Only letters and numbers allowed. No emojis or symbols.
              </p>

              {/* Textarea container styled as paper */}
              <div className="relative mb-4">
                {/* Paper lines */}
                <div className="absolute inset-x-0 top-6 bottom-4 flex flex-col gap-7 pointer-events-none opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-px bg-primary/40" />
                  ))}
                </div>

                <textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="I'm sorry for..."
                  className="w-full h-48 p-4 bg-transparent font-handwritten text-xl text-ink placeholder:text-ink-faded/50 resize-none focus:outline-none focus:ring-0 border-none leading-relaxed"
                  maxLength={MAX_CHARS}
                />
              </div>

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm text-center mb-4 font-serif"
                >
                  {error}
                </motion.p>
              )}

              {/* Character count */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-muted-foreground font-serif">
                  {text.length}/{MAX_CHARS}
                </span>
              </div>

              {/* Submit button */}
              <Button
                onClick={handleSubmit}
                variant="apologize"
                size="lg"
                className="w-full font-serif"
                disabled={!text.trim()}
              >
                Send Apology
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApologyModal;
