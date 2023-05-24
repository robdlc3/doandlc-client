import { uploadImage } from '../services/authService';
import { post } from '../services/authService';
import { useState, useContext } from 'react';
import Restaurants from './Restaurants';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../context/loading.context';

const AddRestaurant = () => {
  const navigate = useNavigate()
  const { restaurants, setRestaurants } = useContext(LoadingContext)
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
    console.log(file)
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
    }

    // setNewRestaurant((prev) => ({
    //   ...prev,
    //   image: file,
    // }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault()

    console.log(newRestaurant)

    // console.log("these are the restaurants from state", restaurants)

    post("/restaurants/create", newRestaurant).then((response) => {
      console.log("added restaurant!", response.data)
      setRestaurants([...restaurants, response.data.createdRestaurant])
      navigate('/restaurants')
    })


      .catch((error) => {
        console.log('Error uploading image:', error);
      });
  };

  return (
    <div>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="restaurantName"
          value={newRestaurant.name}
          onChange={handleInputChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={newRestaurant.description}
          onChange={handleInputChange}
        ></textarea>

        <label>Image</label>
        <input type="file" name="image" onChange={handleFileChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
