import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Borderless Maps</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-foreground hover:text-primary transition-colors">Portfolio</button>
            <button onClick={() => scrollToSection('training')} className="text-foreground hover:text-primary transition-colors">Training</button>
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">Contact</button>
          </div>

          {/* Optional: Mobile menu toggle (future improvement) */}
          {/* <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={handleMobileToggle}>
              <Menu className="w-6 h-6" />
            </Button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
