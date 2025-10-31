import "../styles/Home.css";
import HeaderSignIn from "../components/Header-sign-in";
import backgroundImage from "../assets/img/bank-tree.jpeg";
import chatIcon from "../assets/img/icon-chat.png";
import moneyIcon from "../assets/img/icon-money.png";
import securityIcon from "../assets/img/icon-security.png";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HeaderSignIn />
      <div className="hero">
        <img src={backgroundImage} className="banking-background" alt="Banking background" />
        <section className="hero-content">
          <h2 className="subtitle">No fees.</h2>
          <h2 className="subtitle">No minimum deposit.</h2>
          <h2 className="subtitle">High interest rates.</h2>
          <h2 className="text">Open a savings account with Argent Bank today!</h2>
        </section>
      </div>
      <section class="features">
        <div className="feature-item">
          <img src={chatIcon} alt="Chat Icon" className="feature-icon" />
          <h4 className="feature-item-title">You are our #1 priority</h4>
          <p>Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.</p>
        </div>
        <div className="feature-item">
          <img src={moneyIcon} alt="Money Icon" className="feature-icon" />
          <h4 className="feature-item-title">More savings means higher rates</h4>
          <p>The more you save with us, the higher your interest rate will be!</p>
        </div>
        <div className="feature-item">
          <img src={securityIcon} alt="Security Icon" className="feature-icon" />
          <h4 className="feature-item-title">Security you can trust</h4>
          <p>We use top of the line encryption to make sure your data and money is always safe.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default Home;
