import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import FormDialog from './FormDialog.jsx';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/thibaut@sparkle.vc';

const InvestorForm = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    workEmail: '',
    country: '',
    investorType: '',
    message: '',
    professionalInvestor: false,
    notPublicOffering: false,
    privacyConsent: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    try {
      setIsSending(true);
      const data = new FormData();
      data.append('Full Name', formData.fullName);
      data.append('Organization', formData.organization);
      data.append('Work Email', formData.workEmail);
      data.append('Country', formData.country);
      data.append('Investor Type', formData.investorType);
      data.append('Message', formData.message);
      data.append('Confirmed Professional/Qualified Investor', formData.professionalInvestor ? 'Yes' : 'No');
      data.append('Acknowledged Not a Public Offering', formData.notPublicOffering ? 'Yes' : 'No');
      data.append('Consented to Privacy Policy', formData.privacyConsent ? 'Yes' : 'No');
      data.append('_subject', 'New Investment Inquiry — Website');
      data.append('_template', 'table');
      data.append('_captcha', 'false');

      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Submission failed');
      }

      setIsSubmitted(true);
    } catch (err) {
      setErrorMsg(
        'Sorry, something went wrong. Please try again in a moment or email us directly.'
      );
      console.error('FormSubmit error:', err);
    } finally {
      setIsSending(false);
    }
  };

  const isReady =
    formData.fullName.trim() &&
    formData.organization.trim() &&
    /\S+@\S+\.\S+/.test(formData.workEmail) &&
    formData.country &&
    formData.investorType &&
    formData.message.trim() &&
    formData.professionalInvestor &&
    formData.notPublicOffering &&
    formData.privacyConsent;

  return (
    <FormDialog isOpen={isOpen} onClose={onClose}>
      {isSubmitted ? (
        <div className="text-center py-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Thank you</h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Your inquiry has been received. Our investment team reviews submissions continuously and
            will reach out if there’s a strong fit.
          </p>
          <button onClick={onClose} className="mt-6 form-button-primary">
            Close
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-grotesk">
              Investment Inquiry
            </h3>
            <p className="text-slate-600 dark:text-slate-300">Connect with our investment team</p>
          </div>

          {errorMsg && (
            <div className="text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border border-rose-200/60 dark:border-rose-800/50 rounded-lg p-3">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Full Name"
              className="form-input"
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <input
              type="text"
              required
              placeholder="Organization"
              className="form-input"
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            />
            <input
              type="email"
              required
              placeholder="Work Email"
              className="form-input"
              onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
            />
            <select
              required
              className="form-input"
              defaultValue=""
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            >
              <option value="" disabled>
                Select Country
              </option>
              <option value="US">United States</option>
              <option value="FR">France</option>
              <option value="LU">Luxembourg</option>
              <option value="AE">United Arab Emirates</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="CH">Switzerland</option>
              <option value="other">Other</option>
            </select>
          </div>

          <select
            required
            className="form-input"
            defaultValue=""
            onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
          >
            <option value="" disabled>
              Investor Type
            </option>
            <option value="institutional">Institutional</option>
            <option value="professional">Professional</option>
            <option value="corporate">Corporate</option>
            <option value="family-office">Family Office</option>
          </select>

          <textarea
            required
            rows={3}
            placeholder="Message"
            className="form-input resize-none"
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <div className="space-y-3">
            <label className="form-checkbox">
              <input
                type="checkbox"
                required
                onChange={(e) =>
                  setFormData({ ...formData, professionalInvestor: e.target.checked })
                }
              />
              <span>I confirm I am a professional/qualified investor</span>
            </label>
            <label className="form-checkbox">
              <input
                type="checkbox"
                required
                onChange={(e) => setFormData({ ...formData, notPublicOffering: e.target.checked })}
              />
              <span>I acknowledge this is not a public offering</span>
            </label>
            <label className="form-checkbox">
              <input
                type="checkbox"
                required
                onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
              />
              <span>I consent to the privacy policy</span>
            </label>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onClose} className="form-button-secondary">
              Cancel
            </button>
            <button
              type="submit"
              className="form-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isReady || isSending}
            >
              {isSending ? 'Sending…' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </FormDialog>
  );
};

export default InvestorForm;
