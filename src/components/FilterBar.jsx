"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import MyRangeSlider from "./Range";

const FilterBar = ({
  selectedCategory,
  selectedRating,
  products,
  minPrice,
  maxPrice,
  getPriceRange,
}) => {
  const [filters, setFilters] = useState({
    categories: true,
    price: true,
    rating: true,
    tags: true,
    saleProducts: true,
  });
  const [categories, setCategories] = useState([]);

  const updateFilterState = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: window.innerWidth >= 767,
      price: window.innerWidth >= 767,
      rating: window.innerWidth >= 767,
      tags: window.innerWidth >= 767,
      saleProducts: window.innerWidth >= 767,
    }));
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    updateFilterState();
    window.addEventListener("resize", updateFilterState);

    return () => {
      window.removeEventListener("resize", updateFilterState);
    };
  }, []);

  const rating = [
    { stars: 5, label: "5.0" },
    { stars: 4, label: "4.0" },
    { stars: 3, label: "3.0" },
    { stars: 2, label: "2.0" },
    { stars: 1, label: "1.0" },
  ];

  const tags = [
    "Healthy",
    "Low Fat",
    "Vegetarian",
    "Bread",
    "Meat",
    "Snacks",
    "Lunch",
    "Dinner",
    "Breakfast",
    "Bread",
    "Meat",
    "Snacks",
  ];

  const handleToggle = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const getRange = (min, max) => getPriceRange(min, max);

  return (
    <aside className="w-full md:w-[300px] pl-4 pr-3 md:pr-2 mb-5 md:mb-0 font-bold mt-5 bg-white relative">
      <div>
        {/* Categories */}
        <div className="h-auto border-b  pt-4 sm:pt-0">
          <div
            className="flex justify-between items-center mb-5 cursor-pointer"
            onClick={() => handleToggle("categories")}
          >
            <h1 className="text-base md:text-[16px] font-medium">
              All Categories
            </h1>
            <Image
              width={10}
              height={10}
              src="/Vector.png"
              alt="Arrow Icon"
              className={`transition-transform ${
                filters.categories ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          {filters.categories && (
            <div>
              <div className="flex gap-2 items-center pb-5">
                <input
                  type="radio"
                  name="category"
                  value={""}
                  onChange={(e) => selectedCategory(e.target.value)}
                />
                <p className="text-[14px] font-medium">All</p>
              </div>
              {categories.map((category, index) => (
                <div className="flex gap-2 items-center pb-5" key={index}>
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    onChange={(e) => selectedCategory(e.target.value)}
                  />
                  <p className="text-[14px] font-medium">
                    {category?.slice(0, 1).toUpperCase() + category.slice(1)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="h-auto py-1 mt-1 border-b">
          <div
            className="flex justify-between items-center my-3 cursor-pointer"
            onClick={() => handleToggle("price")}
          >
            <h1 className="text-base md:text-[16px] font-medium">Price</h1>
            <Image
              width={10}
              height={10}
              src="/Vector.png"
              alt="Arrow Icon"
              className={`transition-transform ${
                filters.price ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          {filters.price && (
            <>
              <MyRangeSlider
                min={minPrice}
                max={maxPrice}
                getRange={getRange}
              />
            </>
          )}
        </div>

        {/* Ratings */}
        <div className="h-auto border-b">
          <div
            className="flex justify-between items-center my-5 cursor-pointer"
            onClick={() => handleToggle("rating")}
          >
            <h1 className="text-base md:text-[16px] font-medium">Rating</h1>
            <Image
              width={10}
              height={10}
              src="/Vector.png"
              alt="Arrow Icon"
              className={`transition-transform ${
                filters.rating ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          {filters.rating && (
            <>
              <div className="flex gap-2 items-center pb-5">
                <input
                  type="radio"
                  name="rating"
                  value={""}
                  onChange={(e) => selectedRating(e.target.value)}
                />
                <p className="text-[14px] font-medium">All</p>
              </div>
              {rating.map((rating, index) => (
                <div className="flex gap-2 items-center pb-5" key={index}>
                  <input
                    className="text-[#00B207]"
                    type="radio"
                    name="rating"
                    value={rating.label.slice(0, 1)}
                    onChange={(e) => selectedRating(e.target.value)}
                  />
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Image
                        key={starIndex}
                        width={15}
                        height={15}
                        src={
                          starIndex < rating.stars
                            ? "/Star.png"
                            : "/StarEmpty.png"
                        }
                        alt={`${
                          starIndex < rating.stars ? "Filled" : "Empty"
                        } Star`}
                      />
                    ))}
                  </div>
                  <p className="font-medium">{rating.label}</p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Popular Tag */}
        <div className="h-auto border-b md:border-0">
          <div
            className="flex justify-between items-center my-5 cursor-pointer"
            onClick={() => handleToggle("tags")}
          >
            <h1 className="text-base md:text-[16px] font-medium">
              Popular Tag
            </h1>
            <Image
              width={10}
              height={10}
              src="/Vector.png"
              alt="Arrow Icon"
              className={`transition-transform ${
                filters.tags ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          {filters.tags && (
            <div className="flex flex-wrap gap-3 pb-5 md:pb-0">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="h-[33px] text-[14px] rounded-[30px] py-[6px] px-[15px] font-medium bg-[#F2F2F2] hover:bg-[#00B207] hover:text-white cursor-pointer transition-all ease-in-out duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Discount Banner */}
        <div className="md:h-[295px] mt-8 md:mt-3 hidden md:block">
          <Image
            className="w-full h-full"
            width={300}
            height={300}
            src="/Bannar.png"
            alt="Discount Banner"
          />
        </div>

        {/* Sale Products */}
        <div className="h-auto border-b">
          <div
            className="flex justify-between items-center my-5 cursor-pointer"
            onClick={() => handleToggle("saleProducts")}
          >
            <h1 className="text-base md:text-[16px] font-medium">
              Sale products
            </h1>
            <Image
              width={10}
              height={10}
              src="/Vector.png"
              alt="Arrow Icon"
              className={`transition-transform ${
                filters.saleProducts ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          {filters.saleProducts && (
            <>
              {products.map((product, index) => (
                <div
                  className="group h-[112px] border-gray-300 border mb-2 flex items-center gap-5 rounded-[6px] hover:border hover:border-green-700 hover:shadow cursor-pointer"
                  key={index}
                >
                  <Image
                    className="p-2"
                    width={80}
                    height={60}
                    src={product.image}
                    alt={product.title}
                  />
                  <div>
                    <p className="text-[#4D4D4D] font-medium text-[14px] group-hover:text-[#2C742F]">
                      {product.title.slice(0, 10)}
                    </p>
                    <p className="text-[14px]">
                      <span className="text-gray-400 line-through font-medium">
                        {product.price}
                      </span>
                      <span className="text-[16px] font-semibold pl-3">
                        {product.price}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default FilterBar;
