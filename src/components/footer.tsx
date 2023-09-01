import React from "react";

interface props {}

const Footer: React.FC<props> = () => {
  return (
    <footer className="flex items-center justify-center h-20 py-4">
      <span>©2023 Justransform - All Rights Reserved.</span>
    </footer>
  );
};

export default React.memo(Footer);
