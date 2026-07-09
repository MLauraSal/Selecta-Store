import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { IoStar, IoStarOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useFlyToCart } from "../hooks/useFlyToCart";
import { getProductById } from "../services/productService";
import { getProductImage } from "../utils/getProductImage";
import { useReviews } from "../hooks/useReviews";

export default function ProductDetail() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [charging, setCharging] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const imageRef = useRef(null);

  const { addToCart } = useCart();
  const { animateToCart } = useFlyToCart();
  const { reviews, fetchReviewsForProduct, saveProductReview, getAverageRanking } = useReviews();
  
  const [comment, setComment] = useState("");
  const [ranking, setRanking] = useState(5);
  const [reviewFormTouched, setReviewFormTouched] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        if (!data) throw new Error("Product not found");
        setProduct(data);
        setSelectedImage(getProductImage(data));
      })
      .catch((err) => setError(err.message))
      .finally(() => setCharging(false));

    fetchReviewsForProduct(id);
  }, [id, fetchReviewsForProduct]);

  const productReviews = reviews[id] || [];
  const average = getAverageRanking(productReviews);
  
  
  const userReview = currentUser ? productReviews.find((r) => r.userId === currentUser.id) : null;


  const commentValue = reviewFormTouched ? comment : (userReview?.comment ?? "");
  const rankingValue = reviewFormTouched ? ranking : (userReview?.ranking ?? 5);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please log in to submit a review.");
      return;
    }

    await saveProductReview(
      id,
      currentUser.id,
      {
        userName: currentUser.name || "Anonymous",
        comment: commentValue,
        ranking: Number(rankingValue),
      },
      userReview?.id 
    );
    
    
    setComment("");
    setRanking(5);
    setReviewFormTouched(false);
  };

  const getGalleryImages = (item) => {
    if (!item) return [];
    if (Array.isArray(item.images) && item.images.length > 0) return item.images;
    if (typeof item.images === "string") return [item.images];
    if (Array.isArray(item.image) && item.image.length > 0) return item.image;
    if (typeof item.image === "string") return [item.image];
    return [];
  };

  const handleAddToCart = () => {
    addToCart(product);
    animateToCart(imageRef.current);
  };

  if (charging) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
          <p className="text-text tracking-wide">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-primary px-4 text-center">
        <p className="text-red-400 text-xl mb-6">
          {error || "Product not found"}
        </p>
        <Link
          to="/products"
          className="border border-accent text-accent px-8 py-3 rounded-2xl hover:bg-accent hover:text-primary transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const gallery = getGalleryImages(product);
  const categoryName = product.category?.name || product.category || "Product";

  return (
    <section className="bg-gradient-to-b from-primary to-[#1A1A1A] min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-accent hover:text-text transition mb-10"
        >
          <HiArrowLeft />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="bg-[#181818] border border-[#2A2A2A] rounded-[36px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <img
                ref={imageRef}
                src={selectedImage || getProductImage(product)}
                alt={product.name}
                className="w-full h-[420px] sm:h-[620px] object-cover"
              />
            </div>

            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {gallery.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    onClick={() => setSelectedImage(img)}
                    className={`rounded-2xl overflow-hidden border transition ${
                      selectedImage === img ? "border-accent" : "border-[#2A2A2A]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#181818] border border-[#2A2A2A] rounded-[36px] p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
          >
            <p className="uppercase tracking-[5px] text-accent text-xs mb-4">
              {categoryName}
            </p>

            <h1 className="text-text text-4xl sm:text-5xl font-black leading-tight">
              {product.name}
            </h1>
  
            <div className="flex items-center gap-1 text-accent mt-6 text-xl">
              {[...Array(5)].map((_, i) => (
                i < Math.round(average) ? <IoStar key={i} /> : <IoStarOutline key={i} />
              ))}
              <span className="text-gray-400 text-sm ml-3">
                {average > 0 ? `${average} (${productReviews.length} reviews)` : "No reviews yet"}
              </span>
            </div>

            <p className="text-accent text-5xl font-black mt-8">
              ${product.price}
            </p>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mt-8">
              {product.description}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="bg-black/40 border border-[#2A2A2A] rounded-2xl p-5">
                <p className="text-accent text-sm uppercase tracking-[3px]">
                  Stock
                </p>
                <p className="text-text font-bold mt-2">
                  {product.stock > 0 ? `${product.stock} available` : "Not available"}
                </p>
              </div>

              <div className="bg-black/40 border border-[#2A2A2A] rounded-2xl p-5">
                <p className="text-accent text-sm uppercase tracking-[3px]">
                  Shipment
                </p>
                <p className="text-text font-bold mt-2">Fast</p>
              </div>
            </div>

            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="mt-10 w-full bg-accent text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(200,169,106,0.35)] transition-all"
            >
              <FaShoppingCart />
              Add to cart
            </motion.button>
          </motion.div>
        </div>
        
        
        <div className="mt-20 max-w-3xl border-t border-[#2A2A2A] pt-10">
          <h2 className="text-text text-3xl font-black mb-6">Customer Reviews</h2>
          
          {currentUser ? (
            <form onSubmit={handleSubmitReview} className="bg-[#181818] border border-[#2A2A2A] rounded-2xl p-6 mb-10 space-y-4">
              <h3 className="text-accent font-bold">{userReview ? "Edit your review" : "Leave a review"}</h3>
              
              <div className="flex items-center gap-2">
                <label className="text-gray-400 text-sm">Rating:</label>
                <select 
                  value={rankingValue} 
                  onChange={(e) => {
                    setRanking(Number(e.target.value));
                    setReviewFormTouched(true);
                  }}
                  className="bg-black text-accent border border-[#2A2A2A] p-2 rounded-xl focus:outline-none"
                >
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>

              <textarea
                value={commentValue}
                onChange={(e) => {
                  setComment(e.target.value);
                  setReviewFormTouched(true);
                }}
                placeholder="Write your feedback here..."
                required
                className="w-full h-24 bg-black border border-[#2A2A2A] rounded-xl p-4 text-text placeholder-gray-600 focus:border-accent focus:outline-none transition"
              />
              
              <button type="submit" className="bg-accent text-primary font-bold px-6 py-2 rounded-xl hover:scale-105 transition">
                {userReview ? "Update Review" : "Submit Review"}
              </button>
            </form>
          ) : (
            <div className="bg-[#181818] border border-[#2A2A2A] rounded-2xl p-6 mb-10 text-center">
              <p className="text-gray-400">You must be logged in to leave or edit a review.</p>
            </div>
          )}

          <div className="space-y-4">
            {productReviews.length === 0 ? (
              <p className="text-gray-500 italic">No comments yet. Be the first!</p>
            ) : (
              productReviews.map((rev) => (
                <div key={rev.id} className="bg-black/30 border border-[#2A2A2A] rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-text font-bold text-sm">{rev.userName}</p>
                    <div className="flex text-accent text-sm">
                      {[...Array(5)].map((_, i) => i < rev.ranking ? <IoStar key={i} /> : <IoStarOutline key={i} />)}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}