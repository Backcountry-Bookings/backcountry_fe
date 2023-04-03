import { CampData } from "./Components/Results/Results";

export async function fetchCampgrounds(pathType: string, searchValue: string) {
  try {
    const response = await fetch(
      `https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?${pathType}=${searchValue}`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const campgroundData = await response.json();
    return campgroundData;
  } catch (error) {
    console.log(`Failed to fetch campground data: ${error}`);
    throw error;
  }
}

export async function getCampgroundDetails(id: string) {
  try {
    const response = await fetch(
      `https://backcountry-bookings-be.herokuapp.com/api/v1/campsites/${id}`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const campDetails = await response.json();
    return campDetails;
  } catch (error) {
    console.log(`Failed to fetch campground data: ${error}`);
    throw error;
  }
}

export async function sendFavoriteCamps(
  favoriteCamps: CampData[],
  userId: number
) {
  try {
    const favoriteCampIds = favoriteCamps.map((camp) => camp.id); // Extract the camp IDs from the favoriteCamps array

    console.log("Extracted favorite camp IDs:", favoriteCampIds); // Log the extracted favorite camp IDs

    const responses = await Promise.all(
      favoriteCampIds.map(async (campsite_id) => {
        const response = await fetch(
          `https://backcountry-bookings-be.herokuapp.com/api/v1/favorites?user_id=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ campsite_id }), // Send the single campsite_id in the request body
          }
        );

        console.log(
          "Request sent with campsite_id:",
          JSON.stringify({ campsite_id })
        ); // Log the request body

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
      })
    );

    console.log("Server responses:", responses); // Log the server responses
    return responses;
  } catch (error) {
    console.log(`Failed to send favorite camps data: ${error}`);
    throw error;
  }
}

export async function getFavoriteCamps(userId: number) {
  try {
    const response = await fetch(
      `https://backcountry-bookings-be.herokuapp.com/api/v1/favorites?user_id=${userId}`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const favoriteCamps = await response.json();
    return favoriteCamps;
  } catch (error) {
    console.log(`Failed to fetch favorite camps data: ${error}`);
    throw error;
  }
}
