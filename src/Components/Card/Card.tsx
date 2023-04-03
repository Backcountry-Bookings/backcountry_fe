import { useState, useEffect } from "react";
import "./Card.css";
import { CampData } from "../Results/Results";
import { Link } from "react-router-dom";
import { sendFavoriteCamps } from "../../ApiCalls";
import { removeFavoriteCamp } from "../../ApiCalls";
import { FavoriteCamps } from "../Dashboard/Dashboard";


interface Props {
  campData: CampData;
  favoriteCamps: CampData[];
  setFavoriteCamps: Function;
  setSelectedCampground: Function;
  fetchedFavoriteCamps: FavoriteCamps[];
  setFetchedFavoriteCamps: React.Dispatch<React.SetStateAction<FavoriteCamps[]>>;
}


const Card = ({
  campData,
  favoriteCamps,
  setFavoriteCamps,
  setSelectedCampground,
  fetchedFavoriteCamps,
  setFetchedFavoriteCamps,
}: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favCampIds = favoriteCamps.map((camp) => camp.id);
    setIsFavorite(favCampIds.includes(campData.id));
  }, [favoriteCamps, campData.id]);
  const loadImage = () => {
    if (campData.attributes.images.length === 0) {
      return "https://us.123rf.com/450wm/nataliia2910/nataliia29101809/nataliia2910180900063/109718030-vector-illustration-of-camping-in-night-time-with-beautiful-view-on-mountains-family-camping.jpg?ver=6";
    } else {
      return campData.attributes.images[0].url;
    }
  };

  const loadAltText = () => {
    if (campData.attributes.images.length === 0) {
      return "Generic campground image";
    } else {
      return campData.attributes.images[0].altText;
    }
  };

  const cost = campData.attributes.cost?.[0]?.cost || " N/A";

  const setFavoriteButton = () => {
    if (isFavorite) {
      return (
        <button className="card-button" onClick={() => removeFavorite()}>
          Remove Favorite
        </button>
      );
    } else {
      return (
        <button className="card-button" onClick={() => addFavorite()}>
          Add to Favorites
        </button>
      );
    }
  };

  const addFavorite = async () => {
    const newFavorites = [...favoriteCamps, campData];
    setFavoriteCamps(newFavorites);
    await sendFavoriteCamps(newFavorites, 1);
  };

  const removeFavorite = async () => {
    const newFavorites = favoriteCamps.filter((camp) => camp !== campData);
    setFavoriteCamps(newFavorites);
  
    const favoriteToRemove = fetchedFavoriteCamps.find(
      (fav) => fav.attributes.campsite_id === campData.id
    );
    if (favoriteToRemove) {
      await removeFavoriteCamp(favoriteToRemove.id);
      const updatedFetchedFavoriteCamps = fetchedFavoriteCamps.filter(
        (fav) => fav.id !== favoriteToRemove.id
      );
      setFetchedFavoriteCamps(updatedFetchedFavoriteCamps);
    }
  };
   

  const urlCampName = () => {
    if (!campData.attributes.name) return;
    const urlDisplay = campData.attributes.name.replaceAll(" ", "");
    return urlDisplay;
  };

  const parkCode = () => {
    if (campData.attributes.park_code) {
      return campData.attributes.park_code.toUpperCase();
    } else {
      return "Not available";
    }
  };

  return (
    <div className="card">
      <img className="card-image" src={loadImage()} alt={loadAltText()} />
      <h1 className="card-name">{campData.attributes.name}</h1>
      <p className="card-copy">National Park: {parkCode()}</p>
      <p className="card-copy">Cost per night: ${cost}</p>
      <Link
        onClick={() => setSelectedCampground(campData.id)}
        to={`/details/${urlCampName()}`}
      >
        <button className="card-button">More Info</button>
      </Link>
      {setFavoriteButton()}
    </div>
  );
};

export default Card;