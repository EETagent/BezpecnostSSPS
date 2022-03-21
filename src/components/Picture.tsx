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
}> = ({ media: media, mediaAlternativeWebP, alt, gallery }) => {
  /**
   * Open FsLightbox window
   * @function
   */
  const MediaLightbox = (): void => {
    // @ts-ignore
    const lightbox = new FsLightbox();
    lightbox.props.sources = !gallery ? [media] : gallery;
    lightbox.open();
  };

  return (
    <picture className="w-full h-full">
      <source srcset={mediaAlternativeWebP} type="image/webp" />
      <img
        class="w-full h-full"
        src={media}
        onClick={MediaLightbox}
        alt={alt}
      />
    </picture>
  );
};

export default Picture;
