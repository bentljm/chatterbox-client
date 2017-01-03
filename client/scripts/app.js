// // YOUR CODE HERE:
window.app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
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
};


app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function () {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message posted', data);
      var index = 0;
      $('#chats').text('');
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
};

app.clearMessages = function() {
  $('#chats').text('');
};

app.renderMessage = function (message) {
  var $message = $('<div></div>');
  $message.text(message);
  $('#chats').append($message);
};

$(document).ready(function() {
  app.init();

  $('.newMessage').on('click', function() {
    var message = {
      username: escape(prompt('Enter your username:')),
      text: escape(prompt('Enter your message:')),
      roomname: escape(prompt('What room would you like to post to?'))
    };
    app.send(message);
    app.renderMessage(message);
  });

  $('.refreshMessages').on('click', app.fetch);

  $('.clearChat').on('click', app.clearMessages);

});

