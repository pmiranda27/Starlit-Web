import { TbArrowBadgeRightFilled } from "react-icons/tb";
import "./Tab_Select_Arrow.css";

export const TabSelectArrow = (props) => {
  const currentIndex = props.$tabIndex;

  return <TbArrowBadgeRightFilled className='tab-select-arrow' style={{ transform: `translateY(${currentIndex*90}px)` }} size={50} />;
};
