import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div>
      Welcome to Register Page
      <p>
        Already have an account?
        <button onClick={() => navigate("/login")}>Login</button>
      </p>
    </div>
  );
}

export default RegisterPage;
