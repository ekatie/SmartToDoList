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
$(document).ready(function() {
  //Hide error element
  $("#error").hide().empty();
  $("#addTask").hide();

  $(".list-header i").click(function() {
    $(".list-header i").removeClass("isActive");
    $(this).addClass("isActive");
  });

  $("#addTaskButton").click(function() {
    $("#addTask").show();
    $("#addTaskButton").hide();
  });

  // New task form submitted
  $('#new-task').on('submit', function(event) {
    onSubmit(event);
  });

  loadTasks();
});


/**
 * This function handles form submission for new tasks. After successfully posting a new task, it loads the updated tasks.
 * @param {object} event - The event object generated by the form submission.
 */
const onSubmit = function(event) {
  event.preventDefault();
  const taskData = $('#new-task').serialize();

  // Trim the task content to remove leading and trailing spaces
  const trimmedTask = $('#task-text').val().trim();

  // No content entered
  if (!trimmedTask) {
    $('#error').text("Please enter a task.");
    $('#error').slideDown({
      start: function() {
        $('#error').css('display', 'flex');
      }
    });
    return;
  }

  // Clear text input field, remove errors
  $('#new-task')[0].reset();
  $('.error').slideUp();

  $.post('/tasks', taskData)
    .then(() => {
      loadTasks();
    })
    .catch((error) => {
      $('#error').text("Oops! An error occurred while adding your task.");
      $('#error').slideDown();
    });
};

/**
* This function creates a task element from an object containing task data.
* @param {object} taskData - Object containing task data.
* @returns - Task element
*/
const createTaskElement = function(taskData) {
  // const taskContent = escape(taskData.content.text);

  const createdDate = new Date(taskData.created_date);
  const completedDate = new Date(taskData.completed_date);

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const $task = `
 <article>
  <div class="list-container">
    <div class="left-column">
      <form action="/tasks/:id" method="POST">
      <input type="checkbox" name="is_complete" class="checkbox" ${taskData.is_complete ? 'checked' : ''} />
    </form>
      ${icon}
      <p>${taskData.description}</p>
    </div>
    <div class="right-column">
      <div class="editIcons">
      ${taskData.due_date ? <p>Due: ${new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(taskData.due_date))}</p> : ''}
      ${taskData.is_priority ? '<i class="fa-solid fa-exclamation fa-2xl"></i>' : ''}
      <i class="fa-solid fa-pen-to-square fa-2xl"></i>
      <i class="fa-solid fa-trash-can fa-2xl"></i>
      </div>
      <div class="timestamp">
      ${!taskData.completed_date ? <p>Added: ${new Intl.DateTimeFormat('en-US', options).format(createdDate)}</p> : <p>Completed: ${new Intl.DateTimeFormat('en-US', options).format(completedDate)}</p>}
      </div>
    </div>
  </div>
  </article>
  `;
  return $task;
};

/**
 * This function takes in an array of task objects and uses jQuery to insert each task at the end of the #task-container section.
 * @param {?} tasks - Array of task objects.
 */
const renderTasks = function(tasks) {
  // Clear the container
  $('#list-container').empty();

  // Render all the tasks, including new ones
  tasks.forEach(task => {
    $('#list-container').prepend(createTaskElement(task));
  });
};

/**
 * This function loads the existing tasks.
 */
const loadTasks = function() {
  $.get('/tasks')
    .done((res) => {
      renderTasks(res);
    })
    .fail((error) => {
      $('#error').text('Oops! An error occurred while loading tasks.');
      $('#error').slideDown();
    });
};