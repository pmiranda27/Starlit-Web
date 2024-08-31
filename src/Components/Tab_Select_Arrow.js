import { TbArrowBadgeRightFilled } from "react-icons/tb";
import "./Tab_Select_Arrow.css";

export const TabSelectArrow = (props) => {
  const currentIndex = props.$tabIndex;
  var currentClass;
  switch (currentIndex) {
    case 0:
      currentClass = "tab-select-arrow tab-home-selected";
      break;
    case 1:
      currentClass = "tab-select-arrow tab-mensagens-selected";
      break;
    case 2:
      currentClass = "tab-select-arrow tab-profile-selected";
      break;
    case 3:
      currentClass = "tab-select-arrow tab-configuracoes-selected";
      break;
    default:
      currentClass = "tab-select-arrow";
      break;
  }
  return (
    <TbArrowBadgeRightFilled
      className={currentClass}
      size={54}
    />
  );
};
