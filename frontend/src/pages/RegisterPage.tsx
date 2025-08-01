import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import FormUser from "../components/Form";

function RegisterPage(): React.ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <FormUser
        title="Register"
        handleOnSubmit={() => console.log("hi")}
        username={username}
        password={password}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
      <p>
        Already have an account?{" "}
        <button
          className="underline hover:font-extrabold"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default RegisterPage;
