'use strict';
// модуль, который формирует статистику игры //
(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var TITLE_HEIGHT = 70;
  var TEXT_HEIGHT = 20;
  var TEXT_GAP = 30;
  var BAR_GAP = 50;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var textTitleX = CLOUD_X + TEXT_GAP;
  var textTitleY = CLOUD_Y + TEXT_GAP;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arrTimes) {
    var maxElement = arrTimes[0];
    arrTimes.forEach(function (item) {
      if (item > maxElement) {
        maxElement = item;
      }
    });
    return maxElement;
  };

  var renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', textTitleX, textTitleY);
    ctx.fillText('Список результатов:', textTitleX, textTitleY + TEXT_HEIGHT);

    var maxTime = getMaxElement(times);

    players.forEach(function (item, i) {
      var playerBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
      var barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
      var barY = CLOUD_Y + GAP + TITLE_HEIGHT + (BAR_HEIGHT - playerBarHeight);

      ctx.fillStyle = '#000';
      ctx.fillText(item, barX, CLOUD_HEIGHT - GAP);
      ctx.fillText(Math.round(times[i]), barX, barY - GAP);

      if (item === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        var changeColor = Math.random();
        if (changeColor <= 0) {
          changeColor = 0.5;
        }
        var colorPlayer = 'rgba(0, 21, 255, ' + changeColor + ')';
        ctx.fillStyle = colorPlayer;
      }

      ctx.fillRect(barX, barY, BAR_WIDTH, playerBarHeight);

    });
  };

  window.renderStatistics = renderStatistics;

})();
