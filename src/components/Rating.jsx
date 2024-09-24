import Image from "next/image";
import React from "react";

const Rating = ({ rating = 0, w = 10, h = 10 }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <Image
          key={index}
          src={index < rating ? "/Star.png" : "/StarEmpty.png"}
          alt={index < rating ? "Filled star" : "Empty star"}
          width={w}
          height={h}
        />
      ))}
    </div>
  );
};

export default Rating;
