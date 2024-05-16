import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import HomePage from "pages/HomePage";
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />}></Route>{" "}
          <Route path="/sign-in" element={<SignInPage />}></Route>{" "}
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
