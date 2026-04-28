import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import StaffLayout from "layouts/staff";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthLayout from "./layouts/auth";
import LoginPage from "./views/auth/login";
import SignUpPage from "./views/auth/signup";
import ForgotPasswordPage from "./views/auth/forgot-password";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="auth/*"
          element={
            <AuthLayout>
              <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
              </Routes>
            </AuthLayout>
          }
        />
        <Route
          path="admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="staff/*"
          element={
            <ProtectedRoute>
              <StaffLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
