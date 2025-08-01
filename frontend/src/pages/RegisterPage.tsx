import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormUser from "../components/Form";
import axios from "axios";

function RegisterPage(): React.ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/new_user/register",
        {
          username,
          password,
        }
      );
      console.log("Register successfully", response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed: ", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErrorMsg("This username is already taken");
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <FormUser
        title="Register"
        handleOnSubmit={handleSubmitForm}
        username={username}
        password={password}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
      {errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}
      <p className="mt-12">
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
