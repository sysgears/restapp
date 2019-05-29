import { knex } from '@restapp/database-server-ts';

class ReportsDAO {
  public getReportData() {
    return knex
      .select('id', 'name', 'phone', 'email')
      .from('report')
      .orderBy('id', 'asc');
  }
}

const reportsDAO = new ReportsDAO();

export default reportsDAO;
