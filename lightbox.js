/* eslint-disable no-var, no-unused-vars*/
var myCss = {
  'width': '480px',
  'height': '270px',
  'margin': '175px auto',
  'background-color': '#67c2b4',
  'border': '3px solid black',
  'border-radius': '7px',
  'opacity': '0.75',
  'border-radius': '15px',
};
var myCss2 = {
  'width': '471px',
  'height': '265px',
  'margin': '175px auto',
  'background-color': '#67c2b4',
  'border': '3px solid black',
  'border-radius': '7px',
  'opacity': '1',
  'border-radius': '15px',
};
var closeButton = document.createElement('input');
$(closeButton).attr({
  type: 'button',
  value: 'Close',
  class: 'button',
});
var playAgainButton = document.createElement('input');
$(playAgainButton).attr({
  type: 'button',
  value: 'Play Again',
  class: 'button',
});
/**
 *@param {string} myInputText - 'Won' or 'Lost'
 *@return {void}
 */
function lightbox(myInputText) {
  var containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  var popUpDiv = document.createElement('div');
  popUpDiv.classList.add('popup');
  containerDiv.appendChild(popUpDiv);
  $('body').append(containerDiv);
  $('.popup').animate(myCss, 200).animate(myCss2, 50);
  $('.popup').append('<p>You\'ve ' + myInputText + '</p>');
  $('.popup').append(playAgainButton).append(closeButton);
  $(playAgainButton).on('click', function(arguments) {
    location.reload();
  });
  $(closeButton).on('click', function(arguments) {
    window.close();
  });
}
