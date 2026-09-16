"use client";

import { useState } from "react";
import { claimCode } from "@/lib/api";
import { Copy, Gift, Check } from "lucide-react";

export default function ClaimForm() {
  const [fandom, setFandom] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleClaim() {
    if (!fandom.trim()) {
      alert("Vui lòng nhập tên Threads/Fandom.");
      return;
    }

    setLoading(true);
    setCopied(false);

    try {
      const result = await claimCode(fandom.trim());

      if (result.success) {
        setCode(result.code ?? "");
        setFandom("");

        // Cập nhật FanWall ngay lập tức
        window.dispatchEvent(new Event("claim-success"));
      } else {
        alert(
          result.message || "Không thể nhận code."
        );
      }
    } catch (err) {
      console.error("claim code error:", err);

      alert(
        "Không thể kết nối tới máy chủ."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyCode() {
    if (!code) return;

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea =
          document.createElement("textarea");

        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(
          0,
          textarea.value.length
        );

        const successful =
          document.execCommand("copy");

        document.body.removeChild(textarea);

        if (!successful) {
          throw new Error(
            "Fallback copy failed"
          );
        }
      }

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(
        "copy code error:",
        err
      );

      alert(
        "Không thể tự động sao chép. Vui lòng nhấn giữ code để sao chép."
      );
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-[#66303d] bg-[#2b1a20] p-5 shadow-xl shadow-black/20 md:p-6">

      {/* =========================
          TITLE
      ========================== */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <Gift
          size={24}
          strokeWidth={2}
          className="text-[#d68a9a]"
        />

        <h2 className="text-xl font-bold text-[#f3e7e9] md:text-2xl">
          Nhận iTunes Code
        </h2>
      </div>

      {/* =========================
          TWO COLUMNS
      ========================== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* =========================
            LEFT - FORM
        ========================== */}
        <div className="h-[230px] rounded-2xl border border-[#66303d] bg-[#321d24] p-4">

          <div className="space-y-4">

            {/* NAME / FANDOM */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#d8c5c9]">
                Tên bạn/Tên Fandom
              </label>

              <input
                type="text"
                value={fandom}
                onChange={(e) =>
                  setFandom(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !loading
                  ) {
                    handleClaim();
                  }
                }}
                placeholder="Tên bạn/Tên Fandom"
                disabled={loading}
                className="w-full rounded-xl border border-[#713746] bg-[#24151a] px-3.5 py-3 text-sm text-[#f5e8eb] outline-none transition placeholder:text-[#aa8c94] focus:border-[#c52f52] focus:ring-1 focus:ring-[#c52f52] disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* CLAIM BUTTON */}
            <button
              type="button"
              onClick={handleClaim}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c52f52] py-3.5 text-sm font-bold text-white transition hover:bg-[#d63b5d] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Gift size={18} />

              {loading
                ? "Đang lấy code..."
                : "Nhận iTunes Code"}
            </button>

          </div>
        </div>

        {/* =========================
            RIGHT - CODE
        ========================== */}
        <div className="h-[230px] rounded-2xl border border-[#66303d] bg-[#321d24] p-4">

          {code ? (
            <div className="flex h-full flex-col">

              {/* CODE TITLE */}
              <p className="mb-3 text-sm font-semibold text-[#d8c5c9]">
                🎁 CODE CỦA BẠN
              </p>

              {/* CODE */}
              <div className="rounded-xl border border-[#5c2a36] bg-[#211217] p-4">
                <p className="break-all text-center font-mono text-lg font-bold tracking-widest text-[#f0dfe3]">
                  {code}
                </p>
              </div>

              {/* COPY */}
              <button
                type="button"
                onClick={copyCode}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition ${
                  copied
                    ? "bg-[#5c2634]"
                    : "bg-[#32171e] hover:bg-[#47202a]"
                }`}
              >
                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied
                  ? "Đã sao chép"
                  : "Copy Code"}
              </button>

            </div>
          ) : (

            /* EMPTY STATE */
            <div className="flex h-full items-center justify-center text-center text-[#927b81]">

              <div>
                <Gift
                  size={30}
                  className="mx-auto mb-3 opacity-50"
                />

                <p className="text-sm leading-6">
                  Code của bạn sẽ xuất hiện ở đây
                  <br />
                  sau khi bấm nhận code.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}