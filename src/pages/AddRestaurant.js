import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../context/loading.context';
import { post } from '../services/authService';
import { Form, Button } from 'react-bootstrap';

const AddRestaurant = () => {
  const navigate = useNavigate();
  const { restaurants, setRestaurants } = useContext(LoadingContext);
  const [newRestaurant, setNewRestaurant] = useState({
    restaurantName: '',
    image: '',
  });

  const handleInputChange = (e) => {
    setNewRestaurant((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const uploadData = new FormData();
      uploadData.append('image', file);
      post('/photo', uploadData)
        .then((response) => {
          setNewRestaurant({
            ...newRestaurant,
            image: response.data.image,
          });
        })
        .catch((error) => {
          console.log('Error uploading image:', error);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newRestaurant);

    post('/restaurants/create', newRestaurant)
      .then((response) => {
        console.log('Added restaurant!', response.data);
        setRestaurants([...restaurants, response.data.createdRestaurant]);

        navigate('/restaurants');
      })
      .catch((error) => {
        console.log('Error adding restaurant:', error);
      });
  };

  return (
    <div className="container">
      <h1>Add Restaurant</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="restaurantName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="restaurantName"
            value={newRestaurant.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>My Review:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={newRestaurant.review}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="file" name="image" onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddRestaurant;
//styling for AddRestaurant 9:58