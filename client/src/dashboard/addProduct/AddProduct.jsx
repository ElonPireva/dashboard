import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [productBarCode, setProductBarCode] = useState();
    const [productName, setProductName] = useState();
    const [productQuantity, setProductQuantity] = useState();
    const [productPrice, setProductPrice] = useState();
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [serverResponse, setServerResponse] = useState('');

    const SaveProduct = async (e) => {
        e.preventDefault();
        try {
            if (productBarCode && productName && productQuantity && productPrice) {
                const result = await axios.post('http://localhost:3000/api/v1/addproduct',
                    { productBarCode, productName, productQuantity, productPrice },
                    { headers: { token: localStorage.getItem('token') } });

                if (result.data) {
                    setServerResponse(result.data);
                    setSuccessMessage(true);
                    setProductBarCode('');
                    setProductName('');
                    setProductPrice('');
                    setProductQuantity('');
                    setTimeout(() => {
                        setSuccessMessage(false);
                    }, 2500);
                }
            }
            else {
                setServerResponse("All fields are required!");
                setErrorMessage(true);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 2500);
            }

        }
        catch (err) {
            setErrorMessage(true);
            setServerResponse(err.response.data);
            setTimeout(() => {
                setErrorMessage(false);
            }, 2500);
        }
    };

    const ProductBarCode = (e) => {
        setProductBarCode(e.target.value);
    };

    const ProductName = (e) => {
        setProductName(e.target.value);
    };

    const ProductQuantity = (e) => {
        setProductQuantity(e.target.value);
    };

    const ProductPrice = (e) => {
        setProductPrice(e.target.value);
    };

    return (
        <div className="container">
            <div className="row g-0">
                <div className="col-12 d-flex justify-content-center">
                    <form className="w-50 mt-3" onSubmit={SaveProduct} method="POST">
                        <div className="form-group mb-3">
                            <label htmlFor="product-id">Product barcode</label>
                            <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product barcode" onChange={ProductBarCode} value={productBarCode || ''} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="product-name">Product name</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Product name" onChange={ProductName} value={productName || ''} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="product-quantity">Product quantity</label>
                            <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Product quantity" onChange={ProductQuantity} value={productQuantity || ''} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="product-price">Product price</label>
                            <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Product price" onChange={ProductPrice} value={productPrice || ''} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                {successMessage && <div className="mt-3 alert alert-success text-center" role="alert">
                    {serverResponse}
                </div>}
                {errorMessage && <div className="mt-3 alert alert-danger text-center" role="alert">
                    {serverResponse}
                </div>}
            </div>
        </div>
    )
};

export default AddProduct;