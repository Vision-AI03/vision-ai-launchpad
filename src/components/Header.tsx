import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  return <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between rounded-md bg-transparent">
          <div className="flex items-center space-x-3">
            <img alt="Vision AI Logo" className="h-10 w-auto" src="/lovable-uploads/f8f0e02d-80ba-4a9f-a45c-2bf98069b092.png" />
            <span className="font-bold text-xl text-blue-600"> VISION AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Serviços
            </button>
            <button onClick={() => scrollToSection('benefits')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Benefícios
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Como Funciona
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Contato
            </button>
            <Button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-700">
              Começar Agora
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-blue-600 transition-colors text-left">
                Serviços
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-gray-600 hover:text-blue-600 transition-colors text-left">
                Benefícios
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-blue-600 transition-colors text-left">
                Como Funciona
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-blue-600 transition-colors text-left">
                Contato
              </button>
              <Button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-700 w-full">
                Começar Agora
              </Button>
            </div>
          </nav>}
      </div>
    </header>;
};
export default Header;