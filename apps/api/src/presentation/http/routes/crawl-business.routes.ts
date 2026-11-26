import { Router } from "express";
import { BusinessCrawler } from "../../../infrastructure/crawlers/business.crawler.js";
import { BusinessCrawlerService } from "../../../application/services/crawl-businesses.service.js";
import { CrawlingBusinessController } from "../controllers/crawl-business.presentation.js";


const crawlBusinessRoute = Router();

const crawlBusinessRepository = new BusinessCrawler();
const crawlBusinessService = new BusinessCrawlerService(crawlBusinessRepository);
const crawlBusinessController = new CrawlingBusinessController(crawlBusinessService);

crawlBusinessRoute.get("/", crawlBusinessController.crawl);

export default crawlBusinessRoute;
