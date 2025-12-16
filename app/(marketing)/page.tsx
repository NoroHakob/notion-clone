import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Features } from "./_components/features";
import { CTA } from "./_components/cta";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
        <Features />
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;