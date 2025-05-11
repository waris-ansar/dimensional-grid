## Installation

```bash
npm install dimensional-grid-gallery
# or
yarn add dimensional-grid-gallery
```

## Usage

```jsx
import { GridGallery } from "dimensional-grid-gallery";

function App() {
  const images = [
    { src: "path/to/image1.jpg", alt: "Image 1" },
    { src: "path/to/image2.jpg", alt: "Image 2" },
    // ... more images
  ];

  return <GridGallery images={images} />;
}
```
