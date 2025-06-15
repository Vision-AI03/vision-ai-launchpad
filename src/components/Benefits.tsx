import { Clock, DollarSign, Users, TrendingUp, Shield, Zap } from "lucide-react";
const Benefits = () => {
  const benefits = [{
    icon: Clock,
    title: "Disponibilidade 24/7",
    description: "Seus agentes IA trabalham sem parar, oferecendo suporte e atendimento a qualquer hora do dia.",
    stats: "100% uptime"
  }, {
    icon: DollarSign,
    title: "Redução de Custos",
    description: "Diminua significativamente os custos operacionais enquanto aumenta a eficiência do atendimento.",
    stats: "Até 70% economia"
  }, {
    icon: TrendingUp,
    title: "Aumento de Conversões",
    description: "Melhore suas taxas de conversão com qualificação inteligente e acompanhamento personalizado.",
    stats: "+45% conversões"
  }, {
    icon: Zap,
    title: "Resposta Instantânea",
    description: "Elimine o tempo de espera com respostas imediatas e precisas para todas as consultas.",
    stats: "< 1 segundo"
  }, {
    icon: Users,
    title: "Experiência Personalizada",
    description: "Ofereça atendimento personalizado baseado no histórico e preferências de cada cliente.",
    stats: "100% personalizado"
  }, {
    icon: Shield,
    title: "Escalabilidade Garantida",
    description: "Cresça sem limites. Nossos agentes se adaptam automaticamente ao volume de demanda.",
    stats: "Crescimento ilimitado"
  }];
  return <section id="benefits" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-4 text-3xl text-gray-950">Por que escolher a VISION AI?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Descubra os benefícios transformadores que nossas Automações e Agentes IA podem trazer para o seu negócio</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {benefit.description}
              </p>
              
              <div className="text-2xl font-bold text-blue-600">
                {benefit.stats}
              </div>
            </div>)}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-12 shadow-xl">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Resultados Comprovados
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-600">Agentes Criados</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
                <p className="text-gray-600">Interações Processadas</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-gray-600">Satisfação dos Clientes</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-gray-600">Suporte Contínuo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Benefits;