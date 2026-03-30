const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001"; 

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  // Ensure there are no double slashes if endpoint starts with /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  const res = await fetch(`${API_BASE}/api${cleanEndpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    console.warn("Unauthorized → redirecting to login");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/auth";
    return;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }

  return res.json();
}