import {
  DashboardClientLatestTransaction,
  DashboardDTO,
} from '@dtos/dashboard';

export class ApiService {
  private baseURL =
    'https://run.mocky.io/v3/d4a79840-93c0-4297-80bb-108c279377a3';

  private defaultErrorMessage =
    'Ocorreu um erro, por favor tente novamente mais tarde.';

  private async request(): Promise<DashboardDTO> {
    const response = await fetch(this.baseURL);

    if (!response.ok) {
      throw new Error(this.defaultErrorMessage);
    }

    const data = await response.json();
    return data;
  }

  async fetch(): Promise<DashboardDTO> {
    const requestData = await this.request();
    return requestData;
  }

  private paginateData(
    page: number,
    dashboardData: DashboardDTO,
  ): DashboardClientLatestTransaction[] {
    const clients = dashboardData.data.clients_summary;
    const transactions: DashboardClientLatestTransaction[] = [];

    clients.forEach((client) => {
      const clientTransactions = client.latest_transactions;
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      transactions.push(...clientTransactions.slice(startIndex, endIndex));
    });

    return transactions;
  }

  async fetchPaginated(
    page: number,
  ): Promise<DashboardClientLatestTransaction[]> {
    const requestData = await this.request();
    const paginateData = this.paginateData(page, requestData);

    return paginateData;
  }

  private searchData(
    search: string,
    dashboardData: DashboardDTO,
  ): DashboardClientLatestTransaction[] {
    const clients = dashboardData.data.clients_summary;
    const index = clients.findIndex((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (index === -1) {
      return [];
    }

    return clients[index].latest_transactions;
  }

  async fetchSearching(
    search: string,
  ): Promise<DashboardClientLatestTransaction[]> {
    const requestData = await this.request();
    const searchData = this.searchData(search, requestData);

    return searchData;
  }
}
