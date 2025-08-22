// lib/api/authService.ts

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email:string;
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
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

// Helper to make fetch requests (generic for type safety)
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    // Handle non-2xx responses
    if (!res.ok) {
      let errorMessage = `Request failed with status ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (_) {
        // ignore parse errors
      }
      throw new Error(errorMessage);
    }

    // Success (2xx)
    return (await res.json()) as T;
  } catch (err: any) {
    // Handle network failures or unexpected issues
    throw new Error(`API request failed: ${err.message}`);
  }
}

// ✅ Register
export async function registerUser(userData: SignupPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/signup", {
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
