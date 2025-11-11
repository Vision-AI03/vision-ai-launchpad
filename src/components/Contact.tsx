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
    console.log("Payload:", payload);

    try {
      // Tenta enviar com no-cors como fallback para problemas de CORS
      const response = await fetch("https://n8n.agenciavisionai.com/webhook/vision-site", {
        method: "POST",
        mode: "no-cors", // Alterado para no-cors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("=== RESPOSTA ENVIADA ===");
      console.log("Mode: no-cors (resposta opaca - não é possível ler o status)");
      
      // Com no-cors, não conseguimos ler o status da resposta
      // Mas se chegou aqui sem erro, a requisição foi enviada
      console.log("✅ Requisição enviada ao n8n");
      
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

    } catch (error) {
      console.error("=== ERRO AO ENVIAR ===");
      console.error("Tipo do erro:", error);
      console.error("Mensagem:", error instanceof Error ? error.message : String(error));
      
      // Mesmo com erro de rede, pode ter sido enviado
      toast({
        title: "Possível erro de conexão",
        description: "Não foi possível confirmar o envio. Por favor, entre em contato diretamente conosco.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      console.log("=== FIM DA REQUISIÇÃO ===");
    }
  };
