import NavBar from "./layouts/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <HomePage />
      <LoginPage />
      <RegisterPage />
      <NavBar />
    </div>
  );
}

export default App;
