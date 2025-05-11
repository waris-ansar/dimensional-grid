export const getAspectRatio = (imageDimensions: {
  width: number;
  height: number;
}) => {
  const { width, height } = imageDimensions;

  if (width === 0 || height === 0) {
    return "1/1";
  }
  if (width === height) {
    return "1/1";
  } else if (height > width) {
    return "4/5";
  } else {
    return "5/4";
  }
};

export const getContainerClass = (
  isOrignalDimensions: boolean,
  imageDimensions: {
    width: number;
    height: number;
  }
) => {
  if (!isOrignalDimensions) return "square_cont";

  const ratio = getAspectRatio(imageDimensions);
  if (ratio === "1/1") return "square_cont";
  if (ratio === "4/5") return "potrait_cont";
  return "landscape_cont";
};
