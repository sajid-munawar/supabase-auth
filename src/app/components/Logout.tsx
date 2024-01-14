"use client";
import { supabase } from "@/lib/initSupabase";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const router = useRouter();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log("error", error);
    deleteCookie("token");
    router.replace("/signin");
  }
  return (
    <div
      className="absolute top-10 right-10 w-full max-w-36 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
      onClick={signOut}
    >
      Logout
    </div>
  );
};

export default Logout;
