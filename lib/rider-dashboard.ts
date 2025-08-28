import { request, AuthResponse } from "@/lib/authService"; // or import request from a shared utils file

export interface DashboardSummary {
  earnings: number;
  completedOrders: number;
  rating: number;
  onlineTime: string;
}

// ✅ Fetch dashboard summary
export async function getDashboardSummary(token: string): Promise<DashboardSummary> {
  return request<DashboardSummary>("/rider/dashboard/summary", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
