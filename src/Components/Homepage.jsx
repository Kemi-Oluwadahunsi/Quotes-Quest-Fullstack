import { useEffect, useState } from "react";
import wind from '../assets/Images/wind.jpg';
import worryLess from '../assets/Images/worryLess.jpg';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = wind;
  }, []);

  const handleSignOut = () => {
    // Implement sign-out logic here
    setIsAuthenticated(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        loading="lazy"
        className="  lg:h-screen bg-center bg-cover bg-no-repeat bk"
      >
        <Navbar isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />

        <main className=" px-4 py-16 sm:py-20 md:py-14 xl:p-10">
          <div className="flex flex-col gap-6 text-center sm:mt-10 lg:mt-28">
            <h1 className="font-extrabold text-4xl sm:text-[6rem] lg:text-[12rem] text-white headingText">
              {" "}
              <span className="text-cyan-900">Q</span>uotes{" "}
              <span className="text-cyan-500">Q</span>uest
            </h1>
            <h3 className="text-md sm:mt-2 sm:text-lg lg:text-3xl text-white font-bold shadow">
              Create custom designs from motivational quotes that are wearable
              and tappable.
            </h3>
          </div>
        </main>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-2 text-cyan-900 gap-8 p-4 lg:p-20 place-items-center">
        <div className="flex flex-col gap-2 lg:gap-6">
          <h2 className="font-extrabold text-cyan-800 lg:text-3xl">
            GET QUOTES
          </h2>
          <div className="font-semibold text-justify lg:text-xl p-4 shadow-2xl lg:p-10 text-cyan-700">
            <h4>
              Amazing quotes are a fantastic way for high achievers to maintain
              self-control, to stay motivated, and to offer hope to those who
              are struggling.
            </h4>
            <span className="block mt-8 text-justify-center">
              ... Anonymous
            </span>
          </div>
          <Link to="/getquotes" onClick={scrollToTop}>
            <button className=" text-sm md:text-base items-center text-cyan-100 font-bold list-none justify-self-end bg-cyan-700 md:w-25 lg:w-40 p-4 rounded-full hover:scale-95">
              Get Quotes
            </button>
          </Link>
        </div>

        <img
          src={worryLess}
          alt="worry Less image"
          className="rounded drop-shadow-2xl"
        />
      </section>

      <section className="flex flex-col lg:mt-0 gap-5 p-4 lg:mx-16 rounded lg:p-20 text-white data-te-lazy-load-init background-motivas lg:hangerheight hanger">
        <h2 className="text-center font-extrabold text-cyan-900 lg:text-5xl">
          {" "}
          CREATE YOUR QUOTE
        </h2>
        <div className="font-bold text-center lg:text-xl flex flex-col space-y-6 mx-auto lg:p-8 create">
          <h3 className="lg:w-3/4 lg:leading-[5rem] mx-auto shadow md:text-[1.7rem]">
            Create personalized or generate regular quotes for your t-shirts or
            social media posts with Quotes Quest, use them for your events,
            festivals, brand merchandise and more.
          </h3>
        </div>
        <Link to="/howitworks" className="mx-auto" onClick={scrollToTop}>
          <button className="text-sm md:text-base text-cyan-100 text-center font-bold list-none justify-self-end bg-cyan-900 px-6 py-4 rounded-full hover:scale-95">
            Get Your Quotes
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Homepage;
