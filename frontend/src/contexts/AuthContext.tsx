// // src/contexts/AuthContext.tsx

// "use client";

// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { 
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithEmailLink,
//   sendSignInLinkToEmail,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signOut,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   sendEmailVerification,
//   updateProfile,
//   deleteUser,
//   User,
//   AuthError,
//   UserCredential,
// } from 'firebase/auth';
// import { auth } from '../firebase/config';

// // 1. Define the type for the context value
// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<UserCredential>;
//   signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
//   sendEmailLink: (email: string) => Promise<{ success: boolean; message: string }>;
//   signInWithEmailLinkComplete: (email: string, emailLink: string) => Promise<UserCredential>;
//   signInWithGoogle: () => Promise<UserCredential>;
//   resetPassword: (email: string) => Promise<void>;
//   updateUserProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<void | { success: boolean; message: string }>;
//   deleteAccount: () => Promise<void | { success: boolean; message: string }>;
//   logout: () => Promise<void>;
//   getIdToken: () => Promise<string | null>;
//   setError: (error: string | null) => void;
// }

// // 2. Create a default value to match the interface
// const defaultAuthContext: AuthContextType = {
//   user: null,
//   loading: true,
//   error: null,
//   signUpWithEmail: async () => ({} as UserCredential), // Type assertion to satisfy the interface
//   signInWithEmail: async () => ({} as UserCredential),
//   sendEmailLink: async () => ({ success: false, message: '' }),
//   signInWithEmailLinkComplete: async () => ({} as UserCredential),
//   signInWithGoogle: async () => ({} as UserCredential),
//   resetPassword: async () => {},
//   updateUserProfile: async () => {},
//   deleteAccount: async () => {},
//   logout: async () => {},
//   getIdToken: async () => null,
//   setError: () => {},
// };

// // 3. Create the context with the defined type
// const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   // Your existing functions, with types added
//   const signUpWithEmail = async (email: string, password: string, displayName?: string): Promise<UserCredential> => {
//     try {
//       setLoading(true);
//       setError(null);
//       const result = await createUserWithEmailAndPassword(auth, email, password);
//       if (displayName) {
//         await updateProfile(result.user, { displayName });
//       }
//       await sendEmailVerification(result.user);
//       return result;
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message);
//       throw authError;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
//     try {
//       setLoading(true);
//       setError(null);
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       return result;
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message);
//       throw authError;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendEmailLink = async (email: string): Promise<{ success: boolean; message: string }> => {
//     try {
//       setError(null);
//       const actionCodeSettings = {
//         url: `${window.location.origin}/auth/email-link-signin`,
//         handleCodeInApp: true,
//       };
//       await sendSignInLinkToEmail(auth, email, actionCodeSettings);
//       localStorage.setItem('emailForSignIn', email);
//       return { success: true, message: 'Email link sent successfully!' };
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message);
//       throw authError;
//     }
//   };

//   const signInWithEmailLinkComplete = async (email: string, emailLink: string): Promise<UserCredential> => {
//     try {
//       setLoading(true);
//       setError(null);
//       const result = await signInWithEmailLink(auth, email, emailLink);
//       localStorage.removeItem('emailForSignIn');
//       return result;
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message);
//       throw authError;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signInWithGoogle = async (): Promise<UserCredential> => {
//     try {
//       setLoading(true);
//       setError(null);
//       const provider = new GoogleAuthProvider();
//       provider.setCustomParameters({
//         prompt: 'select_account',
//       });
//       const result = await signInWithPopup(auth, provider);
//       return result;
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message);
//       throw authError;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetPassword = async (email: string): Promise<void> => {
//     try {
//       setError(null);
//       await sendPasswordResetEmail(auth, email);
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message);
//       throw authError;
//     }
//   };

//   const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }): Promise<void | { success: boolean; message: string }> => {
//     try {
//       setError(null);
//       if (user) {
//         await updateProfile(user, updates);
//         return { success: true, message: 'Profile updated successfully!' };
//       }
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message);
//       throw authError;
//     }
//   };

