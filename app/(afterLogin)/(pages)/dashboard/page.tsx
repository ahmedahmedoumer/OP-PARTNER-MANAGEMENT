'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmPage from './_components/confirmation';

const banks = [
  { name: 'Commercial Bank of Ethiopia', branches: ['Addis Ababa', 'Adama', 'Hawassa'] },
  { name: 'Dashen Bank', branches: ['Bole', 'Piazza', 'Mekelle'] },
  { name: 'Awash Bank', branches: ['Gonder', 'Bahir Dar', 'Jimma'] },
];

const steps = [
  'Check Merchant',
  'Distribution Detail',
  'Business Type',
  'Business Detail',
  'Business Owner',
  'Fund Withdraw',
  'Review',
];

export default function Dashboard() {
  const [activeStep, setActiveStep] = useState(5); // Start at Fund Withdraw for demo
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // For desktop collapse

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const selectedBank = banks.find(b => b.name === bank);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case 'bank':
        if (!value) return 'Bank Name is required';
        break;
      case 'branch':
        if (!value) return 'Branch Name is required';
        break;
      case 'accountName':
        if (!value) return 'Bank Account Name is required';
        if (typeof value !== 'string') return 'Account Name must be a string';
        if (!/^[A-Za-z\s]+$/.test(value)) return 'Account Name must contain only letters and spaces';
        break;
      case 'accountNumber':
        if (!value) return 'Bank Account Number is required';
        if (!/^[0-9]+$/.test(value)) return 'Account Number must be numeric';
        break;
      case 'file':
        if (!value) return 'Bank Account File is required';
        if (!['application/pdf', 'image/png', 'image/jpeg'].includes(value.type)) return 'File must be PDF, PNG, or JPG';
        break;
      default:
        return '';
    }
    return '';
  };

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!bank) newErrors.bank = 'Bank Name is required';
    if (!branch) newErrors.branch = 'Branch Name is required';
    if (!accountName) newErrors.accountName = 'Bank Account Name is required';
    if (!accountNumber) newErrors.accountNumber = 'Bank Account Number is required';
    else if (!/^[0-9]+$/.test(accountNumber)) newErrors.accountNumber = 'Account Number must be numeric';
    if (!file) newErrors.file = 'Bank Account File is required';
    else if (!['application/pdf', 'image/png', 'image/jpeg'].includes(file.type)) newErrors.file = 'File must be PDF, PNG, or JPG';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ bank: true, branch: true, accountName: true, accountNumber: true, file: true });
    if (validate()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop & overlay for mobile */}
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      {/* No dark overlay for mobile sidebar; background is page content */}
      <aside
        className={`fixed z-50 md:static top-0 left-0 h-full min-h-screen bg-[#0A1931] text-white flex flex-col py-6 px-4 transition-all duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${sidebarCollapsed ? 'w-20' : 'w-56'}
          md:flex
        `}
        style={{ minWidth: sidebarCollapsed ? '3.5rem' : '14rem' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Collapse/Expand button for desktop */}
        <button
          className="hidden md:block absolute top-4 right-2 bg-[#185ADB] text-white rounded p-1 hover:bg-[#10316B] transition-colors"
          onClick={() => setSidebarCollapsed(c => !c)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          )}
        </button>
        <h2 className={`font-bold text-lg mb-8 transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>OP-PARTNER MANAGEMENT</h2>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#185ADB] transition-colors">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
            <span className={`transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>Dashboard</span>
          </a>
          <a href="/dashboard" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#185ADB] transition-colors">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8h-8m8 0a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
            <span className={`transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>Onboarding</span>
          </a>
          <a href="/dashboard" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#185ADB] transition-colors">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className={`transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>View</span>
          </a>
        </nav>
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 bg-[#185ADB] text-white rounded p-1 hover:bg-[#10316B] transition-colors"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </aside>
      {/* Main Content */}
      <main className={`flex-1 p-0 sm:p-1 md:p-2 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-12' : ''} ${sidebarOpen ? 'overflow-hidden h-screen' : ''}`}
        onClick={() => { if (sidebarOpen) setSidebarOpen(false); }}
        style={{ overflowX: 'hidden' }}
      >
        {/* Stepper */}
        <div className="bg-white rounded shadow p-6 sm:p-6 mb-6 pt-12 mt-4 sm:mt-0">
          <div className="flex flex-wrap items-stretch justify-center gap-y-4 gap-x-2 mb-4">
            {steps.map((step, idx) => (
              <div key={step} className="flex flex-col items-center justify-end flex-grow min-w-[70px] max-w-[120px] basis-1/3 sm:basis-1/6">
                <button
                  type="button"
                  className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 focus:outline-none transition-colors ${idx < activeStep ? 'bg-green-100 border-green-400 text-green-600' : idx === activeStep ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-400'} ${idx < activeStep ? 'cursor-pointer hover:border-green-600' : idx === activeStep ? 'cursor-default' : 'cursor-not-allowed'}`}
                  onClick={() => { if (idx < activeStep) setActiveStep(idx); }}
                  disabled={idx > activeStep}
                  aria-current={idx === activeStep ? 'step' : undefined}
                  tabIndex={0}
                >
                  {idx < activeStep ? (
                    // Checkmark SVG for completed steps
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : idx === activeStep ? (
                    idx + 1
                  ) : (
                    // Empty for future steps
                    <span className="text-gray-400"> </span>
                  )}
                </button>
                <span className={`mt-2 text-[10px] sm:text-xs font-semibold text-center break-words max-w-[70px] sm:max-w-none ${idx === activeStep ? 'text-green-600' : idx < activeStep ? 'text-green-500' : 'text-gray-400'}`}>{step}</span>
                {idx < steps.length - 1 && <div className={`h-1 w-full ${idx < activeStep ? 'bg-green-400' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>
        {/* Step Content */}
        {activeStep >= 0 && activeStep <= 4 && (
          <div className="bg-white rounded shadow p-8">
            <h3 className="text-lg font-bold mb-6 text-green-700 text-center">{steps[activeStep]}</h3>
            <div className="text-gray-700 text-center mb-8">Step {activeStep + 1} content goes here.</div>
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold"
                disabled={activeStep === 0}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {activeStep === 5 && (
          <form className="bg-white rounded shadow p-8" onSubmit={handleNext}>
            <h3 className="text-lg font-bold mb-6 text-green-700 text-center">Fund Withdraw Option</h3>
            <div className="flex items-center mb-6">
              <input type="checkbox" checked readOnly className="accent-green-600 w-5 h-5 mr-2" />
              <span className="font-semibold text-green-600 text-lg">Bank</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div className="col-span-1 lg:col-span-1">
                <label className="block mb-1 font-medium text-gray-800">Bank</label>
                <select
                  className={`w-full border rounded px-3 py-2 text-gray-800 ${touched.bank && errors.bank ? 'border-red-500' : 'border-gray-300'}`}
                  value={bank}
                  onChange={e => {
                    const value = e.target.value;
                    setBank(value);
                    setBranch('');
                    setTouched(t => ({ ...t, bank: true }));
                    setErrors(errs => ({ ...errs, bank: validateField('bank', value) }));
                  }}
                  onBlur={() => setTouched(t => ({ ...t, bank: true }))}
                >
                  <option value="" className="text-gray-800">Select Bank</option>
                  {banks.map(b => <option key={b.name} value={b.name} className="text-gray-800">{b.name}</option>)}
                </select>
                {touched.bank && errors.bank && <p className="text-red-500 text-xs mt-1">{errors.bank}</p>}
              </div>
              <div className="col-span-1 lg:col-span-1">
                <label className="block mb-1 font-medium text-gray-800">Select Branch</label>
                <select
                  className={`w-full border rounded px-3 py-2 text-gray-800 ${touched.branch && errors.branch ? 'border-red-500' : 'border-gray-300'}`}
                  value={branch}
                  onChange={e => {
                    const value = e.target.value;
                    setBranch(value);
                    setTouched(t => ({ ...t, branch: true }));
                    setErrors(errs => ({ ...errs, branch: validateField('branch', value) }));
                  }}
                  onBlur={() => setTouched(t => ({ ...t, branch: true }))}
                  disabled={!bank}
                >
                  <option value="" className="text-gray-800">Select Branch</option>
                  {selectedBank && selectedBank.branches.map(br => <option key={br} value={br} className="text-gray-800">{br}</option>)}
                </select>
                {touched.branch && errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
              </div>
              <div className="col-span-1 lg:col-span-1">
                <label className="block mb-1 font-medium text-gray-800">Account Name</label>
                <input
                  type="text"
                  className={`w-full border rounded px-3 py-2 text-gray-800 ${touched.accountName && errors.accountName ? 'border-red-500' : 'border-gray-300'}`}
                  value={accountName}
                  onChange={e => {
                    const value = e.target.value;
                    setAccountName(value);
                    setTouched(t => ({ ...t, accountName: true }));
                    setErrors(errs => ({ ...errs, accountName: validateField('accountName', value) }));
                  }}
                  onBlur={() => setTouched(t => ({ ...t, accountName: true }))}
                  placeholder="Enter Account Name"
                />
                {touched.accountName && errors.accountName && <p className="text-red-500 text-xs mt-1">{errors.accountName}</p>}
              </div>
              <div className="col-span-1 lg:col-span-1">
                <label className="block mb-1 font-medium text-gray-800">Account Number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`w-full border rounded px-3 py-2 text-gray-800 ${touched.accountNumber && errors.accountNumber ? 'border-red-500' : 'border-gray-300'}`}
                  value={accountNumber}
                  onChange={e => {
                    const value = e.target.value;
                    setAccountNumber(value);
                    setTouched(t => ({ ...t, accountNumber: true }));
                    setErrors(errs => ({ ...errs, accountNumber: validateField('accountNumber', value) }));
                  }}
                  onBlur={() => setTouched(t => ({ ...t, accountNumber: true }))}
                  placeholder="Enter Account Number"
                />
                {touched.accountNumber && errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
              </div>
              <div className="col-span-1 lg:col-span-1">
                <label className="block mb-1 font-medium text-gray-800">Proof of Bank Account</label>
                <input
                  type="file"
                  accept="application/pdf,image/png,image/jpeg"
                  className={`w-full border rounded px-3 py-2 text-gray-800 ${touched.file && errors.file ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={e => {
                    const f = e.target.files?.[0] || null;
                    setFile(f);
                    setTouched(t => ({ ...t, file: true }));
                    setErrors(errs => ({ ...errs, file: validateField('file', f) }));
                  }}
                  onBlur={() => setTouched(t => ({ ...t, file: true }))}
                />
                {touched.file && errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button type="button" onClick={handleBack} className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold">Back</button>
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700">Next</button>
            </div>
          </form>
        )}
        {activeStep === 6 && (
          <ConfirmPage
            bank={bank}
            branch={branch}
            accountName={accountName}
            accountNumber={accountNumber}
            fileName={file?.name || ''}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
} 