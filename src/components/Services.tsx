
import { Bot, MessageSquare, Users, Zap, Settings, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: MessageSquare,
      title: "Agentes de Atendimento",
      description: "Atendimento 24/7 com IA que compreende e responde suas dúvidas de forma natural e eficiente.",
      features: ["Respostas instantâneas", "Multilíngue", "Integração com sistemas"]
    },
    {
      icon: TrendingUp,
      title: "Agentes de Vendas",
      description: "Qualifique leads e conduza vendas automaticamente com nossa IA especializada em conversão.",
      features: ["Qualificação de leads", "Follow-up automático", "CRM integrado"]
    },
    {
      icon: Users,
      title: "Agentes de Suporte",
      description: "Resolva problemas técnicos e dúvidas dos clientes com agilidade e precisão.",
      features: ["Diagnóstico automático", "Base de conhecimento", "Escalação inteligente"]
    },
    {
      icon: Bot,
      title: "Qualificação de Leads",
      description: "Identifique e qualifique automaticamente os melhores prospects para sua equipe de vendas.",
      features: ["Scoring automático", "Segmentação inteligente", "Relatórios detalhados"]
    },
    {
      icon: Zap,
      title: "Automações com IA",
      description: "Otimize processos repetitivos com automações inteligentes que aprendem e se adaptam.",
      features: ["Workflows personalizados", "Integração de sistemas", "Otimização contínua"]
    },
    {
      icon: Settings,
      title: "Soluções Personalizadas",
      description: "Desenvolvemos soluções de IA sob medida para as necessidades específicas do seu negócio.",
      features: ["Análise personalizada", "Desenvolvimento customizado", "Suporte dedicado"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma gama completa de soluções de IA para transformar a forma como 
            você se relaciona com seus clientes e otimiza seus processos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
