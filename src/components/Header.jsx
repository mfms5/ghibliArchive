/**
 * Header component for the "Home" page with the website's title.
 */

const Header = () => {
  return (
    <header>
      <img
        src={`${import.meta.env.BASE_URL}ghiblilogo_white_shadow.png`}
        alt="Studio Ghibli logo"
      />
      <h1>Archive</h1>
    </header>
  );
};

export default Header;
