(function ($) {
  'use strict';

  Backdrop.behaviors.bgImageFormatter = {
    attach: function (context, settings) {
      if (!settings.bg_image_formatter || !settings.bg_image_formatter.selectors) {
        return;
      }

      const selectors = settings.bg_image_formatter.selectors;
      for (let i = 0; i < selectors.length; i++) {
        const element = document.querySelector(selectors[i]);
        if (!element) {
          // No such element, nothing to do.
          continue;
        }

        const style = getComputedStyle(element).backgroundColor;
        if (style.indexOf('rgba') === 0) {
          // We define rgb, so if it's rgba, no background color was set.
          continue;
        }

        const rgb = style.substring(style.indexOf('(') + 1, style.length - 1).split(', ');
        const avg = (Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2])) / 3;
        if (avg > 128) {
          element.classList.add('bg-color-light');
        }
        else {
          element.classList.add('bg-color-dark');
        }
      }
    }
  };

})(jQuery);
