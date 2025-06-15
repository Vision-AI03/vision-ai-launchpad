import { ArrowRight, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <img alt="Vision AI Logo" className="h-16 w-auto" src="/lovable-uploads/b1e2e190-fb60-46ed-951e-d24e08aa3a4e.png" />
              <div>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Vision <span className="text-blue-600"></span>
                </h1>
                <p className="text-xl text-gray-600 mt-2">Agência de Inteligência Artificial</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Transforme seu negócio com 
              <span className="text-blue-600"> Agentes IA</span> inteligentes
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Criamos agentes de IA personalizados para atendimento, vendas, suporte e qualificação de leads. 
              Além de automações inteligentes que otimizam seus processos e aumentam sua produtividade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6" onClick={scrollToContact}>
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6" onClick={() => document.getElementById('services')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                Ver Serviços
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Bot className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Agentes IA</p>
                  <p className="text-sm text-gray-600">Personalizados</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Automações</p>
                  <p className="text-sm text-gray-600">Inteligentes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-gray-800">Olá! Como posso ajudá-lo hoje?</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 text-right">
                      <div className="bg-blue-600 rounded-lg p-3 inline-block">
                        <p className="text-sm text-white">Gostaria de saber sobre os serviços</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-gray-800">Perfeito! Oferecemos agentes IA para atendimento, vendas e suporte...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;