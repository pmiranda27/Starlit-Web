import React from "react";
import "./SkeletonLoadPosts.css";

export const SkeletonPostLoader = () => {
  return (
    <div className="skeleton-post">
      <div className="skeleton-banner"></div>
      <div className="skeleton-details">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line long"></div>
      </div>
    </div>
  );
};