import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWraper = ({ children }) => {
    const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token]);

  axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) =>  {
    if(response.status === 200){
        setLoading(false)
    }
  }).catch(err => {
    console.log(err);
    localStorage.removeItem('token')
    navigate('/captain-login')
  })

    if (loading) return <div className="text-center mt-10">Loading...</div>;

  return <>{children}</>;
};

export default CaptainProtectedWraper;
