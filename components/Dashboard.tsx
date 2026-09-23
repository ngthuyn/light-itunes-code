"use client";

import { useEffect, useMemo, useState } from "react";
import type { Claim } from "@/types";
import { getClaims } from "@/lib/api";
import SearchBar from "./SearchBar";

type Props = {
  onLogout: () => void;
};

export default function ClaimsTable({ onLogout }: Props) {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getClaims();
        setClaims(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return claims.filter((item) => {
      const fandom = String(item.fandom ?? "").toLowerCase();

      return fandom.includes(keyword);
    });
  }, [claims, search]);

  return (
    <div className="rounded-3xl bg-white p-6 text-stone-800 shadow-xl">

      {/* TITLE + LOGOUT */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-stone-800">
          Người đã nhận code
        </h2>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl bg-stone-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
        >
          Đăng xuất
        </button>
      </div>

      {/* SEARCH */}
      <div className="text-stone-800">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-stone-800">

          <thead className="border-b border-stone-200">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-stone-700">
                Fandom
              </th>

              <th className="p-3 text-left text-sm font-semibold text-stone-700">
                Code
              </th>

              <th className="p-3 text-left text-sm font-semibold text-stone-700">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b border-stone-200 hover:bg-stone-50"
              >
                <td className="p-4 font-semibold text-stone-700">
                  {item.fandom}
                </td>

                <td className="p-4 font-mono text-stone-700">
                  {item.code}
                </td>

                <td className="p-4 text-stone-700">
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}