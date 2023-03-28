import './Review.css'
import ReviewStar from '../ReviewStar/ReviewStar';

type ReviewObj = {
  id: number;
  name: string;
  starRating: string;
  siteNum: string;
  comment: string;
}

const Review = ( props: {data: ReviewObj} ) => {

  const createStars = () => {
    let starArr = []
    for (let i = 0; i < +props.data.starRating; i++) {
      starArr.push(<ReviewStar />);
    }
    return starArr;
  }

  return ( 
    <div className="user-review">
      <div className="user-review-header">
        <div className="user-stars">
          {createStars()}
        </div>
        <p>{props.data.name}</p>
      </div>
      <p>Site: {props.data.siteNum}</p>
      <p>{props.data.comment}</p>
    </div>
  )
}

export default Review;