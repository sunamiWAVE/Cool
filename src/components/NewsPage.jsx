import { div } from 'framer-motion/client';
import { useLocation, useNavigate } from 'react-router-dom';


const NewsPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        navigate('/'); // Redirect if accessed directly
        return null;
    }

    return (
        <div className="max-w-full mx-auto p-6 bg-pink-50 bg-[radial-gradient(#faa5e0_0.9px,transparent_0.5px)] bg-[length:10px_10px]">
            <div className="max-w-4xl mx-auto p-6 ">

                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 text-2xl text-gray-500 hover:text-pink-700"
                >
                    ← Go back
                </button>

                <img
                    src={state.image}
                    alt={state.title}
                    className="w-full h-96 object-cover rounded-lg"
                />

                <h1 className="text-3xl font-bold mt-6">{state.title}</h1>

                <div className="flex items-center text-gray-500 my-4">
                    <span>{state.date}</span>
                    <span className="mx-2">•</span>
                    <span>{state.publisher}</span>
                </div>

                <p className="text-lg mt-4 text-pink-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quas debitis odio dolores adipisci qui praesentium vitae perspiciatis nostrum totam? Voluptate earum sit fugiat sunt voluptates aliquam hic error ducimus.</p>

                <p className="text-lg mt-4 text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quas debitis odio dolores adipisci qui praesentium vitae perspiciatis nostrum totam? Voluptate earum sit fugiat sunt voluptates aliquam hic error ducimus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quas debitis odio dolores adipisci qui praesentium vitae
                    perspiciatis nostrum totam? Voluptate earum sit fugiat sunt voluptates aliquam hic error ducimus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quas debitis odio dolores adipisci qui praesentium vitae perspiciatis nostrum totam? Voluptate earum sit fugiat sunt voluptates aliquam hic error ducimus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quas debitis odio dolores adipisci qui praesentium vitae perspiciatis nostrum totam? Voluptate earum sit fugiat sunt voluptates aliquam hic error ducimus.
                </p>
                <button onClick={() => navigate(-1)} className="bg-pink-100 text-pink-500 hover:bg-pink-200 mt-10 px-6 py-2 rounded-full inline-flex items-center">
                    Explore More stories
                </button>
            </div></div>
    );
};

export default NewsPage;