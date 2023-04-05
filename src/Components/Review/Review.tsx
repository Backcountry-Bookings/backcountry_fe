import "./Review.css";
import ReviewStar from "../ReviewStar/ReviewStar";

interface Props {
  data: ReviewObj;
}

export interface ReviewObj {
  id: string;
  name?: string;
  created_at?: string;
  rating: number;
  site_name?: string;
  description?: string;
  img_file?: Blob | string;
}

const Review = ({ data }: Props) => {
  const createStars = () => {
    let starArr = []
    for (let i = 0; i < data.rating; i++) {
      starArr.push(<ReviewStar key={`rev${data.id}-star${i + 1}`} />);
    }
    return starArr;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  
  const loadPhoto = () => {
    if (typeof data.img_file === 'string' && data.img_file !== 'No Image') {
      return <img className='review-image' src={data.img_file} alt={`User review ${data.id} - ${data.description}`} />
    } else if (typeof data.img_file === 'object') {
      return <img className='review-image' src={`${URL.createObjectURL(data.img_file)}`} alt={`User review ${data.id} - ${data.description}`} />
    }
  }

  return (
    <div className="user-review">
      <div className="user-review-header">
        <div className="user-stars">{createStars()}</div>
        <p>{data.name}</p>
      </div>
      <p>Date: {data.created_at ? formatDate(data.created_at) : "N/A"}</p>
      <p>Site: {data.site_name}</p>
      <p className="data-description">{data.description}</p>
      {loadPhoto()}
    </div>
  );
};

export default Review;
