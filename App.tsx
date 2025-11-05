
import React, { useState } from 'react';
import StudentView from './components/StudentView';
import AdminView from './components/AdminView';
import type { View, Tests } from './types';

const initialTests: Tests = {
  career: {
    questions: [
      "Do you enjoy solving complex problems?",
      "Are you more interested in working with technology, people, or ideas?",
      "What is your ideal work environment (e.g., fast-paced, collaborative, quiet)?",
    ],
  },
  personality: {
    questions: [
      "Do you prefer working alone or in a team?",
      "Are you more of a big-picture thinker or detail-oriented?",
      "How do you handle stress and pressure?",
    ],
  },
  skills: {
    questions: [
      "On a scale of 1-10, rate your communication skills.",
      "On a scale of 1-10, rate your technical/coding skills.",
      "On a scale of 1-10, rate your leadership abilities.",
    ],
  },
};

const Header = () => (
    <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                AI Career Assessment Tool
            </h1>
            <p className="mt-2 text-lg text-gray-600">Discover your future career path with the power of AI</p>
        </div>
    </header>
);

interface NavigationProps {
    activeView: View;
    setActiveView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => {
    const baseClasses = "py-3 px-6 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const activeClasses = "bg-indigo-600 text-white shadow-md";
    const inactiveClasses = "bg-white text-gray-700 hover:bg-gray-100";

    return (
        <nav className="flex justify-center p-4 bg-gray-100 rounded-xl shadow-inner my-8 max-w-md mx-auto">
            <div className="flex space-x-2 bg-white p-1 rounded-lg">
                <button
                    onClick={() => setActiveView('student')}
                    className={`${baseClasses} ${activeView === 'student' ? activeClasses : inactiveClasses}`}
                >
                    Student
                </button>
                <button
                    onClick={() => setActiveView('admin')}
                    className={`${baseClasses} ${activeView === 'admin' ? activeClasses : inactiveClasses}`}
                >
                    Admin
                </button>
            </div>
        </nav>
    );
};


function App() {
  const [activeView, setActiveView] = useState<View>('student');
  const [tests, setTests] = useState<Tests>(initialTests);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <Navigation activeView={activeView} setActiveView={setActiveView} />
        
        {activeView === 'student' ? (
          <StudentView tests={tests} />
        ) : (
          <AdminView tests={tests} setTests={setTests} />
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Google Gemini API</p>
      </footer>
    </div>
  );
}

export default App;
