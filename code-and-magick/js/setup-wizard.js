'use strict';
// модуль, который настраивает волшебника //
(function () {

  var WIZARD_COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var WIZARD_EYES_COLOR = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var WIZARD_FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var wizardCoat = window.setup.querySelector('.wizard-coat');
  var coatColor = window.setup.querySelector('[name="coat-color"]');
  var wizardEyes = window.setup.querySelector('.wizard-eyes');
  var eyesColor = window.setup.querySelector('[name="eyes-color"]');
  var setupFireballWrap = window.setup.querySelector('.setup-fireball-wrap');
  var fireballColor = window.setup.querySelector('[name="fireball-color"]');
  var wizard = {
    onCoatChange: function () {},
    onEyesChange: function () {}
  };

  // функция, которая возвращает случайный элемент массива
  var getRandomArrayElement = function (arr) {
    var randomNumber = Math.floor(Math.random() * (arr.length - 1));
    return arr[randomNumber];
  };
  // Изменение цвета мантии персонажа по нажатию
  var onChangeColorCoatClick = function () {
    var randomColorCoat = getRandomArrayElement(WIZARD_COAT_COLOR);
    wizardCoat.style.fill = randomColorCoat;
    coatColor.value = randomColorCoat;
    wizard.onCoatChange(randomColorCoat);
  };
  // Изменение цвета глаз персонажа по нажатию
  var onChangeColorEyesClick = function () {
    var randomColorEyes = getRandomArrayElement(WIZARD_EYES_COLOR);
    wizardEyes.style.fill = randomColorEyes;
    eyesColor.value = randomColorEyes;
    wizard.onEyesChange(randomColorEyes);
  };
  // Изменение цвета фаерболов по нажатию
  var onChangeColorFireballClick = function () {
    var randomFireball = getRandomArrayElement(WIZARD_FIREBALL_COLOR);
    setupFireballWrap.style.background = randomFireball;
    fireballColor.value = randomFireball;
  };

  var addLisinerChangeYourWizard = function () {
    wizardCoat.addEventListener('click', onChangeColorCoatClick);
    wizardEyes.addEventListener('click', onChangeColorEyesClick);
    setupFireballWrap.addEventListener('click', onChangeColorFireballClick);
  };

  var removeLisinerChangeYourWizard = function () {
    wizardCoat.removeEventListener('click', onChangeColorCoatClick);
    wizardEyes.removeEventListener('click', onChangeColorEyesClick);
    setupFireballWrap.removeEventListener('click', onChangeColorFireballClick);
  };

  window.setupWizard = {
    addLisinerChangeYourWizard: addLisinerChangeYourWizard,
    removeLisinerChangeYourWizard: removeLisinerChangeYourWizard,
    wizard: wizard
  };

})();
