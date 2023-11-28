// Client facing scripts here

/**
 * This functions searches for keywords in the task description to see if the category can be determined.
 * @param {string} taskDescription 
 * @returns A string containing the task category, if found, or undefined, if not.
 */
const checkForCategoryKeywords = (taskDescription) => {
  const keywordMapping = {
    1: ['eat', 'dine', 'food', 'take-out', 'cook', 'restaurant', 'meal'],
    2: ['watch', 'movie', 'tv show', 'episode', 'stream', 'series', 'film'],
    3: ['read', 'author', 'book', 'novel', 'literature', 'textbook'],
    4: ['buy', 'shop', 'purchase', 'order']
  };

  for (const categoryId in keywordMapping) {
    const keywords = keywordMapping[categoryID];

    for (const keyword of keywords) {
      if (taskDescription.toLowerCase().includes(keyword)) {
        return Number(categoryId);
      }
    }
  }

  return undefined;
};


//Apply code once document is ready

$(document).ready(function () {
  //Hide error element
  $("#error").hide().empty();

  // loadList();

  const createListElement = function (task) {
    //Create hard coded list items
    const $task = $(`<article>
      <div class="list-container">
        <div class="left-column">
          <% if("isChecked"==="isChecked" ){ %>
            <i class="fa-regular fa-square-check fa-2xl"></i>
            <% } else{ %>
              <i class="fa-regular fa-square fa-2xl"></i>
              <% } %>
                <i class="fa-solid ${task.content.icon} fa-2xl"></i>
                <p>${escape(task.content.text)}</p>
        </div>
        <div class="right-column">
          <div class="editIcons">
            <% if("error"==="error" ){ %>
              <i class="fa-solid fa-exclamation fa-2xl"></i>
              <% } %>
                <i class="fa-solid fa-pen-to-square fa-2xl"></i>
                <i class="fa-solid fa-trash-can fa-2xl"></i>
          </div>
          <div class="timestamp">
            <p>${timeago.format(task.created_at)}</p>
          </div>
        </div>
      </div>
    </article>`);
    return $task;
  };
});

$(".list-header i").click(function () {
  $(".list-header i").removeClass("isActive");
  $(this).addClass("isActive");
});
