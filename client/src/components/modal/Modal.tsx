import React, { cloneElement, ReactNode, useContext, useState } from "react";

interface ModalContext {
  open: boolean;
  toggleModal(bool: boolean): void;
}
interface ModalProps {
  children: JSX.Element;
  onClick?(): void;
}

// context를 사용하면 모든 컴포넌트를 일일히 통과하지 않고도
// 원하는 값을 트리 끝까지 보낼 수 있다.
const ModalContext = React.createContext<ModalContext | null>(null);
ModalContext.displayName = "ModalContext";

//컨텍스트 프로바이더 컴포넌트
export function Modal({ children }: ModalProps) {
  const [open, setOpen] = useState(false);
  const toggleModal = (bool: boolean) => setOpen(bool);
  return (
    <ModalContext.Provider value={{ open, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("에러 발생");
  }
  return context;
}

export function ModalBg() {
  const { open } = useModalContext();
  return open ? (
    <div className="fixed left-0 top-0 w-full h-full animation-fade-in bg-transparent h-5"></div>
  ) : null;
}

export function ModalContents({ children }: ModalProps) {
  const { open, toggleModal } = useModalContext();
  return open ? children : null;
}

export function ModalOpenTrigger({ children }: ModalProps) {
  const { toggleModal } = useModalContext();
  return cloneElement(children, { onClick: () => toggleModal(true) });
}

export function ModalCloseTrigger({ children }: ModalProps) {
  const { toggleModal } = useModalContext();
  return cloneElement(children, { onClick: () => toggleModal(false) });
}

export default Modal;
