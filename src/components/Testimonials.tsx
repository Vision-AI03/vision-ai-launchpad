import { MessageCircle, Sparkles, Clock, Shield, Bot, ArrowRight, CheckCircle } from "lucide-react";

const SophiaExperience = () => {
  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "Respostas Humanizadas",
      description: "Conversas naturais e inteligentes como se fosse uma pessoa real"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Disponível 24/7",
      description: "Sophia está sempre pronta para atender, sem horário comercial"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Especialista em IA",
      description: "Conhece todas as soluções Vision AI para tirar suas dúvidas"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Experiência Personalizada",
      description: "Atendimento focado nas necessidades específicas do seu negócio"
    }
  ];

  const benefits = [
    "Esclarecimento de dúvidas sobre nossas soluções",
    "Demonstração prática de como funciona um agente IA",
    "Análise personalizada para seu tipo de negócio",
    "Informações sobre implementação e resultados",
    "Suporte técnico e comercial integrado"
  ];

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
            <Sparkles className="h-4 w-4 mr-2" />
            Experimente Agora Mesmo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Conheça a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sophia</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossa atendente de IA está pronta para mostrar como a tecnologia Vision AI pode transformar seu negócio. 
            Converse com ela agora e veja a diferença na prática!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Por que conversar com a Sophia?
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                O que a Sophia pode fazer por você:
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30 relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MessageCircle className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Fale com a Sophia
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Tire suas dúvidas, conheça nossas soluções e veja como um agente de IA realmente funciona. 
                  É rápido, gratuito e sem compromisso!
                </p>
                
                <a 
                  href="https://wa.me/message/CPV7YJ34KDD4H1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl group text-lg"
                >
                  <MessageCircle className="h-6 w-6 mr-3 group-hover:animate-bounce" />
                  Conversar no WhatsApp
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <p className="text-sm text-gray-500 mt-4">
                  Resposta em segundos • Sem cadastro necessário
                </p>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                </div
              </div
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                &lt;10s
              </div>
              <p className="text-gray-600 font-medium">Tempo de Resposta</p>
              <p className="text-sm text-gray-500">Respostas instantâneas e precisas</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                95%
              </div>
              <p className="text-gray-600 font-medium">Taxa de Resolução</p>
              <p className="text-sm text-gray-500">Dúvidas esclarecidas na primeira conversa</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                24/7
              </div>
              <p className="text-gray-600 font-medium">Disponibilidade</p>
              <p className="text-sm text-gray-500">Sempre online para te atender</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SophiaExperience;
