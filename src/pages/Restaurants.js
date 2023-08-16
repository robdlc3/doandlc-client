import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingContext } from '../context/loading.context';
import { Card, Button, Col, Row } from 'react-bootstrap';

const Restaurants = () => {
  const { restaurants, getRestaurants } = useContext(LoadingContext);
  const [searchTerm, setSearchTerm] = useState('');

  const sort = (array) => {
    return array.sort((a, b) =>
      a.name?.common.localeCompare(b.name?.common)
    );
  };

  const searched = (array) => {
    return searchTerm
      ? array.filter((element) =>
          element.name?.common
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        )
      : array;
  };

  useEffect(() => {
    if (!restaurants || !restaurants.length) {
      getRestaurants();
    }
  }, []);

  if (!restaurants) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Restaurants</h1>

      {/* <Link to="/add-restaurant">
        <Button variant="primary">Add New Restaurant</Button>
      </Link> */}

      {restaurants.length ? (
        <Row className="mt-4">
          {searched(sort(restaurants)).map((restaurant) => {
            return (
              <Col md={4} key={restaurant._id} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={restaurant.image}
                    alt="restaurant image"
                    className="restaurant-image"
                  />
                  <Card.Body>
                    <Card.Title>{restaurant.restaurantName}</Card.Title>
                    <Link to={`/restaurant/${restaurant._id}`}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>No restaurants found.</p>
      )}
    </div>
  );
};

export default Restaurants;

