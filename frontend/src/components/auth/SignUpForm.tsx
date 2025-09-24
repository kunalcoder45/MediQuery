// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthContext } from '@/contexts/AuthContext';

// import { Loader2, Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react';
// import Link from 'next/link';

// const SignUpForm = () => {
//     const { signUpWithEmail, signInWithGoogle, loading } = useAuthContext();
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         confirmPassword: '',
//         displayName: ''
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const router = useRouter();

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//         // Clear previous errors when user starts typing
//         if (error) setError('');
//         if (message) setMessage('');
//     };

//     const validatePassword = (password: string) => {
//         const minLength = password.length >= 6;
//         const hasNumber = /\d/.test(password);
//         const hasLetter = /[a-zA-Z]/.test(password);

//         return {
//             minLength,
//             hasNumber,
//             hasLetter,
//             isValid: minLength && hasNumber && hasLetter
//         };
//     };

//     const passwordValidation = validatePassword(formData.password);

//     const handleSignUp = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Validation
//         if (!formData.displayName.trim()) {
//             setError('Please enter your full name');
//             return;
//         }

//         if (!formData.email) {
//             setError('Please enter your email address');
//             return;
//         }

//         if (!passwordValidation.isValid) {
//             setError('Password must be at least 6 characters with letters and numbers');
//             return;
//         }

//         if (formData.password !== formData.confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }

//         try {
//             setIsLoading(true);
//             setError('');
//             await signUpWithEmail(formData.email, formData.password, formData.displayName);
//             setMessage('Account created successfully! Please check your email for verification.');
//             setTimeout(() => {
//                 router.push('/');
//             }, 2000);
//         } catch (error: any) {
//             console.error('Sign up error:', error);
//             setError(error?.message || 'Failed to create account. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleGoogleSignUp = async () => {
//         try {
//             setIsLoading(true);
//             setError('');
//             await signInWithGoogle();
//             setMessage('Google sign up successful!');
//             router.push('/');
//         } catch (error: any) {
//             console.error('Google sign up error:', error);
//             setError(error?.message || 'Google sign up failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const currentLoading = loading || isLoading;

//     return (
//         <div className="flex h-[91vh] w-full">
//             {/* Left side image - hidden on mobile */}
//             <div className="w-full hidden md:inline-block h-[90vh]">
//                 <div className="flex items-center justify-center h-full">
//                     <div className="w-[70vh] h-[80vh] rounded-3xl p-6 bg-gradient-to-br from-purple-400 via-purple-500 to-orange-300 shadow-lg flex flex-col justify-center items-start relative overflow-hidden">

//                         {/* Optional abstract shapes like your reference */}
//                         <div className="absolute w-64 h-64 bg-purple-300 rounded-full top-[-40px] right-[-40px] opacity-30"></div>
//                         <div className="absolute w-64 h-64 bg-orange-300 rounded-full bottom-[-40px] left-[-40px] opacity-30"></div>

//                         {/* Logo */}
//                         <div className="mb-4">
//                             <span className="text-white font-bold text-xl">A</span>
//                         </div>

//                         {/* Welcome Text */}
//                         <h1 className="text-3xl font-bold text-white leading-snug">
//                             Welcome <br /> Back!
//                         </h1>
//                     </div>
//                 </div>
//             </div>

//             {/* Right side form */}
//             <div className="w-full flex flex-col items-center justify-center p-8 bg-white">
//                 <form className="md:w-96 w-80 flex flex-col items-center justify-center">
//                     <div className="text-center mb-3">
//                         <h2 className="text-4xl text-gray-900 font-medium">Create Account</h2>
//                         <p className="text-sm text-gray-500/90 mt-3">Join MediQuery AI for personalized health assistance</p>
//                     </div>

//                     {/* Messages */}
//                     {message && (
//                         <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm w-full">
//                             {message}
//                         </div>
//                     )}

//                     {error && (
//                         <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm w-full">
//                             {error}
//                         </div>
//                     )}

//                     {/* Google Sign Up Button */}
//                     <button
//                         type="button"
//                         onClick={handleGoogleSignUp}
//                         disabled={currentLoading}
//                         className="w-full  bg-gray-500/10 hover:bg-gray-500/20 flex items-center justify-center h-12 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         {currentLoading ? (
//                             <Loader2 className="w-5 h-5 animate-spin mr-2" />
//                         ) : (
//                             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                             </svg>
//                         )}
//                         {currentLoading ? 'Creating account...' : 'Continue with Google'}
//                     </button>

