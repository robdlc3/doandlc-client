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
    }
    useEffect(() => {
        if (!restaurantData.length) {
            getRestaurants()
        }
    }, [])

    return (
        <RestaurantContext.Provider value={{ restaurantData, getRestaurants, setRestaurantData }}>
            {children}
        </RestaurantContext.Provider>

    )
}

export { RestaurantContext, RestaurantContextProvider }