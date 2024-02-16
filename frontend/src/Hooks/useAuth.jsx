import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { admin } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (admin) {
      setAuth(true);
    } else {
      setAuth(false);
    }

    setLoading(false);
  }, [admin]);

  return { auth, loading };
};
