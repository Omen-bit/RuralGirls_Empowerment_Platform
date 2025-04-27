import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { courses } from "@/lib/data";
import ModuleAccordion from "@/components/ModuleAccordion";
import { toast } from "sonner";
import { ArrowRight, Award, BookOpen, Clock, Star, Users, Play } from "lucide-react";
import { Course } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EnrolledCourseView from "@/components/EnrolledCourseView";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      
      const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "{}");
      if (enrolledCourses[courseId || ""]) {
        setIsEnrolled(true);
        setProgress(enrolledCourses[courseId || ""].progress || 0);
      }
    }
  }, [courseId]);

  const getNextLesson = () => {
    if (!course) return undefined;
    
    for (const module of course.modules) {
      for (const item of module.items) {
        if (!item.completed) {
          return {
            title: item.title,
            duration: item.duration ? `${item.duration} min` : "Unknown",
          };
        }
      }
    }
    return undefined;
  };

  const handleEnroll = () => {
    if (!course) return;
    
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "{}");
    enrolledCourses[courseId || ""] = { 
      enrolled: true, 
      enrolledDate: new Date().toISOString(),
      progress: 0
    };
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
    
    setIsEnrolled(true);
    toast.success(`Successfully enrolled in ${course.title}`);
  };

  const handleCompleteItem = (moduleId: string, itemId: string) => {
    if (!course) return;
    
    const updatedCourse = { ...course };
    const moduleIndex = updatedCourse.modules.findIndex((m) => m.id === moduleId);
    const itemIndex = updatedCourse.modules[moduleIndex].items.findIndex((i) => i.id === itemId);
    
    updatedCourse.modules[moduleIndex].items[itemIndex].completed = true;
    
    const allItemsCompleted = updatedCourse.modules[moduleIndex].items.every((item) => item.completed);
    if (allItemsCompleted) {
      updatedCourse.modules[moduleIndex].completed = true;
    }
    
    const totalItems = updatedCourse.modules.reduce((total, module) => total + module.items.length, 0);
    const completedItems = updatedCourse.modules.reduce((total, module) => 
      total + module.items.filter((item) => item.completed).length, 0);
    
    const newProgress = Math.round((completedItems / totalItems) * 100);
    
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "{}");
    if (enrolledCourses[courseId || ""]) {
      enrolledCourses[courseId || ""].progress = newProgress;
      enrolledCourses[courseId || ""].lastUpdated = new Date().toISOString();
    }
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
    
    setCourse(updatedCourse);
    setProgress(newProgress);
    
    toast.success("Progress saved!");
    
    if (newProgress === 100) {
      toast.success("Congratulations! You've completed the course!");
    }
  };

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="text-brand-purple hover:underline">
          Go back to course listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-brand-purple to-brand-lightPurple">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{course.title}</h1>
            <p className="text-xl text-white/90 mb-8">{course.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <Clock className="w-6 h-6 text-white mb-2" />
                <p className="text-sm text-white/80">Duration</p>
                <p className="text-lg font-semibold text-white">{course.duration.weeks} weeks</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <BookOpen className="w-6 h-6 text-white mb-2" />
                <p className="text-sm text-white/80">Level</p>
                <p className="text-lg font-semibold text-white">{course.level}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <Star className="w-6 h-6 text-white mb-2" />
                <p className="text-sm text-white/80">Rating</p>
                <p className="text-lg font-semibold text-white">{course.rating.score} ({course.rating.count})</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <Users className="w-6 h-6 text-white mb-2" />
                <p className="text-sm text-white/80">Enrolled</p>
                <p className="text-lg font-semibold text-white">1,234</p>
              </div>
            </div>

            {isEnrolled ? (
              <Link to="#course-content">
                <Button size="lg" variant="secondary" className="group">
                  Continue Learning
                  <Play className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" onClick={handleEnroll} className="bg-white text-brand-purple hover:bg-white/90">
                Enroll Now <ArrowRight className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {isEnrolled && (
            <EnrolledCourseView
              progress={progress}
              courseId={courseId || ""}
              nextLesson={getNextLesson()}
              modules={course.modules}
            />
          )}
          
          <div id="course-content" className="scroll-mt-8">
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Course Content</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>{course.modules.length} modules</span>
                  <span>•</span>
                  <span>
                    {course.modules.reduce((total, module) => total + module.items.length, 0)} lessons
                  </span>
                  {isEnrolled && (
                    <>
                      <span>•</span>
                      <span>{progress}% complete</span>
                    </>
                  )}
                </div>
              </div>
              
              <ModuleAccordion 
                modules={course.modules} 
                onComplete={isEnrolled ? handleCompleteItem : undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
