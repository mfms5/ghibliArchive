/**
 * Reusable component to display a movie's rating in the appropiate format
 * (0-10 with a single decimal, unless it is 0) and a star icon.
 */

const Rating = ({ rating }) => {
  return (
    <div className="flex flex-row items-center gap-1" data-testid="rating">
      <p>{Math.round((rating / 10) * 10) / 10}</p>
      <img
        src="star.png"
        alt="Star icon"
        className="w-5 group-hover:animate-sway"
      />
    </div>
  );
};

export default Rating;
