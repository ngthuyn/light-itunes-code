"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import ClaimForm from "@/components/ClaimForm";
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
    <main className="min-h-screen bg-[#fff4f5]">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* Header */}
        <div className="mb-7">
          <Header />
        </div>

        {/* Tabs */}
        <div className="mx-auto w-full max-w-3xl">
          <Tabs
            tab={tab}
            setTab={setTab}
          />
        </div>

        {/* Content */}
        {tab === "claim" ? (
          <div className="mx-auto mt-7 w-full max-w-2xl">
            <ClaimForm />
          </div>
        ) : (
          <div className="mx-auto mt-7 w-full max-w-5xl">
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