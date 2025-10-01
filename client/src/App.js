import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import AddProduct from "./dashboard/addProduct/AddProduct";
import Profile from "./dashboard/profile/Profile";
import Guard from "./guard/Guard";
import Login from "./login/Login";
import Register from "./register/Register";
import MyProducts from "./dashboard/myProducts/MyProducts";
import ForgotPassword from "./forgotPassword/ForgotPassword";
import ForgotPasswordCode from "./forgotPassword/ForgotPasswordCode";
import NewPassword from "./forgotPassword/NewPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgotPasswordCode" element={<ForgotPasswordCode />} /> 
        <Route path="/newPassword" element={<NewPassword />} /> 
        <Route element={<Guard />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/myProducts" element={<MyProducts />} />
        </Route>
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;