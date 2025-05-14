
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import Quizzes from "./pages/Quizzes";
import Gamification from "./pages/Gamification";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AIVoiceTutor from "./pages/AIVoiceTutor";
import Chatbot from "./pages/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai-tutor" element={<AIVoiceTutor />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
