import React, { useState } from "react";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    telefone: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Dados sendo enviados:", formData);
      console.log("Resposta recebida:", response.status);
      
      const response = await fetch("https://n8n.agenciavisionai.com/webhook/webhook-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Status da resposta:", response.status);
      console.log("Response OK:", response.ok);

      if (response.ok) {
        const responseData = await response.text();
        console.log("Dados da resposta:", responseData);
        
        alert("Mensagem enviada com sucesso!");
        setFormData({
          nome: "",
          email: "",
          empresa: "",
          telefone: "",
          mensagem: "",
        });
      } else {
        const errorText = await response.text();
        console.error("Erro da API:", errorText);
        console.error("Status:", response.status);
        alert(`Erro ao enviar (${response.status}): ${errorText || 'Tente novamente.'}`);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro de conexão. Verifique sua internet e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nome"
        placeholder="Seu nome completo"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="seu@email.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="empresa"
        placeholder="Empresa"
        value={formData.empresa}
        onChange={handleChange}
      />
      <input
        type="text"
        name="telefone"
        placeholder="(11) 99999-9999"
        value={formData.telefone}
        onChange={handleChange}
      />
      <textarea
        name="mensagem"
        placeholder="Mensagem"
        value={formData.mensagem}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Enviar Mensagem</button>
    </form>
  );
};

export default LeadForm;
