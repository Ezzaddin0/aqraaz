// utils/fetchViewCount.js

const fetchViewCount = async (slug) => {
    try {
      const response = await fetch(`/api/posts/${slug}/views`);
      if (!response.ok) {
        throw new Error('Failed to fetch view count');
      }
      const data = await response.json();
      return data.viewCount;
    } catch (error) {
      console.error('Error fetching view count:', error);
      return null;
    }
  };
  
  export default fetchViewCount;  