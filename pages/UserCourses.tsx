
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { courses } from "@/lib/data";
import { Course } from "@/lib/types";
import { ArrowRight } from "lucide-react";

const UserCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Get enrolled courses from localStorage
    const enrolledData = JSON.parse(localStorage.getItem("enrolledCourses") || "{}");
    
    const userCourses = Object.keys(enrolledData).map(courseId => {
      const course = courses.find(c => c.id === courseId);
      if (!course) return null;
      
      // Deep clone the course and add enrollment data
      const courseCopy = JSON.parse(JSON.stringify(course));
      courseCopy.enrolled = true;
      courseCopy.progress = enrolledData[courseId].progress || 0;
      
      return courseCopy;
    }).filter(Boolean) as Course[];
    
    setEnrolledCourses(userCourses);
  }, []);

  if (enrolledCourses.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">You haven't enrolled in any courses yet</h2>
        <p className="mb-6">Browse our course catalog and start your learning journey today!</p>
        <Link 
          to="/" 
          className="bg-brand-purple text-white px-6 py-2 rounded-md font-medium hover:bg-brand-lightPurple transition-colors inline-flex items-center"
        >
          Browse Courses <ArrowRight className="ml-2" size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map(course => (
          <div key={course.id} className="course-card h-full flex flex-col">
            <div className="relative">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 object-cover" 
              />
              
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
                <Link 
                  to={`/courses/${course.id}`}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-brand-purple px-4 py-2 rounded-md font-medium transition-all"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
            
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="mt-auto flex justify-between items-center">
                <Link 
                  to={`/courses/${course.id}`} 
                  className="view-details-btn"
                >
                  Continue <ArrowRight size={16} />
                </Link>
                
                {course.progress === 100 && (
                  <Link 
                    to={`/certificate/${course.id}`}
                    className="text-sm bg-brand-yellow text-gray-800 px-3 py-1 rounded font-medium hover:bg-opacity-90 transition-colors"
                  >
                    View Certificate
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCourses;
