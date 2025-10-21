import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto flex flex-col items-center h-full w-full max-w-3xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
