import React, { useState } from 'react';

import { Button } from '@restapp/look-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import { downloadFile, getObjectURLFromArray } from '../../common';
import { connect } from 'react-redux';
import GET_PDF from '../actions';

interface DownloadReportProps {
  t: TranslateFunction;
  getPdf: () => Promise<any>;
}

const DownloadReport = ({ t, getPdf }: DownloadReportProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const download = async () => {
    setIsLoading(true);
    const data = await getPdf();
    const url = getObjectURLFromArray(data);
    downloadFile(url, 'Report.pdf');
    setIsLoading(false);
  };

  return (
    <Button className="no-print" disabled={isLoading} style={{ marginLeft: '10px' }} onClick={download}>
      {t('downloadPdf')}
    </Button>
  );
};

export default connect(
  null,
  { getPdf: GET_PDF }
)(translate('PdfReport')(DownloadReport));
