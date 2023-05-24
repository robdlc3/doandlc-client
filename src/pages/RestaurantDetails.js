import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fileChange } from '../services/fileChange';
import { LoadingContext } from '../context/loading.context';
import { RestaurantContext } from '../context/restaurant.context';
import Restaurants from './Restaurants';

const RestaurantDetails = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  //------------working on edit feature--------------//
  const [editMode, setEditMode] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState({});
  //------------working on edit feature--------------//

  const { user } = useContext(LoadingContext);
  const { restaurantData, deleteRestaurant } = useContext(RestaurantContext);
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

  //------------working on edit feature--------------//
  const handleEdit = () => {
    setEditMode(true);
    setEditedRestaurant({ ...restaurantInfo });
  };

  const handleSave = () => {
    setEditMode(false);
    setRestaurantInfo(editedRestaurant);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedRestaurant({});
  };
  //------------working on edit feature--------------//

  //------------DELETE feature--------------//

  const handleDelete = async () => {
    try {
      await deleteRestaurant(id);
      navigate('/restaurants');
    } catch (error) {
      console.log('Error deleting restaurant:', error);
    }
  };
  //------------DELETE feature--------------//

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
        <div>
          <p>This is data</p>
          {editMode ? (
            <div>
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
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
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
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading</p>
      )}

      {/* <form>
        <input
          type="file"
          name="img"
          onChange={handleFileChange}
        />
      </form> */}
    </div>
  );
};
//------------working on edit feature--------------//
export default RestaurantDetails;