import Card from '../Card/Card';
import './Results.css'

interface Props {
  searchResults: SearchResults;
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
  }
}

interface Images {
  credit: string;
  crops: [],
  title: string;
  altText: string;
  caption: string;
  url: string;
}

const Results = ( {searchResults}: Props  ) => {

  const createCards = () => {
    if (searchResults.data === undefined) return;
    let campgroundCards = searchResults.data.map((camp) => {
      <Card campData={camp} />
    })
    return campgroundCards;
  }

    return (
        <section className='results-main'>
          {createCards()}
        </section>
    )
}

export default Results