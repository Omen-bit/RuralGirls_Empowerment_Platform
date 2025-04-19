export function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
      {children}
    </span>
  );
}