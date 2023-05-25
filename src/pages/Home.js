import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container">
      <div id="home" className="homeContainer text-center">
        <h1 className="display-4">đồ ăn DLC</h1>

        <Link to="/restaurants" className="btn btn-primary mt-3">
          Show me the eats
        </Link>
      </div>

      <div className="homeFood bg-secondary text-light py-5 text-center">
        {/* <h2 className="mb-4">Delicious Food</h2>
        <p className="lead">Explore a wide range of culinary delights.</p> */}
      </div>
    </div>
  );
};

export default Home;
