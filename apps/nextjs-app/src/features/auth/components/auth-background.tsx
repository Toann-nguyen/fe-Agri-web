export const AuthBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url(/bg-hero-1.jpg)' }}
    >
      <div className="absolute inset-0 bg-slate-950/75" />
      <div className="dot-grid-dark absolute inset-0 opacity-30" />
    </div>
  </div>
);
