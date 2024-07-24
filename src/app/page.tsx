"use client"
import { useState } from "react";
import { Lato } from "next/font/google";
import { generateMeta } from "@/app/actions";
import { ToastContainer, toast } from 'react-toastify';
import { FiCopy, FiCoffee, FiZap } from 'react-icons/fi';
import MetaInfoCard from "@/app/ui/components/MetaInfoCard";
import { ShimmerEffect } from "@/app/ui/components/ShimmerEffect";
import { record } from 'aws-amplify/analytics';


const latoBody = Lato({
  weight: ['700', '400', '300'],
  subsets: ['latin-ext'],
  display: 'swap',
})

const latoHead = Lato({
  style: 'italic',
  weight: ['700', '400', '300'],
  subsets: ['latin-ext'],
  display: 'swap',
})

interface MetaInfo {
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  urlSlug: string;
}


export default function Home() {
  const [result, setResult] = useState<MetaInfo & { seoScore: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData(event.currentTarget);
      const metaInfo = await generateMeta(formData);
      setResult(metaInfo);

      record({
        name: 'Generated Meta Info',
        attributes: {
          blogTitle: formData.get('blogTitle')?.toString() || ''
        }
      });
    } catch (error) {
      console.error("Error generating meta information:", error);
      toast.error("Failed to generate meta information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${field} copied to clipboard!`);
    }, (err) => {
      toast.error('Failed to copy text');
    });
  };

  const copyAllToClipboard = () => {
    if (result) {
      const allText = `
Meta Title: ${result.metaTitle}
Meta Description: ${result.metaDescription}
SEO Keywords: ${result.seoKeywords.join(', ')}
URL Slug: ${result.urlSlug}
      `.trim();
      navigator.clipboard.writeText(allText).then(() => {
        toast.success("All meta information copied to clipboard!");
      }, (err) => {
        toast.error('Failed to copy all information');
      });
    }
  };

  return (
    <main className={`flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 ${latoBody.className}`}>
      <div className="w-full max-w-4xl">
        <div className="sm:flex justify-between space-y-3 items-center mb-8">
          <h1 className={`text-4xl sm:text-5xl font-bold ${latoBody.className}`}>
            meet <span className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600  ${latoHead.className}`}>metaeenfo.</span>
          </h1>

          <a href="https://buymeacoffee.com/sammy365"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit ml-auto items-center px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full hover:bg-yellow-300 transition-colors duration-300"
          >
            <FiCoffee className="mr-2" /> Buy me a coffee
          </a>
        </div>
        <p className="text-center text-gray-600 mb-8">
          AI-Powered Meta Information Generator. No More SEO Guesswork 🔮
        </p>

        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center mb-8">
          <input
            type="text"
            id="blogTitle"
            name="blogTitle"
            required
            placeholder="Enter your blog post title here"
            className="w-full sm:w-auto flex-grow py-3 px-4 mb-2 sm:mb-0 sm:mr-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 flex items-center justify-center shadow-md"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Optimizing...
              </>
            ) : (
              <>
                <FiZap className="mr-2" />
                SEO Boost
              </>
            )}
          </button>
        </form>

        {loading && <ShimmerEffect />}

        {!loading && result && (
          <div className="bg-white rounded-lg p-6 mb-8 w-full shadow-lg">
            <div className="flex flex-col sm:flex-row space-y-4 justify-between sm:items-center mb-4">
              <h2 className="text-2xl font-semibold">Generated Meta Information</h2>
              <div className="flex items-center">
                <span className="mr-2">SEO Score:</span>
                <span className={`font-bold ${result.seoScore >= 75 ? 'text-green-500' : result.seoScore >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {result.seoScore}/100
                </span>
              </div>

              <button
                onClick={copyAllToClipboard}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center w-fit"
              >
                <FiCopy className="mr-2" /> Copy All
              </button>
            </div>
            <div className="space-y-6">
              <MetaInfoCard
                title="Meta Title"
                content={result.metaTitle}
                characterCount={result.metaTitle.length}
                maxCharacters={60}
                onCopy={() => copyToClipboard(result.metaTitle, 'Meta Title')}
              />
              <MetaInfoCard
                title="Meta Description"
                content={result.metaDescription}
                characterCount={result.metaDescription.length}
                maxCharacters={160}
                onCopy={() => copyToClipboard(result.metaDescription, 'Meta Description')}
              />
              <div>
                <h3 className="font-medium text-gray-700 mb-2">SEO Keywords:</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {result.seoKeywords.map((keyword, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => copyToClipboard(result.seoKeywords.join(', '), 'SEO Keywords')}
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-300 flex items-center"
                >
                  <FiCopy className="mr-1" /> Copy Keywords
                </button>
              </div>
              <MetaInfoCard
                title="URL Slug"
                content={result.urlSlug}
                onCopy={() => copyToClipboard(result.urlSlug, 'URL Slug')}
                footer={
                  <p className="text-sm text-gray-500 mt-1">
                    Preview: https://yourdomain.com/<span className="font-semibold">{result.urlSlug}</span>
                  </p>
                }
              />
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </main >
  );
}

