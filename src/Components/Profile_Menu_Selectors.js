import "./Profile_Menu_Selectors.css";

export const ProfileTabSelector = (props) => {
    const profileTabSelectorContent = props.$profileTabContent
    const currentIndex = props.$currentProfileTabIndex;
    var profileClass;
    switch (currentIndex) {
        case 0:
            profileClass = 'profile-menu-tab-selectors posts-selected';
            break;
        case 1:
            profileClass = 'profile-menu-tab-selectors avaliacoes-selected';
            break;
        case 2:
            profileClass = 'profile-menu-tab-selectors comentarios-selected';
            break;
        case 3:
            profileClass = 'profile-menu-tab-selectors curtidas-selected';
            break;
        default:
            profileClass = 'profile-menu-tab-selectors';
            break;
    }
    return <div className={profileClass}>{profileTabSelectorContent}</div>;
}