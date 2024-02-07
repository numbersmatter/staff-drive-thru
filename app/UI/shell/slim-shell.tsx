export default function SlimShell(
  { children }: { children: React.ReactNode }
) {
  return ( 
    <div className="h-screen flex flex-col bg-slate-500 ">
      {children}
    </div>
  );
}
