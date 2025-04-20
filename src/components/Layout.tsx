type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">CV Generator</h1>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-center">{children}</div>
    </main>
  );
};
