import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/sign-in.jsx";
import User from "./pages/User.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in.html" element={<SignIn />} />
      <Route path="/sign-in.html/user.html" element={<User />} />
    </Routes>
  );
}
export default Router;
