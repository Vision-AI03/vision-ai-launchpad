import { Bot, Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/lovable-uploads/70ee6f44-7030-472c-a2a3-4d3796b66f1e.png" alt="Vision AI Logo" className="h-10 w-auto filter brightness-0 invert" />
              <span className="font-bold text-xl">VISION AI</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Transformamos negócios com inteligência artificial. Criamos agentes IA personalizados 
              e automações inteligentes que otimizam processos e aumentam resultados.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-300">Especialistas em Automações & IA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-gray-300 hover:text-blue-400 transition-colors">
                  Serviços
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('benefits')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-gray-300 hover:text-blue-400 transition-colors">
                  Benefícios
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-gray-300 hover:text-blue-400 transition-colors">
                  Como Funciona
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">agenciavisionai@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">(19) 99941-7233</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Ipeúna, SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © {currentYear} Vision AI. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;