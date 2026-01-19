
import React from 'react';

interface EssayOutputProps {
  content: string;
  error?: string;
  isLoading: boolean;
}

const EssayOutput: React.FC<EssayOutputProps> = ({ content, error, isLoading }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  if (isLoading && !content) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <div className="flex space-x-2">
          <div className="dot dot1"></div>
          <div className="dot dot2"></div>
          <div className="dot"></div>
        </div>
        <p className="mt-4 text-gray-500 font-medium">Starting your masterpiece...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <h3 className="font-bold mb-2">Oops! Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="mt-12 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-secondary">
          {isLoading ? 'Writing Essay...' : 'Generated Essay'}
        </h2>
        {!isLoading && (
          <button 
            onClick={handleCopy}
            className="text-primary hover:text-[#e65100] font-bold text-sm flex items-center gap-2 px-3 py-1 border border-primary/20 rounded-md hover:bg-primary/5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Text
          </button>
        )}
      </div>
      <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 shadow-inner max-h-[600px] overflow-y-auto essay-content text-gray-700 leading-relaxed text-lg relative">
        {content}
        {isLoading && (
          <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse align-middle"></span>
        )}
      </div>
    </div>
  );
};

export default EssayOutput;
