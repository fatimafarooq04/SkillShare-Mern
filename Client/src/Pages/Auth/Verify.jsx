import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/verify/${token}`)
      .then((res) => {
        console.log(res.data.message);
        navigate("/verify-success");
      })
      .catch((err) => {
        console.error(err.response?.data?.message || "Verification failed");
        navigate("/verify-error");
      });
  }, [token]);

  return <div  style={{margin:"100px"}}>Verifying your email, please wait...</div>;
};

export default Verify;
