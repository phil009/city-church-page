"use client";

import { useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BibleReader() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  const refreshIframe = () => {
    setIsLoading(true);
    setError(false);
    // Force iframe reload by changing the key
    const iframe = document.getElementById("bible-iframe") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const openInNewTab = () => {
    window.open("https://www.bible.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      {/* <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Bible.com</h3>
          <div className="flex items-center gap-2">
            <Button
              onClick={refreshIframe}
              variant="ghost"
              size="sm"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              onClick={openInNewTab}
              variant="ghost"
              size="sm"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div> */}

      {/* Bible.com Iframe */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Bible.com...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6">
              <div className="text-red-500 mb-4">
                <svg
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Unable to load Bible.com
              </h4>
              <p className="text-gray-600 mb-4">
                The website may not allow embedding or there might be a
                connection issue.
              </p>
              <div className="space-y-2">
                <Button onClick={refreshIframe} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={openInNewTab} variant="default" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Bible.com
                </Button>
              </div>
            </div>
          </div>
        )}

        <iframe
          id="bible-iframe"
          src="https://www.bible.com/bible"
          className="w-full h-full border-0"
          onLoad={handleLoad}
          onError={handleError}
          title="Bible.com"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Footer Info */}
      {/* <div className="p-3 border-t bg-gray-50 text-xs text-gray-600">
        <div className="flex items-center justify-between">
          <span>Powered by Bible.com</span>
          <span>Access thousands of Bible versions and reading plans</span>
        </div>
      </div> */}
    </div>
  );
}
