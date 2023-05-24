import React, { useState } from 'react'
import { fileChange } from '../services/fileChange'

const RestaurantDetails = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

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

  return (
    <div>
      <form>
        <input
          type="file"
          name="img"
          onChange={handleFileChange}
        />
      </form>
    </div>
  )
}

export default RestaurantDetails
