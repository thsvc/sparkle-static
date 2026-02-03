const description = `Sparkle Ventures is a global deep-tech investment bank and fund manager. We bridge capital and technology between the United States and Europe Middle East.
We partner with a select group of global investors to back companies where frontier technologies evolve into global infrastructure.`;

const SparkleVenturesLanding = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-6 py-16 sm:py-20">
    <div className="w-full max-w-5xl text-center">
      <div className="flex flex-col items-center gap-8">
        <img
          src="/images/logo-sparkle.svg"
          alt="Sparkle Ventures"
          className="h-10 sm:h-12 md:h-14 w-auto mb-8 opacity-90"
        />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-slate-900">
          Bridging Capital and Technologies Globally
        </h1>

        <div className="max-w-3xl text-center mt-10">
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 whitespace-pre-line">
            {description}
          </p>
        </div>

        <a
          href="mailto:contact@sparkle.vc"
          className="mt-12 inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-base font-medium text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          contact@sparkle.vc
        </a>
      </div>

      <footer className="mt-16 text-sm text-slate-400">
        © Sparkle Ventures
      </footer>
    </div>
  </div>
);

export default SparkleVenturesLanding;
