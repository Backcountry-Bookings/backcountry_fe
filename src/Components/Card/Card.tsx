import './Card.css'
import { CampData } from '../Results/Results';

interface Props {
  campData: CampData;
}





const Card = ( {campData}: Props ) => {
    return (
        <div className='card'>
            <img className='card-image' src='https://www.nps.gov/common/uploads/structured_data/3FAA6E89-1DD8-B71B-0B170E56BD4ED00D.jpg'/>
            <h1 className='card-name'>{campData.attributes.name}</h1>
            <p className='card-cost'>Campground Cost: $30 per night</p>
            <button className='card-button'>More Info</button>
        </div>
    )
}

export default Card 