import {
  DashboardClientLatestFormattedTransaction,
  DashboardDTO,
} from '@features/dashboard/types';

export class ApiService {
  private static baseURL =
    'https://run.mocky.io/v3/d4a79840-93c0-4297-80bb-108c279377a3';

  private static defaultErrorMessage =
    'Ocorreu um erro, por favor tente novamente mais tarde.';

  private static transactionsForPage = 6;

  private static async request(): Promise<DashboardDTO> {
    const response = await fetch(this.baseURL);

    if (!response.ok) {
      throw new Error(this.defaultErrorMessage);
    }

    const data = await response.json();
    return data;
  }

  public static async fetch(): Promise<DashboardDTO> {
    const requestData = await this.request();
    return requestData;
  }

  private static paginateTransactions(
    page: number,
    data: DashboardDTO,
  ): DashboardClientLatestFormattedTransaction[] {
    const clientsSummaryItems = data.data.clients_summary;
    const startIndex = (page - 1) * this.transactionsForPage;
    const endIndex = startIndex + this.transactionsForPage;
    const paginatedTransactions = clientsSummaryItems.slice(
      startIndex,
      endIndex,
    );

    const formattedTransactions: DashboardClientLatestFormattedTransaction[] =
      [];
    paginatedTransactions.forEach((transaction) => {
      if (transaction.latest_transactions.length > 0) {
        const latestTransaction = transaction.latest_transactions[0];
        formattedTransactions.push({
          clientName: transaction.name,
          date: latestTransaction.date,
          value: latestTransaction.value,
          type: latestTransaction.type,
        });
      }
    });

    return formattedTransactions;
  }

  public static async fetchPaginatedTransactions(
    page: number,
  ): Promise<DashboardClientLatestFormattedTransaction[]> {
    const requestData = await this.request();
    const paginatedTransactions = this.paginateTransactions(page, requestData);

    return paginatedTransactions;
  }

  private static searchClientTransactions(
    search: string,
    dashboardData: DashboardDTO,
  ): DashboardClientLatestFormattedTransaction[] {
    const clients = dashboardData.data.clients_summary;

    const index = clients.findIndex((item) => item.name === search);

    if (index === -1) {
      return dashboardData.data.clients_summary.flatMap((client) =>
        client.latest_transactions.map((item) => ({
          ...item,
          clientName: client.name,
        })),
      );
    }

    const client = clients[index];

    return client.latest_transactions.map((item) => ({
      ...item,
      clientName: client.name,
    }));
  }

  public static async fetchClientTransactions(
    search: string,
  ): Promise<DashboardClientLatestFormattedTransaction[]> {
    const requestData = await this.request();
    const searchData = this.searchClientTransactions(search, requestData);

    return searchData;
  }
}
