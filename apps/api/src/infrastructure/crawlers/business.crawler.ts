import { log, PlaywrightCrawler } from "crawlee";
import { router } from "./routes.crawler.js";

// log.setLevel(log.LEVELS.DEBUG);

// log.debug('Setting up Crawler...');

export interface IBusinessCrawler {
    crawl(url: string[]): Promise<void>
}

export class BusinessCrawler {
    private readonly crawler: PlaywrightCrawler;

    constructor() {
        this.crawler = new PlaywrightCrawler({
            requestHandler: router,
            maxRequestsPerCrawl: 10
        });
    }

    async crawl(url: string[]) {
        await this.crawler.run(url);
    }
}