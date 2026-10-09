import { createPlaywrightRouter, Dataset } from "crawlee";
import { Locator } from "playwright";

export const router = createPlaywrightRouter();

router.addHandler("CATEGORY", async ({ page, enqueueLinks, request, log }) => {
  log.debug(`Enqueing pagination for: ${request.url}`);

  await page.waitForSelector('[data-title="Atividades"] > a');
  await enqueueLinks({
    selector: '[data-title="Atividades"] > a',
    label: "CATEGORY",
  });

  const companyPageButton = await page.$('[data-title="Empresas"] > a');
  if (companyPageButton) {
    await enqueueLinks({
      selector: '[data-title="Atividades"] > a',
      label: "DETAIL",
    });
  }

  await Dataset.pushData({
    url: request.url
  });
});

router.addHandler("DETAIL", ({ request, log }) => {
  log.debug(`Extracting data: ${request.url}`);
});

router.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
    log.debug(`Enqueing categories from page: ${request.url}`);

    await page.waitForSelector('[data-title="Atividades"] > a');
    await enqueueLinks({
        selector: '[data-title="Atividades"] > a',
        label: 'CATEGORY'
    });
});
