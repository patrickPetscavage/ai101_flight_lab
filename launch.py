"""Local-only HTTP server and automatic browser launcher; Python 3 standard library."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser


def main():
    folder = Path(__file__).resolve().parent
    handler = partial(SimpleHTTPRequestHandler, directory=str(folder))
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
