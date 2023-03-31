import { useEffect, useState } from "react";
import "./Details.css";
import Review from "../Review/Review";
import { ReviewObj } from "../Review/Review";
import { getCampgroundDetails } from "../../ApiCalls";
import { Images } from "../Results/Results";
import { CampData } from "../Results/Results";
import { useNavigate } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import isLoadingGif from '../../Assets/is-loading.gif'
import errorGif from '../../Assets/error.gif'


interface Props {
  selectedCampground: string;
  setSelectedCampground: Function;
  favoriteCamps: CampData[];
  setFavoriteCamps: Function;
}

interface CampDetails {
  id: string;
  attributes: {
    name: string;
    lat: string;
    long: string;
    booking_link: string;
    description: string;
    images: Images[];
    cost: Cost[];
    number_of_reservation_sites: string;
    reservation_info: string;
    toilets: string[];
    showers: string[];
    cell_coverage: string;
    laundry: string;
    dump_station: string;
    camp_store: string;
    potable_water: string[];
    ice_available: string;
    firewood_available: string;
    wheelchair_access: string;
    weather_info: string;
  };
}

interface Cost {
  cost: string;
  description: string;
  title: string;
}

const Details = ({
  selectedCampground,
  setSelectedCampground,
  favoriteCamps,
  setFavoriteCamps,
}: Props) => {
  const [campgroundDetails, setCampgroundDetails] = useState<CampDetails>();
  const [campgroundReviews, setCampgroundReviews] = useState<ReviewObj[]>([]);
  const [reviewUserName, setReviewUserName] = useState("");
  const [reviewStarRating, setReviewStarRating] = useState("");
  const [reviewSiteNumber, setReviewSiteNumber] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitError, setReviewSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    getCampgroundDetails(selectedCampground)
      .then((response) => {
        if (response) {
          setCampgroundDetails(response.data);
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log(`Error loading campground details ${error}`);
      });
    // eslint-disable-next-line
  }, []);

  const createSwiperImages = () => {
    if (campgroundDetails?.attributes.images.length === 0) {
      const genericImg = (
        <SwiperSlide className="swiper-slide">
          <img
            src="https://us.123rf.com/450wm/nataliia2910/nataliia29101809/nataliia2910180900063/109718030-vector-illustration-of-camping-in-night-time-with-beautiful-view-on-mountains-family-camping.jpg?ver=6"
            alt="Generic campground - no images available from NPS"
          />
        </SwiperSlide>
      );
      return genericImg;
    } else {
      const campImgGallery = campgroundDetails?.attributes.images.map(
        (imgObj, i) => {
          return (
            <SwiperSlide className="swiper-slide" key={i}>
              <img src={imgObj.url} alt={imgObj.altText} />
            </SwiperSlide>
          );
        }
      );
      return campImgGallery;
    }
  };

  const createCostDisplay = () => {
    if (campgroundDetails?.attributes.cost.length === 0) {
      return `Cost per night: Not available`;
    }
    return `Cost per night: $${campgroundDetails?.attributes.cost[0].cost}`;
  };

  const createDirectionsButton = () => {
    if (
      campgroundDetails?.attributes.lat &&
      campgroundDetails?.attributes.long
    ) {
      return (
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${campgroundDetails?.attributes.lat}+${campgroundDetails?.attributes.long}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Directions</button>
        </a>
      );
    }
  };

  const createBookingButton = () => {
    if (campgroundDetails?.attributes.booking_link) {
      return (
        <a
          href={campgroundDetails?.attributes.booking_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Go to booking site</button>
        </a>
      );
    }
  };

  const setFavoriteButton = () => {
    const favCampIds = favoriteCamps.map((camp) => camp.id);
    if (campgroundDetails === undefined) return;
    if (favCampIds.includes(campgroundDetails?.id)) {
      return (
        <button className="card-button" onClick={() => removeFavorite()}>
          Remove Favorite
        </button>
      );
    } else {
      return (
        <button className="card-button" onClick={() => addFavorite()}>
          Add to Favorites
        </button>
      );
    }
  };

  const addFavorite = () => {
    setFavoriteCamps([...favoriteCamps, campgroundDetails]);
  };

  const removeFavorite = () => {
    let newFavorites = favoriteCamps.filter(
      (camp) => camp.id !== campgroundDetails?.id
    );
    setFavoriteCamps(newFavorites);
  };

  const createTotalStarDisplay = () => {
    const reviewCount = campgroundReviews.length;
    if (reviewCount === 0) {
      return <p id="noReviewYet">Be the first to review!</p>;
    } else {
      const sumStarRating = campgroundReviews.reduce((sum, rev) => {
        sum += +rev.starRating;
        return sum;
      }, 0);
      const avgStarRating = (sumStarRating / reviewCount).toFixed(1);
      return (
        <p className="total-star-rating">
          Avg Rating: {avgStarRating} of 5 Stars
        </p>
      );
    }
  };

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
      console.log(photo[0]);
    }
  };

  const navBackToResults = () => {
    setSelectedCampground("");
    navigate("/results");
  };

  return (
    <div className="loading">
      {isLoading ? <img className='loading-gif' src={isLoadingGif} alt='loading' /> :
        <div>
          {!campgroundDetails ?
            <div className="error">
              <img className="error-gif" src={errorGif} alt='There was an error' />
              <h3>There was an error loading campground info, please return home</h3>
            </div> :
            <section className="detail-main">
              <div className="cg-images-container">
                  <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            speed={400}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true
            }}
            slidesPerView={1}
            className="details-swiper"
          >
            {createSwiperImages()}
          </Swiper>
              </div>
              <div className="cg-name">
                <h2>{campgroundDetails?.attributes.name}</h2>
              </div>
              <section className="cg-desc-section">
                <p className="cg-desc">{campgroundDetails?.attributes.description}</p>
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
                    {`Cost per night: $${campgroundDetails?.attributes.cost[0].cost}`}
                  </p>
                  <p className="cg-details-copy">
                    {`Number of reservable sites: ${campgroundDetails?.attributes.number_of_reservation_sites}`}
                  </p>
                  <p className="cg-details-copy">
                    {`Reservation info: ${campgroundDetails?.attributes.reservation_info}`}
                  </p>
                  <p className="cg-details-copy">{`Toilets: ${campgroundDetails?.attributes.toilets[0]}`}</p>
                  <p className="cg-details-copy">{`Showers: ${campgroundDetails?.attributes.showers[0]}`}</p>
                  <p className="cg-details-copy">{`Cell coverage: ${campgroundDetails?.attributes.cell_coverage}`}</p>
                  <p className="cg-details-copy">{`Laundry: ${campgroundDetails?.attributes.laundry}`}</p>
                  <p className="cg-details-copy">
                    {`Dump station: ${campgroundDetails?.attributes.dump_station}`}{" "}
                  </p>
                  <p className="cg-details-copy">{`Camp store: ${campgroundDetails?.attributes.camp_store}`}</p>
                  <p className="cg-details-copy">{`Potable water: ${campgroundDetails?.attributes.potable_water}`}</p>
                  <p className="cg-details-copy">{`Ice available: ${campgroundDetails?.attributes.ice_available}`}</p>
                  <p className="cg-details-copy">{`Firewood available: ${campgroundDetails?.attributes.firewood_available}`}</p>
                  <p className="cg-details-copy">
                    {`Wheelchair access: ${campgroundDetails?.attributes.wheelchair_access}`}
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
                  {createDirectionsButton()}
                  {createBookingButton()}
                  {setFavoriteButton()}
                </div>
              </section>
              <section className="cg-review-section">
                <div className="cg-reviews-header">
                  <h3>Reviews</h3>
                  <hr className="divider-cg-reviews" />
                </div>
                <section className="total-star-section">
                  {createTotalStarDisplay()}
                  {/* <div className="total-star-img-section">
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
          <p>4 of 5 Stars</p> */}
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
                  <input
                    name="photoUpload"
                    type="file"
                    onChange={(event) => handlePhotoUpload(event)}
                  />
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
                <button onClick={() => navBackToResults()}>Back to search results</button>
              </div>
            </section>
          }
        </div>
      }
    </div>
  );
};

export default Details;
