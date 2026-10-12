"""Local-only HTTP server and automatic browser launcher; Python 3 standard library."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser
import json
import os
from urllib.parse import urlsplit


def main():
    folder = Path(__file__).resolve().parent
    class Handler(SimpleHTTPRequestHandler):
        def do_GET(self):
            name=urlsplit(self.path).path
            if name in ('/config.local.json', '/.env') or '/.' in name:
                self.send_error(404); return
            if name == '/config.js':
                token=os.environ.get('CESIUM_ION_TOKEN', '')
                private=folder / 'config.local.json'
                if not token and private.exists():
                    try: token=json.loads(private.read_text(encoding='utf-8')).get('cesiumToken','')
                    except (ValueError, OSError): print('Could not read config.local.json; check its JSON formatting.', flush=True)
                payload=('window.FLIGHT_CONFIG = '+json.dumps({'cesiumToken':token})+';').encode()
                self.send_response(200);self.send_header('Content-Type','application/javascript');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(payload)));self.end_headers();self.wfile.write(payload);return
            super().do_GET()
        def list_directory(self, path):
            self.send_error(404)
            return None
    handler = partial(Handler, directory=str(folder))
    # Ask the OS for an unused port, so an existing server cannot block startup.
    with ThreadingHTTPServer(("127.0.0.1", 0), handler) as server:
        url = f"http://127.0.0.1:{server.server_port}/index.html"
        print(f"Flight Lab: {url}", flush=True)
        print("Keep this window open while using Flight Lab. Close it or press Ctrl+C to stop.", flush=True)
        if not webbrowser.open(url):
            print("Open the address above in your browser.", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
