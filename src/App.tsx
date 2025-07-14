import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { ShoppingBag, Smartphone, Shirt, Trophy, Instagram, Search, ArrowLeft, MessageCircle, MapPin, Check, Wallet, X, ChevronLeft, ChevronRight, Image, Package, Eye, Zap, Star, Heart, Camera } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  images?: string[];
}

const categories = [
  { id: 'electronics', name: 'Electronics', icon: Smartphone, emoji: '📱' },
  { id: 'shoes', name: 'Shoes', icon: ShoppingBag, emoji: '👟' },
  { id: 'clothing', name: 'Clothing', icon: Shirt, emoji: '👕' },
  { id: 'jerseys', name: 'Jerseys', icon: Trophy, emoji: '🏈' },
  { id: 'accessories', name: 'Accessories', icon: Wallet, emoji: '👜' }
];

// Generate placeholder slides for each product
const generateProductImages = (product: Product): string[] => {
  const placeholderIcons = [Image, Package, Eye, Zap, Star, Heart, Camera];
  
 if (product.id === '8') {
  // Louis Vuitton wallet – 6 real slides only
  const images = [
    '/louis-vuitton-multiple-wallet--M61695_PM1_Side-view3.png',
    '/image.png',
    '/slide-3.png',
    '/slide-4.png',
    '/slide-5.png',
    '/slide-6.png',
  ];

  // Filter out any broken or missing image strings if needed
  return images.filter(Boolean);
}

 if (product.id === '14') {
  // Acne Studios Super Baggy Fit jeans – 5 real image slides only
  return [
    '/clothing/acne-studios-super-baggy-fit/slide-1.png',
    '/clothing/acne-studios-super-baggy-fit/slide-2.png',
    '/clothing/acne-studios-super-baggy-fit/slide-3.png',
    '/clothing/acne-studios-super-baggy-fit/slide-4.png',
    '/clothing/acne-studios-super-baggy-fit/slide-5.png',
  ];
}


 if (product.id === '9') {
  // Gucci Angelina shoes – 5 real image slides only
  return [
    '/shoes/gucci-angelina/slide-1.PNG',
    '/shoes/gucci-angelina/slide-2.PNG',
    '/shoes/gucci-angelina/slide-3.PNG',
    '/shoes/gucci-angelina/slide-4.PNG',
    '/shoes/gucci-angelina/slide-5.PNG',
  ];
}


if (product.id === '11') {
  // Louis Vuitton Sunglasses – 4 real image slides only
  return [
    '/accessories/louis-vuitton-sunglasses/slide-1.PNG',
    '/accessories/louis-vuitton-sunglasses/slide-2.PNG',
    '/accessories/louis-vuitton-sunglasses/slide-3.PNG',
    '/accessories/louis-vuitton-sunglasses/slide-4.PNG',
  ];
}


if (product.id === '10') {
  // Gucci Horsebit Loafers – 5 real image slides only
  return [
    '/shoes/gucci-horsebit-loafers/slide-1.PNG',
    '/shoes/gucci-horsebit-loafers/slide-2.PNG',
    '/shoes/gucci-horsebit-loafers/slide-3.PNG',
    '/shoes/gucci-horsebit-loafers/slide-4.PNG',
    '/shoes/gucci-horsebit-loafers/slide-5.PNG',
  ];
}


if (product.id === '12') {
  // Louis Vuitton Comfort Mule – 3 real image slides only
  return [
    '/shoes/louis-vuitton-comfort-mule/slide-1.PNG',
    '/shoes/louis-vuitton-comfort-mule/slide-2.PNG',
    '/shoes/louis-vuitton-comfort-mule/slide-3.PNG',
  ];
}


if (product.id === '13') {
  // Sunset Flat Comfort Sandal – 5 real slides only
  return [
    '/shoes/sunset-flat-comfort-sandal/slide-1.PNG',
    '/shoes/sunset-flat-comfort-sandal/slide-2.PNG',
    '/shoes/sunset-flat-comfort-sandal/slide-3.PNG',
    '/shoes/sunset-flat-comfort-sandal/slide-4.PNG',
    '/shoes/sunset-flat-comfort-sandal/slide-5.PNG',
  ];
}


if (product.id === '15') {
  // Acne Studios Digital Print Jeans – 5 real image slides only
  return [
    '/clothing/acne-studios-digitally-printed-jeans-mid-blue/slide-1.PNG',
    '/clothing/acne-studios-digitally-printed-jeans-mid-blue/slide-2.PNG',
    '/clothing/acne-studios-digitally-printed-jeans-mid-blue/slide-3.png',
    '/clothing/acne-studios-digitally-printed-jeans-mid-blue/slide-4.png',
    '/clothing/acne-studios-digitally-printed-jeans-mid-blue/slide-5.png',
  ];
}



  
  // For other products, use main image + placeholder icons
  return [
    product.image,
    ...Array(6).fill(null).map((_, index) => `placeholder-${placeholderIcons[index + 1].name}`)
  ];
};

