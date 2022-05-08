import { Component } from "solid-js";

// @ts-ignore
import "fslightbox";

/**
 * Component representing picture with fullscreen lightbox
 * @param {string} media Primary JPEG image
 * @param {string} mediaAlternativeWebP Secondary WebP image
 * @param {string} alt Image alt
 * @param {Array<string>} gallery Optional content for Lightbox
 * @returns
 */
const Picture: Component<{
  media: string;
  mediaAlternativeWebP: string;
  alt: string;
  video?: string;
  gallery?: Array<string>;
}> = (props) => {
  /**
   * Open FsLightbox window
   * @function
   */
  const MediaLightbox = (): void => {
    // @ts-ignore
    const lightbox = new FsLightbox();
    lightbox.props.sources = !props.gallery ? [props.media] : props.gallery;
    lightbox.open();
  };

  return (
    <picture class="w-full h-full">
      <source srcset={props.mediaAlternativeWebP} type="image/webp" />
      <img
        class="w-full h-full"
        src={props.media}
        onClick={MediaLightbox}
        alt={props.alt}
      />
    </picture>
  );
};

export default Picture;
