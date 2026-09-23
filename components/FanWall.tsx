"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getClaims } from "@/lib/api";
import type { Claim } from "@/types";

export default function FanWall() {
  const [fans, setFans] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFans() {
    try {
      const data = await getClaims();

      setFans([...data].reverse());
    } catch (err) {
      console.error("load fan wall error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFans();

    // Auto refresh every 5 seconds
    const timer = setInterval(() => {
      loadFans();
    }, 5000);

    // Update immediately after local claim
    const handleClaimSuccess = () => {
      loadFans();
    };

    window.addEventListener("claim-success", handleClaimSuccess);

    return () => {
      clearInterval(timer);

      window.removeEventListener(
        "claim-success",
        handleClaimSuccess
      );
    };
  }, []);

  function formatVietnamTime(time: string) {
    if (!time) return "";

    const date = new Date(time);

    if (Number.isNaN(date.getTime())) {
      return time;
    }

    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  }

  return (
    <div className="w-full rounded-3xl border border-[#66303d] bg-[#2b1a20] p-6 shadow-xl shadow-black/20 sm:p-8">
      <div className="max-h-[600px] space-y-4 overflow-y-auto pr-1">

        {/* EMPTY */}
        {!loading && fans.length === 0 && (
          <div className="py-10 text-center text-[#927b81]">
            <p className="text-2xl">💗</p>

            <p className="mt-2 text-sm">
              Hãy là người đầu tiên redeem code!
            </p>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="py-10 text-center text-[#927b81]">
            Đang tải...
          </div>
        )}

        {/* FEED */}
        {!loading &&
          fans.map((fan) => (
            <div
              key={fan.id}
              className="rounded-2xl border border-[#66303d] bg-[#28181e] p-6 transition hover:border-[#7d394b]"
            >
              <div className="text-sm leading-7">

                <p className="text-[#ead8dc]">
                  💗 Cảm ơn{" "}
                  <span className="font-bold text-[#f08da3]">
                    {fan.fandom}
                  </span>{" "}
                  đã redeem code!
                </p>

                <p className="mt-3 text-[#d1b8be]">
                  Mong bạn sẽ yêu thích{" "}
                  <Image
                    src="/vet_thuong.png"
                    alt="Vết Thương"
                    width={90}
                    height={24}
                    className="inline-block h-auto w-[90px] align-middle object-contain"
                  />{" "}
                  thật nhiều!
                </p>

              </div>

              <p className="mt-4 text-right text-xs text-[#96747e]">
                {formatVietnamTime(fan.time)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}