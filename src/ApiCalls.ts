export async function fetchCampgrounds(pathType: string, searchValue: string) {
  try {
    const response = await fetch(`https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?${pathType}=${searchValue}`);
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
    const response = await fetch(`https://backcountry-bookings-be.herokuapp.com/api/v1/campsites/${id}`)
    if (!response.ok) {
      throw new Error(`Get campground details request failed with status ${response.status}`);
    }
    const campDetails = await response.json();
    return campDetails;
  } catch (error) {
    console.log(`Failed to fetch campground data: ${error}`)
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
    console.log(`Failed to fetch campground reviews with status ${error}`)
    throw error;
  }
}


  