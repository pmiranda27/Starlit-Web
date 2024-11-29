import './ReviewPage.css'

import starlitLogo from '../../Assets/Images/starlit.png'

function ReviewPage() {
    return <div className="review-page-main">
        <section className='review-page-left-bar'>
            <img src={starlitLogo} alt="Starlit-logo" className="review-page-starlit-icon" />
        </section>
    </div>
}

export default ReviewPage;