interface IUrlShortenerService {
  shorten(data: any): Promise<any>;
}

interface IShortenerData {
  url: string;
  token?: string;
  user_id?: string;
}

export { IUrlShortenerService, IShortenerData };
