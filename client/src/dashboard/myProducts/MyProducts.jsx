import Table from "../table/Table";

const MyProducts = () => {

    const handleViewClick = (e) => {
        console.log(e.target.previousSibling);
    };  

    return (
        <div onClick={handleViewClick}>
            <Table />
        </div>
    )
};

export default MyProducts;