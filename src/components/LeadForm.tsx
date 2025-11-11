import React, { useState } from 'react';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    telefone: "",
    mensagem: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("Enviando...");

    try {
      console.log("Dados sendo enviados:", formData);

      const response = await fetch("https://n8n.agenciavisionai.com/webhook/vision-site", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Adicionar headers para CORS se necessário
          "Accept": "application/json",
        },
        // Adicionar mode para lidar com CORS
        mode: "cors",
        body: JSON.stringify(formData),
      });

      console.log("Status da resposta:", response.status);
      console.log("Response headers:", response.headers);

      if (response.ok) {
        const responseData = await response.text();
        console.log("Resposta do webhook:", responseData);
        
        setSubmitStatus("Mensagem enviada com sucesso!");
        
        // Limpar formulário
        setFormData({
          nome: "",
          email: "",
          empresa: "",
          telefone: "",
          mensagem: "",
        });
      } else {
        console.error("Erro na resposta:", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Detalhes do erro:", errorText);
        setSubmitStatus(`Erro ao enviar: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setSubmitStatus(`Erro de conexão: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      
      // Limpar status após 5 segundos
      setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Fale Conosco</h2>
      
      {submitStatus && (
        <div className={`mb-4 p-3 rounded ${
          submitStatus.includes("sucesso") 
            ? "bg-green-100 text-green-700 border border-green-300" 
            : submitStatus.includes("Erro") 
            ? "bg-red-100 text-red-700 border border-red-300"
            : "bg-blue-100 text-blue-700 border border-blue-300"
        }`}>
          {submitStatus}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome completo"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Empresa
            </label>
            <input
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome da sua empresa"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mensagem *
          </label>
          <textarea
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Conte-nos sobre seu projeto e como podemos ajudar..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          } text-white`}
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
