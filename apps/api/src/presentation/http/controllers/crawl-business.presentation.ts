import { Request, Response } from "express";
import { BusinessCrawlerService } from "../../../application/services/crawl-businesses.service.js";


export class CrawlingBusinessController {
    constructor(private businessCrawlerService: BusinessCrawlerService) {
        this.businessCrawlerService = businessCrawlerService;
    }

    crawl = async (req: Request, res: Response) => {
        try {
            const businesses = await this.businessCrawlerService.crawl(
                ["https://www.infoempresas.com.pt/Distrito_AVEIRO.html"],
            );

            return res.status(201).json({
                businesses
            });
        } catch(error: unknown) {
            console.error("Crawl request failed:", error);
            return res.status(500).json({
                error: "INTERNAL_ERROR",
                message: error instanceof Error ? error.message : "The crawl failed. Please try again."
            })
        }
    }
}
