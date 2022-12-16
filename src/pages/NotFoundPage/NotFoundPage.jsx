import "./NotFoundPage.css";
import NotFound from "../../assets/img/NotFound.png";

function NotFoundPage() {
  return (
    <div className="d-flex align-items-center" style={{height:"93vh"}}>
      <div className="not-found text-center d-flex flex-column justify-content-center" style={{backgroundImage: `url(${NotFound})`, width:"100%", height:"720px"}}>
        <p className="display-1">Page Not Found</p>
        <p className="display-6">This page doesn't seem to exist</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
