//!?
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ImageCarousel(imgAObj) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {imgAObj.imgArrayOpt.map((image, index) => (
          <CarouselItem key={index}>
            <div>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-2">
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
}
