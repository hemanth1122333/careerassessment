
import React, { useState } from 'react';
import type { Tests, TestType } from '../types';
import Card from './common/Card';
import { TrashIcon } from './common/Icons';

interface AdminViewProps {
  tests: Tests;
  setTests: React.Dispatch<React.SetStateAction<Tests>>;
}

const AdminView: React.FC<AdminViewProps> = ({ tests, setTests }) => {
  const [selectedTestType, setSelectedTestType] = useState<TestType>('career');
  const [newQuestion, setNewQuestion] = useState('');

  const currentQuestions = tests[selectedTestType].questions;

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      const updatedTests = { ...tests };
      updatedTests[selectedTestType].questions.push(newQuestion.trim());
      setTests(updatedTests);
      setNewQuestion('');
    }
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedTests = { ...tests };
    updatedTests[selectedTestType].questions.splice(index, 1);
    setTests(updatedTests);
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Assessments</h2>
        <div className="mb-6">
          <label htmlFor="adminTestType" className="block font-medium text-gray-700 mb-2">Select Test to Manage:</label>
          <select
            id="adminTestType"
            value={selectedTestType}
            onChange={(e) => setSelectedTestType(e.target.value as TestType)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            <option value="career">Career Test</option>
            <option value="personality">Personality Test</option>
            <option value="skills">Skills Evaluation</option>
          </select>
        </div>
        <div>
          <label htmlFor="newQuestion" className="block font-medium text-gray-700 mb-2">Add New Question:</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              id="newQuestion"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter question text"
              className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <button
              onClick={handleAddQuestion}
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              Add Question
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">{selectedTestType} Questions</h3>
        {currentQuestions.length > 0 ? (
          <ul className="space-y-3">
            {currentQuestions.map((q, i) => (
              <li key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-700">{q}</span>
                <button
                  onClick={() => handleRemoveQuestion(i)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                  aria-label="Remove question"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No questions found for this test. Add one above to get started!</p>
        )}
      </Card>
    </div>
  );
};

export default AdminView;
