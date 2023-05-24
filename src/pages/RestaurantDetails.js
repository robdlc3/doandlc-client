import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fileChange } from '../services/fileChange';
import { LoadingContext } from '../context/loading.context';
import { RestaurantContext } from '../context/restaurant.context';
import Restaurants from './Restaurants';
import { post, deleteRestaurant } from '../services/authService';

const RestaurantDetails = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  //<<<<------------working on edit feature--------------//>>>>>>>>>>
  const [editMode, setEditMode] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState({});
  const [errorMessage, setErrorMessage] = useState("")
  //<<<<------------working on edit feature--------------//>>>>>>>>>>
  //<<<<------------Need HELP! added deleteRestaurant--------------//>>>>>>>>>>
  const { user } = useContext(LoadingContext);
  const { restaurantData } = useContext(RestaurantContext);
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
        console.log("Error while uploading the file: ", err);
      });
  };

  //<<<<------------working on edit feature--------------//>>>>>>>>>>
  const handleEdit = (e) => {
    e.preventDefault();
    post(`/restaurants/${restaurantInfo._id}`, editedRestaurant)
      .then((response) => setRestaurantInfo(response.data))
      .catch((err) => {
        console.log("error on edit", err)
        if (err.response.data.msg) {
          setErrorMessage(err.response.data.msg)
        }
      });
    setEditMode(true);

    // setEditedRestaurant({ ...restaurantInfo });
  };

  const handleSave = () => {
    setEditMode(false);
    setRestaurantInfo(editedRestaurant);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedRestaurant({});
  };
  //<<<<------------end Edit--------------//>>>>>>>>>>

  //<<<<------------Need HELP! added deleteRestaurant--------------//>>>>>>>>>>

  const handleDelete = async () => {
    try {
      await deleteRestaurant(`/restaurants/${restaurantInfo._id}`);
      navigate('/restaurants');
    } catch (error) {
      console.log('Error deleting restaurant:', error);
    }
  };
  //<<<<------------Need HELP! deleteRestaurant--------------//>>>>>>>>>>

  useEffect(() => {
    restaurantData.map((restaurant) => {
      if (id === restaurant._id) {
        console.log(restaurant, "!!!!HELLOOOOO!!");
        setRestaurantInfo(restaurant);
      }
    });
  }, [restaurantData]);

  //------------working on edit feature--------------//
  return (
    <div>
      {restaurantInfo ? (
        <div >
          <p>This is data</p>
          {editMode ? (
            <form onSubmit={(e) => handleEdit(e)}>
              <input
                type="text"
                value={editedRestaurant.restaurantName}
                onChange={(e) =>
                  setEditedRestaurant((prev) => ({
                    ...prev,
                    restaurantName: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                value={editedRestaurant.description}
                onChange={(e) =>
                  setEditedRestaurant((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <button type='submit'>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </form>
          ) : (
            <div>
              <p>{restaurantInfo.restaurantName}</p>
              <p>
                <img
                  src={restaurantInfo.image}
                  alt="restaurant image"
                  className="restaurant-image"
                />
              </p>
              <p>{restaurantInfo.description}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading</p>
      )
      }

      {/* <form>
        <input
          type="file"
          name="img"
          onChange={handleFileChange}
        />
      </form> */}
      {errorMessage &&
        (<h1>{errorMessage}</h1>)
      }
    </div >
  );
};
//------------working on edit feature--------------//
export default RestaurantDetails;