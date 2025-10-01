import "./Admin.css";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";

const Admin = ({ anyMsg }) => {
    return (
        <>
            {anyMsg ? <span>{anyMsg}</span> :

                <div className="Admin">
                    <div className="Admin-title">
                        <h1></h1>
                    </div>
                    <div className="Admin-cards">
                        <div className="Admin-cards-clients">
                            <div className="Admin-cards-clients-title">
                                <span>Clients</span>
                                <span>500</span>
                            </div>
                            <div className="Admin-cards-clients-icon">
                                <FiUsers />
                            </div>
                        </div>
                        <div className="Admin-cards-sales">
                            <div className="Admin-cards-sales-title">
                                <span>Sales</span>
                                <span>$7,500</span>
                            </div>
                            <div className="Admin-cards-sales-icon">
                                <AiOutlineShoppingCart />
                            </div>
                        </div>
                        <div className="Admin-cards-performance">
                            <div className="Admin-cards-performance-title">
                                <span>Performance</span>
                                <span>60%</span>
                            </div>
                            <div className="Admin-cards-performance-icon">
                                <FcSalesPerformance />
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
};

export default Admin;