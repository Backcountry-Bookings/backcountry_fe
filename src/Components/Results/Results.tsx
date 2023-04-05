import Card from "../Card/Card";
import "./Results.css";
import camper from "../../Assets/error.gif";
import { useEffect } from "react";

interface Props {
  searchResults: SearchResults;
  setSelectedCampground: Function;
  favoriteCamps: CampData[];
  setFavoriteCamps: Function;
}

interface SearchResults {
  data?: CampData[];
}

export interface CampData {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    images: Images[];
    park_name: string;
    state_code: string;
    cost: [
      {
        cost: string;
      }
    ];
    park_code: string;
    campsite_id: string;
  };
}

export interface Images {
  credit: string;
  crops: [] | string[];
  title: string;
  altText: string;
  caption: string;
  url: string;
}

const Results = ({
  searchResults,
  favoriteCamps,
  setFavoriteCamps,
  setSelectedCampground,
}: Props) => {

  useEffect(() => {
    setSelectedCampground("")
    // eslint-disable-next-line
  }, [])

  const createCards = () => {
    if (searchResults.data === undefined || searchResults.data.length === 0) {
      return (
        <div className="search-error-section centered">
          <img
            className="error-gif"
            src={camper}
            alt="Just a little guy camping"
          />
          <h3 className="error-msg">
            There may have been an issue with your search, click the title to go
            home
          </h3>
        </div>
      );
    }
    let campgroundCards = searchResults.data.map((camp) => {
      return (
        <Card
          campData={camp}
          key={camp.id}
          favoriteCamps={favoriteCamps}
          setSelectedCampground={setSelectedCampground}
          setFavoriteCamps={setFavoriteCamps}
          fetchedFavoriteCamps={[]}
          setFetchedFavoriteCamps={() => {}}
        />
      );
    });

    return campgroundCards;
  };

  return (
    <section className="results-main">
      {searchResults.data === undefined || searchResults.data.length === 0 ? (
        <div className="search-error-section centered">
          <img
            className="error-gif"
            src={camper}
            alt="Just a little guy camping"
          />
          <h3 className="error-msg">
            There may have been an issue with your search, click the title to go
            home
          </h3>
        </div>
      ) : (
        <div className="card-grid">{createCards()}</div>
      )}
    </section>
  );
};

export default Results;
