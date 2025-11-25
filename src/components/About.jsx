const About = () => {
  return (
    <div className="wrapper">
      <h1 className="text-primary text-4xl xs:text-6xl text-center">About</h1>
      <div className="movie-info text-balance items-center">
        <p className="text-center">
          This website was created as a short personal project to practice
          front-end development with React and Tailwind CSS.
          <br />
          <br />
          You can find the entire code and more information on GitHub:
        </p>
        <a
          href="https://github.com/mfms5/ghibliArchive"
          target="_blank"
          className="flex flex-row bg-[#24292F] rounded-full w-auto p-2 items-center mt-4 hoverButton"
        >
          <img className="w-20 h-auto" src="/github-mark-white.png" />
          <span className="mx-5 text-white text-xl sm:text-2xl text-center">
            mfms5/
            <br />
            ghibliArchive
          </span>
        </a>

        <div className="mt-10">
          <span className="info-section-title">Resources used</span>
          <ul className="flex flex-col info-section">
            <li className="info-item w-full">
              <a
                href="https://ghibliapi.vercel.app/"
                className="info-item-title hover:underline"
              >
                Studio Ghibli API
              </a>
            </li>
            <li className="info-item w-full">
              <a
                href="https://www.flaticon.com/free-icons/magnifying-glass"
                className="info-item-title hover:underline"
              >
                Magnifying glass icon by Rutmer Zijlstra - Flaticon
              </a>
            </li>
            <li className="info-item w-full">
              <a
                href="https://github.com/midudev/tailwind-animations"
                className="info-item-title hover:underline"
              >
                Tailwind Animations by Midudev
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
