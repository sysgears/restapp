import React, { useState } from 'react';

import { Button } from '@restapp/look-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import { downloadFile, getObjectURLFromArray } from '../../common';
import { connect } from 'react-redux';
import GET_EXCEL from '../actions';

interface DownloadReportProps {
  t: TranslateFunction;
  getExcel: () => Promise<any>;
}

const DownloadReport = ({ t, getExcel }: DownloadReportProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const download = async () => {
    setIsLoading(true);
    const data = await getExcel();
    const url = getObjectURLFromArray(data);
    downloadFile(url, 'Report.xlsx');
    setIsLoading(false);
  };

  return (
    <Button className="no-print" disabled={isLoading} style={{ marginLeft: '10px' }} onClick={download}>
      {t('downloadExcel')}
    </Button>
  );
};

export default connect(
  null,
  { getExcel: GET_EXCEL }
)(translate('ExcelReport')(DownloadReport));
