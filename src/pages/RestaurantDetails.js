import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { fileChange } from '../services/fileChange'
import { LoadingContext } from '../context/loading.context';
import { RestaurantContext } from '../context/restaurant.context';
import Restaurants from './Restaurants';

const RestaurantDetails = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  const { user } = useContext(LoadingContext);

  const { restaurantData } = useContext(RestaurantContext);
  const { id } = useParams()
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
  }

  useEffect(() => {
    restaurantData.map((restaurant) => {
      if (id === restaurant._id) {
        console.log(restaurant, "!!!!HELLOOOOO!!")
        setRestaurantInfo(restaurant)
      }
    })



  }, [restaurantData])

  return (
    <div>
      {restaurantInfo ?
        <div>
          <p>This is data</p>
          <p>{restaurantInfo.restaurantName}</p>
          <p><img src={restaurantInfo.image} alt="restaurant image" class="restaurant-image" /></p>
          <p>{restaurantInfo.description}</p>
          <button>
            
          </button>
        </div>
        :
        <p>Loading</p>
      }

      {/* <form>
        <input
          type="file"
          name="img"
          onChange={handleFileChange}
        />
      </form> */}
    </div>
  )
}

export default RestaurantDetails
