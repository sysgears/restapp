import React, { useEffect, useState } from 'react';

import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { Table, Button } from '@restapp/look-client-react';
import { connect } from 'react-redux';
import GET_REPORT_DATA from '../actions';

interface ReportProps {
  t: TranslateFunction;
  reportData: any[];
  getReportData: () => Promise<any>;
}

interface Report {
  id: string;
  name: string;
  phone: string;
  email: string;
  typename?: string;
}

const Report = ({ t, reportData, getReportData }: ReportProps) => {
  const [isReady, setIsReady] = useState(false);
  const print = () => {
    window.print();
  };

  useEffect(() => {
    (async () => {
      if (!reportData.length) {
        await getReportData();
      }
      setIsReady(true);
    })();
  }, []);

  const columns = Object.keys(reportData.length && reportData[0]).map((name: string) => ({
    title: name,
    key: name,
    dataIndex: name
  }));

  return isReady ? (
    <>
      <Table dataSource={reportData} columns={columns} />
      <Button className="no-print" onClick={print}>
        {t('print')}
      </Button>
    </>
  ) : null;
};

export default connect(
  ({ reportData: { reportData } }: any) => ({
    reportData
  }),
  { getReportData: GET_REPORT_DATA }
)(translate('PrintReport')(Report));
