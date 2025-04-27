
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { courses } from "@/lib/data";
import { Download, ArrowLeft } from "lucide-react";
import html2canvas from "html2canvas";

const Certificate = () => {
  const { courseId } = useParams();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState("Student Name");
  const [isLoading, setIsLoading] = useState(false);
  const course = courses.find(c => c.id === courseId);
  const [completionDate, setCompletionDate] = useState<string>("");
  
  useEffect(() => {
    // Check if user is eligible for certificate (completed course)
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "{}");
    if (enrolledCourses[courseId || ""] && enrolledCourses[courseId || ""].progress === 100) {
      const lastUpdated = new Date(enrolledCourses[courseId || ""].lastUpdated);
      setCompletionDate(lastUpdated.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }));
    }
    
    // Get user name from localStorage or use default
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, [courseId]);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    setIsLoading(true);
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${course?.title.replace(/\s+/g, "_")}_Certificate.png`;
      link.click();
    } catch (error) {
      console.error("Error generating certificate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Certificate not found</h2>
        <p className="mb-6">The course you're looking for doesn't exist or you haven't completed it yet.</p>
        <Link to="/my-courses" className="text-brand-purple hover:underline">
          Go back to my courses
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/courses/${courseId}`} className="flex items-center gap-1 text-brand-purple hover:text-brand-lightPurple">
          <ArrowLeft size={16} /> Back to Course
        </Link>
      </div>
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Your Certificate of Completion</h1>
        <p className="text-gray-600">
          Congratulations on completing the course!
        </p>
      </div>
      
      <div className="flex flex-col items-center mb-8">
        <div className="mb-4 w-full max-w-md">
          <label className="block text-sm font-medium mb-1">Customize Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              localStorage.setItem("userName", e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your name"
          />
        </div>
        
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="flex items-center gap-2 bg-brand-purple text-white px-4 py-2 rounded-md font-medium hover:bg-brand-lightPurple transition-colors"
        >
          <Download size={20} />
          {isLoading ? "Generating..." : "Download Certificate"}
        </button>
      </div>
      
      <div className="flex justify-center">
        <div 
          ref={certificateRef}
          className="certificate relative w-full max-w-3xl mx-auto"
        >
          <div className="text-center mb-6 pt-4">
            <h2 className="text-xl font-serif">SkillBoost Academy</h2>
            <h1 className="text-3xl font-bold mt-4 text-gray-800">CERTIFICATE OF COMPLETION</h1>
            <div className="h-1 w-32 mx-auto bg-gray-800 my-4"></div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-lg">This is to certify that</p>
            <h2 className="text-3xl font-bold my-4 font-serif text-brand-purple">{userName}</h2>
            <p className="text-lg">has successfully completed the course</p>
            <h3 className="text-2xl font-bold my-4 font-serif">{course.title}</h3>
            <p className="mb-2">
              <span className="font-medium">Level:</span> {course.level}
            </p>
            <p className="mb-2">
              <span className="font-medium">Duration:</span> {course.duration.weeks} weeks
            </p>
            {completionDate && (
              <p className="text-sm mt-4">Completed on {completionDate}</p>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-12 mb-6 px-8">
            <div className="text-center">
              <div className="h-px w-40 bg-gray-800 mb-2"></div>
              <p className="font-medium">Student Signature</p>
            </div>
            
            <div className="text-center">
              <div className="h-px w-40 bg-gray-800 mb-2"></div>
              <p className="font-medium">Director</p>
            </div>
          </div>
          
          <div className="certificate-seal">
            <span className="font-bold text-sm">VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
