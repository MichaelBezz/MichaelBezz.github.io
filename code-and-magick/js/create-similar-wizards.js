'use strict';
// модуль, который создает похожих волшебников //
(function () {

  var WIZARD_NUMBER = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizards = document.querySelector('.setup-similar');
  similarWizards.classList.remove('hidden');
  // находим шаблон для волшебников
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  // функция, которая прописывает свойства волшебника в шаблон
  var renderWizard = function (item) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = item.name;
    wizardElement.querySelector('.wizard-coat').style.fill = item.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = item.colorEyes;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  var createSimilarWizards = function (data) {
    var takeNumber = data.length > WIZARD_NUMBER ? WIZARD_NUMBER : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.createSimilarWizards = createSimilarWizards;

})();
