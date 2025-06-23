"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { SectionTitle } from "./shared";

type Testimonial = {
  id: string;
  name: string;
  quote: string;
  content: string;
  rating: number;
};

interface TestimonialsSectionProps {
  title: string;
  totalReviews: number;
  platform: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({ title, totalReviews, platform, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-4 sm:px-16">
      <div className="mb-8 text-center">
        <SectionTitle title={title} />
        <div className="flex items-center justify-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 fill-[#00B67A] text-[#00B67A]" />
            ))}
          </div>
          <span className="text-gray-600">{totalReviews} reviews on</span>
          <span className="flex items-center font-medium">
            <Star className="mr-1 h-4 w-4 fill-[#00B67A] text-[#00B67A]" />
            {platform}
          </span>
        </div>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/3">
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-0 h-8 w-8 -translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white" />
          <CarouselNext className="absolute top-1/2 right-0 h-8 w-8 translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white" />
        </Carousel>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-[#f2f5f9] p-6">
      <h3 className="mb-2 text-left text-lg font-semibold">{testimonial.quote}</h3>
      <p className="mb-2 flex-grow text-left text-gray-700">{testimonial.content}</p>
      <div className="mt-auto">
        <div className="border-t pt-4">
          <p className="text-left font-medium">{testimonial.name}</p>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn("h-5 w-5", i < testimonial.rating ? "fill-[#00B67A] text-[#00B67A]" : "text-gray-300")}
                />
              ))}
            </div>
            <span className="flex font-medium">
              <Star className="mr-1 h-5 w-5 fill-[#00B67A] text-[#00B67A]" />
              Trustpilot
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
