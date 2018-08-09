'use strict';
(function () {
  /* константы */
  var SIZE = {
    WIDTH: 400,
    HEIGHT: 400,
    WIN: 8
  };
  var HINT = {
    BURN: {
      hint: 'Урааа!',
      distance: 10
    },
    VERY_HOT: {
      hint: 'Очень горячо',
      distance: 20
    },
    HOT: {
      hint: 'Горячо',
      distance: 40
    },
    HAET: {
      hint: 'Тепло',
      distance: 80
    },
    COLD: {
      hint: 'Холодно',
      distance: 160
    },
    VERY_COLD: {
      hint: 'Очень холодно',
      distance: 320
    },
    FREEZE: {
      hint: 'Замерзнешь!',
      distance: 400
    }
  };
  var CLICK = {
    OTHER: 1,
    MAX: 25
  };

  /* переменые */
  var clicks = 1;
  /* получаем случайное значение */
  var getRandomNumber = function (size) {
    return Math.floor(Math.random() * size);
  };
  /* координаты клада */
  var target = {
    x: getRandomNumber(SIZE.WIDTH),
    y: getRandomNumber(SIZE.HEIGHT)
  };
  /* расстояние от клика до клада */
  var getDistance = function (evt, targ) {
    var diffX = evt.offsetX - targ.x;
    var diffY = evt.offsetY - targ.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
  };
  /* подсказки */
  var getDistanceHint = function (distance) {
    if (distance < HINT.BURN.distance) {
      return HINT.BURN.hint;
    } else if (distance < HINT.VERY_HOT.distance) {
      return HINT.VERY_HOT.hint;
    } else if (distance < HINT.HOT.distance) {
      return HINT.HOT.hint;
    } else if (distance < HINT.HAET.distance) {
      return HINT.HAET.hint;
    } else if (distance < HINT.COLD.distance) {
      return HINT.COLD.hint;
    } else if (distance < HINT.VERY_COLD.distance) {
      return HINT.VERY_COLD.hint;
    }
    return HINT.FREEZE.hint;
  };

  var onResultClick = function (evt) {
    clicks++;
    var distance = getDistance(evt, target);
    var distanceHint = getDistanceHint(distance);
    $('.hint').text(distanceHint);
    $('.end-game').text('Твоя удача не вечна, осталось кликов: ' + (CLICK.MAX - clicks + CLICK.OTHER));
    if (distance < SIZE.WIN) {
      $('.end-game').text('Клад найден! Сделано кликов: ' + clicks);
      $('.map').off('click.onMap');
    }
    if (clicks > CLICK.MAX) {
      $('.hint').text('');
      $('.end-game').text('GAME OVER');
      $('.map').off('click.onMap');
    }
  };
  /* обработка кликов */
  $('.map').on('click.onMap', onResultClick);

})();
