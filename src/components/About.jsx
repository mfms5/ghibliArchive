/**
 * /about
 *
 * "About" page with information regarding the project, as well as third-party resources used.
 */

const About = () => {
  const resources = [
    { title: "Studio Ghibli API", link: "https://ghibliapi.vercel.app/" },
    {
      title: "Magnifying glass icon by Rutmer Zijlstra - Flaticon",
      link: "https://www.flaticon.com/free-icons/magnifying-glass",
    },
    {
      title: "Home icon by Flaticon",
      link: "https://www.flaticon.com/free-icon/home_146871",
    },
    {
      title: "Information icon by Rutmer Zijlstra - Flaticon",
      link: "https://www.flaticon.com/free-icon/information_9675160",
    },
    {
      title: "Totoro icon by icons8",
      link: "https://icons8.com/icon/IRRpeULs7luU/totoro",
    },
    {
      title: "Tailwind Animations by Midudev",
      link: "https://github.com/midudev/tailwind-animations",
    },
    {
      title: "Design inspired by Matt Wierzbicki's Matsu-theme for shadcn/ui",
      link: "https://matsu-theme.vercel.app/",
    },
  ];

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
          <img
            className="w-20 h-auto"
            src={`${import.meta.env.BASE_URL}github-mark-white.png`}
          />
          <span className="mx-5 text-white text-xl sm:text-2xl text-center">
            mfms5/
            <br />
            ghibliArchive
          </span>
        </a>

        <div className="mt-10">
          <span className="info-section-title">Resources used</span>
          <ul className="flex flex-col info-section">
            {resources.map((item) => (
              <li className="info-item w-full">
                <a href={item.link} className="info-item-title hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
