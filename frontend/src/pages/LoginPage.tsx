import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authentication";
import FormUser from "../components/Form";

function LoginPage(): React.ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await login({
        username,
        password,
      });
    } catch (error) {
      setErrorMessage("Username or password is incorrect.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FormUser
        title="Login"
        handleOnSubmit={handleLoginSubmit}
        username={username}
        password={password}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
      <p>
        Don't have an account?{" "}
        <button
          className="underline hover:font-extrabold"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
