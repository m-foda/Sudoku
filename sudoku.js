/* eslint-env jquery-3 */
/* eslint-disable no-var, no-unused-vars, max-len, require-jsdoc*/
$.fn.extend({
  highlight: function() {
    this.css({
      'border': '3px solid #f7B733',
      'box-shadow': 'rgb(252, 74, 27) 2px 2px 10px inset, rgb(252, 74, 27) -2px -2px 10px inset',
    });
    this.addClass('scaledUp');
  },
  unhighlight: function() {
    this.css({
      'border': '3px solid black',
      'box-shadow': 'none',
    });
    this.removeClass('scaledUp');
  },
});
minutes = 2;
seconds = 0;

function random(jQuerySelection, lengthOfArray) {
  return jQuerySelection[Math.floor(Math.random() * (lengthOfArray - 1))];
};
/* Window OnLoad Event Listener */
$(function() {
  /* Randomly fill 4 boxes*/
  var allBoxes = $('td');
  for (var i = 0; i < 4; i++) {
    randomItem = $(random(allBoxes, allBoxes.length));
    allBoxes = allBoxes.not(randomItem).not(randomItem.siblings()).not('.' + randomItem.attr('class'));
    randomItem.text(i + 1).addClass('readOnly');
  }
  /* Select all Boxes again for later checking*/
  allBoxes = $('td');
  /* Initialize Timer */
  var intervalID = setInterval('$(\'.timerDiv\').text(timer())', 1000);
  /* Initialize Timeout Action*/
  var timeoutID = window.setTimeout(function() {
    if (checkWin() === false) {
      window.clearInterval(intervalID);
      lightbox('Lost');
      // location.reload();
    }
  }, 120001);
  /* Get Current Position*/
  currentPosition = $('td:first');
  currentPosition.highlight();
  /* Main Event Handler */
  $('body').on('keyup', function(myKeyUpEvent) {
    /* Navigation */
    switch (myKeyUpEvent.which) {
      case 37: // left
        currentPosition.unhighlight();
        if (currentPosition.prev().length === 0) {
          currentPosition = currentPosition.parent().children(':last');
        } else {
          currentPosition = currentPosition.prev();
        }
        currentPosition.highlight();
        break;
      case 38: // up
        currentPosition.unhighlight();
        currentColumn = $('.' + parseInt(currentPosition.attr('class')));
        if (currentColumn.index(currentPosition) === 0) {
          currentPosition = $(currentColumn[3]);
        } else {
          currentPosition = $(currentColumn[currentColumn.index(currentPosition) - 1]);
        }
        currentPosition.highlight();
        break;
      case 39: // right
        currentPosition.unhighlight();
        if (currentPosition.next().length === 0) {
          currentPosition = currentPosition.parent().children(':first');
        } else {
          currentPosition = currentPosition.next();
        }
        currentPosition.highlight();
        break;
      case 40: // down
        currentPosition.unhighlight();
        currentColumn = $('.' + parseInt(currentPosition.attr('class')));
        if (currentColumn.index(currentPosition) === 3) {
          currentPosition = $(currentColumn[0]);
        } else {
          currentPosition = $(currentColumn[currentColumn.index(currentPosition) + 1]);
        }
        currentPosition.highlight();
        break;
    }
    /* Input */
    if (myKeyUpEvent.which >= 97 && myKeyUpEvent.which <= 100 && !currentPosition.hasClass('readOnly')) {
      currentPosition.text(myKeyUpEvent.key);
    }
    if (myKeyUpEvent.which >= 49 && myKeyUpEvent.which <= 52 && !currentPosition.hasClass('readOnly')) {
      currentPosition.text(myKeyUpEvent.key);
    }
    /* Check if all boxes are filled*/
    if ($('td:empty').length == 0) {
      console.log('Boxes Filled');
      if (checkWin() === true) {
        window.clearInterval(intervalID);
        lightbox('Won');
        // location.reload();
      }
    }
  });
});
/* Timer Function */
function timer() {
  /* The following code is the logic of the timer */
  if (minutes) {
    if (seconds) {
      seconds--;
    } else {
      minutes--;
      seconds = 59;
    }
  } else if (seconds) {
    seconds--;
  }
  if (!minutes && seconds && seconds < 10) {
    $('.timerDiv').css({
      'color': 'red',
    });
    beep();
  }
  /* The following code is just formatting for the output */
  if (seconds == 0 && minutes == 0) {
    return '00:00';
  } else if (minutes >= 10 && seconds >= 10) {
    returnArray = [minutes.toString(), ':', seconds.toString()];
    return returnArray.join('');
  } else if (seconds >= 10 && minutes < 10) {
    returnArray = ['0', minutes.toString(), ':', seconds.toString()];
    return returnArray.join('');
  } else if (minutes >= 10 && seconds < 10) {
    returnArray = [minutes.toString(), ':0', seconds.toString()];
    return returnArray.join('');
  } else if (minutes < 10 && seconds < 10) {
    returnArray = ['0', minutes.toString(), ':0', seconds.toString()];
    return returnArray.join('');
  }
};
/* Check on win */
function checkWin() {
  /* Check on rows*/
  $('tr').each(function(index, el) {
    sum = 0;
    $(el).children().each(function(index, el) {
      if (parseInt($(el).text())) {
        sum += parseInt($(el).text());
      }
    });
    if (sum != 10) {
      return false;
    }
  });
  /* Check on columns*/
  if (sum == 10) {
    for (var i = 0; i < 4; i++) {
      sum = 0;
      $('tr td:nth-child(' + (i + 1) + ')').each(function(index, el) {
        if (parseInt($(el).text())) {
          sum += parseInt($(el).text());
        }
      });
      if (sum != 10) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}

function beep() {
  var snd = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
  snd.play();
}
