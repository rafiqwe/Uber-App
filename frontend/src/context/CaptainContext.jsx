import { createContext, useState } from "react";

export const CaptainDataContext = createContext(null);

const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (newCaptain) => {
    setCaptain(newCaptain);
  };

  const value = {
    captain,
    setCaptain: updateCaptain,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainProvider;
