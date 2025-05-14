
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample chat messages for demonstration
const initialMessages = [
  {
    id: '1',
    content: 'Hello! I\'m your InLustro AI assistant. How can I help you with your studies today?',
    role: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: '2',
    content: 'Hi! I need help with my math homework.',
    role: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(), // 4 minutes ago
  },
  {
    id: '3',
    content: 'I\'d be happy to help with your math homework! What topic are you working on?',
    role: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 minutes ago
  },
];

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
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
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate bot response (would be replaced with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thanks for your message! This is a placeholder response. In the actual implementation, this would come from your AI backend service.',
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Study Assistant</h1>
        <p className="text-muted-foreground">Ask questions and get help with your studies</p>
      </div>
      
      <Card className="flex flex-col h-[70vh]">
        <CardHeader className="border-b py-4">
          <CardTitle>Chat with InLustro AI</CardTitle>
          <CardDescription>Get help with homework, learn concepts, or prepare for exams</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <div 
                        className={`flex h-full w-full items-center justify-center rounded-full ${
                          message.role === 'assistant' ? 'bg-inlustro-blue text-white' : 'bg-muted'
                        }`}
                      >
                        {message.role === 'assistant' ? 'AI' : 'You'}
                      </div>
                    </Avatar>
                    <div>
                      <div 
                        className={`rounded-2xl px-4 py-2 ${
                          message.role === 'user' 
                            ? 'bg-inlustro-blue text-white' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-inlustro-blue text-white">
                        AI
                      </div>
                    </Avatar>
                    <div className="rounded-2xl bg-muted px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.2s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chatbot;
