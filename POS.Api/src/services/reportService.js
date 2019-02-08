import ReportRepository from "../repositories/reportRepository";

let reportRepository = new ReportRepository();

export default class ReportService {
  getIncomeByInvoice(params) {
    return reportRepository.getIncomeByInvoice(params);  
  }

  getIncomeByCustomer(params) {
    return reportRepository.getIncomeByCustomer(params);
  }
}
