
import { Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and tagline */}
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Coffee className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-800">coworking.live</span>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © 2024 coworking.live. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
