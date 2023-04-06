import "./Dashboard.css";
import { fetchCampgrounds, sendFavoriteCamps } from "../../ApiCalls";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import campfire from "../../Assets/campfire.gif";
import DashboardSwiper from "../DashboardSwiper/DashboardSwiper";
import { useNavigate } from "react-router-dom";
import { CampData } from "../Results/Results";

interface Props {
  setSearchResults: Function;
  favoriteCamps: CampData[];
  setFavoriteCamps: Function;
  setSelectedCampground: Function;
  setCurrentLocation: Function;
  currentLocation:
    | undefined
    | {
        latitude: string;
        longitude: string;
      };
}

export interface FavoriteCamps {
  id: number;
  type: string;
  attributes: { campsite_id: string };
}

const Dashboard = ({
  setSearchResults,
  favoriteCamps,
  setFavoriteCamps,
  setSelectedCampground,
  setCurrentLocation,
  currentLocation,
}: Props) => {
  const [searchType, setSearchType] = useState("");
  const [search, setSearch] = useState("");
  const [disableSearchbar, setDisableSearchbar] = useState(true);
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [stateError, setStateError] = useState(false);
  const [error, setError] = useState(false);
  const [catchError, setCatchError] = useState(false);
  const [fetchedFavoriteCamps, setFetchedFavoriteCamps] = useState<
    FavoriteCamps[]
  >([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (favoriteCamps.length > 0) {
      sendFavoriteCamps(favoriteCamps, 1)
        .then((responses) => {
          console.log("Favorite camps updated successfully:", responses);
        })
        .catch((error) => {
          console.error("Failed to update favorite camps:", error);
        });
    }
  }, [favoriteCamps]);

  useEffect(() => {
    if (searchType !== "") {
      setDisableSearchbar(false);
    } else {
      setDisableSearchbar(true);
      return;
    }

    if (searchType === "state_code") {
      setSearchPlaceholder('i.e. "CO" for Colorado');
    } else if (searchType === "q") {
      setSearchPlaceholder("Enter campground name");
    } else if (searchType === "park_name") {
      setSearchPlaceholder("Enter National Park name");
    }
  }, [searchType]);

  useEffect(() => {
    const successCallback = (position: GeolocationPosition) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    };

    const errorCallback = (error: object) => {};
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    setSelectedCampground("");
  }, []);

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (search !== "" && searchType !== "") {
      setStateError(false);
      setError(false);
    }
    setSearch(e.target.value);
  };

  const fetchNearbyCamps = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    const gpsCoords = `${currentLocation?.latitude},${currentLocation?.longitude}`;
    fetchCampgrounds("by_dist", gpsCoords)
      .then((result) => {
        setLoading(false);
        setSearchResults(result);
        navigate("/results");
      })
      .catch((error: string) => {
        setLoading(false);
        setCatchError(true);
        console.log(error);
      });
  };

  const fetchCamps = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (searchType === "state_code" && search.length !== 2) {
      setStateError(true);
    } else if (searchType === "" || search === "") {
      setError(true);
    } else {
      setError(false);
      setStateError(false);
      fetchCampgrounds(searchType, search)
        .then((result) => {
          setSearchResults(result);
          navigate("/results");
        })
        .catch((error: string) => {
          setCatchError(true);
          console.log(error);
        });
    }
  };

  const createFavorites = () => {
    if (favoriteCamps.length > 0) {
      let favCamps = favoriteCamps.map((camp) => {
        return (
          <Card
            setSelectedCampground={setSelectedCampground}
            campData={camp}
            key={camp.id}
            favoriteCamps={favoriteCamps}
            setFavoriteCamps={setFavoriteCamps}
            setFetchedFavoriteCamps={setFetchedFavoriteCamps}
            fetchedFavoriteCamps={fetchedFavoriteCamps}
          />
        );
      });
      return <div className="favorites-container">{favCamps}</div>;
    }
  };

  const displayNearMeButton = () => {
    if (currentLocation && !loading) {
      return (
        <button
          className="geolocation-button"
          id="geoButton"
          onClick={(event) => fetchNearbyCamps(event)}
          disabled={!currentLocation}
        >
          Campgrounds Near Me
        </button>
      );
    } else if (currentLocation && loading) {
      return (
        <button
          className="geolocation-button"
          id="geoButton"
          onClick={(event) => fetchNearbyCamps(event)}
          disabled={!currentLocation}
        >
          Finding Campgrounds Near You
        </button>
      );
    }
  };

  return (
    <div className="dashboard">
      <DashboardSwiper />
      <div className="search-container">
        <form className="search-form">
          <select
            value={searchType}
            className="dropdown"
            name="search-dropdown"
            id="search-dropdown"
            onChange={(event) => setSearchType(event.target.value)}
          >
            <option value="">Select method to search for campgrounds</option>
            <option value="state_code">State Code</option>
            <option value="q">Campground Name</option>
            <option value="park_name">National Park</option>
          </select>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="search"
            onChange={updateInput}
            disabled={disableSearchbar}
          ></input>
          <button
            className="search-button"
            onClick={(event) => fetchCamps(event)}
            disabled={disableSearchbar}
          >
            Search
          </button>
          {displayNearMeButton()}
        </form>
        {error && (
          <p className="search-prompt">
            Please select a type of search/Enter something into the search bar
          </p>
        )}
        {stateError && (
          <p className="state-code-prompt">State code should be two letters</p>
        )}
        <br />
      </div>
      {catchError && (
        <p>
          There may have been an issue with our servers, please try again later
        </p>
      )}
      {currentLocation ? (
        <h3 className="geolocation-msg">
          Your location: {currentLocation?.latitude},{" "}
          {currentLocation?.longitude}{" "}
        </h3>
      ) : (
        <h3 className="geolocation-msg">
          Please enable location for the best experience
        </h3>
      )}
      <br />
      <section className="favorites-section">
        <h2 className="fav-campgrounds-title">Your Favorite Campgrounds</h2>
        {createFavorites()}
        <img className="campfire" src={campfire} alt="A campfire" />
      </section>
    </div>
  );
};

export default Dashboard;
