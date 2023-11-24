// Client facing scripts here

/**
 * This functions searches for keywords in the task description to see if the category can be determined.
 * @param {string} taskDescription 
 * @returns A string containing the task category, if found, or undefined, if not.
 */
const checkForCategoryKeywords = (taskDescription) => {
  const keywordMapping = {
    'eat': 1,
    'read': 2,
    'watch': 3,
    'buy': 4
  };

  for (const keyword of Object.keys(keywordMapping)) {
    if (taskDescription.toLowerCase().includes(keyword)) {
      return keywordMapping[keyword];
    }
  }
};