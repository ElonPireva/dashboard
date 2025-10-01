import ChartReport from "./chart/ChartReport";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div style={{backgroundColor: 'white', padding: '1rem', textAlign: 'center', borderRadius: '1rem', margin: '1rem'}}>
            <h3>Total price</h3>
            <span>1000$</span>
          </div>
        </div>
        <div className="col-lg-4">
        <div style={{backgroundColor: 'white', padding: '1rem', textAlign: 'center', borderRadius: '1rem', margin: '1rem'}}>
            <h3>Total products</h3>
            <span>100</span>
          </div>
        </div>
        <div className="col-lg-4">
        <div style={{backgroundColor: 'white', padding: '1rem', textAlign: 'center', borderRadius: '1rem', margin: '1rem'}}>
            <h3>Average product price</h3>
            <span className="text-center">10$</span>
          </div>
        </div>
      </div>
      <div className="chart">
        <ChartReport />
      </div>
    </div>
  )
};

export default Dashboard;