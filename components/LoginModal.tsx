"use client";

import { useState } from "react";
import { login } from "@/lib/api";

type Props = {
  onSuccess: () => void;
};

export default function LoginModal({ onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!password.trim()) {
      alert("Vui lòng nhập mật khẩu.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(password);

      if (result.success) {
        localStorage.setItem("admin", "true");
        onSuccess();
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối tới máy chủ.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="mb-2 text-center text-3xl font-bold">
        🔐 Admin Login
      </h2>

      <p className="mb-8 text-center text-stone-500">
        Chỉ dành cho quản trị viên
      </p>

      <input
        type="password"
        placeholder="Nhập mật khẩu..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleLogin();
        }}
        className="w-full rounded-xl border border-stone-300 p-4 outline-none focus:border-stone-700"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-stone-800 py-4 font-semibold text-white transition hover:bg-black disabled:opacity-60"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </div>
  );
}