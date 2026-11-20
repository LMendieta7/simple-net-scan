export function renderDiscovery(container) {
    container.innerHTML = `
    <section class="discovery-page">
        <header>
            <h1>Device Discovery</h1>
            <p>Find responding devices on your local network.</p>
        </header>
        
        <div class="discovery-form card">
            <h2>Discovery settings</h2>
            <div class="discovery-fields">

                <div class="form-field">
                    <label for="ip-range">IP range</label>
                    <input type="text" id="ip-range" name="ip-range" placeholder="192.168.1.1, 192.168.1.50-100, 192.168.1.0/24"/>
                </div>

                <div class="form-field">
                    <label for="discovery-method">Discovery method</label>
                    <select id="discovery-method" name="discovery-method">
                        <option value="">Select method</option>
                        <option selected value="auto">Automatic (Nmap default)</option>
                        <option value="arp">ARP discovery</option>
                    </select>
                </div>
            </div>
            <div class="form-button">           
                <button id="test-discovery-button" class="start-button" type="submit"><i class="fa-solid fa-play"></i>Discover Devices</button>
                <button class="stop-button" type="button" disabled><i class="fa-solid fa-stop"></i>Stop</button>
            </div>
        </div>
        
        <div class="device-table card">
            <h2>Discovered devices</h2>
            <div class="device-field" id="device-field">
                <table>
                    <thead class="table-header">
                        <tr>
                            <th scope="col">IP address</th>
                            <th scope="col">MAC address</th>
                            <th scope="col">Vendor</th>
                        </tr>
                    </thead>
                    <tbody id="device-rows"></tbody>
                </table>
            </div>
            <p id="discovery-summary" role="status"></p>
        </div>
    </section>
  `;

    const testButton = container.querySelector("#test-discovery-button");
    const rows = container.querySelector("#device-rows");
    const summary = container.querySelector("#discovery-summary");

    testButton.addEventListener("click", async () => {
        if (testButton.disabled) return;

        testButton.disabled = true;
        summary.textContent = "Discovering devices…";

        try {
            const response = await fetch("/discovery", { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`Discovery failed (HTTP ${response.status}).`);
            }

            const { devices, summary: scanSummary } = await response.json();
            rows.replaceChildren();

            for (const device of devices) {
                const row = rows.insertRow();
                for (const value of [device.ip, device.mac, device.vendor]) {
                    row.insertCell().textContent = value ?? "—";
                }
            }

            summary.textContent = scanSummary ||
                `${devices.length} devices found.`;
        } catch (error) {
            summary.textContent = error.message;
        } finally {
            testButton.disabled = false;
        }
    });
}
