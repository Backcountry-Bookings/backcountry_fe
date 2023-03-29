import Card from "../Card/Card";
import "./Results.css";

interface Props {
  searchResults: SearchResults;
  setSelectedCampground: Function;
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

interface Images {
  credit: string;
  crops: [] | string[];
  title: string;
  altText: string;
  caption: string;
  url: string;
}

const Results = ({ searchResults, setSelectedCampground }: Props) => {
  const createCards = () => {
    if (searchResults.data === undefined) return;
    let campgroundCards = searchResults.data.map((camp) => {
      return <Card campData={camp} key={camp.id}/>;
    });
    return campgroundCards;
  };

  return <section className="results-main">{createCards()}</section>;
};

export default Results;
