
import React, { useState } from 'react';
import { EssayTone, EssayRequest } from '../types';

interface EssayFormProps {
  onGenerate: (data: EssayRequest) => void;
  isLoading: boolean;
}

const EssayForm: React.FC<EssayFormProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<EssayTone>('Formal');
  const [words, setWords] = useState(500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate({ topic, tone, words });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="topic" className="block text-sm font-bold text-secondary mb-2">
          Essay Topic
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. The impact of Artificial Intelligence on modern education"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="tone" className="block text-sm font-bold text-secondary mb-2">
            Writing Tone
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value as EssayTone)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-white"
          >
            <option value="Formal">Formal</option>
            <option value="Informal">Informal</option>
            <option value="Persuasive">Persuasive</option>
            <option value="Descriptive">Descriptive</option>
          </select>
        </div>

        <div>
          <label htmlFor="words" className="block text-sm font-bold text-secondary mb-2">
            Word Count (50 - 2000)
          </label>
          <input
            id="words"
            type="number"
            min="50"
            max="2000"
            value={words}
            onChange={(e) => setWords(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className={`w-full py-4 rounded-lg text-white font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
          isLoading || !topic.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-[#e65100]'
        }`}
      >
        {isLoading ? 'Crafting Your Essay...' : 'Generate Essay'}
      </button>
    </form>
  );
};

export default EssayForm;
