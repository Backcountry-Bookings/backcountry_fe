import './Card.css'
import { CampData } from '../Results/Results';
import { Link } from 'react-router-dom';

interface Props {
  campData: CampData;
}

const Card = ( {campData}: Props ) => {

  const loadImage = () => {
    if (campData.attributes.images.length === 0) {
      return 'https://us.123rf.com/450wm/nataliia2910/nataliia29101809/nataliia2910180900063/109718030-vector-illustration-of-camping-in-night-time-with-beautiful-view-on-mountains-family-camping.jpg?ver=6';
    } else {
      return campData.attributes.images[0].url;
    }
  }

  const loadAltText =  () => {
    if (campData.attributes.images.length === 0) {
      return 'Generic campground image';
    } else {
      return campData.attributes.images[0].altText;
    }
  }
  
  const cost = campData.attributes.cost?.[0]?.cost || 'N/A';

    return (
        <div className='card'>
            <img className='card-image' src={loadImage()} alt={loadAltText()}/>
            <h1 className='card-name'>{campData.attributes.name}</h1>
            <p className='card-cost'>Campground Cost: ${cost}</p>
            <Link className='card-button'to={`/details/${campData.id}`}>
              More Info
            </Link>
        </div>
    )
}

export default Card 