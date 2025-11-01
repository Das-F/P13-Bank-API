import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import SignIn from "./pages/Sign-in/Sign-in.jsx";
import User from "./pages/User/User.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-in/user" element={<User />} />
    </Routes>
  );
}
export default Router;
