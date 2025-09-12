import React from "react";

// FeatureSection component
// Props:
// - imageSrc: URL for the left image
// - alt: alt text for the image
// - items: array of { icon: JSX, title: string, desc: string }

export default function FeatureSection({
    imageSrc = "/mobile.png",
    alt = "Feature image",
    items = null,
}) {
    const defaultItems = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3 7H9l3-7z" />
                    <path d="M5 22h14" />
                </svg>
            ),
            title: "Fast Performance",
            desc: "Blazing fast load times and optimized rendering for every device.Blazing fast load times and optimized rendering for every device.",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a7 7 0 10-14.8 0" />
                </svg>
            ),
            title: "Secure by Default",
            desc: "Built-in best practices and careful defaults to keep data safe.Blazing fast load times and optimized rendering for every device.",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="14" rx="2" />
                    <path d="M7 21h10" />
                </svg>
            ),
            title: "Easy Integrations",
            desc: "Connect with popular tools and APIs with minimal setup.Blazing fast load times and optimized rendering for every device.",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            title: "Human-centered Design",
            desc: "Interfaces that feel intuitive and delightful for users.Blazing fast load times and optimized rendering for every device.",
        },
    ];

    const features = items || defaultItems;

    return (
        <section className=" mx-auto px-12 py-12 bg-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Left: Image */}
                <div className=" flex justify-center md:w-1/2 w-full">
                    <img
                        src={imageSrc}
                        alt={alt}
                        className="w-[50%] h-auto rounded-2xl  object-cover swing-animation"
                    />
                </div>

                {/* Right: 4 headings with icon + paragraph */}
               
                <div className="md:w-1/2 w-full flex justify-center pl-20 flex-col gap-18">
                    {features.map((f, i) => (
                        <div key={i} className="flex items-start leading-5 gap-4">
                            {/* Icon container */}
                            <div className="flex-none w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-white">
                                {f.icon}
                            </div>

                            {/* Text: heading + paragraph (this block is also flexible) */}
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold leading-tight">{f.title}</h3>
                                <p className="mt-1 w-[70%] text-sm text-gray-600">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
