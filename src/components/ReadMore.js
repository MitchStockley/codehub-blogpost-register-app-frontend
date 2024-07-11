import React, { useState } from 'react';
import './ReadMore.css';

const ReadMore = ({ children, maxCharacterCount = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Ensure children is not null or undefined
  const text = children || '';
  const shouldTruncate = text.length > maxCharacterCount;

  return (
    <div className="read-more">
      {isExpanded || !shouldTruncate ? text : `${text.substring(0, maxCharacterCount)}...`}
      {shouldTruncate && (
        <span onClick={toggleReadMore} className="read-more-toggle">
          {isExpanded ? 'Read less' : 'Read more'}
        </span>
      )}
    </div>
  );
};

export default ReadMore;
