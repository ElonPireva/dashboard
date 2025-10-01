import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        }
    },
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ChartReport = () => {
    const [products, setProducts] = useState([]);
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [filterableProducts, setFilterableProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            setChartData({
                labels: months,
                datasets: [
                    {
                        label: 'Total Products Added',
                        data: months.map((month, id) => {
                            switch (id) {
                                case 0:
                                    return getTotalProductsAdded(id);
                                case 1:
                                    return getTotalProductsAdded(id);
                                case 2:
                                    return getTotalProductsAdded(id);
                                case 3:
                                    return getTotalProductsAdded(id);
                                case 4:
                                    return getTotalProductsAdded(id);
                                case 5:
                                    return getTotalProductsAdded(id);
                                case 6:
                                    return getTotalProductsAdded(id);
                                case 7:
                                    return getTotalProductsAdded(id);
                                case 8:
                                    return getTotalProductsAdded(id);
                                case 9:
                                    return getTotalProductsAdded(id);
                                case 10:
                                    return getTotalProductsAdded(id);
                                case 11:
                                    return getTotalProductsAdded(id);
                                default: return 0;
                            }
                        }),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Total Products cost',
                        data: months.map((item, id) => {
                            switch (id) {
                                case 0:
                                    return getTotalProductsCost(id);
                                case 1:
                                    return getTotalProductsCost(id);
                                case 2:
                                    return getTotalProductsCost(id);
                                case 3:
                                    return getTotalProductsCost(id);
                                case 4:
                                    return getTotalProductsCost(id);
                                case 5:
                                    return getTotalProductsCost(id);
                                case 6:
                                    return getTotalProductsCost(id);
                                case 7:
                                    return getTotalProductsCost(id);
                                case 8:
                                    return getTotalProductsCost(id);
                                case 9:
                                    return getTotalProductsCost(id);
                                case 10:
                                    return getTotalProductsCost(id);
                                case 11:
                                    return getTotalProductsCost(id);
                                default: return 0;
                            }
                        }),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            });
            setLoading(false);
        }
    }, [products]);

    useEffect(() => {
        const getProductData = async () => {
            try {
                const req = await axios.get('http://localhost:3000/getProducts', { headers: { token: localStorage.getItem('token') } });
                setProducts(req.data);
            }
            catch (err) {
                console.log('err when trying to get products data');
            }
        };
        getProductData();
    }, []);

    const getTotalProductsAdded = (month) => {
        const filterProductDate = products.map((product) => {
            const createdAt = new Date(product.createdAt).getMonth();
            return { month: createdAt, value: product.productPrice };
        });
        const filterProductsMonth = filterProductDate.filter(product => product.month === month);
        return filterProductsMonth.length;
    };

    const getTotalProductsCost = (month) => {
        const filterProductDate = products.map((product) => {
            const createdAt = new Date(product.createdAt).getMonth();
            return { month: createdAt, value: product.productPrice };
        });
        const tpc = filterProductDate.reduce((prevValue, currentValue) => {
            if (currentValue.month === month) {
                return prevValue + currentValue.value;
            }
        }, 0);
        return tpc;
    };

    return loading ? null : <Bar options={options} data={chartData} />;
};

export default ChartReport;