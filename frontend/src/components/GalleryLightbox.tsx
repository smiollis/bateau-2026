"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface Slide {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryLightboxProps {
  open: boolean;
  index: number;
  onClose: () => void;
  slides: Slide[];
}

const GalleryLightbox = ({ open, index, onClose, slides }: GalleryLightboxProps) => (
  <Lightbox
    open={open}
    index={index}
    close={onClose}
    slides={slides}
    plugins={[Zoom, Thumbnails, Counter]}
    zoom={{ maxZoomPixelRatio: 3 }}
    thumbnails={{ position: "bottom", width: 100, height: 60 }}
  />
);

export default GalleryLightbox;
