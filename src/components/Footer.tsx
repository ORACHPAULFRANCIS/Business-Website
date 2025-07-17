import { MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const handleComingSoon = (platform: string) => {
    toast.info(`${platform} coming soon!`);
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Borderless Maps</span>
            </div>
            <p className="text-background/70 mb-4">
              Transforming complex spatial data into compelling, actionable narratives,
              driving smarter decisions across Africa.
            </p>
            <div className="space-y-2 text-background/70">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>orachpf@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+256 774 061 585</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-background/70">
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#training" className="hover:text-primary transition-colors">Training</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-background/70">
              <li><button onClick={() => handleComingSoon("LinkedIn")} className="hover:text-primary transition-colors">LinkedIn</button></li>
              <li><button onClick={() => handleComingSoon("TikTok")} className="hover:text-primary transition-colors">TikTok</button></li>
              <li><button onClick={() => handleComingSoon("YouTube")} className="hover:text-primary transition-colors">YouTube</button></li>
              <li><button onClick={() => handleComingSoon("Newsletter")} className="hover:text-primary transition-colors">Newsletter</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/60">
          <p>&copy; {new Date().getFullYear()} Borderless Maps (Borderless Cartographers of Uganda Ltd). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
