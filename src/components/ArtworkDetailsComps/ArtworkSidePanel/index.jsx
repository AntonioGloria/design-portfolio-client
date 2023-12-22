import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import moment from "moment";

const ArtworkSidePanel = (props) => {
  const { artData } = props;
  const { creator, title, description, category, medium, createdAt } = artData;

  return (
    <div className="p-3 pt-5">
      <Link
        to={`/${creator.username}`}
        className='text-decoration-none text-reset'
      >
        <div className='d-flex align-items-center mb-4'>
          <img src={creator.avatar} alt="" style={{width:"75px", borderRadius:"50%"}}/>
          <h3 className='ms-3'>{creator.username}</h3>
        </div>
      </Link>
      <h3>{title}</h3>
      <em className='text-muted'>Posted on {moment(createdAt).format('MMM DD, YYYY')}</em>
      <p className='my-4'>{description}</p>
      <Link to={`/artworks?category=${category}`} className="me-3">
        <Badge bg={"secondary"}>{category}</Badge>
      </Link>
      <Link to={`/artworks?category=${category}&medium=${medium}`}>
        <Badge bg={"secondary"}>{medium}</Badge>
      </Link>
    </div>
  )
}

export default ArtworkSidePanel;