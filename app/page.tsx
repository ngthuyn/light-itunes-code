"use client";


import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import ClaimForm from "@/components/ClaimForm";
import FanWall from "@/components/FanWall";
import Dashboard from "@/components/Dashboard";
import LoginModal from "@/components/LoginModal";
export default function Home() {

  const [tab, setTab] = useState<"claim" | "admin">("claim");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
  const admin = localStorage.getItem("admin");

  if (admin === "true") {
    setIsAdmin(true);
  }
}, []);
  return (
    <main className="min-h-screen bg-[#FFF3F3]">

      <div className="mx-auto max-w-6xl px-6 py-10">

        <Header />

        <Tabs
          tab={tab}
          setTab={setTab}
        />

        {tab === "claim" ? (

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

            <ClaimForm />

            <FanWall />

          </div>

        ) : (

        <div className="mt-8">

          {isAdmin ? (
            <Dashboard />
          ) : (
            <LoginModal
              onSuccess={() => setIsAdmin(true)}
            />
          )}

        </div>

        )}

      </div>

    </main>
  );
}