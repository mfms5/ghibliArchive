const Rating = ({ rating }) => {
  return (
    <div className="rating">
      <p>{(rating / 10).toFixed(1)}</p>
      <img
        src="/star.png"
        alt="Star icon"
        className="w-5 group-hover:animate-sway"
      />
    </div>
  );
};

export default Rating;