const sampleProducts: Product[] = [
  { id: '8', name: 'Louis Vuitton Slender Wallet', price: 125, image: '/louis-vuitton-multiple-wallet--M61695_PM1_Side-view3.png', category: 'accessories' },
  
  // ✅ Add your new items below the existing ones
  { id: '9', name: 'Gucci Angelina', price: 850, image: '/shoes/gucci-angelina/slide-1.PNG', category: 'shoes' },
  { id: '10', name: 'Gucci Horsebit Loafers', price: 720, image: '/shoes/gucci-horsebit-loafers/slide-1.PNG', category: 'shoes' },
  { id: '11', name: 'Louis Vuitton Sunglasses', price: 450, image: '/accessories/louis-vuitton-sunglasses/slide-1.PNG', category: 'accessories' },
  { id: '12', name: 'Louis Vuitton Comfort Mule', price: 680, image: '/shoes/louis-vuitton-comfort-mule/slide-1.PNG', category: 'shoes' },
  { id: '13', name: 'Sunset Flat Comfort Sandal', price: 320, image: '/shoes/sunset-flat-comfort-sandal/slide-1.PNG', category: 'shoes' },
  { id: '14', name: 'Acne Studios Super Baggy Fit', price: 280, image: '/clothing/acne-studios-super-baggy-fit/slide-1.png', category: 'clothing' },
  { id: '15', name: 'Acne Studios Digital Print Jeans', price: 350, image: '/clothing/acne-studios-digitally-printed-jeans-mid-blue/slide-1.PNG', category: 'clothing' }
];


