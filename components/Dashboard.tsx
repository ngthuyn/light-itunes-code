import { getStats } from "@/lib/api";
import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import ClaimsTable from "./ClaimsTable";
import { Stats } from "@/types";
function logout() {
  localStorage.removeItem("admin");
  window.location.reload();
}
export default function Dashboard() {

  const [stats, setStats] = useState<Stats>({
    total: 0,
    claimed: 0,
    remaining: 0,
  });

useEffect(() => {

  async function load() {
    const data = await getStats();
    setStats(data);
  }

  load();

  const timer = setInterval(load, 5000);

  return () => clearInterval(timer);

}, []);
  return (
    <div className="space-y-8">
       <div className="flex justify-end">

        <button
            onClick={logout}
            className="rounded-xl bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
        >
            Đăng xuất
        </button>

        </div>
            <div className="grid gap-6 md:grid-cols-3">

        <StatsCard
          title="Total Codes"
          value={stats.total}
        />

        <StatsCard
          title="Claimed"
          value={stats.claimed}
        />

        <StatsCard
          title="Remaining"
          value={stats.remaining}
        />

      </div>

      <ClaimsTable />

    </div>
  );
}