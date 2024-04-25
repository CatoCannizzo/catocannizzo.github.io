//!?
import { Card, CardContent } from "@/components/ui/card";
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
};
interface Props {
  imgArrayOpt: ImageObject[];
}

const ImageCarousel: React.FC<Props> = ({ imgArrayOpt }) => {
  console.log(imgArrayOpt);
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {imgArrayOpt.map((image, index) => (
          <CarouselItem key={index}>
            <div>
              <Card>
                <CardContent className="flex items-center justify-center p-2">
                  <img
                    src={image.src}
                    decoding={image.attributes.decoding}
                    loading={image.attributes.loading}
                    width={image.attributes.width}
                    alt={image.attributes.alt}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default ImageCarousel;
