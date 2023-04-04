import { CampData } from "./Components/Results/Results";

export async function fetchCampgrounds(pathType: string, searchValue: string) {
  try {
    const response = await fetch(
      `https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?${pathType}=${searchValue}`
    );
    if (!response.ok) {
      throw new Error(`Fetch campgrounds request failed with status ${response.status}`);
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
      throw new Error(`Get campground details request failed with status ${response.status}`);
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
    console.log("Fetching favorite camps for user ID:", userId);
    const response = await fetch(
      `https://backcountry-bookings-be.herokuapp.com/api/v1/favorites?user_id=${userId}`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const favoriteCamps = await response.json();
    console.log("Fetched favorite camps:", favoriteCamps);
    return favoriteCamps;
  } catch (error) {
    console.log(`Failed to fetch favorite camps data: ${error}`);
    throw error;
  }
}

export async function removeFavoriteCamp(favoriteId: number) {
  try {
    console.log("Removing favorite camp with favorite ID:", favoriteId);
    const response = await fetch(
      `https://backcountry-bookings-be.herokuapp.com/api/v1/favorites/${favoriteId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const responseData = await response.json();
    console.log("Removed favorite camp. Response data:", responseData);
    return responseData;
  } catch (error) {
    console.log(`Failed to remove favorite camp: ${error}`);
    throw error;
  }
}

export async function getCampgroundReviews(id: string) {
  try {
    const response = await fetch(`https://backcountry-bookings-be.herokuapp.com/api/v1/reviews?campsite_id=${id}`)
    if (!response.ok) {
      throw new Error(`Get campground reviews request failed with status ${response.status}`)
    }
    const campReviews = await response.json();
    return campReviews;
  } catch (error) {
    console.log(`Failed to fetch campground reviews: ${error}`)
    throw error;
  }
}

export async function postCampgroundReview(reviewObj: BodyInit, campID: string) {
  try {
    const response = await fetch(`https://backcountry-bookings-be.herokuapp.com/api/v1/reviews?user_id=1&campsite_id=${campID}`, {
      method: "POST",
      body: reviewObj
    })
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text) })
    }
    const reviewResp = await response.json();
    return reviewResp;
  } catch (error) {
    console.log(`Failed to post campground review: ${error}`)
    throw error;
  }
}
