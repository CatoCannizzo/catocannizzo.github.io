import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ImgHTMLAttributes } from "react";

type ImageObject = {
  options: object;
  src: string;
  attributes: ImgHTMLAttributes<HTMLImageElement>;
  caption?: string;
};
interface Props {
  imgArrayOpt: ImageObject[];
}

const ImageCarousel: React.FC<Props> = ({ imgArrayOpt }) => {
  return (
    <Carousel className="mx-auto w-full max-w-xs sm:max-w-md lg:max-w-2xl">
      <CarouselContent>
        {imgArrayOpt.map((image, index) => (
          <CarouselItem key={index}>
            <figure className="flex flex-col">
              <img
                className="mx-auto"
                src={image.src}
                decoding={image.attributes.decoding}
                loading={image.attributes.loading}
                width={image.attributes.width}
                alt={image.attributes.alt}
              />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default ImageCarousel;
