import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for persisted user session
    const storedUser = localStorage.getItem("thirukochi-user");
    const profileData = localStorage.getItem("thirukochi-profile");
    
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        // Sync with profile data if available
        if (profileData) {
           const profile = JSON.parse(profileData);
           userObj.name = profile.formData?.fullName || userObj.name;
           userObj.avatar = profile.avatarDataUrl || userObj.avatar;
           userObj.role = profile.formData?.designation || userObj.role;
        }
        setUser(userObj);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("thirukochi-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login logic
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple validation for demo
    if (email && password) {
      const mockUser = {
        name: "Robert Brown",
        email: email,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        role: "Manager"
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("thirukochi-user", JSON.stringify(mockUser));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, message: "Invalid credentials" };
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    
    // Simulate API registration delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Simple validation for demo
    if (name && email && password) {
      const mockUser = {
        name,
        email,
        avatar: "https://images.unsplash.com/photo-1544168190-79c15427015f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        role: "New User" // Default role
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("thirukochi-user", JSON.stringify(mockUser));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, message: "Please fill out all mandatory fields" };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("thirukochi-user");
  };

  const updateUser = (userData) => {
    setUser((prev) => {
      const next = { ...prev, ...userData };
      localStorage.setItem("thirukochi-user", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
