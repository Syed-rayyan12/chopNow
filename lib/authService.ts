export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role?: string;
  };
}

// ✅ Centralized API base URL
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

// ✅ Generic request handler
export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      let errorMessage = `Request failed with status ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (_) {}
      throw new Error(errorMessage);
    }

    return (await res.json()) as T;
  } catch (err: any) {
    throw new Error(`API request failed: ${err.message}`);
  }
}

// ✅ User Signup
export async function registerUser(userData: SignupPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// ✅ Rider Signup
export async function registerRider(userData: SignupPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/rider/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// ✅ Restaurant Signup
export async function registerRestaurant(userData: SignupPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/restaurant/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// ✅ Admin Signup
export async function registerAdmin(userData: SignupPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/admin/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// ✅ Login (for user by default)
export async function loginUser(credentials: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// ✅ Rider Login
export async function loginRider(credentials: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/rider/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
