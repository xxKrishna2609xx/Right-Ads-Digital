import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken(true); // force refresh to get latest claims
          setToken(idToken);
        } catch (error) {
          console.error("Error fetching Firebase ID token:", error);
          setToken(null);
        }
      } else {
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // Helper to fetch a fresh token before API calls
  const getFreshToken = async () => {
    if (!auth.currentUser) return null;
    try {
      const idToken = await auth.currentUser.getIdToken();
      setToken(idToken);
      return idToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  return {
    user,
    token,
    loading,
    login,
    logout,
    getFreshToken
  };
}
