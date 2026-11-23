import { log, PlaywrightCrawler } from "crawlee";
import { router } from "./routes/routes.js";

log.setLevel(log.LEVELS.DEBUG);

log.debug('Setting up Crawler...');
const crawler = new PlaywrightCrawler({
    requestHandler: router,
    maxRequestsPerCrawl: 500
});

await crawler.run(['https://www.infoempresas.com.pt/Distrito_AVEIRO.html']);
