
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      position: "CEO, TechStart",
      company: "Startup de Tecnologia",
      content: "A Vision AI transformou completamente nosso atendimento ao cliente. Conseguimos reduzir o tempo de resposta em 90% e aumentar a satisfação dos clientes significativamente.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ana Beatriz",
      position: "Diretora de Marketing",
      company: "E-commerce Fashion",
      content: "Os agentes IA para vendas da Vision AI aumentaram nossas conversões em 45%. A qualificação automática de leads é simplesmente incrível!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Roberto Santos",
      position: "CTO",
      company: "Fintech Solutions",
      content: "Implementamos as automações da Vision AI e conseguimos otimizar 80% dos nossos processos internos. O ROI foi impressionante!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como a Vision AI tem transformado negócios e gerado resultados excepcionais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <Quote className="h-8 w-8 text-blue-600 mr-3" />
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-blue-600 font-medium">{testimonial.position}</p>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-12 shadow-xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Taxa de Satisfação</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Clientes Atendidos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24h</div>
              <p className="text-gray-600">Suporte Dedicado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
