"use client";
import React from 'react';
import { subDays, format } from "date-fns";

const aggregatePosts = (posts, days) => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);

  const filteredPosts = posts.filter(post => {
    const postDate = new Date(post.createdAt);
    return postDate >= startDate && postDate <= endDate;
  });

  const aggregatedData = Array.from({ length: days }, (_, i) => ({
    name: format(subDays(endDate, i), "EEE"),
    post: 0,
    views: 0,
    comments: 0,
  })).reverse();

  filteredPosts.forEach(post => {
    const postDate = new Date(post.createdAt);
    const dayIndex = days - 1 - Math.floor((endDate - postDate) / (1000 * 60 * 60 * 24));

    if (dayIndex >= 0 && dayIndex < days) {
      aggregatedData[dayIndex].post += 1;
      aggregatedData[dayIndex].views += post.views || 0;
      aggregatedData[dayIndex].comments += (post.comments && post.comments.length) || 0;
    }
  });

  return aggregatedData;
};

export default aggregatePosts;