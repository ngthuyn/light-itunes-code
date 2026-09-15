"use client";

import { useState } from "react";
import { claimCode } from "@/lib/api";
import { Copy, Gift, Check } from "lucide-react";

export default function ClaimForm() {
  const [fandom, setFandom] = useState("");
  const [email, setEmail] = useState("");
  const [claimedEmail, setClaimedEmail] = useState("");
  const [code, setCode] = useState("");
  const [claimCount, setClaimCount] = useState(0);
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

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(normalizedEmail)) {
      alert("Email không hợp lệ.");
      return;
    }

    setLoading(true);

    try {
      const result = await claimCode(
        fandom.trim(),
        normalizedEmail
      );

      if (result.success) {
        // Code vừa được cấp
        setCode(result.code ?? "");

        // Email đã dùng để nhận code
        setClaimedEmail(normalizedEmail);

        // Tổng số code email này đã nhận
        setClaimCount(Number(result.claimCount ?? 1));

        // Hiển thị thông báo thành công
        setShowSuccess(true);
        setCopied(false);

        // Xóa form
        setFandom("");
        setEmail("");
      } else {
        alert(result.message || "Không thể nhận code.");
      }
    } catch (err) {
      console.error("claim code error:", err);
      alert("Không thể kết nối tới máy chủ.");
    } finally {
      setLoading(false);
    }
  }

  async function copyCode() {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      console.error("copy code error:", err);
      alert("Không thể sao chép code.");
    }
  }

  function closeSuccess() {
    setShowSuccess(false);
    setCode("");
    setClaimedEmail("");
    setClaimCount(0);
    setCopied(false);

    // Cập nhật dữ liệu sau khi đóng
    window.location.reload();
  }

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-8 shadow-xl shadow-rose-100">

      {/* TITLE */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <Gift size={28} />

        <h2 className="text-3xl font-bold">
          Nhận iTunes Code
        </h2>
      </div>

      {/* FORM */}
      <div className="space-y-5">

        {/* FANDOM */}
        <input
          value={fandom}
          onChange={(e) => setFandom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              handleClaim();
            }
          }}
          placeholder="Tên fandom"
          className="w-full rounded-xl border border-stone-300 p-4 outline-none transition focus:border-stone-700"
        />

        {/* EMAIL */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              handleClaim();
            }
          }}
          placeholder="Email"
          className="w-full rounded-xl border border-stone-300 p-4 outline-none transition focus:border-stone-700"
        />

        {/* CLAIM BUTTON */}
        <button
          onClick={handleClaim}
          disabled={loading}
          className="w-full rounded-xl bg-rose-500 py-4 text-lg font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Đang lấy code..."
            : "🎁 Nhận iTunes Code"}
        </button>
      </div>

      {/* SUCCESS */}
      {showSuccess && (
        <div className="mt-8 rounded-2xl border border-green-300 bg-green-50 p-6">

          {/* EMAIL */}
          <p className="break-all text-center text-base font-medium text-stone-600">
            📧 {claimedEmail}
          </p>

          {/* SUCCESS MESSAGE */}
          <p className="mt-2 text-center text-xl font-bold text-green-700">
            🎉 Đã nhận code thành công
          </p>

          {/* CLAIM COUNT */}
          <p className="mt-2 text-center text-base font-semibold text-stone-700">
            📦 Email này đã nhận tổng cộng{" "}
            <span className="font-bold text-rose-600">
              {claimCount} code
            </span>
          </p>

          {/* THANK YOU */}
          <h4 className="mt-3 text-center text-sm font-bold leading-6 text-green-700">
            Cảm ơn bạn đã ủng hộ bài hát mới của lighT 💗
            <br />
            Chúc bạn nghe nhạc thật vui nhé!
          </h4>

          {/* CODE */}
          <div className="mt-5 rounded-xl bg-white p-4 shadow">
            <p className="break-all text-center font-mono text-2xl font-bold tracking-widest">
              {code}
            </p>
          </div>

          {/* COPY */}
          <button
            onClick={copyCode}
            disabled={!code}
            className={`mx-auto mt-5 flex items-center gap-2 rounded-xl px-5 py-3 text-white transition ${
              copied
                ? "bg-green-600"
                : "bg-stone-800 hover:bg-black"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {copied ? (
              <Check size={18} />
            ) : (
              <Copy size={18} />
            )}

            {copied
              ? "Đã sao chép"
              : "Copy Code"}
          </button>

          {/* CLOSE */}
          <button
            onClick={closeSuccess}
            className="mt-4 w-full rounded-xl border border-stone-300 py-3 font-semibold transition hover:bg-stone-100"
          >
            Đóng
          </button>
        </div>
      )}
    </div>
  );
}