'use strict';
// модуль, который отвечает за окно настрийки персонажа //
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SETUP_TOP = '80px';
  var SETUP_LEFT = '50%';

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');

  // функция, для обработки события открытия
  var onSetupWindowOpenClick = function () {
    setup.classList.remove('hidden');
    form.addEventListener('submit', onSaveDataSubmit);
    setupClose.addEventListener('click', onSetupWindowCloseClick);
    setupClose.addEventListener('keydown', onSetupCloseEnterKeydown);
    setupUserName.addEventListener('keydown', onFocusUserNameKeydown);
    window.dialog.dialogHandler.addEventListener('mousedown', window.dialog.onMoveSetupMousedown);
    window.setupWizard.addLisinerChangeYourWizard();
    document.addEventListener('keydown', onEscKeydown);
  };
  // функция, для обработки события закрытия
  var onSetupWindowCloseClick = function () {
    setup.classList.add('hidden');
    form.removeEventListener('submit', onSaveDataSubmit);
    setupClose.removeEventListener('click', onSetupWindowCloseClick);
    setupClose.removeEventListener('keydown', onSetupCloseEnterKeydown);
    setupUserName.removeEventListener('keydown', onFocusUserNameKeydown);
    window.dialog.dialogHandler.removeEventListener('mousedown', window.dialog.onMoveSetupMousedown);
    window.setupWizard.removeLisinerChangeYourWizard();
    setup.style.top = SETUP_TOP;
    setup.style.left = SETUP_LEFT;
    document.removeEventListener('keydown', onEscKeydown);
  };


  // функция, для обработки события по нажатию на esc
  var onEscKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onSetupWindowCloseClick();
    }
  };
  // функция, для обработки события по нажатию на enter
  var onEnterKeydown = function (evt, callback) {
    if (evt.keyCode === ENTER_KEYCODE) {
      callback();
    }
  };

  // обработчик, который закрывает по нажатию на enter
  var onSetupCloseEnterKeydown = function (evt) {
    onEnterKeydown(evt, onSetupWindowCloseClick);
  };
  // Если фокус находится на форме ввода имени, то окно закрываться не должно
  var onFocusUserNameKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  // обработчик, который открывает по нажатию на enter настройку персонажа
  setupOpen.addEventListener('keydown', function (evt) {
    onEnterKeydown(evt, onSetupWindowOpenClick);
  });
  // обработчик, который открывает по клику настройку персонажа
  setupOpen.addEventListener('click', onSetupWindowOpenClick);

  // отправка данных на сервер
  var onSaveDataSubmit = function (evt) {
    window.backend.save(new FormData(form), onSetupWindowCloseClick);
    evt.preventDefault();
  };

  window.setup = setup;

})();
