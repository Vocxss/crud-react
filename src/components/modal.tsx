import { useEffect, useState } from "react";
import { Card } from "./card";
import { Button } from "./button";
import { createPortal } from "react-dom";

interface IModal {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  onClick: () => void | Promise<void>;
}

export const Modal = ({ children, onClick, title, icon }: IModal) => {
  const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const ModalTrigger = ({ children }: { children: React.ReactNode }) => {
    return <Button onClick={() => setIsOpen(true)}>{children}</Button>;
  };

  return (
    <>
      <ModalTrigger>{title}{icon}</ModalTrigger>
      {isOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-1/3">
            <Card>
              {children}
              <div className="mt-2 flex justify-between items-center">
                <Button onClick={() => setIsOpen(false)} variant="outline">
                  Batal
                </Button>
                <Button onClick={async () => {
                  await onClick();
                  setIsOpen(false);
                }}>
                  Hapus
                </Button>
              </div>
            </Card>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
