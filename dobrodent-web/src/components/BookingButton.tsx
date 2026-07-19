"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingModalContext";

interface BookingButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function BookingButton({ children, className }: BookingButtonProps) {
  const { openModal } = useBookingModal();

  return (
    <button onClick={openModal} className={className}>
      {children}
    </button>
  );
}
