const Rating = ({ rating }) => {
  return (
    <div className="rating" data-testid="rating">
      <p>{Math.round((rating / 10) * 10) / 10}</p>
      <img
        src="/star.png"
        alt="Star icon"
        className="w-5 group-hover:animate-sway"
      />
    </div>
  );
};

export default Rating;
