"use client";

import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import ProductsCard from "@/components/ProductsCard";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(10);
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rating, setRating] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const fetchAllProducts = async () => {
    const url = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : "https://fakestoreapi.com/products";

    try {
      const { data } = await axios.get(url);
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max
      )
      .filter((product) =>
        rating ? Math.round(product.rating.rate) === rating : true
      );
  }, [allProducts, priceRange, rating]);


  const paginatedProducts = useMemo(() => {
    const startIndex = (curPage - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredProducts.slice(startIndex, endIndex);
  }, [curPage, filteredProducts, limit]);


  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / limit));
    setProducts(paginatedProducts);
  }, [filteredProducts, paginatedProducts]);


  useEffect(() => {
    fetchAllProducts();
  }, [category]);


  useEffect(() => {
    if (allProducts.length > 0) {
      const maxPriceValue = Math.max(...allProducts.map((product) => product.price));
      setPriceRange((prev) => ({ ...prev, max: maxPriceValue }));
    }
  }, [allProducts]);


  const newPage = (page) => setCurPage(page);

  
  const getPriceRange = (min, max) => setPriceRange({ min, max });

  return (
    <>
      <section className="flex md:flex-row flex-col my-6">
        {/* Sidebar */}
        <FilterBar
          selectedCategory={setCategory}
          selectedRating={setRating}
          products={allProducts
            .toSorted((a, b) => a.price - b.price)
            .slice(0, 3)}
          minPrice={priceRange.min}
          maxPrice={Math.round(priceRange.max)}
          getPriceRange={getPriceRange}
        />

        <main className="w-full md:w-[75%] h-full mt-2 md:mt-0">
          {/* Products */}
          <section className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap md:ml-4 sm:mt-5">
            {/* Cards */}
            {products.length > 0 ? (
              products.map((item, index) => (
                <ProductsCard key={index} product={item} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </section>
        </main>
      </section>

      <div className="flex justify-center items-center my-10">
        <Pagination
          noOfPages={totalPages}
          curPage={curPage}
          newPage={newPage}
        />
      </div>
    </>
  );
}
