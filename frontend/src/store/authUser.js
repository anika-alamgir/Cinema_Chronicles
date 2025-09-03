import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useAuthUser = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingIn: false,
    isLoggingOut: false,
    signup: async (credentials) => {
        try {
            set({ isSigningUp: true });
            const response = await axios.post("/api/auth/signup", credentials);
            set({ user: response.data, isSigningUp: false });
            toast.success(
                response.data.message || "Account Created successfully"
            );
        } catch (error) {
            toast.error(error.response.data.message || "Sign Up failed");
            set({ isSigningUp: false, user: null });
        }
    },

    adminSignup: async (credentials) => {
        try {
            set({ isSigningUp: true });
            const response = await axios.post(
                "/api/auth/adminsignup",
                credentials
            );
            set({ user: response.data, isSigningUp: false });
            toast.success(
                response.data.message || "Admin Account Created successfully"
            );
        } catch (error) {
            toast.error(error.response.data.message || "Admin Sign Up failed");
            set({ isSigningUp: false, user: null });
            console.log(error.response.data);
        }
    },

    adminLogin: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post(
                "/api/auth/adminlogin",
                credentials
            );
            set({ user: response.data, isLoggingIn: false });
            toast.success(
                response.data.message || "Admin Logged in successfully"
            );
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            set({ user: null, isLoggingIn: false });
        }
    },

    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post("/api/auth/login", credentials);
            set({ user: response.data, isLoggingIn: false });
            toast.success(response.data.message || "Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            set({ user: null, isLoggingIn: false });
            console.log(error);
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("/api/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully");
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error(error.response.data.message || "Logout failed");
            console.log(error);
        }
    },

    forgotPassword: async (credentials) => {
        try {
            const response = await axios.post(
                "/api/auth/forgotpassword",
                credentials
            );
            toast.success(response.data.message || "Password reset successful");
        } catch (error) {
            toast.error(
                error.response.data.message || "Password reset unsuccessful"
            );
            console.log(error);
        }
    },

    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("/api/auth/check");
            set({ user: response.data, isCheckingAuth: false });
        } catch (error) {
            // console.log(error);
            set({ user: null, isCheckingAuth: false });
        }
    },
}));
