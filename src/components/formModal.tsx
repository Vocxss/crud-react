import { useEffect, useState } from "react";
import { Card } from "./card";
import { Button } from "./button";

interface IFormModal {
  children: React.ReactNode;
  title: string;
  onSubmit: () => void | Promise<void>;
  onOpen?: () => void;
}

export const FormModal = ({
  children,
  title,
  onSubmit,
  onOpen,
}: IFormModal) => {
  const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const FormModalTrigger = ({ children }: { children: React.ReactNode }) => {
    return (
      <Button
        onClick={() => {
          onOpen?.();
          setIsOpen(true);
        }}
      >
        {children}
      </Button>
    );
  };

  return (
    <>
      <FormModalTrigger>{title}</FormModalTrigger>
      {isOpen && (
        <div className="fixed inset-0 z-2 flex items-center justify-center bg-black/50">
          <div className="w-1/3">
            <Card>
              <h2 className="text-lg font-bold mb-2">{title}</h2>
              <form
                action=""
                className="flex flex-col gap-3"
                onSubmit={async (event) => {
                  event.preventDefault();
                  await onSubmit();
                  setIsOpen(false);
                }}
              >
                {children}
                <div className="mt-2 flex justify-between items-center">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
