import "./Home_Screen.css";

import { FaUserFriends } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function HomeScreen() {
  const iconStyle = { color: "white" };
  return (
    <>
      <div className="home-screen-main">
        <section className="main-post-feed"></section>
        <section className="main-friends-section">
          <div className="link-card-main-friends">
            <FaUserFriends style={iconStyle} />
            Amigos
          </div>

          <div className="amigo-component">
            <img src="https://placehold.co/60" alt="User Profile" />
            <div className="info-amigo">
              <h4>Nome do Amigo</h4>
              <h5>Online há 4h</h5>
            </div>

            <HiOutlineDotsHorizontal
              size={"24px"}
              strokeWidth={"4px"}
              color="white"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default HomeScreen;
