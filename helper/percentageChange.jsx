export const calculatePercentageChange = (posts, period = 'monthly') => {
  const now = new Date();
  let currentStart, previousStart;

  switch (period) {
    case 'weekly':
      currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
      previousStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 7);
      break;
    case 'monthly':
      currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
      previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      break;
    case 'yearly':
      currentStart = new Date(now.getFullYear(), 0, 1);
      previousStart = new Date(now.getFullYear() - 1, 0, 1);
      break;
    default:
      throw new Error('Invalid period specified');
  }

  const currentViews = posts.reduce((total, post) => {
    const postDate = new Date(post.createdAt);
    return postDate >= currentStart ? total + post.views : total;
  }, 0);

  const previousViews = posts.reduce((total, post) => {
    const postDate = new Date(post.createdAt);
    return postDate >= previousStart && postDate < currentStart ? total + post.views : total;
  }, 0);

  const percentageChange = previousViews === 0
    ? 0
    : ((currentViews - previousViews) / previousViews) * 100;

  return percentageChange.toFixed(2);
};