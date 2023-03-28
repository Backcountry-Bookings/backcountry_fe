import { useEffect } from 'react';
import './Review.css'

type ReviewObj = {
  id: number;
  name: string;
  starRating: string;
  siteNum: string;
  comment: string;
}

const Review = ( props: {data: ReviewObj} ) => {

  // useEffect(() => {
  //   let starElement = <img className="user-stars" src="/assets/Star.png" alt="star" />;
  //   let starCount = props.data.starRating;

  // })

  return ( 
    <div className="user-review">
      {/* THESE STARS ARE STATIC, REPLACE WITH DYNAMIC? */}
      <div className="user-review-header">
        <div className="user-stars">
          <img className="user-stars" src="/assets/Star.png" alt="star" />
          <img className="user-stars" src="/assets/Star.png" alt="star" />
          <img className="user-stars" src="/assets/Star.png" alt="star" />
          <img className="user-stars" src="/assets/Star.png" alt="star" />
        </div>
        <p>{props.data.name}</p>
      </div>
      <p>Site: {props.data.siteNum}</p>
      <p>{props.data.comment}</p>
    </div>
  )
}

export default Review;