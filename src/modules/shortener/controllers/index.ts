import { IShortenerData, IUrlShortenerService } from "../interfaces";

export default class UrlShortenerController {
  constructor(
    protected data: IShortenerData,
    protected shortenerService: IUrlShortenerService
  ) {}

  async execute(): Promise<any> {
    try {
      return await this.shortenerService.shorten(this.data);
    } catch (error) {
      throw error;
    }
  }
}