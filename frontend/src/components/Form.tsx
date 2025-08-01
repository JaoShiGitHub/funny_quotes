import React from "react";
import Logo from "./Logo";

type FormUserProps = {
  title: string;
  username: string;
  password: string;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormUser(props: FormUserProps): React.ReactElement {
  const {
    title,
    username,
    password,
    handleOnSubmit,
    onChangeUsername,
    onChangePassword,
  } = props;

  return (
    <form
      className="flex flex-col justify-center items-center w-fit gap-y-4"
      onSubmit={handleOnSubmit}
    >
      <Logo />
      <h4 className="font-bold text-2xl">{title}</h4>
      <label htmlFor="username">
        <input
          type="text"
          id="username"
          className="text-black px-4 py-2 min-w-80 rounded-md"
          name="username"
          placeholder="Username"
          value={username}
          onChange={onChangeUsername}
          required
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          id="password"
          className="text-black px-4 py-2 min-w-80 rounded-md"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </label>
      <button className="bg-blue-600 font-bold px-4 py-2 mt-4 mb-10 min-w-80 rounded-md">
        Login
      </button>
    </form>
  );
}

export default FormUser;
