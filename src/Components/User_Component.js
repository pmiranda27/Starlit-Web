import { IoPersonAdd } from "react-icons/io5";
import { CiNoWaitingSign } from "react-icons/ci";

import "./User_Component.css";
import { useState } from "react";

function UserComponent({ name, imgUrl }) {
  const [isRequested, setIsRequested] = useState(false);

  return (
    <div className="user-component">
      <img
        src={
          imgUrl === ""
            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            : imgUrl
        }
        alt=""
      />
      <div className="info-user">
        <h4>{name}</h4>
      </div>

      <div className="icons">
        {isRequested ? (
          <CiNoWaitingSign
            size={"18px"}
            strokeWidth={"4px"}
            color="white"
            onClick={() => {
              setIsRequested(false);
            }}
          />
        ) : (
          <IoPersonAdd
            size={"24px"}
            strokeWidth={"4px"}
            color="white"
            onClick={() => {
              setIsRequested(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default UserComponent;
