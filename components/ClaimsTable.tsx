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
    return claims.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.fandom.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword)
      );
    });
  }, [claims, search]);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="mb-5 text-2xl font-bold">
        Người đã nhận code
      </h2>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b">

            <tr>

              <th className="p-3 text-left">Fandom</th>

              <th className="text-left">Email</th>

              <th className="text-left">Code</th>

              <th className="text-left">Time</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-stone-50"
              >

                <td className="p-4 font-semibold">

                  {item.fandom}

                </td>

                <td>{item.email}</td>

                <td className="font-mono">

                  {item.code}

                </td>

                <td>{item.time}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}