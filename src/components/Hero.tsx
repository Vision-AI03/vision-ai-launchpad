import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Bot, Zap, Send, Mic, MicOff, Volume2 } from "lucide-react";

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
  const [isRecording, setIsRecording] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const WEBHOOK_URL = "https://n8n.agenciavisionai.com/webhook-test/chat-sophia";
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const sendMessage = async (message, audioBlob = null) => {
    if ((!message.trim() && !audioBlob) || isLoading) return;
    
    const userMessage = {
      id: Date.now(),
      text: audioBlob ? "🎤 Mensagem de áudio" : message,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      
      if (audioBlob) {
        formData.append('audio', audioBlob, 'voice_message.webm');
        formData.append('messageType', 'audio');
      } else {
        formData.append('message', message);
        formData.append('messageType', 'text');
      }
      
      formData.append('userId', userId);
      formData.append('sessionId', `session_${userId}`);
      formData.append('timestamp', new Date().toISOString());
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response || "Desculpe, não consegui processar sua mensagem. Tente novamente.",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "Ops! Parece que estou com dificuldades técnicas no momento. Tente novamente em alguns instantes ou entre em contato conosco diretamente.",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    sendMessage(inputMessage);
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        sendMessage("", audioBlob);
        setAudioChunks([]);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      
    } catch (error) {
      console.error('Erro ao acessar microfone:', error);
      alert('Não foi possível acessar o microfone. Verifique as permissões do navegador.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
                      <p className="text-xs opacity-90">Consultora de IA</p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${message.isBot ? '' : 'justify-end'}`}
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
                          <p className="text-sm">{message.text}</p>
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
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border shadow-sm rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 pr-12"
                        disabled={isLoading}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                      />
                    </div>
                    
                    {/* Audio Button */}
                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-2 rounded-full transition-colors ${
                        isRecording 
                          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                      disabled={isLoading}
                    >
                      {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </button>
                    
                    {/* Send Button */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {isRecording && (
                    <div className="mt-2 text-center">
                      <p className="text-sm text-red-600 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Gravando... Clique no microfone novamente para enviar
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Floating Action Text */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
                <p className="text-sm font-medium flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Chat funcional com áudio!
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
