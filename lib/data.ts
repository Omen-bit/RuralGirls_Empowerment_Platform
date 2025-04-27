import { Course, Category } from './types';

export const categories: Category[] = [
  { id: 'all', name: 'All Categories' },
  { id: 'handicrafts', name: 'Handicrafts' },
  { id: 'tailoring', name: 'Tailoring' },
  { id: 'digitalskills', name: 'Digital Skills' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'beauty', name: 'Beauty & Wellness' },
  { id: 'food', name: 'Food Processing' },
  { id: 'business', name: 'Business' },
  { id: 'health', name: 'Health' },
  { id: 'language', name: 'Language' },
];

export const courses: Course[] = [
  {
    id: 'basic-tailoring',
    title: 'Basic Tailoring',
    category: 'tailoring',
    level: 'Beginner',
    duration: { weeks: 8 },
    rating: { score: 4.8, count: 245 },
    image: '/lovable-uploads/26fc8f25-9d64-4972-9c24-88a5cf13421a.png',
    description: 'Learn to stitch clothes, make alterations, and basic design principles.',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Tailoring',
        items: [
          {
            id: 'item-1',
            title: 'Tailoring Tools and Equipment',
            type: 'video',
            duration: 8,
            content: { videoUrl: '/videos/tailoring-tools.mp4' }
          },
          {
            id: 'item-2',
            title: 'Understanding Fabrics',
            type: 'notes',
            content: { notesUrl: '/notes/fabrics.pdf' }
          },
          {
            id: 'item-3',
            title: 'Basic Stitches Quiz',
            type: 'quiz',
            content: {
              questions: [
                {
                  id: 'q1',
                  question: 'Which stitch is commonly used for hemming?',
                  options: ['Running stitch', 'Backstitch', 'Slip stitch', 'Chain stitch'],
                  correctAnswer: 2,
                  explanation: "Slip stitch is often used for hems because it's nearly invisible from the outside."
                },
                {
                  id: 'q2',
                  question: 'What is a running stitch best used for?',
                  options: ['Decorative edges', 'Quick seams', 'Buttonholes', 'Heavy fabrics'],
                  correctAnswer: 1,
                  explanation: "Running stitch is simple and quick, making it good for temporary seams or gathering."
                }
              ]
            }
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Basic Measurements',
        items: [
          {
            id: 'item-4',
            title: 'Taking Body Measurements',
            type: 'video',
            duration: 12,
            content: { videoUrl: '/videos/measurements.mp4' }
          },
          {
            id: 'item-5',
            title: 'Measurement Chart',
            type: 'notes',
            content: { notesUrl: '/notes/measurement-chart.pdf' }
          },
          {
            id: 'item-6',
            title: 'Practice Taking Measurements',
            type: 'assignment',
            content: { 
              assignmentDetails: 'Take measurements of a family member and fill out the measurement chart provided in the notes.' 
            }
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Pattern Making',
        items: [
          {
            id: 'item-7',
            title: 'Introduction to Patterns',
            type: 'video',
            duration: 15,
            content: { videoUrl: '/videos/pattern-intro.mp4' }
          },
          {
            id: 'item-8',
            title: 'Creating Basic Patterns',
            type: 'notes',
            content: { notesUrl: '/notes/basic-patterns.pdf' }
          },
          {
            id: 'item-9',
            title: 'Pattern Quiz',
            type: 'quiz',
            content: {
              questions: [
                {
                  id: 'q3',
                  question: 'What information is essential when making a basic bodice pattern?',
                  options: ['Shoe size', 'Bust, waist, and hip measurements', 'Weight', 'Age'],
                  correctAnswer: 1,
                  explanation: 'Bust, waist, and hip measurements are crucial for creating a well-fitted bodice pattern.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-embroidery',
    title: 'Advanced Embroidery',
    category: 'handicrafts',
    level: 'Intermediate',
    duration: { weeks: 6 },
    rating: { score: 4.7, count: 189 },
    image: '/lovable-uploads/26fc8f25-9d64-4972-9c24-88a5cf13421a.png',
    description: 'Master traditional and modern embroidery techniques for clothing and home decor.',
    modules: [
      {
        id: 'module-1',
        title: 'Advanced Stitches',
        items: [
          {
            id: 'item-1',
            title: 'Decorative Stitches',
            type: 'video',
            duration: 10,
            content: { videoUrl: '/videos/decorative-stitches.mp4' }
          },
          {
            id: 'item-2',
            title: 'Stitch Guide',
            type: 'notes',
            content: { notesUrl: '/notes/stitch-guide.pdf' }
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Traditional Designs',
        items: [
          {
            id: 'item-3',
            title: 'Heritage Patterns',
            type: 'video',
            duration: 15,
            content: { videoUrl: '/videos/heritage-patterns.mp4' }
          }
        ]
      }
    ]
  },
  {
    id: 'web-development',
    title: 'Web Development Basics',
    category: 'digitalskills',
    level: 'Beginner',
    duration: { weeks: 10 },
    rating: { score: 4.6, count: 156 },
    image: '/lovable-uploads/26fc8f25-9d64-4972-9c24-88a5cf13421a.png',
    description: 'Learn HTML, CSS, and basic JavaScript to build simple websites.',
    modules: [
      {
        id: 'module-1',
        title: 'HTML Fundamentals',
        items: [
          {
            id: 'item-1',
            title: 'Introduction to HTML',
            type: 'video',
            duration: 12,
            content: { videoUrl: '/videos/html-intro.mp4' }
          },
          {
            id: 'item-2',
            title: 'HTML Tags Reference',
            type: 'notes',
            content: { notesUrl: '/notes/html-tags.pdf' }
          }
        ]
      }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Fundamentals',
    category: 'digitalskills',
    level: 'Beginner',
    duration: { weeks: 6 },
    rating: { score: 4.7, count: 178 },
    image: '/lovable-uploads/26fc8f25-9d64-4972-9c24-88a5cf13421a.png',
    description: 'Learn to promote products and services online using social media and other digital channels.',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Digital Marketing',
        items: [
          {
            id: 'item-1',
            title: 'Digital Marketing Overview',
            type: 'video',
            duration: 8,
            content: { videoUrl: '/videos/digital-marketing.mp4' }
          }
        ]
      }
    ]
  },
  {
    id: 'smartphone-photography',
    title: 'Smartphone Photography',
    category: 'digitalskills',
    level: 'Beginner',
    duration: { weeks: 4 },
    rating: { score: 4.8, count: 132 },
    image: '/lovable-uploads/26fc8f25-9d64-4972-9c24-88a5cf13421a.png',
    description: 'Take professional-quality photos using just your smartphone.',
    modules: [
      {
        id: 'module-1',
        title: 'Camera Basics',
        items: [
          {
            id: 'item-1',
            title: 'Smartphone Camera Settings',
            type: 'video',
            duration: 10,
            content: { videoUrl: '/videos/camera-settings.mp4' }
          }
        ]
      }
    ]
  },
  {
    id: 'organic-farming',
    title: 'Organic Farming',
    category: 'agriculture',
    level: 'All Levels',
    duration: { weeks: 8 },
    rating: { score: 4.9, count: 210 },
    image: '/lovable-uploads/26fc8f25-9d64-4972-9c24-88a5cf13421a.png',
    description: 'Learn sustainable farming techniques for vegetables and herbs.',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Organic Farming',
        items: [
          {
            id: 'item-1',
            title: 'Principles of Organic Farming',
            type: 'video',
            duration: 15,
            content: { videoUrl: '/videos/organic-principles.mp4' }
          }
        ]
      }
    ]
  }
];

// Create a deep copy and add progress for enrolled courses
export const userCourses = [
  {
    ...JSON.parse(JSON.stringify(courses.find(c => c.id === 'basic-tailoring'))),
    enrolled: true,
    progress: 67,
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Tailoring',
        completed: true,
        items: [
          {
            id: 'item-1',
            title: 'Tailoring Tools and Equipment',
            type: 'video',
            duration: 8,
            completed: true,
            content: { videoUrl: '/videos/tailoring-tools.mp4' }
          },
          {
            id: 'item-2',
            title: 'Understanding Fabrics',
            type: 'notes',
            completed: true,
            content: { notesUrl: '/notes/fabrics.pdf' }
          },
          {
            id: 'item-3',
            title: 'Basic Stitches Quiz',
            type: 'quiz',
            completed: true,
            content: {
              questions: [
                {
                  id: 'q1',
                  question: 'Which stitch is commonly used for hemming?',
                  options: ['Running stitch', 'Backstitch', 'Slip stitch', 'Chain stitch'],
                  correctAnswer: 2,
                  explanation: "Slip stitch is often used for hems because it's nearly invisible from the outside."
                },
                {
                  id: 'q2',
                  question: 'What is a running stitch best used for?',
                  options: ['Decorative edges', 'Quick seams', 'Buttonholes', 'Heavy fabrics'],
                  correctAnswer: 1,
                  explanation: "Running stitch is simple and quick, making it good for temporary seams or gathering."
                }
              ]
            }
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Basic Measurements',
        completed: false,
        items: [
          {
            id: 'item-4',
            title: 'Taking Body Measurements',
            type: 'video',
            duration: 12,
            completed: true,
            content: { videoUrl: '/videos/measurements.mp4' }
          },
          {
            id: 'item-5',
            title: 'Measurement Chart',
            type: 'notes',
            completed: true,
            content: { notesUrl: '/notes/measurement-chart.pdf' }
          },
          {
            id: 'item-6',
            title: 'Practice Taking Measurements',
            type: 'assignment',
            completed: false,
            content: { 
              assignmentDetails: 'Take measurements of a family member and fill out the measurement chart provided in the notes.' 
            }
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Pattern Making',
        completed: false,
        items: [
          {
            id: 'item-7',
            title: 'Introduction to Patterns',
            type: 'video',
            duration: 15,
            completed: false,
            content: { videoUrl: '/videos/pattern-intro.mp4' }
          },
          {
            id: 'item-8',
            title: 'Creating Basic Patterns',
            type: 'notes',
            completed: false,
            content: { notesUrl: '/notes/basic-patterns.pdf' }
          },
          {
            id: 'item-9',
            title: 'Pattern Quiz',
            type: 'quiz',
            completed: false,
            content: {
              questions: [
                {
                  id: 'q3',
                  question: 'What information is essential when making a basic bodice pattern?',
                  options: ['Shoe size', 'Bust, waist, and hip measurements', 'Weight', 'Age'],
                  correctAnswer: 1,
                  explanation: 'Bust, waist, and hip measurements are crucial for creating a well-fitted bodice pattern.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    ...JSON.parse(JSON.stringify(courses.find(c => c.id === 'web-development'))),
    enrolled: true,
    progress: 22,
    modules: [
      {
        id: 'module-1',
        title: 'HTML Fundamentals',
        completed: false,
        items: [
          {
            id: 'item-1',
            title: 'Introduction to HTML',
            type: 'video',
            duration: 12,
            completed: true,
            content: { videoUrl: '/videos/html-intro.mp4' }
          },
          {
            id: 'item-2',
            title: 'HTML Tags Reference',
            type: 'notes',
            completed: false,
            content: { notesUrl: '/notes/html-tags.pdf' }
          }
        ]
      }
    ]
  }
];
