const DeleteProduct = ({rowData}) => {
    return (
        <div>
            {rowData.map((row) => (
                <div className="text-center">
                    <h1>{row.productName}</h1>
                </div>
            ))}
        </div>
    )
};

export default DeleteProduct;