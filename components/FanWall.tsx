"use client";

import { useEffect, useState } from "react";
import { getClaims } from "@/lib/api";
import type { Claim } from "@/types";

export default function FanWall() {
  const [fans, setFans] = useState<Claim[]>([]);

  async function loadFans() {
    try {
      const data = await getClaims();

      // Người nhận mới nhất lên đầu
      setFans(data.reverse());
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadFans();

    const timer = setInterval(loadFans, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold">
        💬 Danh sách đã nhận code
      </h2>

      <div className="space-y-4 max-h-[600px] overflow-y-auto">

        {fans.length === 0 && (
          <p className="text-stone-500">
            Chưa có ai nhận code.
          </p>
        )}

        {fans.map((fan) => (

          <div
            key={fan.id}
            className="rounded-xl border p-4"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-700 text-white font-bold">

                {fan.fandom.charAt(0).toUpperCase()}

              </div>

              <div>

                <p className="font-semibold">
                  {fan.fandom}
                </p>

                <p className="text-sm text-stone-500">
                  đã nhận iTunes Code của lighT 🎉
                </p>

                <p className="text-xs text-stone-400">
                  {fan.time}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}