//   const deleteAccount = async (): Promise<void | { success: boolean; message: string }> => {
//     try {
//       setError(null);
//       if (user) {
//         await deleteUser(user);
//         return { success: true, message: 'Account deleted successfully!' };
//       }
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message);
//       throw authError;
//     }
//   };

//   const logout = async (): Promise<void> => {
//     try {
//       setError(null);
//       await signOut(auth);
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message);
//       throw authError;
//     }
//   };

//   const getIdToken = async (): Promise<string | null> => {
//     if (user) {
//       return await user.getIdToken();
//     }
//     return null;
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     signUpWithEmail,
//     signInWithEmail,
//     sendEmailLink,
//     signInWithEmailLinkComplete,
//     signInWithGoogle,
//     resetPassword,
//     updateUserProfile,
//     deleteAccount,
//     logout,
//     getIdToken,
//     setError
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };







// src/contexts/AuthContext.tsx (Merged and improved)
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  deleteUser,
  User,
  AuthError,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Assuming '@/lib/firebase' is your Firebase config file
import { useToast } from '@/hooks/use-toast';

// 1. Define the type for the context value
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<void>;
  deleteAccount: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

// 2. Create a default value to match the interface
const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  signInWithEmail: async () => { },
  signUpWithEmail: async () => { },
  signInWithGoogle: async () => { },
  logout: async () => { },
  resetPassword: async () => { },
  updateUserProfile: async () => { },
  deleteAccount: async () => { },
  getIdToken: async () => null,
};

// 3. Create the context with the defined type
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export const useAuth = useAuthContext;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to your account.",
      });
    } catch (err) {
      const authError = err as AuthError;
      const errorMessage = authError.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : authError.code === 'auth/wrong-password'
          ? 'Incorrect password'
          : authError.code === 'auth/invalid-email'
            ? 'Invalid email address'
            : 'Failed to sign in';

      toast({
        title: "Sign In Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string): Promise<void> => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      await sendEmailVerification(user);
      toast({
        title: "Account Created!",
        description: "Welcome! A verification email has been sent.",
      });
    } catch (err) {
      const authError = err as AuthError;
      const errorMessage = authError.code === 'auth/email-already-in-use'
        ? 'An account with this email already exists'
        : authError.code === 'auth/weak-password'
          ? 'Password should be at least 6 characters'
          : authError.code === 'auth/invalid-email'
            ? 'Invalid email address'
            : 'Failed to create account';

      toast({
        title: "Sign Up Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Welcome!",
        description: "Successfully signed in with Google.",
      });
    } catch (err) {
      const authError = err as AuthError;
      const errorMessage = 'Failed to sign in with Google. Please try again.';
      toast({
        title: "Google Sign In Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (err) {
      const authError = err as AuthError;
      toast({
        title: "Sign Out Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
      throw authError;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (err) {
      const authError = err as AuthError;
      const errorMessage = authError.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : 'Failed to send password reset email';
      toast({
        title: "Password Reset Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw authError;
    }
  };

  const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }): Promise<void> => {
    if (!user) {
      toast({
        title: "Profile Update Error",
        description: "No user logged in.",
        variant: "destructive",
      });
      return;
    }
    try {
      await updateProfile(user, updates);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (err) {
      const authError = err as AuthError;
      toast({
        title: "Profile Update Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      throw authError;
    }
  };

  const deleteAccount = async (): Promise<void> => {
    if (!user) {
      toast({
        title: "Account Deletion Error",
        description: "No user logged in.",
        variant: "destructive",
      });
      return;
    }
    try {
      await deleteUser(user);
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully.",
      });
    } catch (err) {
      const authError = err as AuthError;
      toast({
        title: "Account Deletion Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
      throw authError;
    }
  };

  const getIdToken = async (): Promise<string | null> => {
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    deleteAccount,
    getIdToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
