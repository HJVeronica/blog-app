import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const IMG_URLS = [
  "https://images.unsplash.com/photo-1609083046154-557808dc0a4d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1575863499308-87b1b1fc3dac?q=80&w=2934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1608096299230-81c7b43d5dfc?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1482329833197-916d32bdae74?q=80&w=2893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Carousel = () => {
  const [activeImg, setActiveImg] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  const handlePrev = () => {
    if (activeImg === 0) {
      setActiveImg(IMG_URLS.length - 1);
    } else {
      setActiveImg(activeImg - 1);
    }
  };

  const handleNext = () => {
    if (activeImg === IMG_URLS.length - 1) {
      setActiveImg(0);
    } else {
      setActiveImg(activeImg + 1);
    }
  };

  useEffect(() => {
    setActiveDot(activeImg);

    const slide = document.getElementById(`slide-${activeImg}`);
    slide?.classList.add("carousel__slide-checked");
    return () => {
      slide?.classList.remove("carousel__slide-checked");
    };
  }, [activeImg]);

  useEffect(() => {
    const dot = document.getElementById(`img-dot-${activeDot}`);
    dot?.classList.add("carousel__dot-checked");
    return () => {
      dot?.classList.remove("carousel__dot-checked");
    };
  }, [activeDot]);

  return (
    <div>
      <div className="carousel">
        <ul className="carousel__slides">
          {IMG_URLS.map((url, index) => (
            <li className="carousel__slide-container" id={`slide-${index}`}>
              <div className="carousel__slide-img">
                <img alt={`img-${index}`} src={url} />
              </div>
            </li>
          ))}

          <div className="carousel__controls">
            <label onClick={handlePrev} className="carousel__slide-prev">
              <span>
                <FontAwesomeIcon icon={faChevronLeft} />
              </span>
            </label>

            <label onClick={handleNext} className="carousel__slide-next">
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </label>
          </div>

          <div className="carousel__dots">
            {IMG_URLS.map((url, index) => (
              <label
                onClick={() => setActiveImg(index)}
                className="carousel__dot"
                id={`img-dot-${index}`}
                key={`dot-${index}`}
              ></label>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
