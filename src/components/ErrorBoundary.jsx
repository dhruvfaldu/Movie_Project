import { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <h1>Something went wrong 😢</h1>
      </div>
    );
  }

  try {
    return children;
  } catch (error) {
    console.error(error);
    handleError();
  }
};

export default ErrorBoundary;