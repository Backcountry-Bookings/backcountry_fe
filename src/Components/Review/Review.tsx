import './Review.css'
import ReviewStar from '../ReviewStar/ReviewStar';

interface Props {
  data: ReviewObj;
}

export interface ReviewObj {
  id: number;
  name: string;
  starRating: string;
  siteNum: string;
  comment: string;
}

const Review = ( {data}: Props ) => {

  const createStars = () => {
    let starArr = []
    for (let i = 0; i < +data.starRating; i++) {
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
      <p>Site: {data.siteNum}</p>
      <p>{data.comment}</p>
    </div>
  )
}

export default Review;