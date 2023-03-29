import "./Dashboard.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { fetchCampgrounds } from "../../ApiCalls";
import { useEffect, useState } from "react";

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

// TEST DATA
import { coTestResp } from "./COTestResp";

interface Props {
  setSearchResults: Function;
}

const Dashboard = ( {setSearchResults}: Props) => {
    const [searchType, setSearchType] = useState('')
    const [search, setSearch] = useState<string>('')
    const [disableSearchbar, setDisableSearchbar] = useState(true)
    const [searchPlaceholder, setSearchPlaceholder] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
      if (searchType !== '') {
        setDisableSearchbar(false)
      } else {
        setDisableSearchbar(true)
        return;
      }

      if (searchType === "state_code") {
        setSearchPlaceholder('i.e. "CO" for Colorado')
      } else if (searchType === 'q') {
        setSearchPlaceholder('Enter campground name')
      } else if (searchType === 'park_name') {
        setSearchPlaceholder('Enter National Park name')
      }
    }, [searchType])

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const fetchCamps = () => {
      if (search === '') return;

      // Commented out fetch for testing

      // fetchCampgrounds(searchType, search)
      // .then(result => {
      //     console.log(result)
      // }) 
      // .catch(error => alert(error))
      
      setSearchResults(coTestResp)
      
      navigate("/results")
    }


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
                <SwiperSlide className="swiper-slide" ><img src={swiper1} alt="delicate arch" /></SwiperSlide>
                <SwiperSlide className="swiper-slide"><img src={swiper2} alt="slot canyon in Utah" /></SwiperSlide>
                <SwiperSlide className="swiper-slide"><img src={swiper3} alt="El Capitan in Yosemite" /></SwiperSlide>
                <SwiperSlide className="swiper-slide"><img src={swiper4} alt="River in Yosemite" /></SwiperSlide>
                <SwiperSlide className="swiper-slide"><img src={swiper5} alt="Waterfall in southern Utah" /></SwiperSlide>
                <SwiperSlide className="swiper-slide"><img src={swiper6} alt="Alpine lake in Glacier NP" /></SwiperSlide>
                <SwiperSlide className="swiper-slide"><img src={swiper7} alt="Cabin and dock in Denali NP" /></SwiperSlide>
                <SwiperSlide className="swiper-slide"><img src={swiper8} alt="Valley in Banff National Park" /></SwiperSlide>
                <SwiperSlide className="swiper-slide"><img src={swiper9} alt="Lake with mountain in background in Lake Clark National Park" /></SwiperSlide>
            </Swiper>
            <div className="search-container">
                <form className="search-form">
                    <select value={searchType} name="search-dropdown" id="search-dropdown" onChange={event => setSearchType(event.target.value)}>
                        <option value=''>Select method to search for campgrounds</option>
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
                </form>
                <br />
                <button className="search-button" onClick={fetchCamps}>Search</button>
            </div>
            <br />
            <div>
                <h2 className="fav-campgrounds-title">Your Favorite Campgrounds</h2>
                <img className="campfire" src={campfire} alt="A campfire"></img>
            </div>
        </div>
    );
};

export default Dashboard;
