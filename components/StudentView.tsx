
import React, { useState } from 'react';
import type { Tests, TestType, Recommendation } from '../types';
import { getCareerRecommendations } from '../services/geminiService';
import Card from './common/Card';
import { LoadingSpinner } from './common/Icons';

interface StudentViewProps {
  tests: Tests;
}

const StudentView: React.FC<StudentViewProps> = ({ tests }) => {
  const [selectedTestType, setSelectedTestType] = useState<TestType>('career');
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestions = tests[selectedTestType].questions;

  const handleStartTest = () => {
    setAnswers(new Array(currentQuestions.length).fill(''));
    setIsTestStarted(true);
    setResults(null);
    setError(null);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const recommendations = await getCareerRecommendations(selectedTestType, currentQuestions, answers);
      setResults(recommendations);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
      setIsTestStarted(false);
    }
  };
  
  const TestSelector = () => (
    <Card>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Take an Assessment</h2>
      <p className="text-gray-600 mb-6">Select a test to discover your potential career paths.</p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <select
          id="testType"
          value={selectedTestType}
          onChange={(e) => setSelectedTestType(e.target.value as TestType)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          disabled={isTestStarted}
        >
          <option value="career">Career Test</option>
          <option value="personality">Personality Test</option>
          <option value="skills">Skills Evaluation</option>
        </select>
        <button
          onClick={handleStartTest}
          className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
        >
          Start Test
        </button>
      </div>
    </Card>
  );

  const Assessment = () => (
     <Card>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">{selectedTestType} Test</h2>
      <div className="space-y-6">
        {currentQuestions.map((q, i) => (
          <div key={i} className="flex flex-col">
            <label className="font-medium text-gray-700 mb-2">{i + 1}. {q}</label>
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => handleAnswerChange(i, e.target.value)}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Your answer..."
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-8 w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition"
      >
        {isLoading ? <LoadingSpinner /> : 'Submit & Get Recommendations'}
      </button>
    </Card>
  );

  const Results = () => (
    <Card>
       <h2 className="text-2xl font-bold text-gray-800 mb-4">Your AI-Powered Career Recommendations</h2>
      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <LoadingSpinner/>
            <p className="mt-4 text-lg font-medium text-gray-600">Our AI is analyzing your answers...</p>
            <p className="text-gray-500">This may take a moment.</p>
        </div>
      )}
      {error && <div className="text-red-600 bg-red-100 border border-red-400 rounded-lg p-4">{error}</div>}
      {results && (
        <ul className="space-y-6">
          {results.map((rec, i) => (
            <li key={i} className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-800">{rec.career}</h3>
              <p className="text-gray-700 mt-2">{rec.reason}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );


  return (
    <div className="space-y-8">
      {!isTestStarted && <TestSelector />}
      {isTestStarted && <Assessment />}
      {(isLoading || results || error) && !isTestStarted && <Results />}
    </div>
  );
};

export default StudentView;
