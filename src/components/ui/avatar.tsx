import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "User Avatar", className = "" }) => {
  return (
    <div className={`h-10 w-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center ${className}`}>
      {src ? (
        <AvatarImage src={src} alt={alt} />
      ) : (
        <AvatarFallback />
      )}
    </div>
  );
};

const AvatarImage: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => (
  <img src={src} alt={alt} className="h-full w-full object-cover" />
);

const AvatarFallback: React.FC = () => (
  <span className="text-gray-600 text-sm font-semibold">?</span>
);

export { Avatar, AvatarImage, AvatarFallback };
