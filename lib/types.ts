
export interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: {
    weeks: number;
  };
  rating: {
    score: number;
    count: number;
  };
  image: string;
  description: string;
  modules: Module[];
  enrolled?: boolean;
  progress?: number;
}

export interface Module {
  id: string;
  title: string;
  items: ModuleItem[];
  completed?: boolean;
}

export interface ModuleItem {
  id: string;
  title: string;
  type: 'video' | 'notes' | 'quiz' | 'assignment';
  duration?: number; // in minutes
  completed?: boolean;
  content?: {
    videoUrl?: string;
    notesUrl?: string;
    questions?: QuizQuestion[];
    assignmentDetails?: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Category {
  id: string;
  name: string;
}
