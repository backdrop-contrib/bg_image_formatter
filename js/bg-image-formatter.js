(function ($) {

  'use strict';

  Backdrop.behaviors.bgImageFormatter = {
    attach: function (context, settings) {
      var selectors = settings.bg_image_formatter.selectors;
      for (let i = 0; i < selectors.length; i++) {
        var element = document.querySelector(selectors[i]);
        var style = getComputedStyle(element).backgroundColor;
        if (style.indexOf('rgba') === 0) {
          // We define rgb, so if it's rgba, no background color was set.
          continue;
        }
        var rgb = style.substring(style.indexOf('(') + 1, style.length - 1).split(', ');
        var avg = (Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2])) / 3;

        if (avg > 128) {
          element.classList.add('bg-color-light');
        }
        else {
          element.classList.add('bg-color-dark');
        }
      }
    }
  }

})(jQuery);
