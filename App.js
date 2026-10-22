import { useEffect } from "react";
import "./App.css";
import Aos from "aos";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import InsightsPage from "./pages/InsightsPage";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <InsightsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:difficulty"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/login" element={<AuthPage />} />
        <Route path="/auth/reg" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
