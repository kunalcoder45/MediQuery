// "use client";

// import { createContext, useContext, useEffect, useState } from 'react';
// import { 
//   User,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   updateProfile
// } from 'firebase/auth';
// import { auth } from '@/lib/firebase'; // Your Firebase config
// import { useToast } from '@/hooks/use-toast';

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string, displayName?: string) => Promise<void>;
//   signInWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
//   resetPassword: (email: string) => Promise<void>;
//   updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function useAuthContext() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuthContext must be used within an AuthProviderChat');
//   }
//   return context;
// }

// interface AuthProviderChatProps {
//   children: React.ReactNode;
// }

// export function AuthProviderChat({ children }: AuthProviderChatProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const signIn = async (email: string, password: string) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       toast({
//         title: "Welcome back!",
//         description: "Successfully signed in to your account.",
//       });
//     } catch (error: any) {
//       const errorMessage = error.code === 'auth/user-not-found' 
//         ? 'No account found with this email'
//         : error.code === 'auth/wrong-password'
//         ? 'Incorrect password'
//         : error.code === 'auth/invalid-email'
//         ? 'Invalid email address'
//         : 'Failed to sign in';
      
//       toast({
//         title: "Sign In Error",
//         description: errorMessage,
//         variant: "destructive",
//       });
//       throw error;
//     }
//   };

//   const signUp = async (email: string, password: string, displayName?: string) => {
//     try {
//       const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
//       if (displayName && user) {
//         await updateProfile(user, { displayName });
//       }
      
//       toast({
//         title: "Account Created!",
//         description: "Welcome to MediQuery AI. Your account has been created successfully.",
//       });
//     } catch (error: any) {
//       const errorMessage = error.code === 'auth/email-already-in-use'
//         ? 'An account with this email already exists'
//         : error.code === 'auth/weak-password'
//         ? 'Password should be at least 6 characters'
//         : error.code === 'auth/invalid-email'
//         ? 'Invalid email address'
//         : 'Failed to create account';
      
//       toast({
//         title: "Sign Up Error",
//         description: errorMessage,
//         variant: "destructive",
//       });
//       throw error;
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);
//       toast({
//         title: "Welcome!",
//         description: "Successfully signed in with Google.",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Google Sign In Error",
//         description: "Failed to sign in with Google. Please try again.",
//         variant: "destructive",
//       });
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       toast({
//         title: "Signed Out",
//         description: "You have been successfully signed out.",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Sign Out Error",
//         description: "Failed to sign out. Please try again.",
//         variant: "destructive",
//       });
//       throw error;
//     }
//   };

//   const resetPassword = async (email: string) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       toast({
//         title: "Password Reset Email Sent",
//         description: "Check your email for password reset instructions.",
//       });
//     } catch (error: any) {
//       const errorMessage = error.code === 'auth/user-not-found'
//         ? 'No account found with this email'
//         : 'Failed to send password reset email';
      
//       toast({
//         title: "Password Reset Error", 
//         description: errorMessage,
//         variant: "destructive",
//       });
//       throw error;
//     }
//   };

//   const updateUserProfile = async (displayName?: string, photoURL?: string) => {
//     if (!user) throw new Error('No user logged in');
    
//     try {
//       const updates: any = {};
//       if (displayName !== undefined) updates.displayName = displayName;
//       if (photoURL !== undefined) updates.photoURL = photoURL;
      
//       await updateProfile(user, updates);
//       toast({
//         title: "Profile Updated",
//         description: "Your profile has been updated successfully.",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Profile Update Error",
//         description: "Failed to update profile. Please try again.",
//         variant: "destructive",
//       });
//       throw error;
//     }
//   };

//   const value = {
//     user,
//     loading,
//     signIn,
//     signUp,
//     signInWithGoogle,
//     logout,
//     resetPassword,
//     updateUserProfile,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }