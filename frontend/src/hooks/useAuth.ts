import useSWR from "swr";
import { api } from "../api/client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface MeResponse {
  ok: boolean;
  user: AuthUser;
}

export const useAuth = () => {
  const { data, error, mutate } = useSWR<AuthUser | null>("/auth/me", async (key: string) => {
    try {
      const res = await api.get<MeResponse>(key);
      if (res.data.ok) {
        return res.data.user;
      }
      return null;
    } catch {
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    const res = await api.post<{ ok: boolean; user: AuthUser; token: string }>("/auth/login", { email, password });
    if (res.data.ok) {
      window.localStorage.setItem("skyline_token", res.data.token);
      await mutate();
    }
    return res.data;
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post<{ ok: boolean; user: AuthUser; token: string }>("/auth/register", {
      name,
      email,
      password,
    });
    if (res.data.ok) {
      window.localStorage.setItem("skyline_token", res.data.token);
      await mutate();
    }
    return res.data;
  };

  const logout = async () => {
    window.localStorage.removeItem("skyline_token");
    await mutate(null, { revalidate: false });
  };

  return {
    user: data ?? null,
    loading: !data && !error,
    error,
    login,
    register,
    logout,
    refresh: mutate,
  };
}
