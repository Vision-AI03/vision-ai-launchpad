import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Bot, Zap, Send, MessageCircle, AlertCircle } from "lucide-react";

const Button = ({ children, className = "", size = "default", variant = "default", onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    lg: "h-11 px-8 rounded-md"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Hero = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Sou a Sophia, sua consultora de IA e automações. Como posso ajudá-lo hoje?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('online'); // online, offline, error
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [sessionId] = useState(() => `session_${userId}`);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // URL do seu webhook
  const WEBHOOK_URL = "https://n8n.agenciavisionai.com/webhook/chat-sophia";
  
  // Controla se deve fazer scroll automático (apenas quando há novas mensagens do bot)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  
  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Função para extrair a resposta do bot de forma mais robusta
  const extractBotResponse = (data) => {
    console.log('🔍 Dados recebidos completos:', JSON.stringify(data, null, 2));
    
    // Possíveis caminhos onde a resposta pode estar
    const possiblePaths = [
      data?.message,           // Resposta direta
      data?.response,          // Resposta do AI Agent
      data?.output,           // Output do processo
      data?.text,             // Texto simples
      data?.data?.message,    // Resposta aninhada
      data?.data?.response,   // Resposta aninhada do AI Agent
      data?.result?.message,  // Resultado do processo
      data?.body?.message,    // Corpo da resposta
    ];
    
    // Procura a primeira resposta válida
    for (const path of possiblePaths) {
      if (typeof path === 'string' && path.trim().length > 0) {
        console.log('✅ Resposta encontrada em:', path);
        return path.trim();
      }
    }
    
    // Se não encontrar nada, tenta converter o objeto completo
    if (typeof data === 'object' && data !== null) {
      console.log('⚠️ Nenhuma resposta padrão encontrada, usando fallback');
      return "Recebi sua mensagem, mas houve um problema na formatação da resposta. Por favor, tente novamente.";
    }
    
    console.log('❌ Nenhuma resposta válida encontrada');
    return "Desculpe, não consegui processar sua mensagem no momento.";
  };
  
  const sendMessage = async (message) => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    
    // Desabilita o auto-scroll temporariamente ao enviar mensagem do usuário
    setShouldAutoScroll(false);
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setConnectionStatus('online');
    
    try {
      const requestBody = {
        message: message.trim(),
        messageType: 'text',
        userId: userId,
        sessionId: sessionId,
        timestamp: new Date().toISOString()
      };

      console.log('📤 Enviando mensagem:', requestBody);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      console.log('📡 Status da resposta:', response.status);
      console.log('📡 Headers da resposta:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('❌ Corpo do erro:', errorText);
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }
      
      const responseText = await response.text();
      console.log('📥 Resposta bruta:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.log('⚠️ Erro ao fazer parse do JSON, usando resposta como texto');
        data = { message: responseText };
      }
      
      console.log('📥 Dados processados:', data);
      
      const botResponseText = extractBotResponse(data);
      
      const botMessage = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setConnectionStatus('online');
      
      // Reabilita o auto-scroll apenas para a resposta do bot
      setShouldAutoScroll(true);
      
    } catch (error) {
      console.error('❌ Erro ao enviar mensagem:', error);
      
      let errorMessage;
      
      if (error.name === 'AbortError') {
        errorMessage = "A requisição demorou muito para responder. Por favor, tente novamente.";
        setConnectionStatus('error');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = "Problema de conexão. Verifique sua internet e tente novamente.";
        setConnectionStatus('offline');
      } else {
        errorMessage = "Ops! Estou com dificuldades técnicas no momento. Por favor, tente novamente em alguns instantes.";
        setConnectionStatus('error');
      }
      
      const errorMsg = {
        id: Date.now() + 1,
        text: errorMessage,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
      // Reabilita o auto-scroll para mensagens de erro também
      setShouldAutoScroll(true);
    } finally {
      setIsLoading(false);
      // Foca novamente no input após enviar
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'online': return 'bg-green-400';
      case 'offline': return 'bg-yellow-400';
      case 'error': return 'bg-red-400';
      default: return 'bg-green-400';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'online': return 'Online';
      case 'offline': return 'Conexão instável';
      case 'error': return 'Erro de conexão';
      default: return 'Online';
    }
  };

  // Sugestões para o texto do botão piscante
  const buttonTexts = [
    "Tire suas dúvidas sobre nossas soluções",
    "Conheça nossos serviços de IA",
    "Descubra como podemos ajudar",
    "Saiba mais sobre automações",
    "Fale conosco agora mesmo"
  ];

  // Escolhe um texto aleatório ou pode ser fixo
  const selectedButtonText = buttonTexts[0]; // ou use buttonTexts[Math.floor(Math.random() * buttonTexts.length)] para aleatório

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Transforme seu negócio com 
              <span className="text-blue-600"> Agentes de IA</span> e Automações
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Criamos agentes de IA personalizados para atendimento, vendas, suporte e qualificação de leads. 
              Além de automações inteligentes que otimizam seus processos e aumentam sua produtividade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 text-white" 
                onClick={scrollToContact}
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Serviços
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Bot className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Agentes IA</p>
                  <p className="text-sm text-gray-600">Personalizados</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Automações</p>
                  <p className="text-sm text-gray-600">Inteligentes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interactive */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Chat Header */}
                <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Sophia</p>
                      <p className="text-xs opacity-90">Consultora da Vision AI</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor()} ${connectionStatus === 'online' ? 'animate-pulse' : ''}`}></div>
                        <span className="text-xs opacity-75">Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div 
                  ref={chatContainerRef}
                  className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50"
                  onScroll={() => {
                    // Permite que o usuário role manualmente sem interferir no auto-scroll
                    const container = chatContainerRef.current;
                    if (container) {
                      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
                      setShouldAutoScroll(isAtBottom);
                    }
                  }}
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300 ${message.isBot ? '' : 'justify-end'}`}
                    >
                      {message.isBot && (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-xs lg:max-w-md ${message.isBot ? '' : 'order-first'}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.isBot 
                              ? 'bg-white border shadow-sm' 
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                        </div>
                        <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-gray-400 text-right'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      
                      {!message.isBot && (
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-medium">U</span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border shadow-sm rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t">
                  {connectionStatus !== 'online' && (
                    <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">{getStatusText()}</span>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        disabled={isLoading}
                        onKeyPress={handleKeyPress}
                        maxLength={500}
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors flex items-center justify-center min-w-[48px]"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    Pressione Enter para enviar • Máx. 500 caracteres
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Action Text */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
                <p className="text-sm font-medium flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  {selectedButtonText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
