
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizontal } from 'lucide-react';

// Define the allowed message roles type
type MessageRole = 'user' | 'assistant';

// Define the message interface
interface Message {
  id: string;
  content: string;
  role: MessageRole; // Now this is typed correctly
  timestamp: string;
}

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your InLustro AI learning assistant. How can I help you with your studies today?',
    role: 'assistant',
    timestamp: new Date().toISOString()
  }
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponses = [
        "I can help you understand that concept. Let me explain...",
        "Great question! Here's what you need to know about that topic...",
        "Let me provide some resources that might help with your question.",
        "That's an interesting question! Let's explore that together.",
        "Based on your curriculum, here's what you should focus on..."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chatbot</h1>
        <p className="text-muted-foreground">Ask questions and get help with your studies</p>
      </div>
      
      <Card className="flex h-[70vh] flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-inlustro-blue text-white">AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>InLustro AI Assistant</CardTitle>
              <CardDescription>Your personal learning companion</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto pb-0">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-inlustro-blue text-white'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`mt-1 text-xs ${message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg bg-muted px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full items-center space-x-2">
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Type your question..."
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <SendHorizontal className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chatbot;
