import React from 'react';

interface GridGalleryProps {
    images: string[];
    orignalDimensions?: boolean;
}
declare const GridGallery: React.FC<GridGalleryProps>;

export { GridGallery as default };
