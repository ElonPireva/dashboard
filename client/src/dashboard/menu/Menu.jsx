import "./Menu.css";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaFile } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose, AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import Profile from "../profile/Profile";
import AddProduct from "../addProduct/AddProduct";
import Dashboard from "../Dashboard";
import Navbar from "../navbar/Navbar";
import MyProducts from "../myProducts/MyProducts";

const Menu = () => {
  const [isDashboard, setIsDashboard] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [isMyProducts, setIsMyProducts] = useState(false);
  const [menu, setMenu] = useState(false);
  const location = useLocation('');
  const navigate = useNavigate('');

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setIsProfile(false);
      setIsAddProduct(false);
      setIsMyProducts(false);
      setIsDashboard(true);
    }
    if (location.pathname === '/profile') {
      setIsAddProduct(false);
      setIsDashboard(false);
      setIsMyProducts(false);
      setIsProfile(true);
    }
    if (location.pathname === '/addproduct') {
      setIsDashboard(false);
      setIsProfile(false);
      setIsMyProducts(false);
      setIsAddProduct(true);
    }
    if (location.pathname === '/myproducts') {
      setIsDashboard(false);
      setIsProfile(false);
      setIsAddProduct(false);
      setIsMyProducts(true);
    }
  }, [location.pathname]);

  const DashboardHandler = () => {
    navigate('/dashboard');
    setMenu(false);
  };

  const ProfileHandler = () => {
    navigate('/profile');
    setMenu(false);
  };

  const AddProductHandler = () => {
    navigate('/addproduct');
    setMenu(false);
  };

  const MyProductsHandler = () => {
    navigate('/myproducts');
    setMenu(false);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className={menu ? 'dashboardParentMenu' : 'dashboardParent'}>
      <div className='leftSide'>
        <div className="menu">
          {menu ? <AiOutlineClose onClick={handleMenu} /> : <AiOutlineMenu onClick={handleMenu} />}
        </div>
        <div className="row g-0 left-side-content">
          <div className="col-12 mt-4 mb-2">
            <h3 className="text-white p-2">Pharmacy Medicine</h3>
          </div>
        </div>
        <div className="row g-0 left-side-content">
          <div className="col-12">
            <ul className="ul p-0 m-2">
              <li className="mb-4 p-2" onClick={DashboardHandler}>
                <AiOutlineHome fontSize={30} />
                <span className="link-title">Dashboard</span>
              </li>
              <li className="mb-4 p-2" onClick={ProfileHandler}>
                <CgProfile fontSize={30} />
                <span className="link-title">Profile</span>
              </li>
              <li className="mb-4 p-2" onClick={AddProductHandler}>
                <FiEdit fontSize={30} />
                <span className="link-title">Add Product</span>
              </li>
              <li className="p-2" onClick={MyProductsHandler}>
                <FaFile fontSize={30} />
                <span className="link-title">My Products</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <Navbar openProfile={true} />
        {isDashboard ? <Dashboard /> : null}
        {isProfile ? <Profile /> : null}
        {isAddProduct ? <AddProduct /> : null}
        {isMyProducts ? <MyProducts /> : null}
      </div>
    </div>
  )
};

export default Menu;