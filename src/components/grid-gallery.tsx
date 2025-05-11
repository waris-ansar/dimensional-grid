import React, { useEffect, useState } from "react";
import { getAspectRatio, getContainerClass } from "../utility/aspect-ratio";
import Lightbox from "./Lightbox";

interface GridGalleryProps {
  images: string[];
  orignalDimensions?: boolean;
}

const GridGallery: React.FC<GridGalleryProps> = ({
  images,
  orignalDimensions = true,
}) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [orderedImages, setOrderedImages] = useState<string[]>(images);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isSquare = (width: number, height: number) => {
    const ratio = width / height;
    return ratio >= 0.95 && ratio <= 1.05; // Allow for small variations
  };

  const reorderImages = async (imageUrls: string[]) => {
    const imagePromises = imageUrls.map((url) => {
      return new Promise<{ url: string; width: number; height: number }>(
        (resolve) => {
          const img = new window.Image();
          img.src = url;
          img.onload = () => {
            resolve({
              url,
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          };
        }
      );
    });

    const imageData = await Promise.all(imagePromises);
    const nonSquareImages = imageData.filter(
      (img) => !isSquare(img.width, img.height)
    );
    const squareImages = imageData.filter((img) =>
      isSquare(img.width, img.height)
    );

    // If we found non-square images, put the first one at the start
    if (nonSquareImages.length > 0) {
      const reordered = [
        nonSquareImages[0].url,
        ...squareImages.map((img) => img.url),
        ...nonSquareImages.slice(1).map((img) => img.url),
      ];
      setOrderedImages(reordered);
    } else {
      setOrderedImages(images);
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      reorderImages(images);
      const img = new window.Image();
      img.src = images[0];
      img.onload = () => {
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
    }
  }, [images]);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % orderedImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + orderedImages.length) % orderedImages.length
    );
  };

  if (!images.length) {
    return null;
  }

  return (
    <>
      {orderedImages.length === 1 ? (
        <div className={"img_container"}>
          <img
            src={orderedImages[0]}
            width={300}
            height={300}
            alt="news-image"
            onClick={() => handleImageClick(0)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              aspectRatio: orignalDimensions
                ? getAspectRatio(imageDimensions)
                : "1/1",
              cursor: "pointer",
            }}
          />
        </div>
      ) : orderedImages.length === 2 ? (
        <>
          <div
            className={`image_container_two ${getContainerClass(
              orignalDimensions,
              imageDimensions
            )}`}
          >
            {orderedImages.map((img: string, index: number) => {
              return (
                <img
                  key={img + Math.random()}
                  src={img}
                  width={300}
                  height={300}
                  alt={img}
                  onClick={() => handleImageClick(index)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    aspectRatio: orignalDimensions
                      ? getAspectRatio(imageDimensions)
                      : "1/1",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        </>
      ) : orderedImages.length === 3 ? (
        <>
          <div
            className={`image_container_three ${getContainerClass(
              orignalDimensions,
              imageDimensions
            )}`}
          >
            <div className={`left_container`}>
              <img
                src={orderedImages[0]}
                width={300}
                height={300}
                alt="news-image"
                onClick={() => handleImageClick(0)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  aspectRatio: orignalDimensions
                    ? getAspectRatio(imageDimensions)
                    : "1/1",
                  cursor: "pointer",
                }}
              />
            </div>

            <div className="right_container">
              {orderedImages.slice(1).map((img, index) => (
                <img
                  key={`right-img-${index}`}
                  src={img}
                  width={300}
                  height={300}
                  alt="news-image"
                  onClick={() => handleImageClick(index + 1)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    aspectRatio: "1/1",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ) : orderedImages.length === 4 ? (
        <>
          <div
            className={`image_container_four ${getContainerClass(
              orignalDimensions,
              imageDimensions
            )}`}
          >
            {orderedImages.map((img: string, index: number) => {
              return (
                <img
                  key={img + Math.random()}
                  src={img}
                  width={300}
                  height={300}
                  alt="news-image"
                  onClick={() => handleImageClick(index)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    aspectRatio: orignalDimensions
                      ? getAspectRatio(imageDimensions)
                      : "1/1",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div
            className={`image_container_four ${getContainerClass(
              orignalDimensions,
              imageDimensions
            )}`}
          >
            {orderedImages.slice(0, 3).map((img: string, index: number) => {
              return (
                <img
                  key={img + Math.random()}
                  src={img}
                  width={300}
                  height={300}
                  alt="news-image"
                  onClick={() => handleImageClick(index)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    aspectRatio: orignalDimensions
                      ? getAspectRatio(imageDimensions)
                      : "1/1",
                    cursor: "pointer",
                  }}
                />
              );
            })}
            <div
              className={`overlay_parent`}
              onClick={() => handleImageClick(3)}
            >
              <img
                src={orderedImages[3]}
                width={300}
                height={300}
                alt="news-image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  aspectRatio: orignalDimensions
                    ? getAspectRatio(imageDimensions)
                    : "1/1",
                  cursor: "pointer",
                }}
              />

              <div className={`image_counter`}>+{orderedImages.length - 3}</div>
              <div className={`overlay`}></div>
            </div>
          </div>
        </>
      )}

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={orderedImages}
        currentIndex={currentImageIndex}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
};

export default GridGallery;
