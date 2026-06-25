"use client";

import { useState } from "react";
import { claimCode } from "@/lib/api";
import { Copy, Gift, Check } from "lucide-react";
export default function ClaimForm() {
  const [fandom, setFandom] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
  async function handleClaim() {
    if (!fandom.trim()) {
      alert("Vui lòng nhập tên fandom.");
      return;
    }

    if (!email.trim()) {
      alert("Vui lòng nhập email.");
      return;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ.");
      return;
    }

    setLoading(true);

    try {
      const result = await claimCode(
        fandom.trim(),
        email.trim().toLowerCase()
      );

      if (result.success) {
        setCode(result.code ?? "");
        setShowSuccess(true);
        setCopied(false);
        setFandom("");
        setEmail("");
        }
      else {
        alert(result.message || "Không thể nhận code.");
      }
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối tới máy chủ.");
    } finally {
      setLoading(false);
    }
  }

async function copyCode() {
  await navigator.clipboard.writeText(code);

  setCopied(true);
}

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl shadow-rose-100">

      <div className="mb-8 flex items-center justify-center gap-3">
        <Gift size={28} />
        <h2 className="text-3xl font-bold">
          Nhận iTunes Code
        </h2>
      </div>

      <div className="space-y-5">

        <input
          value={fandom}
          onChange={(e) => setFandom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClaim();
          }}
          placeholder="Tên fandom"
          className="w-full rounded-xl border border-stone-300 p-4 outline-none transition focus:border-stone-700"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClaim();
          }}
          placeholder="Email"
          className="w-full rounded-xl border border-stone-300 p-4 outline-none transition focus:border-stone-700"
        />

        <button
          onClick={handleClaim}
          disabled={loading}
          className="w-full rounded-xl bg-rose-500 hover:bg-rose-600 py-4 text-lg font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Đang lấy code..." : "🎁 Nhận iTunes Code"}
        </button>

      </div>

      {showSuccess && (
        <div className="mt-8 rounded-2xl border border-green-300 bg-green-50 p-6">

          <p className="text-center text-xl font-bold text-green-700">
            🎉 Nhận code thành công
          </p>

          <div className="mt-5 rounded-xl bg-white p-4 shadow">
            <p className="break-all text-center font-mono text-2xl font-bold tracking-widest">
              {code}
            </p>
          </div>

            <button
            onClick={copyCode}
            className={`mx-auto mt-5 flex items-center gap-2 rounded-xl px-5 py-3 text-white transition ${
                copied
                ? "bg-green-600"
                : "bg-stone-800 hover:bg-black"
            }`}
            >
            {copied ? <Check size={18} /> : <Copy size={18} />}

            {copied ? "Đã sao chép" : "Copy Code"}
            </button>
            <button
            onClick={() => {
                setShowSuccess(false);
                setCode("");
                setCopied(false);

                // Cập nhật dữ liệu sau khi người dùng đóng popup
                window.location.reload();
            }}
            className="mt-4 w-full rounded-xl border border-stone-300 py-3 font-semibold transition hover:bg-stone-100"
            >
            Đóng
            </button>
        </div>
      )}

    </div>
  );
}