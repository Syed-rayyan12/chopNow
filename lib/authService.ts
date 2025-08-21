// lib/api/authService.ts

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  number: string;
  password: string;
  role?: string; // optional if backend supports multiple roles
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// ✅ keep API base in one place
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

// Helper to make fetch requests (generic for type safety)
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // Handle error response
  if (!res.ok) {
    let errorMessage = "Something went wrong";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (_) {}
    throw new Error(errorMessage);
  }

  return (await res.json()) as T;
}

// ✅ Register
export async function registerUser(userData: RegisterPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// ✅ Login
export async function loginUser(credentials: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
