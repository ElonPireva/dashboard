import "./Table.css";
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useJwt } from "react-jwt";
import ConfirmDelete from "./ConfirmDelete";

const Table = () => {
    const [productData, setProductData] = useState(null);
    const [editId, setEditId] = useState(null);
    const [inputValues, setInputValues] = useState({});
    const [rowSaved, setRowSaved] = useState(false);
    const token = localStorage.getItem('token');
    const {decodedToken} = useJwt(token);
    const [isDelete, setIsDelete] = useState(false);
    const currentDomLocation = useRef('');
    const [editClicked, setEditClicked] = useState(1);

    useEffect(() => {
        if(editClicked > 2){
            setEditClicked(1);
        }
    },[editClicked]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const req = await axios.get('http://localhost:3000/getProducts', { headers: { 'token': localStorage.getItem('token') } });
                setProductData(req.data);
            }
            catch (err) {
                console.log('err', err);
            }
        };
        fetchProducts();
    }, []);

    const handleDeleteRow = (index) => {
        const newData = [...productData];
        const removedRow = newData.splice(index, 1);
        setProductData(newData);
        axios.delete(`http://localhost:3000/deleteProduct/${removedRow[0]._id}`);
        setIsDelete(true);
    };

    const handleEditRow = (id) => {
        setEditClicked(counter => counter + 1);
        setEditId(id);
        setRowSaved(false);
        setInputValues(productData[id]);
        setProductData(productData.map((item, index) => {
            if(id === index && editClicked <= 1){
                return {...item, isEditing: true};
            }
            else {
                return {...item, isEditing: false};
            }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleSaveRow = () => {
        setRowSaved(true);
        setProductData(prevState => {
            return prevState.map((item, index) => {
                if (editId === index) {
                    const id = inputValues._id;
                    axios.patch(`http://localhost:3000/updateProduct/${id}?userId=${decodedToken.id}`, inputValues);
                    return { ...item, ...inputValues };
                } else {
                    return item;
                }
            });
        });
    };

    const convertIsoToLocaleTime = (dateAndTime) => {
        const isoTime = new Date(dateAndTime);
        return isoTime.toLocaleString();
    };

    const handleViewClick = () => {
        console.log(currentDomLocation);
    };

    return (
        <div onClick={handleViewClick} ref={currentDomLocation} className="tableContainer">
            {isDelete ? <ConfirmDelete /> : null}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">Added On</th>
                        <th scope="col" className="text-center">ProductBarCode</th>
                        <th scope="col" className="text-center">ProductName</th>
                        <th scope="col" className="text-center">Product quantity</th>
                        <th scope="col" className="text-center">Product price</th>
                        <th scope="col" className="text-center">Total</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productData?.map((product, id) => (
                        <tr key={id} className="align-middle">
                            <th className="text-center">{convertIsoToLocaleTime(product.createdAt)}</th>
                            {!rowSaved && product.isEditing ? <td className="text-center">
                                <input className="text-center" name="productBarCode" value={inputValues.productBarCode} onChange={handleInputChange} />
                            </td> : <td className="text-center">{product.productBarCode}</td>}
                            {!rowSaved && product.isEditing ? <td className="text-center">
                                <input className="text-center" name="productName" value={inputValues.productName} onChange={handleInputChange} />
                            </td> : <td className="text-center">{product.productName}</td>}
                            {!rowSaved && product.isEditing ? <td className="text-center">
                                <input className="text-center" name="productQuantity" value={inputValues.productQuantity} onChange={handleInputChange} />
                            </td> : <td className="text-center">{product.productQuantity}</td>}
                            {!rowSaved && product.isEditing ? <td className="text-center">
                                <input className="text-center" name="productPrice" value={inputValues.productPrice} onChange={handleInputChange} />
                            </td> : <td className="text-center">{product.productPrice}</td>}
                            {!rowSaved && product.isEditing ? <td className="text-center">
                                <input className="text-center" name="total" value={product.productQuantity * product.productPrice} />
                            </td> : <td className="text-center">{product.productQuantity * product.productPrice}</td>}
                            <td className="text-center">
                                <FaEdit fontSize={20} style={{ cursor: 'pointer' }} onClick={() => handleEditRow(id)} />
                                <FaTrash fontSize={20} style={{ cursor: 'pointer', margin: '1rem' }} onClick={() => handleDeleteRow(id)} />
                                {!rowSaved && product.isEditing ? <FaSave fontSize={20} style={{ cursor: 'pointer' }} onClick={() => handleSaveRow()} /> : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Table;