//Apply code once document is ready
$(document).ready(function() {
  //Hide error element
  $("#error").hide().empty();

  loadList();

 const createListElement = function(tweet) {
    //Create hard coded tweets
    const $tweet = $(`<article>
          <div class = 'item-container'>
          <div>
        </article>`);
    return $tweet;
  };