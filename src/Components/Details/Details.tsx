import { useEffect, useState } from "react";
import "./Details.css";
import Review from "../Review/Review";
import { ReviewObj } from "../Review/Review";
import { getCampgroundDetails } from "../../ApiCalls";

interface Props {
  selectedCampground: string
}

const Details = ({selectedCampground}: Props) => {
  const [campgroundDetails, setCampgroundDetails] = useState({})
  const [campgroundReviews, setCampgroundReviews] = useState <ReviewObj[]>([]);
  const [reviewUserName, setReviewUserName] = useState("");
  const [reviewStarRating, setReviewStarRating] = useState("");
  const [reviewSiteNumber, setReviewSiteNumber] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitError, setReviewSubmitError] = useState("");

  useEffect(() => {
    console.log(selectedCampground)

    getCampgroundDetails(selectedCampground)
    .then(response => {
      if (response) {
        console.log(response.data.attributes)
        setCampgroundDetails(response.data.attributes);
      }
    })
    .catch(error => {
      alert(`Error loading campground details ${error}`)
    })

    // eslint-disable-next-line
  }, [])

  const submitNewReview = () => {
    const newReview: ReviewObj = {
      id: campgroundReviews.length + 1,
      name: reviewUserName,
      starRating: reviewStarRating,
      siteNum: reviewSiteNumber,
      comment: reviewComment,
    };

    if (+newReview.starRating > 5 || Number.isNaN(+newReview.starRating)) {
      setReviewSubmitError(
        "Please enter a valid number 0 - 5 for your star rating"
      );
      setTimeout(() => setReviewSubmitError(""), 2000);
      return;
    }

    setCampgroundReviews([newReview, ...campgroundReviews]);
    setReviewUserName("");
    setReviewStarRating("");
    setReviewSiteNumber("");
    setReviewComment("");
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const photo = event?.target.files;
    if (photo !== null) {
      console.log(photo[0])
    }
  }

  return (
    <section className="detail-main">
      <div className="cg-images-container">
        <img
          className="cg-images"
          src="https://www.nps.gov/common/uploads/structured_data/3FAA6E89-1DD8-B71B-0B170E56BD4ED00D.jpg"
          alt="campground hero shot"
        />
      </div>
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
            <img
              className="total-star-imgs"
              src="/assets/Star.png"
              alt="star"
            />
            <img
              className="total-star-imgs"
              src="/assets/Star.png"
              alt="star"
            />
            <img
              className="total-star-imgs"
              src="/assets/Star.png"
              alt="star"
            />
            <img
              className="total-star-imgs"
              src="/assets/Star.png"
              alt="star"
            />
          </div>
          <p>4 of 5 Stars</p>
        </section>
        <form className="user-review-form">
          <h3>Review this campground</h3>
          <label htmlFor="userName">Name</label>
          <input
            name="userName"
            type="text"
            maxLength={15}
            value={reviewUserName}
            onChange={(event) => setReviewUserName(event.target.value)}
            placeholder="Rick V"
          />
          <label htmlFor="starRating">
            Rate your stay on a scale of 0 to 5 stars
          </label>
          <input
            name="starRating"
            type="text"
            maxLength={1}
            value={reviewStarRating}
            onChange={(event) => setReviewStarRating(event.target.value)}
            placeholder="5"
          />
          <label htmlFor="siteNumber">What site did you stay in?</label>
          <input
            name="siteNumber"
            type="text"
            maxLength={10}
            value={reviewSiteNumber}
            onChange={(event) => setReviewSiteNumber(event.target.value)}
            placeholder="A-31"
          />
          <label htmlFor="comment">Leave your review</label>
          <input
            name="comment"
            type="text"
            maxLength={1000}
            value={reviewComment}
            onChange={(event) => setReviewComment(event.target.value)}
            placeholder="I loved this campground!"
          />
          <label htmlFor="photoUpload">Add a photo (optional)</label>
          <input name="photoUpload" type='file' onChange={event => handlePhotoUpload(event)} />
        </form>
        <p className="review-error">{reviewSubmitError}</p>
        <button id="submit-review-button" onClick={() => submitNewReview()}>
          Submit review
        </button>
        <section className="user-review-section">
          {campgroundReviews.map((rev) => {
            return <Review data={rev} key={rev.id} />;
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
