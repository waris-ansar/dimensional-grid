import React from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-circle-left.svg";
import { ReactComponent as ArrowRight } from "../assets/arrow-circle-right.svg";
import { ReactComponent as Close } from "../assets/x-circle.svg";
import "../styles/lightbox.css";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
}) => {
  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="prev-button btn"
      >
        <ArrowLeft />
      </button>

      <div onClick={(e) => e.stopPropagation()} className="image-container">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="image"
        />
        <button onClick={onClose} className="close-btn btn">
          <Close />
        </button>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="next-btn btn"
      >
        <ArrowRight />
      </button>

      <div className="img-length-info">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Lightbox;
