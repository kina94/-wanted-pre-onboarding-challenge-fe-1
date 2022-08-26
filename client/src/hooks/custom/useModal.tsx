import { useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOpen = () => {
    setIsModalOpen(true);
  };
  const modalClose = () => {
    setIsModalOpen(false);
  };
  return { isModalOpen, modalClose, modalOpen };
}
