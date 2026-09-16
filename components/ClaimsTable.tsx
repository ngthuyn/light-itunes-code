"use client";

import { useEffect, useMemo, useState } from "react";
import type { Claim } from "@/types";
import { getClaims } from "@/lib/api";
import SearchBar from "./SearchBar";

export default function ClaimsTable() {
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
      const email = String(item.email ?? "").toLowerCase();
      const code = String(item.code ?? "").toLowerCase();

      return (
        fandom.includes(keyword) ||
        email.includes(keyword) ||
        code.includes(keyword)
      );
    });
  }, [claims, search]);

  return (
    <div className="w-full rounded-3xl bg-white p-6 text-stone-900 shadow-xl">

      {/* TITLE */}
      <h2 className="mb-5 text-2xl font-bold text-stone-900">
        Người đã nhận code
      </h2>

      {/* SEARCH */}
      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-stone-900">

          <thead>
            <tr className="border-b-2 border-stone-300 bg-stone-50">
              <th className="p-3 font-bold text-stone-900">
                Fandom
              </th>

              <th className="p-3 font-bold text-stone-900">
                Email
              </th>

              <th className="p-3 font-bold text-stone-900">
                Code
              </th>

              <th className="p-3 font-bold text-stone-900">
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

                <td className="p-4 font-semibold text-stone-900">
                  {item.fandom}
                </td>

                <td className="p-4 text-stone-900">
                  {item.email}
                </td>

                <td className="p-4 font-mono font-semibold text-stone-900">
                  {item.code}
                </td>

                <td className="p-4 text-stone-700">
                  {item.time}
                </td>

              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-stone-500"
                >
                  Không tìm thấy dữ liệu.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}