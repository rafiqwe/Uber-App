import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectedWraper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, loading]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return <>{children}</>;
};

export default CaptainProtectedWraper;
