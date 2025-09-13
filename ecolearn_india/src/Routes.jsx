import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import StudentLogin from './pages/student-login';
import StudentProfile from './pages/student-profile';
import InteractiveLessons from './pages/interactive-lessons';
import SchoolLeaderboard from './pages/school-leaderboard';
import StudentDashboard from './pages/student-dashboard';
import ChallengeTracker from './pages/challenge-tracker';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ChallengeTracker />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/interactive-lessons" element={<InteractiveLessons />} />
        <Route path="/school-leaderboard" element={<SchoolLeaderboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/challenge-tracker" element={<ChallengeTracker />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
