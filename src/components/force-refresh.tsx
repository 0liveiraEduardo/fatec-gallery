"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ForceRefresh() {
  const router = useRouter();

  useEffect(() => {
    console.log("ForceRefresh: Executando router.push...");
    router.refresh();
    console.log("ForceRefresh: router.push concluído.");
  }, [router]);

  return <></>;
}