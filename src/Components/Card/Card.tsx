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
      const genericImg = (
        <img
          className="card-image"
          src="https://us.123rf.com/450wm/nataliia2910/nataliia29101809/nataliia2910180900063/109718030-vector-illustration-of-camping-in-night-time-with-beautiful-view-on-mountains-family-camping.jpg?ver=6"
          alt="Generic campground - no images available from NPS"
        />
      );
      return genericImg;
    } else {
      const campImg = (
        <img
          className="card-image"
          src={campData.attributes.images[0].url}
          alt={campData.attributes.images[0].altText}
        />
      );
      return campImg;
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
    if (!campData.attributes.name) return;
    const urlDisplay = campData.attributes.name.replaceAll(" ", "");
    return urlDisplay;
  };

  const parkCode = () => {
    if (campData.attributes.park_name) {
      let parkNameLowCase = campData.attributes.park_name
        .toLocaleLowerCase()
        .split(" ");
      const numOfWords = parkNameLowCase.length;
      let formattedParkName = parkNameLowCase.map((word, i) => {
        const capFirstLetter = word[0].toUpperCase();
        const restOfWord = word.slice(1);
        const capWord = `${capFirstLetter}${restOfWord}`;
        if (i === numOfWords) {
          return capWord;
        } else {
          return `${capWord} `;
        }
      });
      return formattedParkName.join("");
    } else {
      return "Not Available";
    }
  };

  return (
    <div className="card">
      {loadImage()}
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
