import React, { useState } from "react";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    telefone: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://n8n.agenciavisionai.com/webhook/88e060a0-6d69-497b-9289-811a826e2a4e, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Mensagem enviada com sucesso!");
        setFormData({
          nome: "",
          email: "",
          empresa: "",
          telefone: "",
          mensagem: "",
        });
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro de conexão. Tente novamente.");
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

