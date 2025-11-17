import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Preparar o payload
    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      message: formData.message,
      timestamp: new Date().toISOString(),
      source: "Vision AI Website"
    };

    console.log("=== TENTANDO ENVIAR ===");
    console.log("URL:", "https://n8n.agenciavisionai.com/webhook/chat-sophia");
    console.log("Payload:", payload);

    try {
      const response = await fetch(https://n8n.agenciavisionai.com/webhook/chat-sophia", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("=== RESPOSTA RECEBIDA ===");
      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);
      console.log("Headers:", response.headers);

      // Tentar ler o corpo da resposta
      const responseText = await response.text();
      console.log("Response Body:", responseText);

      if (response.ok) {
        console.log("✅ Sucesso! Dados enviados para n8n");
        
        toast({
          title: "Mensagem enviada!",
          description: "Seus dados foram enviados com sucesso. Entraremos em contato em breve."
        });

        // Limpar formulário
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: ""
        });
      } else {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

    } catch (error) {
      console.error("=== ERRO AO ENVIAR ===");
      console.error("Tipo do erro:", error);
      console.error("Mensagem:", error instanceof Error ? error.message : String(error));
      
      toast({
        title: "Erro ao enviar",
        description: error instanceof Error ? error.message : "Houve um problema ao enviar seus dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      console.log("=== FIM DA REQUISIÇÃO ===");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove tudo que não é número
    value = value.replace(/\D/g, '');
    
    // Se o campo estiver vazio, adiciona o 55
    if (value === '') {
      value = '55';
    }
    
    // Garante que sempre comece com 55
    if (!value.startsWith('55')) {
      value = '55' + value.replace(/^55/, '');
    }
    
    // Limita a 13 dígitos (55 + 11 dígitos do número brasileiro)
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
    
    // Aplica a máscara: 55 XX 9XXXX-XXXX
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = '55';
      if (value.length > 4) {
        formattedValue += ' ' + value.slice(2, 4);
        if (value.length > 6) {
          formattedValue += ' ' + value.slice(4, 5);
          if (value.length > 9) {
            formattedValue += value.slice(5, 9) + '-' + value.slice(9);
          } else {
            formattedValue += value.slice(5);
          }
        } else {
          formattedValue += value.slice(4);
        }
      } else {
        formattedValue += value.slice(2);
      }
    }
    
    setFormData({
      ...formData,
      phone: formattedValue
    });
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Impede que o usuário apague o "55" quando há mais de 2 caracteres
    if ((e.key === 'Backspace' || e.key === 'Delete') && formData.phone.length <= 2) {
      e.preventDefault();
    }
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Se o campo estiver vazio, adiciona o 55
    if (formData.phone === '') {
      setFormData({
        ...formData,
        phone: '55'
      });
    }
    
    // Posiciona o cursor após o "55"
    setTimeout(() => {
      const cursorPos = formData.phone.length > 0 ? formData.phone.length : 2;
      e.target.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Fale Conosco
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nossa equipe de especialistas está pronta para ajudar você a implementar soluções de IA que realmente fazem a diferença no seu negócio.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="bg-white" 
                    placeholder="Seu nome completo" 
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="bg-white" 
                    placeholder="seu@email.com" 
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa
                  </label>
                  <Input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    className="bg-white" 
                    placeholder="Nome da sua empresa" 
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <Input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handlePhoneChange}
                    onKeyDown={handlePhoneKeyDown}
                    onFocus={handlePhoneFocus}
                    className="bg-white" 
                    placeholder="(99) 99999-9999" 
                    disabled={isSubmitting}
                    maxLength={16}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem *
                </label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className="bg-white min-h-[120px]" 
                  placeholder="Conte-nos sobre seu projeto e como podemos ajudar..."
                  disabled={isSubmitting}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
