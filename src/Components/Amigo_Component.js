import "./Amigo_Component.css";

function AmigoComponent() {
    return (
        <div>
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
    );
}