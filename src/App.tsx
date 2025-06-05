
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
import ExamCreation from "./pages/ExamCreation";
import LiveScheduler from "./pages/LiveScheduler";
import Messages from "./pages/Messages";
import Lessons from "./pages/Lessons";
import DailyLog from "./pages/DailyLog";
import LessonPlan from "./pages/LessonPlan";
import SyllabusSplit from "./pages/SyllabusSplit";
import TeacherTimetable from "./pages/TeacherTimetable";
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
            <Route path="/exam-creation" element={<ExamCreation />} />
            <Route path="/live-scheduler" element={<LiveScheduler />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/daily-log" element={<DailyLog />} />
            <Route path="/lesson-plan" element={<LessonPlan />} />
            <Route path="/syllabus-split" element={<SyllabusSplit />} />
            <Route path="/teacher-timetable" element={<TeacherTimetable />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
