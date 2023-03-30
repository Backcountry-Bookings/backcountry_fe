import "./Card.css";
import { CampData } from "../Results/Results";
import { Link } from "react-router-dom";

interface Props {
  campData: CampData;
  favoriteCamps: CampData[];
  setFavoriteCamps: Function;
  setSelectedCampground: Function;
}

const Card = ({
  campData,
  favoriteCamps,
  setFavoriteCamps,
  setSelectedCampground,
}: Props) => {
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
    const favCampIds = favoriteCamps.map((camp) => camp.id);
    if (favCampIds.includes(campData.id)) {
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

  const addFavorite = () => {
    setFavoriteCamps([...favoriteCamps, campData]);
  };

  const removeFavorite = () => {
    let newFavorites = favoriteCamps.filter((camp) => camp !== campData);
    setFavoriteCamps(newFavorites);
  };

  const urlCampName = () => {
    return campData.attributes.name.replaceAll(" ", "");
  };

  return (
    <div className="card">
      <img className="card-image" src={loadImage()} alt={loadAltText()} />
      <h1 className="card-name">{campData.attributes.name}</h1>
      <p className="card-cost">Cost per night: ${cost}</p>
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
