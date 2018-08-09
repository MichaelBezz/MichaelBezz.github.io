'use strict';
// модуль, который сортирует похожих волшебников //
(function () {

  var wizards = [];
  var newColorCoat;
  var newColorEyes;
  // система ранжирования по цвету плаща и глаз
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === newColorCoat) {
      rank += 2;
    }
    if (wizard.colorEyes === newColorEyes) {
      rank += 1;
    }
    return rank;
  };
  // дополнительний критерий по имени
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };
  // функция, которая сортирует волшебников
  var updateWizards = function () {
    window.createSimilarWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.setupWizard.wizard.onCoatChange = window.debounce(function (color) {
    newColorCoat = color;
    updateWizards();
  });

  window.setupWizard.wizard.onEyesChange = window.debounce(function (color) {
    newColorEyes = color;
    updateWizards();
  });

  // загрузка данных волшебников с сервера
  var getSimilarWizard = function (data) {
    wizards = data;
    updateWizards();
  };
  window.backend.load(getSimilarWizard);

})();