//                     {/* Divider */}
//                     <div className="flex items-center gap-4 w-full my-6">
//                         <div className="w-full h-px bg-gray-300/90"></div>
//                         <p className="text-nowrap text-sm text-gray-500/90">or create with email</p>
//                         <div className="w-full h-px bg-gray-300/90"></div>
//                     </div>

//                     {/* Full Name Input */}
//                     <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-3 mb-4 focus-within:border-blue-500 transition-colors">
//                         <User className="w-4 h-4 text-gray-500" />
//                         <input
//                             type="text"
//                             name="displayName"
//                             placeholder="Full Name"
//                             value={formData.displayName}
//                             onChange={handleInputChange}
//                             className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full pr-6"
//                             required
//                         />
//                     </div>

//                     {/* Email Input */}
//                     <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-3 mb-4 focus-within:border-blue-500 transition-colors">
//                         <Mail className="w-4 h-4 text-gray-500" />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email address"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full pr-6"
//                             required
//                         />
//                     </div>

//                     {/* Password Input */}
//                     <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-3 mb-2 focus-within:border-blue-500 transition-colors">
//                         <Lock className="w-4 h-4 text-gray-500" />
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             name="password"
//                             placeholder="Password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
//                             required
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="pr-6 text-gray-500 hover:text-gray-700 transition-colors"
//                         >
//                             {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                     </div>

//                     {/* Password Validation Indicators */}
//                     {formData.password && (
//                         <div className="w-full mb-4 p-3 bg-gray-50 rounded-lg text-xs">
//                             <div className="space-y-1">
//                                 <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-red-500'}`}>
//                                     <CheckCircle className="w-3 h-3" />
//                                     <span>At least 6 characters</span>
//                                 </div>
//                                 <div className={`flex items-center gap-2 ${passwordValidation.hasLetter ? 'text-green-600' : 'text-red-500'}`}>
//                                     <CheckCircle className="w-3 h-3" />
//                                     <span>Contains letters</span>
//                                 </div>
//                                 <div className={`flex items-center gap-2 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-500'}`}>
//                                     <CheckCircle className="w-3 h-3" />
//                                     <span>Contains numbers</span>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Confirm Password Input */}
//                     <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-3 mb-6 focus-within:border-blue-500 transition-colors">
//                         <Lock className="w-4 h-4 text-gray-500" />
//                         <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             name="confirmPassword"
//                             placeholder="Confirm Password"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
//                             required
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             className="pr-6 text-gray-500 hover:text-gray-700 transition-colors"
//                         >
//                             {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                     </div>

//                     {/* Terms and Conditions */}
//                     <div className="w-full mb-6 text-xs text-gray-500 text-center">
//                         By creating an account, you agree to our{' '}
//                         <button type="button" className="text-blue-500">
//                             <Link href="#">Terms of Service</Link>
//                         </button>{' '}
//                         and{' '}
//                         <button type="button" className="text-blue-500 hover:underline">
//                             <Link href="/privacy">Privacy Policy</Link>
//                         </button>
//                     </div>

//                     {/* Create Account Button */}
//                     <button
//                         type="submit"
//                         onClick={handleSignUp}
//                         disabled={currentLoading}
//                         className="w-full h-12 rounded-full text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                         {currentLoading ? (
//                             <>
//                                 <Loader2 className="w-5 h-5 animate-spin mr-2" />
//                                 Creating Account...
//                             </>
//                         ) : (
//                             'Create Account'
//                         )}
//                     </button>

//                     {/* Sign in link */}
//                     <p className="text-gray-500/90 text-sm mt-3 text-center">
//                         Already have an account?{' '}
//                         <button
//                             type="button"
//                             onClick={() => router.push('/auth/login')}
//                             className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
//                         >
//                             Sign in
//                         </button>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUpForm;




// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthContext } from "@/contexts/AuthContext";

// import { Loader2, Eye, EyeOff, User, Mail, Lock, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { LucideProps } from "lucide";

// // --- Type Definitions for better TypeScript support ---

// interface FormData {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   displayName: string;
// }

