import React, { useEffect, useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("abc");
    const modalCloseKeyEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", modalCloseKeyEvent);
    return () => window.removeEventListener("keydown", modalCloseKeyEvent);
  }, []);

  const modalOpen = () => {
    setIsModalOpen(true);
  };
  const modalClose = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, modalClose, modalOpen };
}
