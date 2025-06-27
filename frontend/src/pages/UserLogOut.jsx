import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogOut = () => {
  const token = localStorage.getItem(`token`);
  const navigate = useNavigate();

  const logout = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };

  logout();

  return <div>User Logout</div>;
};

export default UserLogOut;
