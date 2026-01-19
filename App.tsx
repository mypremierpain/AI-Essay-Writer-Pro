
import React, { useState, useRef, useEffect } from 'react';
import EssayForm from './components/EssayForm';
import EssayOutput from './components/EssayOutput';
import SEOContent from './components/SEOContent';
import { EssayRequest } from './types';
import { generateEssayStream } from './services/api';

const App: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  
  const toolRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (data: EssayRequest) => {
    setIsLoading(true);
    setError(undefined);
    setContent('');

    const response = await generateEssayStream(data, (streamedText) => {
      setContent(streamedText);
      // Once we start getting text, we stop the initial "loading" state 
      // but keep an internal track if we want to show a cursor or something.
      setIsLoading(false); 
    });

    if (!response.success) {
      setError(response.error || 'Failed to generate essay content. Please check your connection.');
      setIsLoading(false);
    }
  };

  // Scroll to output when content starts arriving
  useEffect(() => {
    if (content && outputRef.current) {
      // Only scroll once when content starts
      if (content.length < 100) {
        outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [content]);

  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-primary/20">
      {/* Tool Dashboard Section */}
      <main ref={toolRef} className="pt-12 pb-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-primary p-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">AI Essay Writer</h1>
            <p className="text-white/80 text-lg">Draft professional essays in seconds</p>
          </div>
          
          <div className="p-8">
            <EssayForm onGenerate={handleGenerate} isLoading={isLoading} />
            
            <div ref={outputRef}>
              <EssayOutput content={content} error={error} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>

      {/* Call To Action Section */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary mb-6">Need a High-Quality Essay Right Now?</h2>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            Our intelligent system understands context and nuance, ensuring your essay is informative, grammatically correct, and tone-perfect.
          </p>
          <button 
            onClick={scrollToTool}
            className="px-10 py-4 bg-primary text-white font-bold text-xl rounded-full shadow-lg hover:bg-[#e65100] transition-all transform hover:scale-105 active:scale-95"
          >
            Start Writing for Free
          </button>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent />

      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100">
        &copy; {new Date().getFullYear()} AI Essay Writer Pro. Optimized for Student & Professional Success.
      </footer>
    </div>
  );
};

export default App;
