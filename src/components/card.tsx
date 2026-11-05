export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background flex flex-col gap-3 justify-center rounded-2xl p-8 text-sm border border-primary/20 shadow-xl shadow-primary/10 w-full">
      {children}
    </div>
  );
};
