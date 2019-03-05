import ReportRepository from "../repositories/reportRepository";

let reportRepository = new ReportRepository();

export default class ReportService {
  getIncomeByInvoice(params) {
    return reportRepository.getIncomeByInvoice(params);  
  }

  getIncomeSummaryByInvoice(params) {
    return reportRepository.getIncomeSummaryByInvoice(params);
  }

  getIncomeByCustomer(params) {
    return reportRepository.getIncomeByCustomer(params);
  }

  getIncomeSummaryByCustomer(params) {
    return reportRepository.getIncomeSummaryByCustomer(params);
  }
}
