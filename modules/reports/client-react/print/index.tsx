import React from 'react';

import resources from './locales';
import PrintReport from './containers/PrintReport';
import ReportModule from '../ReportModule';
import reducer from './reducers';

export default new ReportModule({
  reducer: [{ reportData: reducer }],
  localization: [{ ns: 'PrintReport', resources }],
  reportComponent: [<PrintReport />]
});
