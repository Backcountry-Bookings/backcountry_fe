import "./Dashboard.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { fetchCampgrounds, getCampgroundDetails } from "../../ApiCalls";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { getFavoriteCamps } from "../../ApiCalls";

import { useNavigate } from "react-router-dom";

//Styling Stuff
import campfire from "../../Assets/campfire.gif";
import swiper1 from "../../Assets/swiperImages/1.jpg";
import swiper2 from "../../Assets/swiperImages/2.jpg";
import swiper3 from "../../Assets/swiperImages/3.jpg";
import swiper4 from "../../Assets/swiperImages/4.jpg";
import swiper5 from "../../Assets/swiperImages/5.jpg";
import swiper6 from "../../Assets/swiperImages/6.jpg";
import swiper7 from "../../Assets/swiperImages/7.jpg";
import swiper8 from "../../Assets/swiperImages/8.jpg";
import swiper9 from "../../Assets/swiperImages/9.jpg";
import "swiper/css";
import "swiper/css/pagination";
import { CampData } from "../Results/Results";

interface Props {
  setSearchResults: Function;
  favoriteCamps: CampData[];
  setFavoriteCamps: Function;
  setSelectedCampground: Function;
}
export interface FavoriteCamps {
  id: number;
  type: string;
  attributes: { campsite_id: string };
}

const Dashboard = ({
  setSearchResults,
  favoriteCamps,
  setFavoriteCamps,
  setSelectedCampground,
}: Props) => {
  const [searchType, setSearchType] = useState("");
  const [search, setSearch] = useState<string>("");
  const [disableSearchbar, setDisableSearchbar] = useState(true);
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [stateError, setStateError] = useState(false);
  const [error, setError] = useState(false);
  const [fetchedFavoriteCamps, setFetchedFavoriteCamps] = useState<
    FavoriteCamps[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    getFavoriteCamps(1)
      .then((result) => {
        if (result) {
          console.log("favorite camp use effect", result);
          setFetchedFavoriteCamps(result.data);
        }
      })
      .catch((error) =>
        console.log(`Error loading favorite campgrounds ${error}`)
      );
  }, []);

  useEffect(() => {
    if (fetchedFavoriteCamps.length > 0) {
      const favoriteCampIds = fetchedFavoriteCamps.map((camp) => {
        return camp?.attributes.campsite_id;
      });
      const fetchFavoriteCamps = async () => {
        const favoriteCampArray = await Promise.all(
          favoriteCampIds.map(async (camp) => {
            const result = await getCampgroundDetails(camp);
            if (result) {
              return result.data;
            }
          })
        );
        const uniqueFavoriteCamps = Array.from(
          new Set(
            favoriteCampArray
              .filter((camp) => camp !== undefined)
              .map((camp) => JSON.stringify(camp))
          )
        ).map((campString) => JSON.parse(campString));
        setFavoriteCamps(uniqueFavoriteCamps);
      };
      fetchFavoriteCamps();
    }
    // eslint-disable-next-line
  }, [fetchedFavoriteCamps]);
  
  
  useEffect(() => {
    if (searchType !== "") {
      setDisableSearchbar(false);
    } else {
      setDisableSearchbar(true);
      return;
    }

    if (searchType === "state_code") {
      setSearchPlaceholder('i.e. "CO" for Colorado');
    } else if (searchType === "q") {
      setSearchPlaceholder("Enter campground name");
    } else if (searchType === "park_name") {
      setSearchPlaceholder("Enter National Park name");
    }
  }, [searchType]);

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (search !== "" && searchType !== "") {
      setStateError(false);
      setError(false);
    }
    setSearch(e.target.value);
  };

  const fetchCamps = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (searchType === "state_code" && search.length !== 2) {
      setStateError(true);
    } else if (searchType === "" || search === "") {
      setError(true);
    } else {
      setError(false);
      setStateError(false);
      fetchCampgrounds(searchType, search).then((result) => {
        setSearchResults(result);
        navigate("/results");
      });
    }
  };

  const createFavorites = () => {
    if (favoriteCamps.length > 0) {
      let favCamps = favoriteCamps.map((camp) => {
        return (
          <Card
            setSelectedCampground={setSelectedCampground}
            campData={camp}
            key={camp.id}
            favoriteCamps={favoriteCamps}
            setFavoriteCamps={setFavoriteCamps}
            setFetchedFavoriteCamps={setFetchedFavoriteCamps}
            fetchedFavoriteCamps={fetchedFavoriteCamps} 
          />
        );
      });
      return <div className="favorites-container">{favCamps}</div>;
    }
  };

  return (
    <div className="dashboard">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        speed={400}
        autoplay={{ delay: 4000 }}
        slidesPerView={1}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide">
          <img src={swiper1} alt="delicate arch" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={swiper2} alt="slot canyon in Utah" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={swiper3} alt="El Capitan in Yosemite" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={swiper4} alt="River in Yosemite" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={swiper5} alt="Waterfall in southern Utah" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={swiper6} alt="Alpine lake in Glacier NP" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={swiper7} alt="Cabin and dock in Denali NP" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={swiper8} alt="Valley in Banff National Park" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img
            src={swiper9}
            alt="Lake with mountain in background in Lake Clark National Park"
          />
        </SwiperSlide>
      </Swiper>
      <div className="search-container">
        <form className="search-form">
          <select
            value={searchType}
            name="search-dropdown"
            id="search-dropdown"
            onChange={(event) => setSearchType(event.target.value)}
          >
            <option value="">Select method to search for campgrounds</option>
            <option value="state_code">State Code</option>
            <option value="q">Campground Name</option>
            <option value="park_name">National Park</option>
          </select>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="search"
            onChange={updateInput}
            disabled={disableSearchbar}
          ></input>
          <button
            className="search-button"
            onClick={(event) => fetchCamps(event)}
            disabled={disableSearchbar}
          >
            Search
          </button>
        </form>
        {error && (
          <p>
            Please select a type of search/Enter something into the search bar
          </p>
        )}
        {stateError && <p>State code should be two letters</p>}
        <br />
      </div>
      <br />
      <section className="favorites-section">
        <h2 className="fav-campgrounds-title">Your Favorite Campgrounds</h2>
        {createFavorites()}
        <img className="campfire" src={campfire} alt="A campfire"></img>
      </section>
    </div>
  );
};

export default Dashboard;
