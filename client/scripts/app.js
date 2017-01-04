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
      app.getChatterbox(data);
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
      app.getChatterbox(data);
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
  $('#chats').prepend($message);
};

app.renderRoom = function (room) {
  var $room = $('<option></option>').val(room);
  $room.text(room);
  $('#roomSelect').append($room);
};

app.getChatterbox = function (data) {
  var index = 0;
  var roomObj = {};
  app.clearMessages();
  $('#roomSelect').html('<option value="allRooms">All Rooms</option>');
  while (index < data.results.length) {
    var $userName = $('<div class="username"></div>').text(data.results[index].username);
    var $message = $('<div></div>').text(data.results[index].text);
    $('#chats').append($userName);
    $('#chats').append($message);
    var roomName = data.results[index].roomname;
    roomObj[roomName] = roomName;
    index++;
  }
  for (var key in roomObj) {
    app.renderRoom(roomObj[key]);
  }
};

app.getRoomData = function (room) {
  app.clearMessages();
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message posted', data);
      var index = 0;
      while (index < data.results.length) {
        if (data.results[index].roomname === room) {
          var message = data.results[index].text;
          var $message = $('<div></div>');
          $message.text(data.results[index].username + ': ' + message);
          $('#chats').append($message);
        }
        index++;
      }
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to post message', data);
    }
  });

};

//handleUserClick method here
app.handleUsernameClick = function () {
  var username = event.target.innerText;
  console.log('hello');
  $('.username').each(function() {
    if (this.innerText === username) {
      $(this).toggleClass('friend');
    }
  });
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
    app.renderMessage(message.username + ': ' + message.text);
    app.renderRoom(message.roomname);
  });

  $('.refreshMessages').on('click', app.fetch);
  //i think we need to also call app.renderRoom here so we can get the rooms from other users' message

  $('.clearChat').on('click', app.clearMessages);

  $('.go').click(function() {
    var room = $('#roomSelect option:selected').text();
    app.getRoomData(room);

  });

  $('#chats').click('.username', app.handleUsernameClick);

});

