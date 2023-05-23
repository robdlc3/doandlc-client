import { uploadImage } from './services/authService';
import { post } from '../services/authService';
import { useState } from 'react';

const AddRestaurant = () => {
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
    image: '',
  });

  const handleInputChange = (e) => {
    setNewRestaurant((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewRestaurant((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('name', newRestaurant.name);
    uploadData.append('description', newRestaurant.description);
    uploadData.append('image', newRestaurant.image);

    post('/photo', uploadData)
      .then(() => {
        console.log('Image uploaded successfully');
        setNewRestaurant({
          name: '',
          description: '',
          image: '',
        });
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
          name="name"
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
