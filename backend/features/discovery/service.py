import subprocess
import xml.etree.ElementTree as ET


def run_nmap():
    cmd = ["sudo", 
           "nmap", 
           "-sn", 
           "-n",
           "-oX", 
           "-", 
           "172.22.80.0/24"
        ]
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        check=True
    )

    return ET.fromstring(result.stdout)

def nmap_results():
    root = run_nmap()
    devices = []
    summary = root.find("./runstats/finished").get("summary")
    for host in root.findall("host"):
        # ip address and mac
        ip = host.find("./address[@addrtype='ipv4']")
        mac = host.find("./address[@addrtype='mac']")
        status = host.find("./status")
        is_local = (
            status is not None
            and status.get("reason") == "localhost-response"
        )
        devices.append({
            "ip": ip.get("addr") if ip is not None else None,
            "mac": mac.get("addr") if mac is not None else None,
            "vendor": mac.get("vendor") if mac is not None else None,
            "is_local": is_local
        })

    return {
        "devices": devices,
        "summary": summary
    }

