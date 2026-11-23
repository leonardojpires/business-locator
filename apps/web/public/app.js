const businessesElement = document.querySelector("#businesses");
const countElement = document.querySelector("#count");
const statusElement = document.querySelector("#status");

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderBusinesses(businesses) {
    countElement.textContent = businesses.length;

    if (businesses.length === 0) {
        businessesElement.innerHTML = '<p class="empty">No businesses found yet.</p>';
        return;
    }

    businessesElement.innerHTML = businesses
        .map(
            (business) => `
                <article class="business">
                    <h2>${escapeHtml(business.name || "Unnamed business")}</h2>
                    <p>${escapeHtml(business.address || "Address unavailable")}</p>
                    <p>${escapeHtml(business.city || "City unavailable")}</p>
                    <p>${escapeHtml(business.department || "Department unavailable")}</p>
                    ${
                        business.url
                            ? `<a href="${escapeHtml(business.url)}" target="_blank" rel="noreferrer">View source</a>`
                            : ""
                    }
                </article>
            `,
        )
        .join("");
}

async function loadBusinesses() {
    try {
        const response = await fetch("/api/businesses", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        renderBusinesses(data.businesses);
        statusElement.textContent = `Updated ${new Date(data.updatedAt).toLocaleTimeString()}`;
    } catch (error) {
        console.error(error);
        statusElement.textContent = "Unable to load data";
        businessesElement.innerHTML =
            '<p class="empty">Could not read the business data.</p>';
    }
}

loadBusinesses();
setInterval(loadBusinesses, 5000);
