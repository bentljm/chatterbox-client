// // YOUR CODE HERE:
$(document).ready(function() {

  // var message = {
  //   username: 'cats',
  //   text: 'meowmeowmeowmeowmeow',
  //   roomname: 'room full of cats'
  // };

  // $.ajax({
  //   // This is the url you should use to communicate with the parse API server.
  //   url: 'https://api.parse.com/1/classes/messages',
  //   type: 'POST',
  //   data: JSON.stringify(message),
  //   contentType: 'application/json',
  //   success: function (data) {
  //     console.log('chatterbox: Message sent');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to send message', data);
  //   }
  // });

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message posted', data);
      var index = 0;
      while (index < data.results.length) {
        var message = data.results[index].text;
        var $message = $('<div></div>');
        $message.text(data.results[index].username + ': ' + message);
        $('#chats').append($message);
        index++;
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error

      console.error('chatterbox: Failed to post message', data);
    }

  });

  $('.newMessage').on('click', function () {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message posted', data);
        var index = 0;
        while (index < data.results.length) {
          var message = data.results[index].text;
          var $message = $('<div></div>');
          $message.text(data.results[index].username + ': ' + message);
          $('#chats').append($message);
          index++;
        }
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error

        console.error('chatterbox: Failed to post message', data);
      }

    });
  });

});


