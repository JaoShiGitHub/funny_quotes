import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '../contexts/Authentication';

function LoginPage(): React.ReactElement {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { login } = useAuth();

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            await login({
                username,
                password,
            });
        } catch (error) {
            setErrorMessage("Username or password is incorrect.");
        }
    }

    return <div>
        <form className='flex flex-col justify-center items-center w-fit gap-y-5' onSubmit={handleLoginSubmit}>
            <h1 className='text-xl font-extrabold '>Login</h1>
            <label htmlFor="username">
                <input type="text"
                    id="username"
                    className="text-black"
                    name="username"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
            </label>
            <label htmlFor="password">
                <input type="text"
                    id="password"
                    className="text-black"
                    name="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </label>
            {errorMessage || null}
            <button className='bg-blue-600 px-20'>Login</button>
        </form>
    </div>;
}

export default LoginPage;
