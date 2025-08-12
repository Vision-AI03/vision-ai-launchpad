import { ChevronDown, ChevronUp, HelpCircle, Bot, Sparkles, Users, Code, Globe, BarChart } from "lucide-react";
import { useState } from "react";

const FAQAgentesIA = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Posso substituir totalmente minha equipe de vendas e atendimento por Agentes IA?",
      answer: "Embora seja possível, recomendamos usar a IA para otimizar seus atendimentos e vendas, sem substituir totalmente a equipe humana. O equilíbrio entre agentes IA e humanos geralmente oferece os melhores resultados. A IA cuida das consultas iniciais, qualificação de leads e atendimento 24/7, enquanto humanos focam em negociações complexas e relacionamentos estratégicos.",
      icon: <Users className="h-5 w-5" />
    },
    {
      question: "É fácil treinar um Agente IA?",
      answer: "Sim! Nossos agentes IA são projetados para serem facilmente treinados. Você pode configurar respostas, definir fluxos de conversação e personalizar o comportamento através de uma interface intuitiva. Não é necessário conhecimento técnico avançado - nossa equipe oferece suporte completo durante todo o processo de implementação.",
      icon: <Bot className="h-5 w-5" />
    },
    {
      question: "Vocês podem me ajudar a treinar os Agentes IA e configurar outros recursos?",
      answer: "Claro! Oferecemos suporte técnico e comercial integrado. Nossa equipe especializada ajuda no treinamento personalizado dos agentes, configuração de fluxos automatizados, integração com seus sistemas existentes e otimização contínua para melhor performance. Você não fica sozinho nesse processo.",
      icon: <Code className="h-5 w-5" />
    },
    {
      question: "Preciso de conhecimentos técnicos ou de programação?",
      answer: "Não é necessário! Desenvolvemos nossas soluções pensando na simplicidade. A interface é visual e intuitiva, permitindo que você configure e gerencie seus agentes IA sem conhecimento de programação. Para customizações mais avançadas, nossa equipe técnica está disponível para apoiar.",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      question: "Nossas vendas são complexas, o Agente IA conseguirá aprender?",
      answer: "Sim! Nossos agentes IA são desenvolvidos para lidar com vendas complexas e processos específicos de cada negócio. Eles aprendem com cada interação e podem ser treinados com cenários específicos do seu setor. Para situações muito complexas, o agente pode transferir automaticamente para um especialista humano.",
      icon: <BarChart className="h-5 w-5" />
    },
    {
      question: "Posso atender clientes em inglês e outras línguas com IA?",
      answer: "Perfeitamente! Nossos agentes IA suportam múltiplos idiomas, incluindo português, inglês, espanhol e outros. Eles mantêm o contexto e personalidade da marca independente do idioma usado pelo cliente, permitindo expandir seu atendimento globalmente sem barreiras linguísticas.",
      icon: <Globe className="h-5 w-5" />
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="h-4 w-4 mr-2" />
            Perguntas Frequentes
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dúvidas Frequentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Esclarecemos as principais questões sobre agentes de IA e automações. 
            Ainda tem dúvidas? Nossa equipe está pronta para ajudar!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                    {faq.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="pl-14 pr-4">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 text-center relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              Nossa equipe especializada está pronta para esclarecer todas as suas questões 
              sobre agentes de IA e mostrar como eles podem transformar seu negócio.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://api.whatsapp.com/message/UMOFX66X4CY2K1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
              >
                Falar com Especialista
              </a>
              <p className="text-sm text-gray-500">
                Atendimento personalizado • Consultoria gratuita
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAgentesIA;
