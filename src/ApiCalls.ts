export async function fetchUserData(pathName: string) {
    try {
      const response = await fetch(`https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?q=aspenglen`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const campgroundData = await response.json();
      console.log(`User data fetched successfully: ${JSON.stringify(campgroundData)}`);
      return campgroundData;
    } catch (error) {
      console.error(`Failed to fetch user data: ${error}`);
      throw error;
    }
  }


  