// interface PasswordValidation {
//   minLength: boolean;
//   hasNumber: boolean;
//   hasLetter: boolean;
//   isValid: boolean;
// }

// interface InputWithIconProps {
//   Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
//   type: string;
//   name: keyof FormData;
//   placeholder: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   showToggle?: boolean;
//   isVisible?: boolean;
//   onToggleVisibility?: () => void;
// }

// interface PasswordValidationSectionProps {
//   validation: PasswordValidation;
// }

// interface ValidationItemProps {
//   isValid: boolean;
//   text: string;
// }

// // --- Main Sign-up Form Component ---

// const SignUpForm: React.FC = () => {
//   const { signUpWithEmail, signInWithGoogle, loading: authLoading } = useAuthContext();
//   const router = useRouter();

//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     displayName: ""
//   });
  
//   const [error, setError] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const currentLoading = authLoading || isLoading;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError("");
//     setMessage("");
//   };

//   const validatePassword = (password: string): PasswordValidation => {
//     const minLength = password.length >= 6;
//     const hasNumber = /\d/.test(password);
//     const hasLetter = /[a-zA-Z]/.test(password);

//     return {
//       minLength,
//       hasNumber,
//       hasLetter,
//       isValid: minLength && hasNumber && hasLetter
//     };
//   };

//   const passwordValidation = validatePassword(formData.password);

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.displayName.trim()) {
//       setError("Please enter your full name.");
//       return;
//     }
//     if (!formData.email) {
//       setError("Please enter your email address.");
//       return;
//     }
//     if (!passwordValidation.isValid) {
//       setError("Password must be at least 6 characters with letters and numbers.");
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError("");
//       await signUpWithEmail(formData.email, formData.password, formData.displayName);
//       setMessage("Account created successfully! Please check your email for verification.");
      
//       setTimeout(() => {
//         router.push("/");
//       }, 2000);
//     } catch (error: any) {
//       console.error("Sign up error:", error);
//       setError(error?.message || "Failed to create account. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignUp = async () => {
//     try {
//       setIsLoading(true);
//       setError("");
//       await signInWithGoogle();
//       setMessage("Google sign-up successful!");
//       router.push("/");
//     } catch (error: any) {
//       console.error("Google sign up error:", error);
//       setError(error?.message || "Google sign up failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left side: Image/Branding - Hidden on small screens */}
//       <div className="hidden w-1/2 p-8 md:flex items-center justify-center bg-gradient-to-br from-purple-500 via-purple-600 to-orange-400">
//         <div className="relative p-12 text-white max-w-lg rounded-3xl overflow-hidden">
//           <div className="absolute w-72 h-72 bg-purple-400 rounded-full top-[-40px] right-[-40px] opacity-30"></div>
//           <div className="absolute w-72 h-72 bg-orange-300 rounded-full bottom-[-40px] left-[-40px] opacity-30"></div>
//           <h1 className="relative z-10 text-5xl font-bold leading-snug drop-shadow-lg">
//             Welcome to <br /> MediQuery AI!
//           </h1>
//           <p className="relative z-10 mt-4 text-lg font-light drop-shadow-md">
//             Your personal health assistant, powered by AI. Get instant, reliable information and personalized insights.
//           </p>
//         </div>
//       </div>

//       {/* Right side: Sign-up Form */}
//       <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
//         <form onSubmit={handleSignUp} className="w-full max-w-sm flex flex-col items-center">
//           <div className="text-center mb-6">
//             <h2 className="text-4xl text-gray-900 font-medium">Create Account</h2>
//             <p className="text-sm text-gray-500/90 mt-2">Join us for personalized health assistance</p>
//           </div>

//           {/* Status Messages */}
//           {message && (
//             <div className="mb-4 p-3 w-full bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
//               {message}
//             </div>
//           )}
//           {error && (
//             <div className="mb-4 p-3 w-full bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Google Sign-up Button */}
//           <button
//             type="button"
//             onClick={handleGoogleSignUp}
//             disabled={currentLoading}
//             className="w-full h-12 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {currentLoading ? (
//               <Loader2 className="w-5 h-5 animate-spin mr-2" />
//             ) : (
//               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//               </svg>
//             )}
//             Continue with Google
//           </button>

//           {/* Divider */}
//           <div className="flex items-center gap-4 w-full my-6">
//             <div className="w-full h-px bg-gray-300/90"></div>
//             <p className="text-nowrap text-sm text-gray-500/90">or create with email</p>
//             <div className="w-full h-px bg-gray-300/90"></div>
//           </div>

//           {/* Form Inputs */}
//           <div className="space-y-4 w-full">
//             <InputWithIcon
//               Icon={User}
//               type="text"
//               name="displayName"
//               placeholder="Full Name"
//               value={formData.displayName}
//               onChange={handleInputChange}
//             />
//             <InputWithIcon
//               Icon={Mail}
//               type="email"
//               name="email"
//               placeholder="Email address"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             <InputWithIcon
//               Icon={Lock}
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleInputChange}
//               onToggleVisibility={() => setShowPassword(!showPassword)}
//               showToggle
//               isVisible={showPassword}
//             />
//             {formData.password && <PasswordValidationSection validation={passwordValidation} />}
//             <InputWithIcon
//               Icon={Lock}
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
//               showToggle
//               isVisible={showConfirmPassword}
//             />
//           </div>

