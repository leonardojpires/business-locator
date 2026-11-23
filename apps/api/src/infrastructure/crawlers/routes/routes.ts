import { createPlaywrightRouter, Dataset } from "crawlee";
import { Locator } from "playwright";

export const router = createPlaywrightRouter();

router.addHandler("CATEGORY", async ({ page, enqueueLinks, request, log }) => {
  log.debug(`Enqueing pagination for: ${request.url}`);

  await enqueueLinks({
    selector: '[data-title="Atividades"] > a',
    label: "CATEGORY",
  });

  await enqueueLinks({
    selector: '[data-title="Empresa"] > a',
    label: "DETAIL",
  });

  // await Dataset.pushData({
  //   url: request.url,
  // });
});

router.addHandler("DETAIL", async ({ request, page, log }) => {
  log.info(`DETAIL HANDLER REACHED: ${request.url}`);

  const url = request.url;
  const name: string | null = await page
    .locator('[data-title="Nome"]')
    .textContent();
  const address: string | null = await page
    .locator('[data-title="Morada"]')
    .textContent();
  const city: string | undefined = address
                                    ?.split("Como chegar")[0]
                                    ?.split(",")
                                    .at(-2)
                                    ?.trim();
  const department: string | null = await page
    .locator('[data-title="Atividade"]')
    .textContent();

  const results = {
    url,
    name,
    address,
    city,
    department,
  };

  await Dataset.pushData(results);
});

router.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueing categories from page: ${request.url}`);

  await page.waitForSelector('[data-title="Atividades"] > a');
  await enqueueLinks({
    selector: '[data-title="Atividades"] > a',
    label: "CATEGORY",
  });
});
