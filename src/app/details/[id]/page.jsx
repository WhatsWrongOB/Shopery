"use client";

import ProductsCard from "@/components/ProductsCard";
import Rating from "@/components/Rating";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ params }) => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(0);

  const fetchProductDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProductDetail(data);
      setSelectedImage(data.image);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchRelatedData = async () => {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/category/${productDetail.category}?limit=4`
      );
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  
  useEffect(() => {
    fetchProductDetails(params.id);
  }, [params.id]);
  

  useEffect(() => {
    fetchRelatedData();
  }, [productDetail]);

  function handleIncrement() {
    setQuantity((prevQty) => prevQty + 1);
  }

  function handleDecrement() {
    setQuantity((prevQty) => (prevQty > 0 ? prevQty - 1 : prevQty));
  }

  return (
    <main className="h-auto w-full flex justify-center items-center overflow-hidden">
      <section className="my-6 md:px-0 w-full lg:w-[90vw]">
        {/* Product Details */}

        <div className="flex lg:flex-row flex-col gap-10 md:pr-10 px-2">
          <div className="w-full lg:w-[45%] h-auto lg:h-[558px] flex justify-center items-center">
            {/* Thumbnails */}

            {/* Preview Image */}
            <div className="w-[250px] py-7 sm:py-0 sm:w-[300px]">
              <Image
                src={selectedImage}
                alt="Preview Image"
                width={556}
                height={556}
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-[55%] h-auto lg:h-[501px] md:pt-10">
            <div className="flex items-center gap-3">
              <h1 className="text-[25px] lg:text-[36px] font-semibold">
                {productDetail.title?.slice(0, 15)}
              </h1>
              <div className="w-[71px] h-[29px] rounded-[4px] bg-[#20B52633] text-[#2C742F] text-[14px] py-[4px] px-[8px]">
                In Stock
              </div>
            </div>

            {/* Ratings and other product details */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex">
              <Rating rating={Math.round(productDetail.rating?.rate)} w= {17} h={17} />
              </div>
              <p className="text-[#666666] text-[14px]">{productDetail.rating?.count}</p>
              <p className="text-[14px]">
                SKU : <span className="text-[#666666]">213,234,3</span>
              </p>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 ">
              <p className="text-[#666666] text-[18px] font-normal line-through ">
                ${productDetail.price}
              </p>
              <p className="text-[#2C742F] text-[24px] font-medium">$17.28</p>
              <div className="w-[75px] h-[27px] rounded-[30px] bg-[#EA4B481A] text-[#EA4B48] text-[14px] py-[3px] px-[10px]">
                In Stock
              </div>
            </div>

            {/* Other product information */}
            <div className="w-full my-5 border border-[#E6E6E6]"></div>

            <div className="flex flex-col lg:flex-row justify-between px-3 gap-4 lg:gap-0">
              <div className="flex items-center gap-2">
                <p className="text-[14px]">Brand :</p>
                <Image src="/brand.png" alt="" width={40} height={40} />
              </div>
            </div>

            <div className="w-full lg::w-[568px] mt-4">
              <p className="text-[14px] sm:text-[15px] text-[#808080]">
               {productDetail.description?.slice(0,200)}
              </p>
            </div>

            <div className="w-full my-5 border border-[#E6E6E6]"></div>

            {/* Add to cart */}
            <div className="flex items-center justify-between space-x-2  lg:px-3">
              <div className="h-[50px] w-[100px] sm:w-[124px] border border-[#E6E6E6] p-[8px] rounded-[170px] flex gap-2 lg:gap-0 items-center justify-between py-2">
                <button
                  className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex justify-center items-center"
                  onClick={handleDecrement}
                  disabled={quantity === 0}
                >
                  <Image src="/minus.png" alt="" width={10} height={10} />
                </button>
                <div>{quantity}</div>
                <button
                  className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex justify-center items-center"
                  onClick={handleIncrement}
                >
                  <Image src="/plus.png" alt="" width={10} height={10} />
                </button>
              </div>
              <button className="h-[51px] w-[280px] text-sm lg:w-[447px] bg-[#00B207] text-white text-[16px] font-semibold flex justify-center items-center gap-3 lg:gap-4 rounded-[43px]">
                Add to Cart
                <Image src="/bagg.png" alt="" width={20} height={20} />
              </button>
              <div className="w-[40px] h-[40px] rounded-full border border-[#F2F2F2] bg-[#F2F2F2] flex justify-center items-center">
                <Image src="/Heart.png" alt="" width={20} height={20} />
              </div>
            </div>

            <div className="w-full my-6 border border-[#E6E6E6]"></div>


            <div className="flex items-center gap-3">
                <p className="text-[14px]">Share item :</p>
                <div className="flex items-center gap-5">
                  <div className="w-[35px] h-[35px] rounded-full bg-[#00B207] flex justify-center items-center">
                    <Image src="/facebook.png" alt="" width={20} height={20} />
                  </div>
                  <Image src="/instagram .png" alt="" width={20} height={20} />
                  <Image src="/ling.png" alt="" width={20} height={20} />
                  <Image src="/twitter.png" alt="" width={20} height={20} />
                </div>
              </div>

          </div>
        </div>

        <div className="hidden sm:block container mx-auto mt-[-30px] sm:mt-10 lg:mt-0 md:pl-10 px-3 sm:px-0">

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
            {/* Left Text Content */}
            <div className="text-gray-700 flex flex-col justify-center">
              <p className="text-[14px] md:text-[16px]">
                Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet
                at posuere ac, viverra at mauris. Maecenas tincidunt ligula a
                sem vestibulum pharetra. Maecenas auctor tortor lacus, nec
                laoreet nisi porttitor vel.
              </p>
              <p className="mt-2 text-[14px] md:text-[16px]">
                Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui.
                Sed iaculis, metus faucibus elementum tincidunt, turpis mi
                viverra velit, pellentesque tristique neque mi eget nulla.
              </p>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#00B207] flex justify-center items-center">
                    <img src="/check.png" alt="heck" />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    100 g of fresh leaves provided.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#00B207] flex justify-center items-center">
                    <img src="/check.png" alt="heck" />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    Aliquam ac est at augue volutpat elementum.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#00B207] flex justify-center items-center">
                    <img src="/check.png" alt="heck" />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    Quisque nec enim eget sapien molestie.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#00B207] flex justify-center items-center">
                    <img src="/check.png" alt="heck" />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    Proin convallis odio volutpat finibus posuere.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#00B207] flex justify-center items-center">
                    <img src="/check.png" alt="heck" />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    Proin convallis odio volutpat finibus posuere.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#00B207] flex justify-center items-center">
                    <img src="/check.png" alt="heck" />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    Proin convallis odio volutpat finibus posuere.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Image Content */}
            <div className="relative lg:w-[536px]">
              <Image
                src="/shop.png"
                alt="Product"
                width={500}
                height={500}
                className="rounded-lg w-full h-[300px]"
              />

              {/* Discount & Organic Info */}
              <div className="hidden sm:flex mt-4  lg:space-x-8 space-x-0 border rounded-lg py-4 md:p-4 p-0 w-full">
                <div className="flex items-center space-x-2">
                  <img src="/price-tag.png" alt="" />
                  <div>
                    <p className="text-gray-800 font-medium md:font-bold">
                      64% Discount
                    </p>
                    <p className="text-gray-500 text-sm">
                      Save your 64% money with us
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/leaf.png" alt="" />
                  <div>
                    <p className="text-gray-800 font-medium md:font-bold">
                      100% Organic
                    </p>
                    <p className="text-gray-500 text-sm">
                      100% Organic Vegetables
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="lg:h-auto w-full mt-6 sm:mt-16">
          <h1 className="pl-4 pt-8 sm:pt-0 text-lg sm:text-xl font-semibold">You may also like :</h1>
          {/* Products */}
          <div className="lg:h-[407px] w-full flex flex-wrap md:flex-nowrap justify-center md:justify-evenly items-center gap-2 mt-8">
            {products.map((item, index) => (
              <ProductsCard key={index} product={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
