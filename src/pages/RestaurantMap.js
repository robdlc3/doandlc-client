import React from 'react';
import RestaurantMap from './RestaurantMap';

const App = () => {
    // Provide the latitude and longitude of the location you want to display restaurants for
    const latitude = 37.7749;
    const longitude = -122.4194;

    return (
        <div>
            <h1>Restaurant Map</h1>
            <RestaurantMap latitude={latitude} longitude={longitude} />
        </div>
    );
};

export default App;
