import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, TrendingUp, X, ChevronRight, Home } from 'lucide-react';

export default function SearchPage() {
    const { state } = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const allNews = state || [];
    const trendingStories = allNews.slice(0, 6);

    const handleSearch = (e) => {
        e.preventDefault();
        setHasSearched(true);

        // Filter news based on keywords in the title
        console.log(state);
        const results = allNews.filter(news =>
            news.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(results);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setHasSearched(false);
    };

    const handleBackToHome = () => {
        clearSearch();
        // Additional home page navigation logic would go here
    };

    return (
        <div className="flex min-h-screen  text-gray-900 justify-center bg-pink-50 bg-[radial-gradient(#faa5e0_0.9px,transparent_0.5px)] bg-[length:10px_10px] pl-10 pr-33 md:flex-row">
            <div className="container mx-auto ml-20">
                {/* Left section - Search */}
                <div className="flex-1 p-8 border-r border-gray-200 ">
                    <div className=" mx-auto ">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-pink-950">News Search</h1>
                            <button
                                onClick={handleBackToHome}
                                className="flex items-center px-4 py-2 bg-pink-200 text-pink-800 rounded-lg hover:bg-pink-200 transition-colors"
                            >
                                Clear
                            </button>
                        </div>

                        {/* Search form */}
                        <form onSubmit={handleSearch} className="mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search news by title..."
                                    className="w-full p-4 pl-12 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                                />
                                <Search className="absolute left-4 top-4 text-gray-400" size={20} />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-14 top-4 text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="absolute right-4 top-4 text-pink-500 hover:text-pink-700"
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </form>

                        {/* Search results or initial message */}
                        <div className="space-y-6">
                            {!hasSearched ? (
                                <div className="text-center py-12 bg-pink-50 rounded-lg">
                                    <Search size={40} className="mx-auto text-pink-300 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Begin your search</h3>
                                    <p className="text-gray-600">
                                        Enter keywords to find news stories that match your interests
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-semibold mb-4">
                                        {searchResults.length > 0
                                            ? `Found ${searchResults.length} result${searchResults.length > 1 ? 's' : ''}`
                                            : 'No results found'
                                        }
                                    </h2>

                                    {searchResults.length === 0 ? (
                                        <div className="text-center py-12 bg-pink-50 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                                            <p className="text-gray-600">
                                                We couldn't find any stories matching your current filters.
                                                Try adjusting your search criteria.
                                            </p>
                                        </div>
                                    ) : (
                                        searchResults.map(news => (
                                            <Link
                                                to={`/news/${news.id}`}
                                                state={{
                                                    title: news.title,
                                                    image: news.image,
                                                    date: news.date,
                                                    publisher: news.publisher
                                                }}
                                                key={news.id}
                                                className="flex bg-white p-4 border-pink-400 rounded-lg shadow-sm hover:border-2 
          hover:border-pink-500 hover:shadow-md 
          transition-all duration-300 ease-in-out 
          hover:scale-105">
                                                <div className="w-24 h-24 flex-shrink-0 mr-4">
                                                    <img
                                                        src={news.image}
                                                        alt={news.title}
                                                        className="w-full h-full object-cover rounded-md"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-lg mb-1">{news.title}</h3>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <span className="mr-2">{news.publisher}</span>
                                                        <span>•</span>
                                                        <span className="ml-2">{news.date}</span>
                                                    </div>
                                                    <p className="text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet totam, possimus </p>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </>
                            )}
                            <Link
                                to="/"
                                onClick={handleBackToHome}
                                className="flex w-fit items-center px-4 py-2 bg-pink-200 text-pink-800 rounded-lg hover:bg-pink-200 transition-colors"
                            >
                                <Home size={16} className="mr-2" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right section - Trending */}
            <div className="w-180 p-2  bg-gray-900 text-white overflow-y-auto max-h-screen mt-5 mb-5 rounded-lg shadow-lg">
                <div className="mt-6 flex items-center justify-between pl-5 pr-7">
                    <h2 className="text-xl font-semibold flex items-center">
                        <TrendingUp size={20} className="mr-5 text-pink-400" />
                        Daily Hottest Topics
                    </h2>
                </div>
                <div className="space-y-6">
                    {trendingStories.slice(0, 5).map((story, index) => (
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
                            <div className="flex items-center gap-4 p-5 hover:bg-pink-50/10 rounded-lg duration-500 transition-colors cursor-pointer">
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

                <button className="flex items-center justify-center w-full mt-6 p-2 text-pink-300 hover:text-pink-200 rounded-md hover:bg-gray-800 transition-colors">
                    View More
                    <ChevronRight size={16} className="ml-1" />
                </button>
            </div>
        </div>
    );
}