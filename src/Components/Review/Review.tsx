import './Review.css'
import ReviewStar from '../ReviewStar/ReviewStar';

interface Props {
  data: ReviewObj;
}

export interface ReviewObj {
  id: number;
  name?: string;
  rating: number;
  site_name?: string;
  description?: string;
  img_file?: object;
}

const Review = ( {data}: Props ) => {

  const createStars = () => {
    let starArr = []
    for (let i = 0; i < data.rating; i++) {
      starArr.push(<ReviewStar key={`rev${data.id}-star${i + 1}`} />);
    }
    return starArr;
  }

  return ( 
    <div className="user-review">
      <div className="user-review-header">
        <div className="user-stars">
          {createStars()}
        </div>
        <p>{data.name}</p>
      </div>
      <p>Site: {data.site_name}</p>
      <p>{data.description}</p>
    </div>
  )
}

export default Review;