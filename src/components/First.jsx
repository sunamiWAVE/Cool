import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, X, Clock, Menu, Bell, Newspaper, ArrowRight, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsletterWebsite() {
    // States
    const [activeTab, setActiveTab] = useState('Today');
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [categoryScrollPaused, setCategoryScrollPaused] = useState(false);
    const [categoryViewAll, setCategoryViewAll] = useState(false);
    const [bookmarkedStories, setBookmarkedStories] = useState({});
    const [showBookmarkMsg, setShowBookmarkMsg] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // References
    const categoriesContainerRef = useRef(null);

    //Stories and data for section 1
    const stories = [
        { id: 3, title: "Space Exploration Milestone", image: "/1Left/1.jpeg", publisher: "Space Journal", date: "April 13, 2025", brief: "Private company achieves breakthrough in reusable rocket technology." },
        { id: 2, title: "Climate Change: New Evidence", image: "https://images.unsplash.com/photo-1470520518831-10005602ab67?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", publisher: "Climate Weekly", date: "April 14, 2025", brief: "Scientists unveil startling new data about global temperature rises." },
        { id: 1, title: "The Future of AI in Healthcare", image: "https://tediselmedical.com/wp-content/uploads/2024/07/inteligencia_artificial_innovando_atencion_medica_pic01_20240704_tedisel_medical.jpg", publisher: "Tech Review", date: "April 15, 2025", brief: "How artificial intelligence is revolutionizing medical diagnoses and treatment plans." },
        { id: 4, title: "The Digital Privacy Crisis", image: "https://e3.365dm.com/25/03/2048x1152/skynews-hacker-istock_6853108.jpg", publisher: "Tech Times", date: "April 12, 2025", brief: "New laws aim to protect consumer data in the age of surveillance." },
    ];

    const trendingStories = [

        { id: 2, title: "New Breakthrough in Quantum Computing", image: "https://postquantum.com/wp-content/uploads/2025/02/Google-Willow-Quantum-Computing-Chip.jpg", publisher: "Tech Review", date: "8h ago", filter: "Today" },
        { id: 3, title: "Global Climate Agreement Signed", image: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638890148/EducationHub/photos/on-thin-ice.jpg", publisher: "Environment news", date: "12h ago", filter: "Today" },
        { id: 4, title: "Medical Innovation Saves Lives", image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", publisher: "Health Journal", date: "1d ago", filter: "Week" },
        { id: 5, title: "Sports Championship Results", image: "https://cdn.britannica.com/55/235355-050-2CE9732E/Usain-Bolt-Jamaica-gold-medal-breaking-world-record-200m-Beijing-Summer-Olympics-August-20-2008.jpg", publisher: "Sports Weekly", date: "2d ago", filter: "Today" },
        { id: 6, title: "Entertainment Industry Changes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ACrMn7u1E58zknPMDCV1fL0OIEdAqioe7Q&s", publisher: "Entertainment Now", date: "3d ago", filter: "Today" },
        { id: 7, title: "Political Landscape Shifts", image: "https://v2doverseas.com/wp-content/uploads/2024/11/statue-liberty-usa.jpg", publisher: "Politics Daily", date: "5d ago", filter: "Today" },
        { id: 8, title: "Technology Trends for 2025", image: "https://cdn.sanity.io/images/poftgen7/production/5ecc4edc3fa12e784fd2940da790d47e213ec225-1200x628.png?rect=1,0,1199,628&w=800&h=419&q=100&fit=max&auto=format", publisher: "Tech Insider", date: "1w ago", filter: "Month" },
        { id: 10, title: "Science Discoveries of the Year", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDa7jzOvgq8M-YPEv1QK5thXkq8j8bpmlyUA&s", publisher: "Science Today", date: "3w ago", filter: "Month" },
        { id: 11, title: "Stock Markets Reach All-Time High", image: "https://www.etmoney.com/learn/wp-content/uploads/2023/02/investing-at-market-high-1.jpg", publisher: "Financial Times", date: "1d ago", filter: "Week" },
        { id: 9, title: "Business Strategy Evolution", image: "https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/indianstartupnews/media/media_files/2lf8Xp6K8MUsYAUKOULj.png", publisher: "Business Weekly", date: "2w ago", filter: "Today" },
        { id: 1, title: "Economic Summit Results", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt_VSEgJ8RFRRK_CjftxxXVXPQnSQ4UGfP5g&s", publisher: "Financial Times", date: "6h ago", filter: "Week" },
    ];

    const categories = [
        { name: "Sports", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLjAeuxyDlBHYaAx0fEaRh5oF4aGtWdNQbdSjRZHDYJLBEuYc8aozgb1wbv06Fvz33DLs&usqp=CAU" },
        { name: "Politics", image: "https://i.insider.com/6793e777e7e163809a2279ba?width=700" },
        { name: "Business", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXXqm5V7FZpxkMV7XpNY78_VLEdD7sS2emw&s" },
        { name: "Lifestyle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gcvkfyLwVeN4VCk_eTnt2ClLymdwj109Gg&s" },
        { name: "Entertainment", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDq9snw3JXbpyW9pxtTsb1-GfAplsQiTSilf_qWKuHZH1G9PfC7b80YRGCMlb0sYbDKBA&usqp=CAU" },
        { name: "Climate", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbr67IJI9yqweqHpt8hDZb--3wZBz35VkHBxWPiYpm_YAHwn3Be1L7lz_XlyuTRP9yLY&usqp=CAU" },
        { name: "Tech", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR5IJQCAEYRauZjdmE94r0GCDMWT-iHszS0A&s" },
        { name: "Review", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLb99WNizvqx-Vhyvk4IrVbLFAy8NNR6XUPZUKnEOF2DjKb_Qr7QF0sRVzumObGeQP0c8&usqp=CAU" },
        { name: "Science", image: "https://www.thoughtco.com/thmb/dj4nerFEPPv_pE3D-TRLYo_b-a0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3-D_DNA-56a09ae45f9b58eba4b20266.jpg" },
        { name: "Artificial Intelligence", image: "https://growthtribe.io/wp-content/uploads/Chat-gpt-foto.webp" },
        { name: "Elon Musk", image: "https://static01.nyt.com/images/2022/05/06/business/06musk-pitch/merlin_206424429_4e4c8791-92ac-4e41-a4be-f9e9e721a9e4-articleLarge.jpg?quality=75&auto=webp&disable=upscale" },
        { name: "Sports", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLjAeuxyDlBHYaAx0fEaRh5oF4aGtWdNQbdSjRZHDYJLBEuYc8aozgb1wbv06Fvz33DLs&usqp=CAU" },
        { name: "Politics", image: "https://i.insider.com/6793e777e7e163809a2279ba?width=700" },
        { name: "Business", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXXqm5V7FZpxkMV7XpNY78_VLEdD7sS2emw&s" },
        { name: "Lifestyle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gcvkfyLwVeN4VCk_eTnt2ClLymdwj109Gg&s" },
        { name: "Entertainment", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDq9snw3JXbpyW9pxtTsb1-GfAplsQiTSilf_qWKuHZH1G9PfC7b80YRGCMlb0sYbDKBA&usqp=CAU" },
        { name: "Climate", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbr67IJI9yqweqHpt8hDZb--3wZBz35VkHBxWPiYpm_YAHwn3Be1L7lz_XlyuTRP9yLY&usqp=CAU" },
    ];

    const featuredStory = {
        title: "The Evolution of Digital Media in 2025",
        image: "https://comartsci.msu.edu/sites/default/files/2018-05/digitalmediacertificate.jpg",
        publisher: "Media Insights",
        date: "April 16, 2025",
        brief: "How technology continues to reshape our information consumption and the publishing industry. The latest trends indicate a shift toward personalized content delivery systems and immersive storytelling techniques."
    };

    const futureStories = [
        { id: 1, title: "Flying Cars Finally Ready for Public", image: "https://media.cnn.com/api/v1/images/stellar/prod/230612142259-marketplace-asia-xpeng-x2-beyond-expo.jpg?c=original", publisher: "Future Tech", date: "April 16, 2025" },
        { id: 2, title: "Brain-Computer Interfaces Go Mainstream", image: "https://eu-images.contentstack.com/v3/assets/blt23eb5bbc4124baa6/blt71d2f386c3a166be/654d42d7089e56040af623b7/neuralink.png?width=1280&auto=webp&quality=95&format=jpg&disable=upscale", publisher: "Neural News", date: "April 15, 2025" },
        { id: 3, title: "Ocean Cleaning Drones Show Promising Results", image: "https://cdn.sanity.io/images/loal7n8w/business-norway-prod/635e900731a0d7f6c292d0dd58e4b138c7c5b299-900x506.jpg/te_solutions_clean-sea-solutions_cleaning-drone_2_cropped.jpg?auto=format&w=1920&q=75", publisher: "Environmental Tech", date: "April 14, 2025" },
        { id: 4, title: "Renewable Energy Breakthrough", image: "https://etimg.etb2bimg.com/photo/105752021.cms", publisher: "Clean Energy Report", date: "April 13, 2025" },
        { id: 5, title: "Space Tourism Opens to Middle Class", image: "https://www.freethink.com/wp-content/uploads/2021/04/space-tourism_opengraph1.jpg", publisher: "Space Travel Mag", date: "April 12, 2025" },
        { id: 6, title: "Biotechnology Extends Human Lifespan", image: "https://cdn.prod.website-files.com/5d9667bad4a41e222995e15b/648262fd2c119a16aa6cb40a_abstract.webp", publisher: "BioFuture", date: "April 11, 2025" },
    ];

    // Filtered trending stories based on active tab
    const filteredTrending = trendingStories.filter(story => story.filter === activeTab);

    // Auto-scroll for stories in Section 1
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [stories.length]);

    // Auto-scroll for categories in Section 2
    useEffect(() => {
        let interval;
        if (!categoryScrollPaused && categoriesContainerRef.current && !categoryViewAll) {
            interval = setInterval(() => {
                if (categoriesContainerRef.current) {
                    categoriesContainerRef.current.scrollLeft += 1;
                    if (categoriesContainerRef.current.scrollLeft >= categoriesContainerRef.current.scrollWidth - categoriesContainerRef.current.clientWidth) {
                        categoriesContainerRef.current.scrollLeft = 0;
                    }
                }
            }, 30);
        }

        return () => clearInterval(interval);
    }, [categoryScrollPaused, categoryViewAll]);

    // Track scroll for sticky header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle bookmark toggling
    const toggleBookmark = (storyId) => {
        setBookmarkedStories(prev => {
            const newState = { ...prev, [storyId]: !prev[storyId] };
            return newState;
        });

        setShowBookmarkMsg(true);
        setTimeout(() => setShowBookmarkMsg(false), 3000);
    };

    // Handle View All categories
    const handleViewAllCategories = () => {
        setCategoryScrollPaused(true);
        setCategoryViewAll(true);
    };

    // Handle Collapse categories
    const handleCollapseCategories = () => {
        setCategoryScrollPaused(false);
        setCategoryViewAll(false);
        if (categoriesContainerRef.current) {
            categoriesContainerRef.current.scrollLeft = 0;
        }
    };

    // Navigate through stories
    const navigateStories = (direction) => {
        if (direction === 'next') {
            setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
        } else {
            setCurrentStoryIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
        }
    };

    // Custom CSS for hiding scrollbar
    const hideScrollbarStyle = {
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
    };

    // Add webkit scrollbar style in a useEffect
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="min-h-screen text-black font-sans bg-pink-50 bg-[radial-gradient(#faa5e0_0.9px,transparent_0.5px)] bg-[length:10px_10px]">
            {/* Header - Sticky and transparent on scroll */}
            <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? ' bg-white/50 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-black mr-8">NewsLetter</h1>
                        <nav className="hidden md:flex space-x-6">
                            <a href="#" className="hover:text-pink-500 transition-colors">Home</a>
                            <a href="#Categories" className="hover:text-pink-500 transition-colors">Categories</a>
                            <a href="#Featured" className="hover:text-pink-500 transition-colors">Featured</a>
                            <a href="#Trending" className="hover:text-pink-500 transition-colors">Trending</a>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-pink-500" />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <button className="bg-pink-100 text-black px-4 py-2 rounded-full hover:bg-pink-200 transition-colors">Subscribe</button>
                        <button className="border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors">Sign In</button>
                        <Menu className="md:hidden cursor-pointer" />
                    </div>
                </div>
            </header>

            {/* Section 1: Stories + Trending */}
            <section className="pt-24 ">
                <div className="container mx-auto px-4 ">
                    <div className="flex flex-col md:flex-row ">
                        {/* Left: Story Carousel */}
                        <div className="md:w-2/3 relative overflow-hidden h-[500px]">
                            <div className="relative h-full">
                                {stories.map((story, index) => (
                                    <div
                                        key={story.id}
                                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentStoryIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    >
                                        <Link
                                            to={`/news/${story.id}`}
                                            state={{
                                                title: story.title,
                                                description: story.description,
                                                image: story.image,
                                                brief: story.brief
                                            }}
                                            className="relative h-full overflow-hidden group rounded-l-lg block"
                                        >
                                            {/* Image with overlay */}
                                            <img
                                                src={story.image}
                                                alt={story.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>

                                            {/* Content */}
                                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                                <h2 className="text-4xl font-bold text-white mb-4">{story.title}</h2>
                                                <p className="text-gray-100 mb-4 text-2xl">{story.brief}</p>
                                                <div className="bg-pink-500 flex items-center text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors w-fit">
                                                    READ MORE
                                                    <ArrowRight size={16} className="ml-1" />
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Indicators (outside link to prevent navigation) */}
                                        <div className="absolute bottom-4 right-4 flex space-x-2">
                                            {stories.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentStoryIndex(idx);
                                                    }}
                                                    className={`w-2 h-2 rounded-full ${currentStoryIndex === idx ? 'bg-pink-500' : 'bg-gray-300'}`}
                                                    aria-label={`Go to slide ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => navigateStories('prev')}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all z-10"
                                >
                                    <ChevronLeft />
                                </button>
                                <button
                                    onClick={() => navigateStories('next')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all z-10"
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>

                        {/* Right: Trending Section */}
                        <div className="md:w-1/3 bg-black text-white p-6 h-[500px] overflow-y-auto scrollbar-hide rounded-r-lg" style={hideScrollbarStyle}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center text-pink-300 "><TrendingUp className="mr-7 text-pink-300" />TRENDING</h2>
                            <div className="space-y-6">
                                {trendingStories.slice(0, 10).map((story, index) => (
                                    <Link
                                        to={`/news/${story.id}`}
                                        key={story.id}
                                        state={{
                                            title: story.title,
                                            description: story.brief,
                                            image: story.image,
                                            date: story.date,
                                            publisher: story.publisher
                                        }}
                                    >
                                        <div className="flex items-center gap-4 p-3 hover:bg-pink-50/10 rounded-lg duration-500 transition-colors cursor-pointer">
                                            <span className="text-xl font-bold text-pink-300 w-10">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <div className="flex-1">
                                                <h3 className="font-medium">{story.title}</h3>
                                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                                    <span>{story.date}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{story.publisher}</span>
                                                </div>
                                            </div>
                                            <div className="w-20 h-20 overflow-hidden rounded-sm">
                                                <img
                                                    src={story.image}
                                                    alt={story.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Categories */}
            <section id='Categories' className="py-16 bg-pink-50 bg-[radial-gradient(#faa5e0_0.6px,transparent_0.5px)] bg-[length:10px_10px]">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Categories</h2>

                    {/* Categories Horizontal Row */}
                    {!categoryViewAll && (
                        <div
                            ref={categoriesContainerRef}
                            className="overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide"
                            style={{ ...hideScrollbarStyle, scrollBehavior: 'smooth' }}
                        >
                            {categories.map((category, index) => (
                                <div key={index} className="inline-block mx-4 text-center">
                                    <div className="flex flex-col items-center w-32 h-32 rounded-full overflow-hidden mb-2">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <span className="mt-2 font-bold text-gray-800">{category.name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Categories Grid View (When View All is clicked) */}
                    {categoryViewAll && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6">
                            {categories.map((category, index) => (
                                <div key={index} className="text-center flex flex-col justify-center items-center">
                                    <div className="flex flex-col items-center w-32 h-32 rounded-full overflow-hidden mb-2">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <span className="mt-2 font-bold text-gray-800">{category.name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-6">
                        {!categoryViewAll ? (
                            <button
                                onClick={handleViewAllCategories}
                                className="bg-pink-100 text-black px-6 py-2 rounded-full hover:bg-pink-200 transition-colors"
                            >
                                View All
                            </button>
                        ) : (
                            <button
                                onClick={handleCollapseCategories}
                                className="bg-gray-200 text-black px-6 py-b-2 rounded-full hover:bg-gray-300 transition-colors"
                            >
                                <X className="inline-block mr-1 h-4 w-4" /> Collapse
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Section 3: Trending Topics */}
            <section id='Trending' className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Trending Topics</h2>
                        <div className="flex space-x-2">
                            {['Today', 'Week', 'Month'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-full transition-colors ${activeTab === tab ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        {filteredTrending.slice(0, 4).map((story) => (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden group relative border-2 border-transparent hover:border-pink-700 transition-all hover:translate-y-[-5px] hover:shadow-2xl duration-500"
                            >
                                <Link
                                    to={`/news/${story.id}`}
                                    key={story.id}
                                    state={{
                                        title: story.title,
                                        description: story.description,
                                        image: story.image,
                                        date: story.date,
                                        publisher: story.publisher
                                    }}
                                    className="block"
                                >
                                    <div className="relative overflow-hidden h-48">
                                        <img
                                            src={story.image}
                                            alt={story.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4 ">
                                        <h3 className="font-bold text-xl group-hover:text-pink-500 mb-2 hover:underline">{story.title}</h3>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>{story.date}</span>
                                            <span className="mx-2">•</span>
                                            <span>{story.publisher}</span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Bookmark button outside Link to prevent navigation when clicking */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleBookmark(story.id);
                                    }}
                                    className="absolute top-2 right-2 bg-white bg-opacity-70 p-1.5 rounded-full z-10"
                                >
                                    {bookmarkedStories[story.id] ?
                                        <BookmarkCheck className="h-5 w-5 text-pink-500" /> :
                                        <Bookmark className="h-5 w-5" />
                                    }
                                </button>
                            </div>
                        ))}

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {filteredTrending.slice(4, 7).map((story) => (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden group relative border-2 border-transparent hover:border-pink-700 transition-all hover:translate-y-[-5px] hover:shadow-2xl duration-500"
                            >
                                <Link
                                    to={`/news/${story.id}`}
                                    key={story.id}
                                    state={{
                                        title: story.title,
                                        description: story.description,
                                        image: story.image,
                                        date: story.date,
                                        publisher: story.publisher
                                    }}
                                    className="block"
                                >
                                    <div className="relative overflow-hidden h-48">
                                        <img
                                            src={story.image}
                                            alt={story.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-xl group-hover:text-pink-500 mb-2 hover:underline">{story.title}</h3>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>{story.date}</span>
                                            <span className="mx-2">•</span>
                                            <span>{story.publisher}</span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Bookmark button outside Link to prevent navigation when clicking */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleBookmark(story.id);
                                    }}
                                    className="absolute top-2 right-2 bg-white bg-opacity-70 p-1.5 rounded-full z-10"
                                >
                                    {bookmarkedStories[story.id] ?
                                        <BookmarkCheck className="h-5 w-5 text-pink-500" /> :
                                        <Bookmark className="h-5 w-5" />
                                    }
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    <button className="group font-bold border-2 border-transparent bg-pink-200 text-pink-500 hover:bg-pink-200 hover:border-pink-500 hover:shadow-lg mt-10 px-6 py-2 rounded-full inline-flex items-center transition-all duration-300">
                        Explore More
                        <ChevronRight
                            size={16}
                            className="ml-1 font-bold transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </button>
                </div>
            </section>

            {/* Section 4: Featured For You*/}
            <div id='Featured' className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-black">Featured For You</h2>
                <section className="bg-black text-white rounded-lg">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Image section with hover effect */}
                        <Link
                            to={`/news/${featuredStory.id}`}
                            state={{
                                title: featuredStory.title,
                                description: featuredStory.description,
                                image: featuredStory.image,
                                date: featuredStory.date,
                                publisher: featuredStory.publisher,
                                brief: featuredStory.brief
                            }}
                            className="md:w-1/2 overflow-hidden h-full group"
                        >
                            <img
                                src={featuredStory.image}
                                alt={featuredStory.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-l-lg"
                            />
                        </Link>

                        {/* Content section */}
                        <div className="md:w-1/2 p-6">
                            <Link
                                to={`/news/${featuredStory.id}`}
                                state={{
                                    title: featuredStory.title,
                                    description: featuredStory.description,
                                    image: featuredStory.image,
                                    date: featuredStory.date,
                                    publisher: featuredStory.publisher,
                                    brief: featuredStory.brief
                                }}
                                className="block"
                            >
                                <h3 className="text-3xl text-pink-300 font-bold mb-3 hover:underline">
                                    {featuredStory.title}
                                </h3>
                            </Link>

                            <div className="flex items-center text-sm text-gray-400 mb-4">
                                <span>{featuredStory.date}</span>
                                <span className="mx-2">•</span>
                                <span>{featuredStory.publisher}</span>
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-6">
                                {featuredStory.brief}
                            </p>

                            <Link
                                to={`/news/${featuredStory.id}`}
                                state={{
                                    title: featuredStory.title,
                                    description: featuredStory.description,
                                    image: featuredStory.image,
                                    date: featuredStory.date,
                                    publisher: featuredStory.publisher,
                                    brief: featuredStory.brief
                                }}
                            >
                                <button className="group font-bold border-2 border-transparent bg-pink-500 hover:bg-pink-50 hover:border-pink-500 hover:text-pink-400 hover:shadow-lg mt-10 px-6 py-2 rounded-full inline-flex items-center transition-all duration-300">
                                    Explore More
                                    <ChevronRight
                                        size={16}
                                        className="ml-1 font-bold transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            {/* Section 5: Future Is Here */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Future Is Here</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-6">
                        {futureStories.slice(0, 3).map((story) => (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden group relative border-2 border-transparent hover:border-pink-700 transition-all hover:translate-y-[-5px] hover:shadow-2xl duration-500"
                            >
                            <Link
                                key={story.id}
                                to={`/news/${story.id}`}
                                state={{
                                    title: story.title,
                                    description: story.description,
                                    image: story.image,
                                    date: story.date,
                                    publisher: story.publisher
                                }}
                                className="bg-white rounded-lg overflow-hidden group block hover:shadow-md transition-shadow" // Added hover effect
                            >
                                <div className="relative overflow-hidden h-60">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-xl mb-2 hover:underline">{story.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>{story.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{story.publisher}</span>
                                    </div>
                                </div>
                            </Link>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {futureStories.slice(3, 6).map((story) => (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden group relative border-2 border-transparent hover:border-pink-700 transition-all hover:translate-y-[-5px] hover:shadow-2xl duration-500"
                            >
                            <Link
                                key={story.id}
                                to={`/news/${story.id}`}
                                state={{
                                    title: story.title,
                                    description: story.description,
                                    image: story.image,
                                    date: story.date,
                                    publisher: story.publisher
                                }}
                                className="bg-white rounded-lg shadow-sm overflow-hidden group block hover:shadow-md transition-shadow" // Added hover effect
                            >
                                <div className="relative overflow-hidden h-60">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-xl mb-2 hover:underline">{story.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>{story.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{story.publisher}</span>
                                    </div>
                                </div>
                            </Link></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: Subscribe */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
                            <p className="text-gray-600 mb-6">Stay updated with the latest news, trends, and exclusive content delivered directly to your inbox.</p>
                            <div className="flex max-w-md">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-pink-500"
                                />
                                <button className="bg-black text-white px-6 py-3 rounded-r-lg hover:bg-gray-800 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-gray-600 flex mb-6 mt-6"><Shield className="mr-2 " />We respect your privacy. Unsubscribe at any time.</p>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://neurosciencenews.com/files/2024/07/politician-personality-neurosicence.jpg"
                                alt="Newsletter Illustration"
                                className="w-full h-100 rounded-lg object-cover object-top border-white border-4"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* Section 7: About Us */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-6">About NewsDaily</h2>
                    <p className="text-gray-600 mb-8">
                        NewsDaily brings you the latest headlines, in-depth analysis, and diverse perspectives on today's most important stories.
                        Our dedicated team of journalists works around the clock to deliver accurate, timely, and relevant news across various categories.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center bg-gray-50 p-6 border-2 border-pink-300 rounded-lg shadow-md">
                            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Newspaper className="text-pink-500" />
                            </div>
                            <h3 className="font-bold mb-2">Quality Journalism</h3>
                            <p className="text-sm text-gray-600">Committed to accuracy and integrity in our reporting.</p>
                        </div>

                        <div className="text-center  bg-gray-50 p-6 border-2 border-pink-300 rounded-lg shadow-md">
                            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bookmark className="text-pink-500" />
                            </div>
                            <h3 className="font-bold mb-2">Diverse Perspectives</h3>
                            <p className="text-sm text-gray-600">Covering stories from multiple viewpoints to provide a complete picture.</p>
                        </div>

                        <div className="text-center bg-gray-50 p-6 border-2 border-pink-300 rounded-lg shadow-md ">
                            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bell className="text-pink-500" />
                            </div>
                            <h3 className="font-bold mb-2">Timely Updates</h3>
                            <p className="text-sm text-gray-600">Breaking news and alerts delivered to you as events unfold.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600">© 2025 NewsLetter. All rights reserved.</p>
                </div>
            </footer>

            {/* Bookmark Message Popup */}
            {showBookmarkMsg && (
                <div className="fixed bottom-6 left-6 bg-black text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in-up">
                    <BookmarkCheck className="h-5 w-5 text-pink-500" />
                    <span>Story saved to your collection</span>
                </div>
            )}
        </div>
    );
}