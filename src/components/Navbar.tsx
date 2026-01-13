import { Button } from "@/components/ui/button";

interface NavbarProps {
  onApologize: () => void;
}

const Navbar = ({ onApologize }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="font-handwritten text-3xl md:text-4xl text-primary tracking-wide">
          Apolo-G
        </span>
      </div>

      {/* Apologize Button */}
      <Button
        onClick={onApologize}
        variant="apologize"
        size="lg"
        className="font-serif text-base tracking-wide"
      >
        Apologize
      </Button>
    </nav>
  );
};

export default Navbar;
