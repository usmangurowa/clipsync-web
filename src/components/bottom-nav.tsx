"use client";
import dynamic from "next/dynamic";
import React from "react";

const DockComponent = dynamic(() => import("@/components/dock-component"), {
  ssr: false,
});

const BottomNav = () => <DockComponent />;

export default BottomNav;
