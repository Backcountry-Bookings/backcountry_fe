import { useState } from "react";
import "./Details.css";
import Review from "../Review/Review";

const reviews = [
  {
    id: 1,
    name: 'Luke C',
    starRating: '4',
    siteNum: 'A-31',
    comment: 'Sites are close to each other, but the water is close. The amenities are good and mountain biking trails are very close.'
  },
]

type NewReview = {
  id: number;
  name: string;
  starRating: string;
  siteNum: string;
  comment: string;
}

const Details = () => {
  const [campgroundReviews, setCampgroundReviews] = useState(reviews)
  const [reviewUserName, setReviewUserName] = useState('')
  const [reviewStarRating, setReviewStarRating] = useState('')
  const [reviewSiteNumber, setReviewSiteNumber] = useState('')
  const [reviewComment, setReviewComment] = useState('')

  const submitNewReview = () => {
    const newReview: NewReview = {
      id: campgroundReviews.length + 1,
      name: reviewUserName,
      starRating: reviewStarRating,
      siteNum: reviewSiteNumber,
      comment: reviewComment, 
    };
    setCampgroundReviews([newReview, ...campgroundReviews])
    setReviewUserName('')
    setReviewStarRating('')
    setReviewSiteNumber('')
    setReviewComment('')
  }

  return (
    <section className="detail-main">
      <img
        className="cg-image"
        src="https://www.nps.gov/common/uploads/structured_data/3FAA6E89-1DD8-B71B-0B170E56BD4ED00D.jpg"
        alt="campground hero shot"
      />
      <div className="cg-name">
        <h2>Aspenglen Campground</h2>
      </div>
      <section className="cg-desc-section">
        <p className="cg-desc">
          Aspenglen Campground is reservation only. Visit Recreation.gov.
          Aspenglen opens for the 2023 season on May 26. Timed Entry Permits are
          included with your camping reservation. For Aspenglen Campers, your
          reservation includes access to Bear Lake Road. Campers will be able to
          initially enter the park beginning at 1 p.m. on the first day of your
          camping reservation. If you plan to enter the park earlier in the day,
          you will have to enter the park outside of the times when Timed Entry
          Permits are in effect.
        </p>
      </section>
      <section className="cg-map-section">
        <img
          className="cg-map"
          src="/assets/Screenshot 2023-03-26 at 12.14.46 PM.png"
          alt="campground map"
        />
      </section>
      <section className="cg-details-section">
        <div className="cg-details-header">
          <h3>Campground Info</h3>
          <hr className="divider-cg-info" />
        </div>
        <div className="cg-details-copy-section">
          <p className="cg-details-copy">
            Cost: $30 per night # Of Reservable Sites: 54 Reservation
          </p>
          <p className="cg-details-copy"># Of Reservable Sites: 54</p>
          <p className="cg-details-copy">
            Reservation Info : Aspenglen Campground is a reservation only
            campground. All sites are reservable up to six months in advance.
          </p>
          <p className="cg-details-copy">Toilets : Flush Toilets - seasonal</p>
          <p className="cg-details-copy">Showers: None</p>
          <p className="cg-details-copy">Cell Coverage: No </p>
          <p className="cg-details-copy">Laundry: No </p>
          <p className="cg-details-copy">Dump Station: No </p>
          <p className="cg-details-copy">Camp Store: No </p>
          <p className="cg-details-copy">Potable Water: Yes - seasonal </p>
          <p className="cg-details-copy">Ice Available: Yes - seasonal </p>
          <p className="cg-details-copy">Firewood Available: Yes - seasonal </p>
          <p className="cg-details-copy">
            Reservation Info : Aspenglen Campground is a reservation only
            campground. All sites are reservable up to six months in advance.
          </p>
          <p className="cg-details-copy">
            Wheelchair Access: Two ADA sites are offered for those customers
            with a disability or otherwise limited mobility who would benefit
            from the accessibility design features.
          </p>
        </div>
        <section className="cg-activities-section">
          <div className="cg-activities-header">
            <h3>Activities</h3>
            <hr className="divider-cg-activities" />
          </div>
          <ul className="cg-activities-list">
            <li>Wildlife viewing</li>
            <li>Hiking</li>
            <li>Fishing</li>
            <li>Camping</li>
            <li>Boating</li>
            <li>Biking</li>
          </ul>
        </section>
        <div className="detail-btns">
          <button>Directions</button>
          <button>Go to booking site</button>
          <button>Add to favorites</button>
        </div>
      </section>
      <section className="cg-review-section">
        <div className="cg-reviews-header">
          <h3>Reviews</h3>
          <hr className="divider-cg-reviews" />
        </div>
        <section className="total-star-section">
          <div className="total-star-img-section">
            <img className="total-star-imgs" src="/assets/Star.png" alt="star" />
            <img className="total-star-imgs" src="/assets/Star.png" alt="star" />
            <img className="total-star-imgs" src="/assets/Star.png" alt="star" />
            <img className="total-star-imgs" src="/assets/Star.png" alt="star" />
          </div>
          <p>4 of 5 Stars</p>
        </section>
        <form className="user-review-form">
          <h3>Review this campground</h3>
          <input name="userName" type="text" value={reviewUserName} onChange={(event) => setReviewUserName(event.target.value)} placeholder="Enter your name" />
          <input name="starRating" type="number" min="0" max="5" value={reviewStarRating} onChange={(event) => setReviewStarRating(event.target.value)} placeholder="Enter 0 - 5" />
          <input name="siteNumber" type="text" value={reviewSiteNumber} onChange={(event) => setReviewSiteNumber(event.target.value)} placeholder="Site number" />
          <input name="comment" type="text" value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} placeholder="Leave your review" />
        </form>
        <button id="submit-review-button" onClick={() => submitNewReview()}>Submit review</button>
        <section className="user-review-section">
           {campgroundReviews.map((rev) => {
            return <Review data={rev} key={rev.id} />
           })}
        </section>
      </section>
      <div className="detail-btns">
        <button>Back to search results</button>
      </div>
    </section>
  );
};

export default Details;
