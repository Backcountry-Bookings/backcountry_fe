import { useEffect, useState } from "react";
import "./Details.css";
import Review from "../Review/Review";
import { ReviewObj } from "../Review/Review";
import { getCampgroundDetails } from "../../ApiCalls";
import { getCampgroundReviews } from "../../ApiCalls";
import { postCampgroundReview } from "../../ApiCalls";
import { Images } from "../Results/Results";
import { CampData } from "../Results/Results";
import { useNavigate } from "react-router";
import DetailMap from "../DetailMap/DetailMap";
import { MouseEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import errorGif from "../../Assets/error.gif";
import loading from "../../Assets/is-loading.gif";
import { Link } from "react-router-dom";

interface Props {
  selectedCampground: string;
  setSelectedCampground: Function;
  favoriteCamps: CampData[];
  setFavoriteCamps: Function;
  currentLocation: undefined | {
    latitude: string;
    longitude: string;
  };
  setCurrentLocation: Function;
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

interface FetchedReview {
  id: string;
  attributes: {
    campsite_id: string;
    description: string;
    image_url: string;
    name: string;
    rating: number;
    site_name: string;
    created_at: string;
  };
}

const Details = ({
  selectedCampground,
  setSelectedCampground,
  favoriteCamps,
  setFavoriteCamps,
  currentLocation,
  setCurrentLocation,
}: Props) => {
  const [campgroundDetails, setCampgroundDetails] = useState<CampDetails>();
  const [campgroundReviews, setCampgroundReviews] = useState<ReviewObj[]>([]);
  const [reviewUserName, setReviewUserName] = useState("");
  const [reviewRating, setReviewRating] = useState("");
  const [reviewSiteName, setReviewSiteName] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewImg, setReviewImg] = useState<Blob | undefined>(undefined);
  const [reviewSubmitMsg, setReviewSubmitMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [catchError, setCatchError] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getCampgroundDetails(selectedCampground)
      .then((response) => {
        if (response) {
          setCampgroundDetails(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setCatchError(true)
        console.log(`Error loading campground details ${error}`);
      });

    getCampgroundReviews(selectedCampground)
      .then((response) => {
        if (response) {
          console.log('campground reviews response', response.data)
          setCampgroundReviews(formatReviews(response.data));
        }
      })
      .catch((error) => {
        console.log(`Error loading campground reviews ${error}`);
      });

    // eslint-disable-next-line
  }, []);

  const formatReviews = (revArr: FetchedReview[]) => {
    const formattedReviews = revArr.map((rev) => {
      const review: ReviewObj = {
        id: `fetched-${rev.id}`,
        name: rev.attributes.name,
        created_at: rev.attributes.created_at,
        rating: rev.attributes.rating,
        site_name: rev.attributes.site_name,
        description: rev.attributes.description,
        img_file: rev.attributes.image_url,
      };
      return review;
    });
    return formattedReviews;
  };

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
          <button className="button">Directions</button>
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
          <button className="button">Go to booking site</button>
        </a>
      );
    }
  };

  const setFavoriteButton = () => {
    const favCampIds = favoriteCamps.map((camp) => camp.id);
    if (campgroundDetails === undefined) return;
    if (favCampIds.includes(campgroundDetails?.id)) {
      return (
        <button className="button" onClick={() => removeFavorite()}>
          Remove Favorite
        </button>
      );
    } else {
      return (
        <button className="button" onClick={() => addFavorite()}>
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
      const sumRating = campgroundReviews.reduce((sum, rev) => {
        sum += +rev.rating;
        return sum;
      }, 0);
      const avgRating = (sumRating / reviewCount).toFixed(1);
      return (
        <p className="total-star-rating">Avg Rating: {avgRating} of 5 Stars</p>
      );
    }
  };

  const submitNewReview = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!reviewUserName) {
      setReviewSubmitMsg("Please enter a name for your review");
      setTimeout(() => setReviewSubmitMsg(""), 2000);
      return;
    }

    if (+reviewRating > 5 || Number.isNaN(+reviewRating) || +reviewRating < 1) {
      setReviewSubmitMsg("Please enter a number 1 - 5 for your star rating");
      setTimeout(() => setReviewSubmitMsg(""), 2000);
      return;
    }

    const newReview: ReviewObj = {
      id: `new-${campgroundReviews.length + 1}`,
      name: reviewUserName,
      created_at: new Date().toLocaleDateString(),
      rating: +reviewRating,
      site_name: reviewSiteName,
      description: reviewDescription,
      img_file: reviewImg,
    };

    const reviewPostData = new FormData();
    reviewPostData.append('name', reviewUserName);
    reviewPostData.append('rating', reviewRating);
    reviewPostData.append('site_name', reviewSiteName);
    reviewPostData.append('description', reviewDescription);
    if (reviewImg) {
      reviewPostData.append('img_file', reviewImg);
    }

    setReviewSubmitMsg('Posting review...')

    postCampgroundReview(reviewPostData, selectedCampground)
      .then((response) => {
        if (response.success) {
          setCampgroundReviews([...campgroundReviews, newReview]);
          setReviewUserName("");
          setReviewRating("");
          setReviewSiteName("");
          setReviewDescription("");
          setReviewImg(undefined);
          setReviewSubmitMsg('Review posted!')
          setTimeout(() => setReviewSubmitMsg(""), 2000)
        }
      })
      .catch((error) => {
        const errorMsg = error.toString().split('"')
        setReviewSubmitMsg(errorMsg[3])
        setTimeout(() => setReviewSubmitMsg(""), 3500)
        setReviewImg(undefined);
      })
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const photo = event?.target.files;
    if (photo !== null) {
      setReviewImg(photo[0]);
    }
  };

  const navBackToResults = () => {
    setSelectedCampground("");
    navigate(-1);
  };

  return (
    <div className="loading">
      {isLoading ? (
        <img className="loading-gif" src={loading} alt="loading" />
      ) : (
        <div>
          {!campgroundDetails || catchError ? (
            <div className="error">
              <img
                className="error-gif"
                src={ errorGif }
                alt="There was an error"
              />
              <h3>
                There was an error loading campground info, please return to the home page
              </h3>
              <br />
              <Link className='home-link' to='/'>Return Home</Link>
            </div>
          ) : (
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
                    disableOnInteraction: true,
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
                <p className="cg-desc">
                  {campgroundDetails?.attributes.description}
                </p>
              </section>
              <section className="cg-map-section">
                <DetailMap
                  lat={campgroundDetails?.attributes.lat}
                  lng={campgroundDetails?.attributes.long}
                />
              </section>
              <section className="cg-details-section">
                <div className="cg-details-header">
                  <h3>Campground Info</h3>
                  <hr className="divider-cg-info" />
                </div>
                <div className="cg-details-copy-section">
                  <div className="reservation-info">
                    <p className="cg-details-copy">{createCostDisplay()}</p>
                    <p className="cg-details-copy">
                      {`Number of reservable sites: ${campgroundDetails?.attributes.number_of_reservation_sites}`}
                    </p>
                    <p className="cg-details-copy">
                      {`Reservation info: ${campgroundDetails?.attributes.reservation_info}`}
                    </p>
                  </div>
                  <div className="cg-details-header">
                    <h3>Amenities</h3>
                    <hr className="divider-amenities-info" />
                  </div>
                  <p className="cg-details-copy">{`Toilets: ${campgroundDetails?.attributes.toilets[0]}`}</p>
                  <p className="cg-details-copy">{`Showers: ${campgroundDetails?.attributes.showers[0]}`}</p>
                  <p className="cg-details-copy">{`Cell coverage: ${campgroundDetails?.attributes.cell_coverage}`}</p>
                  <p className="cg-details-copy">{`Laundry: ${campgroundDetails?.attributes.laundry}`}</p>
                  <p className="cg-details-copy">
                    {`Dump station: ${campgroundDetails?.attributes.dump_station}`}
                  </p>
                  <p className="cg-details-copy">{`Camp store: ${campgroundDetails?.attributes.camp_store}`}</p>
                  <p className="cg-details-copy">{`Potable water: ${campgroundDetails?.attributes.potable_water}`}</p>
                  <p className="cg-details-copy">{`Ice available: ${campgroundDetails?.attributes.ice_available}`}</p>
                  <p className="cg-details-copy">{`Firewood available: ${campgroundDetails?.attributes.firewood_available}`}</p>
                  <p className="cg-details-copy">
                    {`Wheelchair access: ${campgroundDetails?.attributes.wheelchair_access}`}
                  </p>
                </div>
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
                  <label htmlFor="rating">
                    Rate your stay on a scale of 1 to 5 stars
                  </label>
                  <input
                    name="rating"
                    type="text"
                    maxLength={1}
                    value={reviewRating}
                    onChange={(event) => setReviewRating(event.target.value)}
                    placeholder="5"
                  />
                  <label htmlFor="siteName">What site did you stay in?</label>
                  <input
                    name="siteName"
                    type="text"
                    maxLength={10}
                    value={reviewSiteName}
                    onChange={(event) => setReviewSiteName(event.target.value)}
                    placeholder="A-31"
                  />
                  <label htmlFor="comment">Leave your review</label>
                  <input
                    name="comment"
                    type="text"
                    maxLength={1000}
                    value={reviewDescription}
                    onChange={(event) =>
                      setReviewDescription(event.target.value)
                    }
                    placeholder="I loved this campground!"
                  />
                  <label htmlFor="photoUpload">Add a JPEG or PNG photo (optional)</label>
                  <input
                    name="photoUpload"
                    type="file"
                    onChange={(event) => handlePhotoUpload(event)}
                  />
                </form>
                <p className="review-msg">{reviewSubmitMsg}</p>
                <button 
                  className="button"
                  id="submit-review-button"
                  onClick={(event) => submitNewReview(event)}
                >
                  Submit review
                </button>
                <section className="user-review-section">
                  {campgroundReviews.map((rev) => {
                    return <Review data={rev} key={rev.id} />;
                  })}
                </section>
              </section>
              <div className="detail-btns">
                <button className="button" onClick={() => navBackToResults()}>
                  Back to search results
                </button>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;