//           {/* Terms and Conditions */}
//           <div className="w-full my-6 text-xs text-center text-gray-500">
//             By creating an account, you agree to our{" "}
//             <Link href="#" className="text-blue-500 hover:underline">
//               Terms of Service
//             </Link>{" "}
//             and{" "}
//             <Link href="/privacy" className="text-blue-500 hover:underline">
//               Privacy Policy
//             </Link>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={currentLoading}
//             className="w-full h-12 rounded-full text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {currentLoading ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin mr-2" />
//                 Creating Account...
//               </>
//             ) : (
//               "Create Account"
//             )}
//           </button>

//           {/* Sign-in Link */}
//           <p className="text-gray-500/90 text-sm mt-4 text-center">
//             Already have an account?{" "}
//             <Link
//               href="/auth/login"
//               className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
//             >
//               Sign in
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// // --- Reusable and Typed Components ---

// const InputWithIcon: React.FC<InputWithIconProps> = ({ Icon, type, name, placeholder, value, onChange, showToggle = false, isVisible, onToggleVisibility }) => (
//   <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-3 focus-within:border-blue-500 transition-colors">
//     <Icon className="w-4 h-4 text-gray-500" />
//     <input
//       type={type}
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
//       required
//     />
//     {showToggle && (
//       <button
//         type="button"
//         onClick={onToggleVisibility}
//         className="pr-6 text-gray-500 hover:text-gray-700 transition-colors"
//       >
//         {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//       </button>
//     )}
//   </div>
// );

// const PasswordValidationSection: React.FC<PasswordValidationSectionProps> = ({ validation }) => (
//   <div className="w-full mb-4 p-3 bg-gray-50 rounded-lg text-xs">
//     <div className="space-y-1">
//       <ValidationItem isValid={validation.minLength} text="At least 6 characters" />
//       <ValidationItem isValid={validation.hasLetter} text="Contains letters" />
//       <ValidationItem isValid={validation.hasNumber} text="Contains numbers" />
//     </div>
//   </div>
// );

// const ValidationItem: React.FC<ValidationItemProps> = ({ isValid, text }) => (
//   <div className="flex items-center gap-2">
//     <CheckCircle className={`w-3 h-3 ${isValid ? 'text-green-600' : 'text-red-500'}`} />
//     <span className={`${isValid ? 'text-green-600' : 'text-red-500'}`}>{text}</span>
//   </div>
// );

// export default SignUpForm;



"use client";

import React, { useState, FC } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';

import {
  Loader2,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle
} from 'lucide-react';

interface FormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: FC = () => {
  const { signUpWithEmail, signInWithGoogle, loading } = useAuthContext();
  const [formData, setFormData] = useState<FormData>({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Map icons for inputs
  const IconMap: Record<string, FC<React.SVGProps<SVGSVGElement>>> = {
    displayName: User,
    email: Mail,
    password: Lock,
    confirmPassword: Lock
  };

  const placeholderMap: Record<string, string> = {
    displayName: 'Full Name',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
    if (message) setMessage('');
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);

    return {
      minLength,
      hasNumber,
      hasLetter,
      isValid: minLength && hasNumber && hasLetter
    };
  };

  const passwordValidation = validatePassword(formData.password);
  const currentLoading = loading || isLoading;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.displayName.trim()) return setError('Please enter your full name');
    if (!formData.email) return setError('Please enter your email address');
    if (!passwordValidation.isValid) return setError('Password must be at least 6 characters with letters and numbers');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');

