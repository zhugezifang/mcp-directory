import StarIcon from "../../assets/imgs/star.svg";

export default function () {
  return (
    <div className="flex flex-row">
      {Array.from({ length: 5 }).map((_, idx: number) => (
        <img
          key={idx}
          src={StarIcon.src}
          alt="star"
          loading="lazy"
          className="mr-1.5 inline-block w-4 flex-none"
        />
      ))}
    </div>
  );
}
