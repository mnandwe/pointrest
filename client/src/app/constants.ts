import {Style, Icon} from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';

export const MarkerStyle = {
    SELECTED: new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.FRACTION,
        src: 'https://upload.wikimedia.org/wikipedia/commons/archive/e/e3/20110723210132%21Green_Dot.svg'
      })
    }),
    UNSELECTED: new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.FRACTION,
        src: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Red_Dot.svg'
      })
    }),
  };

export const DEFAULT_CENTER = [-80.5197518, 43.4617921];