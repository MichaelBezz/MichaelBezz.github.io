'use strict';
// модуль загрузки аватара волшебника //
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = window.setup.querySelector('.upload input[type=file]');
  var preview = window.setup.querySelector('.setup-user-pic');
  var avatar = document.querySelector('.setup-open-icon');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
        avatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    } else {
      window.backend.uploadDataMessageError('Аватарка формата: ' + FILE_TYPES.join(', '));
    }
  });
})();
