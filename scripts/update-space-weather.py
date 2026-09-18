import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BASE = "https://services.swpc.noaa.gov"
OUT = Path("data/space-weather.json")

def get_json(path):
    with urllib.request.urlopen(BASE + path, timeout=20) as r:
        return json.load(r)

def rows(data):
    if not data:
        return []
    if isinstance(data, list) and data and isinstance(data[0], list):
        headers, values = data[0], data[1:]
        return [dict(zip(headers, row)) for row in values]
    return data if isinstance(data, list) else [data]

def latest_value(data, keys):
    for row in reversed(rows(data)):
        if isinstance(row, dict):
            for key in keys:
                if key in row and row[key] not in (None, ""):
                    try:
                        return float(row[key])
                    except (TypeError, ValueError):
                        pass
    return None

kp = get_json("/json/planetary_k_index_1m.json")
flux = get_json("/json/f107_cm_flux.json")
ssn = get_json("/json/solar-cycle/sunspots.json")

result = {
    "updated": datetime.now(timezone.utc).isoformat(),
    "source": "NOAA SWPC",
    "sfi": latest_value(flux, ["flux", "f10.7", "f10.7_cm"]),
    "sunspots": latest_value(ssn, ["sunspot_number", "ssn", "sunspots"]),
    "kp": latest_value(kp, ["kp_index", "kp", "Kp"]),
    "aIndex": None,
    "solarWind": None,
    "note": "NOAA feed active. Additional solar-wind and A-index feeds will be added next."
}
OUT.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
print(json.dumps(result, indent=2))
