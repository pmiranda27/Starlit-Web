import axios from "axios";
import "./Home_Screen.css";

import { FaUserFriends } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function HomeScreen() {
  const apiUrl =
    "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

  const iconStyle = { color: "white" };

  var listaAmigosFinal;

  async function getFriends() {
    const email = "pedroh@gmail.com";

    try {
      const response = await axios.post(`${apiUrl}/user/amigos`, {
        email: email,
      });

      return response.data;
    } catch (error) {
      console.log("Fail no GET");
      return [];
    }
  }

  listaAmigosFinal = getFriends();

  return (
    <>
      <div className="home-screen-main">
        <section className="main-post-feed"></section>
        <section className="main-friends-section">
          <div className="link-card-main-friends">
            <FaUserFriends style={iconStyle} />
            Amigos
          </div>

          <div></div>
        </section>
      </div>
    </>
  );
}

export default HomeScreen;
