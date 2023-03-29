import Card from "../Card/Card";
import "./Results.css";
import camper from '../../Assets/error.gif'

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
    cost: {
      cost: string;
    }[];
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

const Results = ({ searchResults, favoriteCamps, setFavoriteCamps, setSelectedCampground }: Props) => {

  const createCards = () => {
    if (!searchResults.data || searchResults.data.length === 0) {
      return (
        <div>
          <img className='error-gif' src={camper} alt='Just a little guy camping'/>
          <h3 className='error-msg'>There may have been an issue with your search, click the title to go home</h3>
        </div>
      )
    }

    let campgroundCards = searchResults.data.map((camp) => {
      return <Card campData={camp} key={camp.id} favoriteCamps={favoriteCamps} setSelectedCampground={setSelectedCampground} setFavoriteCamps={setFavoriteCamps} />;
    });

    return (
      <section className="results-main">
        {campgroundCards}
      </section>
    );
  };
  return (
    <div>
      <section className="results-main">{createCards()}</section>
    </div>
  );
};

export default Results;
