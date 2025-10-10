import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import { categories, courses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-purple to-brand-lightPurple">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Learn New Skills, Transform Your Community
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of learners and develop practical skills that make a real difference. 
              Start your learning journey today.
            </p>
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full px-6 py-4 rounded-full text-lg border-2 border-white/20 bg-white/10 backdrop-blur text-white placeholder:text-white/60 focus:outline-none focus:border-white/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Button variant="secondary" size="icon">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Browse Categories</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all
                  ${activeCategory === category.id 
                    ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/25 scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="group relative bg-white rounded-xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-purple/10 text-brand-purple">
                    {course.level}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100">
                    {course.duration.weeks} weeks
                  </span>
                </div>
                
                <h3 className="font-bold text-xl mb-2 group-hover:text-brand-purple transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">{course.rating.score}</span>
                    <span className="text-gray-500">({course.rating.count})</span>
                  </div>
                  
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-brand-purple font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-gray-500">Try changing your search or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
