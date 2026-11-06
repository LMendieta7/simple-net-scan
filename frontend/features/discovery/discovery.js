export function renderDiscovery(container) {
    container.innerHTML = `
    <section class="discovery-page">
        <header>
            <h1>Device Discovery</h1>
            <p>Find responding devices on your local network.</p>
        </header>
        
        <form class="discovery-form card">
            <h2>Discovery settings</h2>
            <div class="discovery-fields">
                <div class="form-field">
                    <label for="network-interface">Network interface</label>
                    <select id="network-interface" name="network-interface">
                        <option value="" selected>Select an interface</option>
                        <option value="en0">WiFi - 192.168.0.25</option>
                        <option value="en7">Ethernet - 192.168.1.100</option>
                    </select>
                    <small id="network-interface-help">Ethernet or WiFi</small>
                </div>
                <div class="form-field">
                    <label for="ip-range">IP range</label>
                    <input type="text" id="ip-range" name="ip-range" placeholder="192.168.1.1 - 192.168.1.50"/>
                </div>

                <div class="form-field">
                    <label for="discovery-method">Discovery method</label>
                    <select id="discovery-method" name="discovery-method">
                        <option value="" selected>Select method</option>
                        <option value="auto">Automatic (Nmap default)</option>
                        <option value="arp">ARP discovery</option>
                        <option value="icmp">ICMP ping</option>
                        <option value="tcp">TCP discovery</option>
                    </select>
                </div>
            </div>
            <div class="form-button">           
                <button class="start-button" type="submit"><i class="fa-solid fa-play"></i>Start discovery</button>
                <button class="stop-button" type="button"><i class="fa-solid fa-stop"></i>Stop</button>
            </div>
        </form>
        
        
    </section>
  `;
}
