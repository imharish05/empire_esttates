import React, { useState } from 'react';
import brandLogo from './assets/WhatsApp_Image_2026-06-18_at_5.37.30_PM-removebg-preview.png';
import Swal from 'sweetalert2';
import Dashboard from './Dashboard';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Login() {
  const [email, setEmail] = useState(() => localStorage.getItem('empire_admin_email') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  // Check localStorage on initial load - refresh panna login page ku pogadhu
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('empire_admin_auth') === 'true';
  });


  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: 'Authentication Error',
        text: 'Please enter your professional email.',
        icon: 'error',
        confirmButtonColor: '#735c00',
      });
      return;
    }
    
    // Simple validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: 'Authentication Error',
        text: 'Please enter a valid professional email address.',
        icon: 'error',
        confirmButtonColor: '#735c00',
      });
      return;
    }

    if (!password || password.length < 6) {
      Swal.fire({
        title: 'Authentication Error',
        text: 'Security key must be at least 6 characters.',
        icon: 'error',
        confirmButtonColor: '#735c00',
      });
      return;
    }

    setIsSubmitting(true);

    // Call backend API for secure authentication
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      setIsSubmitting(false);
      if (data.success) {
        Swal.fire({
          title: 'Welcome to Admin',
          text: 'Access granted successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          // Save auth state to localStorage so refresh doesn't logout
          localStorage.setItem('empire_admin_auth', 'true');
          localStorage.setItem('empire_admin_email', email);
          setIsAuthenticated(true);
        });
      } else {
        Swal.fire({
          title: 'Authentication Error',
          text: data.message || 'Invalid credentials.',
          icon: 'error',
          confirmButtonColor: '#735c00',
        });
      }
    })
    .catch(err => {
      setIsSubmitting(false);
      Swal.fire({
        title: 'Network Error',
        text: 'Failed to connect to the server.',
        icon: 'error',
        confirmButtonColor: '#735c00',
      });
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d4af37',
      cancelButtonColor: '#111111',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Clear localStorage on logout after alert closes
          localStorage.removeItem('empire_admin_auth');
          localStorage.removeItem('empire_admin_email');
          setIsAuthenticated(false);
          setEmail('');
          setPassword('');
          setError('');
        });
      }
    });
  };
  if (isAuthenticated) {
    return <Dashboard email={email} onLogout={handleLogout} />;
  }

  // Secure Portal Login Screen (Custom Gold & Black Split layout)
  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md overflow-x-hidden relative bg-[#000000]">
      {/* Background Decorative Element (Subtle Architectural feel in gold) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] border border-[#d4af37] rotate-12"></div>
        <div className="absolute -bottom-[5%] -right-[5%] w-[30%] h-[30%] border border-[#d4af37] -rotate-45"></div>
      </div>

      <main className="flex-1 flex items-center justify-center px-4 md:px-8 z-10 relative py-12">
        {/* Main Split Container Card (using login-card-container custom class) */}
        <div className="w-full max-w-[1000px] login-card-container rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[520px] transition-all duration-300">
          
          {/* Left Side: Brand Logo and Tagline Panel (Dark) */}
          <div className="hidden md:flex md:w-1/2 relative bg-[#111111] overflow-hidden flex-col items-center justify-center p-10 border-r border-[#d4af37]/20">
            {/* Architectural decorative line background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0">
              <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] border border-[#d4af37] rotate-12"></div>
              <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] border border-[#d4af37] -rotate-12"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Brand Logo (Original Brand Colors - Stands out on dark bg) */}
              <img 
                className="w-64 h-auto transition-transform duration-700 hover:scale-[1.02]" 
                src={brandLogo} 
                alt="Empire Estates"
              />
              
              {/* Brand Tagline (Gold for readability on dark background) */}
              <p className="font-display-lg text-lg italic theme-gold-text max-w-xs font-headline-lg leading-relaxed mt-8 drop-shadow-sm">
                "Precision in every detail, excellence in every estate."
              </p>
            </div>
          </div>

          {/* Right Side: Login Form (Gold Gradient) */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-[#ffe088] via-[#d4af37] to-[#a68212]">
            
            {/* Top Identity / Header */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                {/* Black logo to contrast against gold gradient */}
                <img src={brandLogo} alt="Empire Estates Logo" className="h-6 w-auto brightness-0" />
                <span className="font-headline-md text-sm uppercase tracking-[0.2em] text-black font-bold">Empire Estates</span>
              </div>
              
              <div className="mb-8">
                <h2 className="font-headline-md text-3xl text-black tracking-tight relative inline-block">
                  Login
                  <span className="absolute bottom-[-6px] left-0 w-12 h-[3px] bg-black"></span>
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleSignIn}>
                {error && (
                  <div className="bg-red-950 text-red-200 p-4 rounded-sm border border-red-800 flex items-start space-x-3 text-xs animate-[shake_0.4s_ease-in-out]">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="font-label-md text-xs text-[#281A05] block uppercase tracking-wider font-bold" htmlFor="email">
                    Enter your email
                  </label>
                  <div className="relative">
                    <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${email ? 'text-[#281A05]' : 'text-[#281A05]/40'}`}>
                      mail
                    </span>
                    <input 
                      className="w-full bg-[#FAF9F6] text-[#281A05] placeholder-neutral-400 pl-12 pr-4 py-3.5 rounded-lg text-body-md focus:outline-none focus:ring-1 focus:ring-[#281A05]/30 transition-all border border-transparent" 
                      id="email" 
                      placeholder="Enter Your Email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="font-label-md text-xs text-[#281A05] block uppercase tracking-wider font-bold" htmlFor="password">
                      Enter your password
                    </label>
                  </div>
                  <div className="relative">
                    <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${password ? 'text-[#281A05]' : 'text-[#281A05]/40'}`}>
                      lock
                    </span>
                    <input 
                      className="w-full bg-[#FAF9F6] text-[#281A05] placeholder-neutral-400 pl-12 pr-12 py-3.5 rounded-lg text-body-md focus:outline-none focus:ring-1 focus:ring-[#281A05]/30 transition-all border border-transparent" 
                      id="password" 
                      placeholder="••••••••••••" 
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#281A05]/50 hover:text-[#281A05] transition-colors" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Submit Action (using custom dark brown button on gold panel) */}
                <div className="pt-2">
                  <button 
                    className={`w-full bg-[#241802] text-[#FAF9F6] hover:bg-[#342407] font-label-md text-sm py-4 rounded-lg uppercase tracking-[0.2em] shadow-md transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                    }`} 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#FAF9F6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </main>


    </div>
  );
}
