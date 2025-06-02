
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import MyClasses from "./pages/MyClasses";
import LessonManager from "./pages/LessonManager";
import Submissions from "./pages/Submissions";
import StudentTracker from "./pages/StudentTracker";
import ExamPreparation from "./pages/ExamPreparation";
import ExamPattern from "./pages/ExamPattern";
import Calendar from "./pages/Calendar";
import Announcements from "./pages/Announcements";
import NotFound from "./pages/NotFound";

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
            <Route path="/my-classes" element={<MyClasses />} />
            <Route path="/lesson-manager" element={<LessonManager />} />
            <Route path="/submissions" element={<Submissions />} />
            <Route path="/student-tracker" element={<StudentTracker />} />
            <Route path="/exam-preparation" element={<ExamPreparation />} />
            <Route path="/exam-pattern" element={<ExamPattern />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
