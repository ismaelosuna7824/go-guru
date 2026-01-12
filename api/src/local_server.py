#!/usr/bin/env python3
"""
Servidor local para desarrollo rápido sin Docker/SAM
Ejecuta: python3 local_server.py
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import sys
import os

# Agregar el directorio actual al path para importar app.py
sys.path.insert(0, os.path.dirname(__file__))

# Importar el handler de Lambda
from app import handler

class LocalRequestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        """Handle POST requests"""
        if self.path != '/execute':
            self.send_error(404, 'Not Found')
            return

        # Leer el body de la request
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        try:
            # Crear el evento simulado de Lambda
            event = {
                'body': post_data.decode('utf-8'),
                'headers': dict(self.headers)
            }

            # Llamar al handler de Lambda
            response = handler(event, None)

            # Enviar respuesta
            self.send_response(response['statusCode'])

            # Headers de respuesta
            for key, value in response.get('headers', {}).items():
                self.send_header(key, value)

            self.end_headers()

            # Body de respuesta
            self.wfile.write(response['body'].encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            error_response = json.dumps({
                'success': False,
                'error': f'Server error: {str(e)}'
            })
            self.wfile.write(error_response.encode('utf-8'))

    def log_message(self, format, *args):
        """Override para tener logs más limpios"""
        print(f"[{self.log_date_time_string()}] {format % args}")

def run_server(port=3000):
    """Inicia el servidor local"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, LocalRequestHandler)

    print(f"""
╔══════════════════════════════════════════════════════════╗
║  🚀 Go Guru API - Servidor Local                        ║
╚══════════════════════════════════════════════════════════╝

✅ Servidor corriendo en: http://localhost:{port}
📡 Endpoint: http://localhost:{port}/execute

🧪 Prueba con:
   curl -X POST http://localhost:{port}/execute \\
     -H "Content-Type: application/json" \\
     -d '{{"code":"package main\\n\\nimport \\"fmt\\"\\n\\nfunc main() {{\\n    fmt.Println(5 + 3)\\n}}","expectedOutput":"8"}}'

⏹  Presiona Ctrl+C para detener el servidor
""")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Servidor detenido")
        httpd.server_close()

if __name__ == '__main__':
    # Verificar que Go esté instalado
    import subprocess
    try:
        result = subprocess.run(['go', 'version'], capture_output=True, text=True)
        print(f"✓ Go detectado: {result.stdout.strip()}")
    except FileNotFoundError:
        print("⚠️  WARNING: Go no está instalado o no está en el PATH")
        print("   Instala Go desde: https://go.dev/dl/")
        sys.exit(1)

    run_server()
