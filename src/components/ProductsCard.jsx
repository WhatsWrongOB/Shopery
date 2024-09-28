import Image from "next/image";
import Link from "next/link";
import React from "react";
import Rating from "./Rating";

const ProductsCard = ({ product }) => {
  return (
    <>
      <div className="group w-[47%] h-[100%] py-4 sm:py-0 sm:w-[300px] hover:shadow-x-[#00B207] hover:shadow-lg sm:h-[407px] border border-gray-300 rounded-xl relative hover:border-[#2C742F] overflow-hidden">
        <div>
          <Link href={`/details/${product.id}`}>
            <div className="relative w-[110px] h-[110px] sm:w-[300px] sm:h-[300px] mx-auto">
              <Image
                className="sm:p-10"
                fill
                src={product.image}
                alt={product.title}
              />
            </div>
          </Link>

          {/* Button view */}
          <div className="absolute right-[10px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href={"/"}>
              <div className="bg-[#F2F2F2] w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-full flex justify-center cursor-pointer items-center mb-2">
                <Image
                  className="w-1/2"
                  width={20}
                  height={20}
                  src="/Heart.png"
                  alt="Favorite"
                />
              </div>
            </Link>
            <Link href={`/details/${product.id}`}>
              <div className="bg-[#F2F2F2] w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-full flex justify-center items-center cursor-pointer mb-2">
                <Image
                  className="w-1/2"
                  width={20}
                  height={20}
                  src="/see.png"
                  alt="View"
                />
              </div>
            </Link>
          </div>

          <div className="flex justify-between items-center px-3 pt-7">
            <div>
              <p className="text-[#4D4D4D] text-[14px]">
                {product.title.slice(0, 10)}
              </p>
              <p className="text-[16px] py-1 font-medium">$ {product.price}</p>
              <div className="flex">
                <Rating rating={Math.round(product.rating.rate)} />
              </div>
            </div>
            <div className="bg-[#F2F2F2] w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-full flex justify-center items-center cursor-pointer">
              <Image
                className="w-1/2"
                width={20}
                height={20}
                src="/bag.png"
                alt="Cart"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCard;
