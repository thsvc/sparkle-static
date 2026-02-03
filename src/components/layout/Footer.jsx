const Footer = () => (
  <footer className="bg-slate-900 dark:bg-black text-slate-400 py-16">
    <div className="max-w-6xl mx-auto px-6 text-xs leading-relaxed">
      <h3 className="font-bold text-sm text-slate-200 mb-4 font-grotesk">Disclaimer</h3>
      <p className="mb-6">
        For professional/qualified investors only. Nothing herein constitutes an offer to the public
        or investment advice. Sparkle ventures GP is an authorised AIFM, regulated by the Luxembourg
        CSSF. Certain documentation or administration may be handled by an affiliated entity in the
        United Arab Emirates, subject to local regulations. Information regarding investment
        vehicles is illustrative only. Investing involves risk, including loss of capital. Past
        performance is not a reliable indicator of future results.
      </p>
      <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>.</p>
        <p className="text-slate-500">© {new Date().getFullYear()} Sparkle Ventures</p>
      </div>
    </div>
  </footer>
);

export default Footer;
