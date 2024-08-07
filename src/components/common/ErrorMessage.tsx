import React from 'react';

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-red-500 text-center p-4">Error: {message}</div>
);

export default ErrorMessage;