    try {
      setIsLoading(true);
      setError('');
      await signUpWithEmail(formData.email, formData.password, formData.displayName);
      setMessage(`🎉 Welcome to MediQuery, ${formData.displayName}! Please check your email to verify your account.`);
      setTimeout(() => router.push('/'), 2500);
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      setMessage('🎉 Google sign up successful! Redirecting...');
      router.push('/');
    } catch (err: any) {
      console.error('Google sign up error:', err);
      setError(err?.message || 'Google sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[91vh] w-full">
      {/* Left side image */}
      <div className="w-full hidden md:inline-block h-[90vh]">
        <div className="flex items-center justify-center h-full">
          <div className="w-[70vh] h-[80vh] rounded-3xl p-6 bg-gradient-to-br from-purple-400 via-purple-500 to-orange-300 shadow-lg flex flex-col justify-center items-start relative overflow-hidden">
            <div className="absolute w-64 h-64 bg-purple-300 rounded-full top-[-40px] right-[-40px] opacity-30"></div>
            <div className="absolute w-64 h-64 bg-orange-300 rounded-full bottom-[-40px] left-[-40px] opacity-30"></div>

            <div className="mb-4">
              <span className="text-white font-bold text-2xl">MediQuery</span>
            </div>

            <h1 className="text-4xl font-bold text-white leading-snug">
              Welcome to <br /> MediQuery AI!
            </h1>
            <p className="mt-2 text-white/80 text-sm">
              Get personalized health assistance & AI-driven insights instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full flex flex-col items-center justify-center p-8 bg-white">
        <form className="md:w-96 w-80 flex flex-col items-center justify-center">
          <div className="text-center mb-4">
            <h2 className="text-4xl text-gray-900 font-medium">Create Account</h2>
            <p className="text-sm text-gray-500/90 mt-2">Join MediQuery AI for smarter health insights</p>
          </div>

          {/* Messages */}
          {message && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm w-full">{message}</div>}
          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm w-full">{error}</div>}

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={currentLoading}
            className="w-full bg-gray-500/10 hover:bg-gray-500/20 flex items-center justify-center h-12 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {currentLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            {currentLoading ? 'Creating account...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-4">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="text-nowrap text-sm text-gray-500/90">or create with email</p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* Inputs */}
          {Object.keys(formData).map((field, i) => {
            const isPassword = field.includes('password');
            const show = field === 'password' ? showPassword : showConfirmPassword;
            const toggle = () =>
              field === 'password'
                ? setShowPassword(!showPassword)
                : setShowConfirmPassword(!showConfirmPassword);

            const Icon = IconMap[field];

            return (
              <div
                key={i}
                className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-3 mb-4 focus-within:border-blue-500 transition-colors"
              >
                <Icon className="w-4 h-4 text-gray-500" />
                <input
                  type={isPassword && !show ? 'password' : 'text'}
                  name={field}
                  placeholder={placeholderMap[field]}
                  value={(formData as any)[field]}
                  onChange={handleInputChange}
                  className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full pr-6"
                  required
                />
                {isPassword && (
                  <button
                    type="button"
                    onClick={toggle}
                    className="pr-6 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
              </div>
            );
          })}

          {/* Password Validation */}
          {formData.password && (
            <div className="w-full mb-4 p-3 bg-gray-50 rounded-lg text-xs">
              <div className="space-y-1">
                <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-red-500'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>At least 6 characters</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation.hasLetter ? 'text-green-600' : 'text-red-500'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>Contains letters</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-500'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>Contains numbers</span>
                </div>
              </div>
            </div>
          )}

          {/* Terms */}
          <div className="w-full mb-6 text-xs text-gray-500 text-center">
            By creating an account, you agree to our{' '}
            <Link href="#" className="text-blue-500 hover:underline">Terms of Service</Link> and{' '}
            <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={handleSignUp}
            disabled={currentLoading}
            className="w-full h-12 rounded-full text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-3"
          >
            {currentLoading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" />Creating Account...</> : 'Create Account'}
          </button>

          <p className="text-gray-500/90 text-sm mt-2 text-center">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/login')}
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
