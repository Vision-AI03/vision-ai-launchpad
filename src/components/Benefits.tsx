import { Clock, DollarSign, Users, TrendingUp, Shield, Zap } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Disponibilidade 24/7",
      description: "Seus agentes IA trabalham sem parar, oferecendo suporte e atendimento a qualquer hora do dia.",
      stats: "100% uptime"
    },
    {
      icon: DollarSign,
      title: "Redução de Custos",
      description: "Diminua significativamente os custos operacionais enquanto aumenta a eficiência do atendimento.",
      stats: "Até 70% economia"
    },
    {
      icon: TrendingUp,
      title: "Aumento de Conversões",
      description: "Melhore suas taxas de conversão com qualificação inteligente e acompanhamento personalizado.",
      stats: "+45% conversões"
    },
    {
      icon: Zap,
      title: "Resposta Instantânea",
      description: "Elimine o tempo de espera com respostas imediatas e precisas para todas as consultas.",
      stats: "< -10 segundos"
    },
    {
      icon: Users,
      title: "Experiência Personalizada",
      description: "Ofereça atendimento personalizado baseado no histórico e preferências de cada cliente.",
      stats: "100% personalizado"
    },
    {
      icon: Shield,
      title: "Escalabilidade Garantida",
      description: "Cresça sem limites. Nossos agentes se adaptam automaticamente ao volume de demanda.",
      stats: "Crescimento ilimitado"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-4 text-3xl text-gray-950">
            Por que escolher a VISION AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra os benefícios transformadores que nossas Automações e Agentes IA podem trazer para o seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed text-base font-medium">
                  {benefit.description}
                </p>

                <div className="text-2xl font-bold text-blue-600">
                  {benefit.stats}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloco substituto do “Resultados Comprovados” */}
        <div className="mt-16 bg-white rounded-3xl p-12 shadow-xl">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Exemplos de Aplicação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-2xl shadow">
                <h4 className="text-xl font-semibold mb-2">Automação de Atendimento</h4>
                <p className="text-gray-600">
                  Implementamos agentes que atendem clientes de forma natural e instantânea, reduzindo a carga da equipe humana.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow">
                <h4 className="text-xl font-semibold mb-2">Geração e Qualificação de Leads</h4>
                <p className="text-gray-600">
                  Captura dados, qualifica oportunidades e direciona os leads prontos para o seu time comercial ou CRM.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow">
                <h4 className="text-xl font-semibold mb-2">Integrações Inteligentes</h4>
                <p className="text-gray-600">
                  Conectamos agentes a plataformas como WhatsApp, Google Sheets, CRMs e agendas, criando fluxos automatizados de ponta a ponta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
