import { HiOutlineDotsHorizontal } from "react-icons/hi";
import "./Amigo_Component.css";

function AmigoComponent({ name, imgUrl, isAddingFriends }) {
  return (
    <div className="amigo-component">
      <img src={imgUrl} alt="" />
      <div className="info-amigo">
        <h4>{name}</h4>
      </div>


      {isAddingFriends ? <MdOut> : <HiOutlineDotsHorizontal
        size={"24px"}
        strokeWidth={"4px"}
        color="white"
      />}
    </div>
  );
}

export default AmigoComponent;