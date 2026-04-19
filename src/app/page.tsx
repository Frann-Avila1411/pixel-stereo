export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#001d3d] via-[#003566] to-[#000814]">
      {/* Overlay de ruido o grano para estilo retro */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Capas de Parallax*/}
      <section className="relative w-full h-full flex items-center justify-center">
        <h1 className="text-2xl md:text-4xl text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] animate-pulse text-center px-4">
          MERECE LO QUE SUEÑAS
        </h1>
      </section>

      {/* Controles de Audio fijos */}
      <div className="absolute bottom-10 left-0 w-full z-[60]">
        {/* Componente AudioPlayer */}
      </div>
    </main>
  );
}
