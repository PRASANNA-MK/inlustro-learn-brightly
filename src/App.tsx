
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ExamPreparation from "./pages/ExamPreparation";
import Teachers from "./pages/Teachers";
import Submissions from "./pages/Submissions";
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
            <Route path="/exam-preparation" element={<ExamPreparation />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/submissions" element={<Submissions />} />
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
