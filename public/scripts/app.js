//Apply code once document is ready
$(document).ready(function() {
  //Hide error element
  $("#error").hide().empty();

  loadList();

 const createListElement = function(item) {
    //Create hard coded list items
    const $tweet = $(`<article>
          <div class = 'item-container'>
          <div>
        </article>`);
    return $tweet;
  };