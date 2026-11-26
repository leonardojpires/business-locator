import type { Business } from "../../domain/entities/business.domain.js";
import { IBusinessCrawler } from "../../infrastructure/crawlers/business.crawler.js";

export class BusinessCrawlerService {
    constructor(private businessCrawlerRepository: IBusinessCrawler) {
        this.businessCrawlerRepository = businessCrawlerRepository;
    }

    async crawl(url: string[]) {
        if (!url || url.length === 0) throw new Error("A URL is required to proceed with the crawling process.");

        const businesses = await this.businessCrawlerRepository.crawl(url);

        return businesses;
    }
}