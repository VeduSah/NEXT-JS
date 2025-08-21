'use client';

import Link from "next/link";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Calendar, ArrowRight, ChevronDown, Heart, PawPrint } from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // Fetch gallery data
  const fetchGalleryData = async () => {
    try {
      const response = await axios.get("https://nextjs-baclend-rpb5.vercel.app/moves/gallery/all");
      setGalleryItems(response.data.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching gallery data:", err);

      // Fallback data
      setGalleryItems([
        {
          id: 1,
          title: "Rescued Puppies Adoption Day",
          description: "Finding forever homes for our rescued puppies",
          image: "/api/placeholder/400/300",
          category: "Adoption",
        },
        {
          id: 2,
          title: "Wildlife Rehabilitation",
          description: "Caring for injured wildlife before release",
          image: "/api/placeholder/400/300",
          category: "Rehabilitation",
        },
        {
          id: 3,
          title: "Animal Care Workshop",
          description: "Teaching proper pet care techniques",
          image: "/api/placeholder/400/300",
          category: "Education",
        },
      ]);
    }
  };

  // Fetch news data
  const fetchNewsData = async () => {
    try {
      const response = await axios.get("https://nextjs-baclend-rpb5.vercel.app/moves/news/all");
      setNewsItems(response.data || []);
      console.log(response.data.data)
    } catch (err) {
      setError(err.message);
      console.error("Error fetching news data:", err);

      // Fallback data
      setNewsItems([
        {
          id: 1,
          title: "Annual Adoption Drive Begins Next Month",
          date: "2023-11-15",
          excerpt:
            "Our annual adoption drive will feature over 50 animals looking for their forever homes.",
          category: "Adoption",
        },
        {
          id: 2,
          title: "New Animal Rescue Center Opening",
          date: "2023-11-10",
          excerpt:
            "We're excited to announce the opening of our new state-of-the-art rescue facility.",
          category: "Announcement",
        },
      ]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchGalleryData(), fetchNewsData()]);
      setLoading(false);
    };

    fetchData();
  }, []);
  // Auto-rotate carousel
  useEffect(() => {
    if (!isPlaying || galleryItems.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPlaying, galleryItems]);

  const nextSlide = () => {
    if (galleryItems.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    if (galleryItems.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    setIsPlaying(false);
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading animal care content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-6 mt-6 rounded">
          <p>Warning: {error}. Showing fallback data.</p>
        </div>
      )}
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            poster="/care.mp4"
          >
            <source src="/care.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in flex items-center justify-center">
            <Heart className="mr-4 h-10 w-10 text-pink-400" />
            Animal Care Haven
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
            Providing love, care, and forever homes to animals in need. Join our mission today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Link 
              href="./gallery" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <PawPrint className="mr-2 h-5 w-5" />
              Meet Our Animals
            </Link>
            <Link 
              href="/news" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              Latest News
            </Link>
          </div>
        </div>
        
        {/* Video Control Button */}
        <button 
          onClick={toggleVideoPlayback}
          className="absolute bottom-6 right-6 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
          aria-label={videoRef.current?.paused ? "Play video" : "Pause video"}
        >
          <Play className={`h-6 w-6 ${videoRef.current?.paused ? '' : 'hidden'}`} />
          <svg className={`h-6 w-6 ${videoRef.current?.paused ? 'hidden' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white opacity-70" />
        </div>
      </section>

      {/* Gallery Carousel Section with Two-Part Layout */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Animal Friends</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet some of the wonderful animals we've cared for and found homes for
            </p>
          </div>
          
         {galleryItems.length > 0 ? (
  <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
    {/* Main Carousel */}
    <div className="lg:w-2/3 relative">
      <div className="overflow-hidden rounded-2xl shadow-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {galleryItems.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0 relative">
              {/* ✅ Use item.url as image */}
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-[400px] object-cover rounded-2xl"
              />

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <span className="text-sm bg-blue-500 px-3 py-1 rounded-full">{item.category}</span>
                <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
    
    {/* Side Panel with Additional Info */}
    <div className="lg:w-1/3 bg-blue-50 rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Adoption Process</h3>
      <p className="text-gray-600 mb-4">
        Our adoption process ensures every animal finds the perfect forever home.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <span className="text-blue-600 font-bold">1</span>
          </div>
          <p className="text-sm">Submit an application</p>
        </div>
        
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <span className="text-blue-600 font-bold">2</span>
          </div>
          <p className="text-sm">Meet our animals</p>
        </div>
        
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <span className="text-blue-600 font-bold">3</span>
          </div>
          <p className="text-sm">Home visit and approval</p>
        </div>
        
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <span className="text-blue-600 font-bold">4</span>
          </div>
          <p className="text-sm">Finalize adoption</p>
        </div>
      </div>
      
      <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        Start Adoption Process
      </button>
    </div>
  </div>
) 
 : (
            <div className="text-center py-12">
              <p className="text-gray-500">No gallery items available at the moment.</p>
            </div>
          )}
          
          {/* Indicators */}
          {galleryItems.length > 0 && (
            <div className="flex justify-center mt-6 space-x-2">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* View Gallery Button */}
          <div className="text-center mt-8">
            <Link 
              href="./gallery" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              View All Animals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with our animal rescue efforts and events
            </p>
          </div>
          
        {newsItems.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {newsItems.map((news) => (
      <div 
        key={news.id} 
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="p-6">
          {/* Top section: Date */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {new Date(news.date).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {news.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4">
            {news.description.length > 120 
              ? news.description.slice(0, 120) + "..." 
              : news.description}
          </p>

         
        </div>
      </div>
    ))}
  </div>
) 
 : (
            <div className="text-center py-12">
              <p className="text-gray-500">No news articles available at the moment.</p>
            </div>
          )}
          
          {/* View All News Button */}
          <div className="text-center mt-12">
            <Link 
              href="/news" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center"
            >
              View All News <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Help Animals in Need?</h2>
          <p className="text-xl mb-8 opacity-90">
            Your support can make a difference in the lives of rescued animals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
              Donate Now
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors">
              Volunteer
            </button>
          </div>
        </div>
      </section>


      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}