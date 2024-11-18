interface IUrlShortenerService {
  shorten(data: any): Promise<any>;
}

interface IShortenerData {
  url: string;
  info_user?: any;
}

export { IUrlShortenerService, IShortenerData };
