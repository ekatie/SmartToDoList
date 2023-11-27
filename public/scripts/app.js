//Apply code once document is ready
$(document).ready(function() {
  //Hide error element
  $("#error").hide().empty();

  loadList();

 const createListElement = function(item) {
    //Create hard coded list items
    const $tweet = $(`<article>
      <div class="list-container">
        <div class="left-column">
          <% if("isChecked"==="isChecked" ){ %>
            <i class="fa-regular fa-square-check fa-2xl"></i>
            <% } else{ %>
              <i class="fa-regular fa-square fa-2xl"></i>
              <% } %>
                <i class="fa-solid ${item.content.icon} fa-2xl"></i>
                <p>${escape(item.content.text)}</p>
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
            <p>${timeago.format(item.created_at)}</p>
          </div>
        </div>
      </div>
    </article>`);
    return $tweet;
  };
});