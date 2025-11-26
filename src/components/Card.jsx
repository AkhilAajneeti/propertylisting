import React from 'react'

const Card = () => {
  return (
    <div>
          <div className="news-box-items mt-0">
                <div className="news-image">
                    <img src="/01.jpg" alt="img"/>
                    <img src="/01.jpg" alt="img"/>
                </div>
                <div className="news-content">
                    <p>August 17, 2024</p>
                    <h3><a href="news-details.html">The Power of Visual Branding</a></h3>
                    <div className="news-btn">
                        <a href="news-details.html" className="link-btn">View Details</a>
                        <a href="news-details.html" className="arrow-icon">
                        <img src="/02.svg" alt="img"/></a>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Card