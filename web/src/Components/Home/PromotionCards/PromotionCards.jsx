import { useState, useEffect } from 'react';
import './PromotionCards.css';

const PromotionCards = () => {
  const [showFirstContainer, setShowFirstContainer] = useState(true);

  useEffect(() => {
    if (!showFirstContainer) {
      const timer = setTimeout(() => {
        setShowFirstContainer(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showFirstContainer]);

  const handleButtonClick = () => {
    setShowFirstContainer(false);
  };

  return (
    <div>
      {showFirstContainer ? (
        <div className="promotionCardHome">
          <iframe src="https://lottie.host/?file=d9b9ba6a-d8d0-4cf1-abe6-5e7ecef2f5ef/ie6Q7Om0Vd.json"></iframe>
          <h1>Ready to start?</h1>
          <p>Start learning React and Swift with zero coding experience.</p>
          <button onClick={handleButtonClick}>Get pro for 50%</button>
          <div className="promotion-box">
            <h3>Special promotion price</h3>
            <p>$4.50 per month, billed annually.</p>
            <p>Over 70 hours of course content. Cancel anytime.</p>
          </div>
        </div>
      ) : (
        <div className="container2">
          <h1>Sorry but I have nothing to sell..</h1>
          <iframe src="https://lottie.host/?file=1d134e7f-600a-4635-9a63-3bbc9f9e1e46/Ct4r6aIvKv.json"></iframe>
        </div>
      )}
    </div>
  );
};

export default PromotionCards;
