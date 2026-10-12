"""Prepare only public website files. No token is written into the source tree."""
import json
import os
import shutil
from pathlib import Path
root=Path(__file__).resolve().parents[1]
out=root/'_site'
out.mkdir(exist_ok=True)
for name in ['index.html','style.css','app.js','interface.js','landmarks.js','guided-tour.js','photos.js','photo-map.js','places.js','flight-core.js','tests.html','tests.js']:
    shutil.copyfile(root/name,out/name)
(out/'config.js').write_text('window.FLIGHT_CONFIG = '+json.dumps({'cesiumToken':os.environ.get('CESIUM_ION_TOKEN','')})+';\n',encoding='utf-8')
(out/'.nojekyll').touch()
print('Website prepared. Configuration value was not printed.')
