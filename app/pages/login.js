import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Validation functions
  const validateEmail = (value) => {
    if (!value) return 'Email is required.';
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Enter a valid email address.';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required.';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(value)) return 'Password must have at least one uppercase letter.';
    if (!/[a-z]/.test(value)) return 'Password must have at least one lowercase letter.';
    if (!/[0-9]/.test(value)) return 'Password must have at least one number.';
    if (!/[^A-Za-z0-9]/.test(value)) return 'Password must have at least one special character.';
    return '';
  };

  // Handle input changes and validation
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    if (!emailError && !passwordError) {
      router.push('/dashboard');
    }
  };

  const isFormValid =
    !validateEmail(email) && !validatePassword(password);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-600 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/mpesa-logo.png" alt="M-PESA" className="h-8" />
          <span className="text-white font-bold text-lg">Safaricom</span>
        </div>
        <div className="space-x-4 hidden sm:flex">
          <button className="text-white font-semibold">APPLY</button>
          <button className="text-white font-semibold">RECOMMEND</button>
          <button className="bg-white text-green-600 px-4 py-1 rounded font-semibold">LOGIN</button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center p-4">
        {/* Login Form */}
        <div className="bg-white rounded shadow-md p-8 w-full max-w-md mx-auto md:mx-0 md:mr-8">
          <h2 className="text-2xl font-bold mb-2">M-PESA Acquisition Portal</h2>
          <p className="mb-6 text-gray-700 text-sm">
            Welcome to M-PESA world of convenience! This Portal provides an efficient way to access and manage your sales.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  type="email"
                  className={`pl-10 pr-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="username"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`pl-3 pr-10 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded font-bold text-white mt-2 ${isFormValid ? 'bg-green-600 hover:bg-green-700' : 'bg-green-300 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              LOGIN
            </button>
          </form>
          <div className="text-center mt-4">
            <a href="#" className="text-green-600 text-sm font-semibold hover:underline">FORGOT PASSWORD?</a>
          </div>
        </div>
        {/* Right Side Icons (hidden on mobile) */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1">
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-green-100 rounded-full p-6 border-4 border-green-400">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="green"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
            <div className="flex space-x-4">
              <div className="bg-blue-100 rounded-full p-4">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="blue"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" /></svg>
              </div>
              <div className="bg-red-100 rounded-full p-4">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="red"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>
              </div>
              <div className="bg-blue-100 rounded-full p-4">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="blue"><rect x="6" y="6" width="12" height="12" rx="2" strokeWidth="2" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 