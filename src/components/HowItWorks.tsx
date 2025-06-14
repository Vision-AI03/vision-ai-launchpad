
import { MessageCircle, Settings, Rocket, BarChart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: "01",
      title: "Consultoria e Análise",
      description: "Analisamos suas necessidades específicas e identificamos as melhores oportunidades para implementar IA em seu negócio.",
      details: [
        "Mapeamento de processos atuais",
        "Identificação de pontos de melhoria",
        "Definição de objetivos e KPIs"
      ]
    },
    {
      icon: Settings,
      number: "02", 
      title: "Desenvolvimento Personalizado",
      description: "Criamos e treinamos seus agentes IA com base nas suas especificações, garantindo máxima eficiência e personalização.",
      details: [
        "Treinamento com seus dados",
        "Configuração de fluxos de trabalho",
        "Integração com sistemas existentes"
      ]
    },
    {
      icon: Rocket,
      number: "03",
      title: "Implementação e Testes",
      description: "Implementamos gradualmente a solução, realizando testes extensivos para garantir performance e qualidade.",
      details: [
        "Deploy em ambiente controlado",
        "Testes de carga e performance",
        "Ajustes finos baseados em feedback"
      ]
    },
    {
      icon: BarChart,
      number: "04",
      title: "Monitoramento e Otimização",
      description: "Acompanhamos continuamente o desempenho e otimizamos os agentes para garantir resultados cada vez melhores.",
      details: [
        "Monitoramento em tempo real",
        "Relatórios de performance",
        "Otimizações contínuas"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um processo simples e eficiente para transformar seu negócio com inteligência artificial
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-200 to-blue-400"></div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="flex-1 lg:w-1/2">
                  <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-blue-600 font-bold text-lg">Etapa {step.number}</span>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline node */}
                <div className="hidden lg:flex w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full items-center justify-center shadow-lg z-10">
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 lg:w-1/2 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Pronto para começar?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos transformar seu negócio com inteligência artificial
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Fale Conosco Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
