import "./HomePage.css";
import JutsuLogo from "../../assets/img/JutsuLogo.svg"

function HomePage() {
  return (
    <header className="text-center">
      <h1 className="display-1">Welcome to</h1>
      <img src={JutsuLogo} alt="jutsu-logo"/>
      <h1 className="text-muted">The Place to Show and Grow Your Craft</h1>
    </header>
  );
}

export default HomePage;