function App() {
  const [currentView, setCurrentView] = useState<'home' | 'category'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [pullDistance, setPullDistance] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<string>('');
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const modalTouchStartX = useRef<number>(0);
  const isPulling = useRef<boolean>(false);
  const isModalSwiping = useRef<boolean>(false);

  // Haptic feedback function
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  };

  // Pull to refresh handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (selectedProduct) return; // Don't pull to refresh in modal
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (selectedProduct) return; // Don't pull to refresh in modal
    
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = currentY - touchStartY.current;
    const deltaX = Math.abs(currentX - touchStartX.current);
    
    // Only trigger pull if scrolled to top and pulling down (not horizontal swipe)
    if (window.scrollY === 0 && deltaY > 0 && deltaX < 50) {
      isPulling.current = true;
      const distance = Math.min(deltaY * 0.5, 100);
      setPullDistance(distance);
      
      if (distance > 60 && !isRefreshing) {
        triggerHaptic('medium');
      }
    }
  };

  const handleTouchEnd = () => {
    if (selectedProduct) return; // Don't pull to refresh in modal
    
    if (isPulling.current && pullDistance > 60) {
      setIsRefreshing(true);
      triggerHaptic('heavy');
      
      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        triggerHaptic('light');
      }, 1500);
    } else {
      setPullDistance(0);
    }
    isPulling.current = false;
  };

  // Modal swipe handlers
  const handleModalTouchStart = (e: React.TouchEvent) => {
    modalTouchStartX.current = e.touches[0].clientX;
    isModalSwiping.current = false;
  };

  const handleModalTouchMove = (e: React.TouchEvent) => {
    if (!selectedProduct) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - modalTouchStartX.current;
    
    if (Math.abs(deltaX) > 10) {
      isModalSwiping.current = true;
    }
  };

  const handleModalTouchEnd = (e: React.TouchEvent) => {
    if (!selectedProduct || !isModalSwiping.current) return;
    
    const currentX = e.changedTouches[0].clientX;
    const deltaX = currentX - modalTouchStartX.current;
    
    if (Math.abs(deltaX) > 50) {
      triggerHaptic('light');
      if (deltaX > 0) {
        handlePrevSlide();
      } else {
        handleNextSlide();
      }
    }
    
    isModalSwiping.current = false;
  };

  const handleCategoryClick = (categoryId: string) => {
    triggerHaptic('light');
    setSelectedCategory(categoryId);
    setCurrentView('category');
  };

  const handleBackToHome = () => {
    triggerHaptic('light');
    setCurrentView('home');
    setSelectedCategory('');
  };

  const handleProductClick = (product: Product) => {
    triggerHaptic('medium');
    setSelectedProduct(product);
    setCurrentSlide(0);
  };

  const handleCloseModal = () => {
    triggerHaptic('light');
    setSelectedProduct(null);
    setCurrentSlide(0);
  };

  const handleNextSlide = () => {
    if (selectedProduct) {
      triggerHaptic('light');
      const images = generateProductImages(selectedProduct);
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevSlide = () => {
    if (selectedProduct) {
      triggerHaptic('light');
      const images = generateProductImages(selectedProduct);
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleMessage = (product: Product, platform: 'instagram' | 'whatsapp' | 'messenger') => {
    triggerHaptic('medium');
    
    if (platform === 'instagram') {
      const url = `https://www.instagram.com/direct/t/Res3ll.pablito`;
      window.open(url, '_blank');
    } else {
      // Show notification for disabled platforms
      const platformName = platform === 'whatsapp' ? 'WhatsApp' : 'Messenger';
      setShowNotification(`${platformName} messaging is temporarily disabled. Please use Instagram DM instead.`);
      setTimeout(() => setShowNotification(''), 3000);
    }
  };

  const filteredProducts = sampleProducts.filter(product => 
    selectedCategory ? product.category === selectedCategory : true
  );

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  // Notification Component
  const NotificationPopup = () => {
    if (!showNotification) return null;

    return (
      <div className="fixed top-20 left-4 right-4 z-50 flex justify-center">
        <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm text-center">
          <p className="text-sm font-medium">{showNotification}</p>
        </div>
      </div>
    );
  };

  // Product Gallery Modal
  const ProductGalleryModal = () => {
    if (!selectedProduct) return null;

    const images = generateProductImages(selectedProduct);
    const currentImage = images[currentSlide];
    const isPlaceholder = typeof currentImage === 'string' && currentImage.startsWith('placeholder-');

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Blurred Background */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
          onClick={handleCloseModal}
        />
        
        {/* Modal Panel */}
        <div 
          className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 aspect-square overflow-hidden"
          onTouchStart={handleModalTouchStart}
          onTouchMove={handleModalTouchMove}
          onTouchEnd={handleModalTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg"
          >
            <X size={20} className="text-gray-700" />
          </button>

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center bg-gray-50">
            {isPlaceholder ? (
              <div className="flex flex-col items-center justify-center text-gray-400 pb-24">
                {(() => {
                  const iconName = currentImage.replace('placeholder-', '');
                  const IconComponent = [Image, Package, Eye, Zap, Star, Heart, Camera].find(
                    icon => icon.name === iconName
                  ) || Image;
                  return <IconComponent size={64} />;
                })()}
                <p className="mt-2 text-sm">Image {currentSlide + 1}</p>
              </div>
            ) : (
              <img
                src={currentImage}
                alt={`${selectedProduct.name} - Image ${currentSlide + 1}`}
                className="w-full h-full object-contain p-4 pb-24"
                onError={(e) => {
                  console.error(`Failed to load modal image: ${currentImage}`);
                  e.currentTarget.style.border = '2px solid red';
                }}
                onLoad={() => console.log(`Successfully loaded modal: ${currentImage}`)}
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(100% - 96px)',
                  objectFit: 'contain'
                }}
              />
            )}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  triggerHaptic('light');
                  setCurrentSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Product Info */}
          <div className="absolute bottom-16 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3">
            <h3 className="font-semibold text-gray-900 text-sm">{selectedProduct.name}</h3>
            <p className="text-lg font-bold text-purple-600">${selectedProduct.price}</p>
          </div>
        </div>
      </div>
    );
  };

  if (currentView === 'category') {
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull to Refresh Indicator */}
        {(pullDistance > 0 || isRefreshing) && (
          <div 
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300"
            style={{ 
              height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
              transform: `translateY(${isRefreshing ? 0 : -20}px)`
            }}
          >
            <div className="flex items-center space-x-2 text-purple-600">
              <div className={`w-5 h-5 border-2 border-purple-600 rounded-full ${isRefreshing ? 'animate-spin border-t-transparent' : ''}`} />
              <span className="text-sm font-medium">
                {isRefreshing ? 'Refreshing...' : pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
          <div className="max-w-lg mx-auto lg:max-w-6xl px-4 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Categories</span>
              </button>
              <div className="flex items-center space-x-4">
                <Instagram size={20} className="text-purple-600" />
                <Search size={20} className="text-purple-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Category Header */}
        <div className="max-w-lg mx-auto lg:max-w-6xl px-4 py-6">
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">{selectedCategoryData?.emoji}</div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {selectedCategoryData?.name}
            </h1>
            <p className="text-gray-600">Quality items at great prices</p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div 
                    className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 p-4 max-h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-purple-600 mb-4">${product.price}</p>
                    
                    {/* Message Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleMessage(product, 'instagram')}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Instagram size={18} />
                        <span>DM on Instagram</span>
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleMessage(product, 'whatsapp')}
                          className="bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm opacity-75"
                        >
                          WhatsApp
                        </button>
                        <button
                          onClick={() => handleMessage(product, 'messenger')}
                          className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm opacity-75"
                        >
                          Messenger
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Items Coming Soon!</h3>
              <p className="text-gray-500">We're adding new {selectedCategoryData?.name.toLowerCase()} items. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Notification Popup */}
        <NotificationPopup />

        {/* Product Gallery Modal */}
        <ProductGalleryModal />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to Refresh Indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300"
          style={{ 
            height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
            transform: `translateY(${isRefreshing ? 0 : -20}px)`
          }}
        >
          <div className="flex items-center space-x-2 text-purple-600">
            <div className={`w-5 h-5 border-2 border-purple-600 rounded-full ${isRefreshing ? 'animate-spin border-t-transparent' : ''}`} />
            <span className="text-sm font-medium">
              {isRefreshing ? 'Refreshing...' : pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-lg mx-auto lg:max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Shop LB
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://instagram.com/Res3ll.pablito" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} className="text-purple-600 hover:text-purple-800 transition-colors" />
              </a>
              <Search size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto lg:max-w-6xl px-4 py-6 lg:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            🛍️ Shop by Category
          </h2>
          <p className="text-gray-600 lg:text-lg">Find quality items at unbeatable prices</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-3xl lg:text-4xl mb-3">{category.emoji}</div>
                <IconComponent size={24} className="text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-semibold text-gray-900 lg:text-lg">{category.name}</h3>
              </button>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg mb-8 lg:mb-12">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MapPin className="mr-2 text-purple-600" size={24} />
            📍 How It Works
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Check size={16} className="text-purple-600" />
              </div>
              <span className="text-gray-700 lg:text-lg">✔️ DM to claim</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Check size={16} className="text-purple-600" />
              </div>
              <span className="text-gray-700 lg:text-lg">✔️ Local pickup in Houston</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Check size={16} className="text-purple-600" />
              </div>
              <span className="text-gray-700 lg:text-lg">✔️ Pay by Zelle or cash</span>
            </div>
          </div>
        </div>

        {/* Featured Products Preview */}
        <div className="mb-8 lg:mb-12">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 text-center">
            🔥 Popular Items
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {sampleProducts.slice(0, 4).map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 p-2 bg-gray-50"
                    onError={(e) => {
                      console.error(`Failed to load featured image: ${product.image}`);
                      e.currentTarget.style.border = '2px solid red';
                    }}
                    onLoad={() => console.log(`Successfully loaded featured: ${product.image}`)}
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 text-sm lg:text-base mb-1">{product.name}</h4>
                  <p className="text-lg lg:text-xl font-bold text-purple-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Follow */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 lg:p-8 text-center text-white">
          <MessageCircle size={32} className="mx-auto mb-4" />
          <h3 className="text-xl lg:text-2xl font-bold mb-2">📲 Follow Us</h3>
          <p className="mb-4 lg:text-lg">Stay updated with our latest items!</p>
          <a 
            href="https://instagram.com/Res3ll.pablito" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            <Instagram size={20} />
            <span>@Res3ll.pablito</span>
          </a>
        </div>
      </div>

      {/* Notification Popup */}
      <NotificationPopup />

      {/* Product Gallery Modal */}
      <ProductGalleryModal />
    </div>
  );
}

export default App;