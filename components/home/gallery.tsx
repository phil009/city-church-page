import HorizontalInfiniteGallery from "./infinite-scroll-gallery";
import ExpandingSocialButton from "./expanding-button";

export const Gallery = () => {
  return (
    <section className="bg-appOffWhite pt-20">
      <div className="flex justify-between px-4 sm:px-12 md:px-20 mb-8">
        <div className="">
          <p className="text-appRed text-base md:text-2xl mb-2 md:mb-4">
            We Are Glad To Be In The House Of God
          </p>
          <h2 className="text-3xl md:text-6xl font-semibold">
            Pictures Displaying <br />
            Beauty & Glory
          </h2>
        </div>
        <ExpandingSocialButton />
      </div>
      <HorizontalInfiniteGallery />
    </section>
  );
};
