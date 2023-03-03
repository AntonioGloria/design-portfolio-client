import { Link } from "react-router-dom";
import moment from "moment";

const ArtworkSidePanel = (props) => {
  const { artData } = props;
  const { author, title, description, createdAt } = artData;
  return (
    <div className="p-3 pt-5">
      <Link
        to={`/${author.username}`}
        className='text-decoration-none text-reset'
      >
        <div className='d-flex align-items-center mb-5'>
          <img src={author.avatar} alt="" style={{width:"75px", borderRadius:"50%"}}/>
          <h3 className='ms-3'>{author.username}</h3>
        </div>
      </Link>
      <h3>{title}</h3>
      <em className='text-muted'>Posted on {moment(createdAt).format('MMM DD, YYYY')}</em>
      <p className='mt-5'>{description}</p>
    </div>
  )
}

export default ArtworkSidePanel;