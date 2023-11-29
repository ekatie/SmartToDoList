/**
 * This functions searches for keywords in the task description to see if the category can be determined.
 * @param {string} taskDescription 
 * @returns A number containing the task category, if found, or undefined, if not.
 */
const checkForCategoryKeywords = (taskDescription) => {
  const keywordMapping = {
    1: ['eat', 'dine', 'food', 'take-out', 'cook', 'restaurant', 'meal'],
    2: ['read', 'author', 'book', 'novel', 'literature', 'textbook'],
    3: ['watch', 'movie', 'tv show', 'episode', 'stream', 'series', 'film'],
    4: ['buy', 'shop', 'purchase', 'order']
  };

  for (const categoryId in keywordMapping) {
    const keywords = keywordMapping[categoryId];

    for (const keyword of keywords) {
      if (taskDescription.toLowerCase().includes(keyword)) {
        return Number(categoryId);
      }
    }
  }

  return undefined;
};

module.exports = checkForCategoryKeywords;