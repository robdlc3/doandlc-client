import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fileChange } from '../services/fileChange';
import { LoadingContext } from '../context/loading.context';
import { RestaurantContext } from '../context/restaurant.context';
import { post, deleteRestaurant } from '../services/authService';
import { Card, Button, Form } from 'react-bootstrap';

const RestaurantDetails = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(LoadingContext);
  const { restaurantData, getRestaurants } = useContext(RestaurantContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setButtonDisabled(true);

    fileChange(e)
      .then((response) => {
        console.log(response.data);
        setUpdatedUser((prev) => ({ ...prev, [e.target.name]: response.data.image }));
        setButtonDisabled(false);
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log('Error while uploading the file: ', err);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    post(`/restaurants/${restaurantInfo._id}`, editedRestaurant)
      .then((response) => setRestaurantInfo(response.data))
      .catch((err) => {
        console.log('Error on edit', err);
        if (err.response.data.msg) {
          setErrorMessage(err.response.data.msg);
        }
      });
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    setRestaurantInfo(editedRestaurant);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedRestaurant({});
  };

  const handleDelete = async () => {
    try {
      await deleteRestaurant(`/restaurants/${restaurantInfo._id}`);
      navigate('/restaurants');
    } catch (error) {
      console.log('Error deleting restaurant:', error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    restaurantData.forEach((restaurant) => {
      if (id === restaurant._id) {
        setRestaurantInfo(restaurant);
      }
    });
  }, [restaurantData]);

  return (
    <div className="container">
      {restaurantInfo ? (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>{restaurantInfo.restaurantName}</Card.Title>
              <Card.Img src={restaurantInfo.image} alt="restaurant image" className="img-fluid" />
              <Card.Text>{restaurantInfo.description}</Card.Text>
              {editMode ? (
                <Form onSubmit={(e) => handleEdit(e)}>
                  <Form.Group controlId="restaurantName">
                    <Form.Label>Restaurant Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedRestaurant.restaurantName}
                      onChange={(e) =>
                        setEditedRestaurant((prev) => ({
                          ...prev,
                          restaurantName: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editedRestaurant.description}
                      onChange={(e) =>
                        setEditedRestaurant((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Form>
              ) : (
                <div>
                  <Button variant="primary" onClick={() => setEditMode(true)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      ) : (
        <p>Loading</p>
      )}

      {errorMessage && <h1>{errorMessage}</h1>}
    </div>
  );
};

export default RestaurantDetails;
