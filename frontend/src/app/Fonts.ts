import { useLayoutEffect } from 'react';

export const Fonts = () => {
  useLayoutEffect(() => {
    const titilliumWebRegular = new FontFace(
      'Titillium Web',
      `url(${require('./fonts/Titillium_Web/TitilliumWeb-Regular.ttf')})`
    );
    const titilliumWebBold = new FontFace(
      'Titillium Web',
      `url(${require('./fonts/Titillium_Web/TitilliumWeb-Bold.ttf')})`,
      { weight: 'bold' }
    );
    const titilliumWebItalic = new FontFace(
      'Titillium Web',
      `url(${require('./fonts/Titillium_Web/TitilliumWeb-Italic.ttf')})`,
      { style: 'italic' }
    );
    const duneRiseFont = new FontFace(
      'Dune Rise',
      `url(${require('./fonts/dune_rise/Dune_Rise.ttf')})`
    );

    Promise.all([
      titilliumWebRegular.load(),
      titilliumWebBold.load(),
      titilliumWebItalic.load(),
      duneRiseFont.load(),
    ]).then(() => {
      document.fonts.add(titilliumWebRegular);
      document.fonts.add(titilliumWebBold);
      document.fonts.add(titilliumWebItalic);
      document.fonts.add(duneRiseFont);
    });

    return () => {
      document.fonts.delete(titilliumWebRegular);
      document.fonts.delete(titilliumWebBold);
      document.fonts.delete(titilliumWebItalic);
      document.fonts.delete(duneRiseFont);
    };
  }, []);
};
