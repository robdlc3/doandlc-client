import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const RestaurantContext = createContext()

function RestaurantContextProvider({ children }) {
    const [restaurantData, setRestaurantData] = useState([])

    const getRestaurants = () => {
        axios.get(baseUrl + "/restaurants")
            .then((restaurantResults) => {
                setRestaurantData(restaurantResults.data)

            })
            .catch((err) => {
                console.log(err)
            })
    };

    const deleteRestaurant = (id) => {
        axios
            .delete(baseUrl + "/restaurants/" + id)
            .then((response) => {
                // Filter the restaurantData array and remove the deleted restaurant
                setRestaurantData((prevData) =>
                    prevData.filter((restaurant) => restaurant._id !== id)
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (!restaurantData.length) {
            getRestaurants()
        }
    }, [])

    return (
        <RestaurantContext.Provider value={{ restaurantData, getRestaurants, setRestaurantData, deleteRestaurant }}>
            {children}
        </RestaurantContext.Provider>

    )
}

export { RestaurantContext, RestaurantContextProvider }