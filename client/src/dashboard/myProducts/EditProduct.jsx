const EditProduct = ({rowData}) => {
    return (
        <div className="container">
            {rowData.map((row) => (
                <div className="text-center">
                    <h1>{row.productBarCode}</h1>
                </div>
            ))}
        </div>
    )
};

export default EditProduct;