import json
import subprocess
import tempfile
import os
import re
from pathlib import Path
from typing import Dict, Any, Tuple

# Security constants
MAX_CODE_SIZE = 10000  # 10KB max code size
MAX_OUTPUT_SIZE = 5000  # 5KB max output size
EXECUTION_TIMEOUT = int(os.environ.get('MAX_EXECUTION_TIME', '30'))  # seconds (incluye compilación + ejecución)
MAX_BINARY_SIZE = 50 * 1024 * 1024  # 50MB max binary size
MAX_LINES = 500  # Maximum lines of code

# Forbidden imports that could be used maliciously
FORBIDDEN_IMPORTS = [
    'os/exec',      # Prevent command execution
    'syscall',      # Prevent system calls
    'unsafe',       # Prevent unsafe operations
    'net/http',     # Prevent network requests
    'net/rpc',      # Prevent RPC calls
    'plugin',       # Prevent loading plugins
    'reflect',      # Prevent reflection abuse (opcional, puede ser necesario para algunos ejercicios)
]

# Suspicious patterns that might indicate malicious code
SUSPICIOUS_PATTERNS = [
    r'for\s*{\s*}',              # Infinite loop: for {}
    r'for\s*;\s*;\s*{',          # Infinite loop: for ; ; {
    r'goto\s+\w+',               # Goto statements (código confuso)
    r'//\s*go:linkname',         # Compiler directives
    r'crypto/rand',              # Random access (puede ser usado para evadir detección)
]


def validate_code(code: str) -> Tuple[bool, str]:
    """
    Validate Go code for security issues

    Returns:
        Tuple of (is_valid, error_message)
    """
    if not code or not code.strip():
        return False, "El código no puede estar vacío"

    # Check code size
    if len(code) > MAX_CODE_SIZE:
        return False, f"El código excede el tamaño máximo permitido ({MAX_CODE_SIZE} bytes)"

    # Check number of lines
    lines = code.count('\n')
    if lines > MAX_LINES:
        return False, f"El código excede el número máximo de líneas ({MAX_LINES})"

    # Check for forbidden imports
    for forbidden in FORBIDDEN_IMPORTS:
        if f'"{forbidden}"' in code or f'"{forbidden}/' in code:
            return False, f"El import '{forbidden}' no está permitido por razones de seguridad"

    # Check for suspicious patterns
    for pattern in SUSPICIOUS_PATTERNS:
        if re.search(pattern, code, re.IGNORECASE):
            return False, "Se detectó un patrón de código sospechoso. Por favor, simplifica tu código."

    # Check for excessive recursion (simple heuristic)
    func_name_pattern = r'func\s+(\w+)\s*\('
    func_names = re.findall(func_name_pattern, code)
    for func_name in func_names:
        # Count how many times this function calls itself
        self_calls = code.count(f'{func_name}(')
        if self_calls > 20:  # Heuristic: probably recursive abuse
            return False, f"La función '{func_name}' parece tener demasiadas llamadas recursivas"

    # Check for package main
    if 'package main' not in code:
        return False, "El código debe contener 'package main'"

    # Check for main function
    if 'func main()' not in code:
        return False, "El código debe contener 'func main()'"

    # Check for shell characters (potential command injection attempts)
    shell_chars = ['$', '`', '$(', '&&', '||', ';', '|']
    for char in shell_chars:
        if char in code and 'import' not in code.split(char)[0]:
            # Allow in strings, but be suspicious otherwise
            pass  # This is a soft check

    return True, ""


def execute_go_code(code: str) -> Tuple[bool, str, str]:
    """
    Execute Go code safely and return the result

    Returns:
        Tuple of (success, stdout, stderr)
    """
    # Create temporary directory for execution
    with tempfile.TemporaryDirectory() as tmpdir:
        file_path = Path(tmpdir) / "main.go"
        binary_path = Path(tmpdir) / 'main'

        # Write code to file
        file_path.write_text(code)

        try:
            # Compile the Go code with optimizations for speed
            compile_result = subprocess.run(
                [
                    'go', 'build',
                    '-ldflags', '-s -w',  # Strip debug info to reduce size
                    '-trimpath',  # Remove file system paths
                    '-o', str(binary_path),
                    str(file_path)
                ],
                capture_output=True,
                text=True,
                timeout=EXECUTION_TIMEOUT,
                cwd=tmpdir,
                # Optimize for compilation speed
                env={
                    **os.environ,
                    'GOCACHE': tmpdir,
                    'GOPATH': tmpdir,
                    'CGO_ENABLED': '0',  # Disable CGO for faster compilation
                }
            )

            if compile_result.returncode != 0:
                return False, "", compile_result.stderr

            # Check binary size (prevent compilation bombs)
            binary_size = binary_path.stat().st_size
            if binary_size > MAX_BINARY_SIZE:
                return False, "", f"El binario compilado es demasiado grande ({binary_size} bytes). Límite: {MAX_BINARY_SIZE}"

            # Execute the compiled binary
            exec_result = subprocess.run(
                [str(binary_path)],
                capture_output=True,
                text=True,
                timeout=EXECUTION_TIMEOUT,
                cwd=tmpdir,
                # Security: prevent child processes
                preexec_fn=os.setpgrp if hasattr(os, 'setpgrp') else None
            )

            # Limit output size
            stdout = exec_result.stdout[:MAX_OUTPUT_SIZE]
            stderr = exec_result.stderr[:MAX_OUTPUT_SIZE]

            if len(exec_result.stdout) > MAX_OUTPUT_SIZE:
                stdout += f"\n... (output truncado, límite: {MAX_OUTPUT_SIZE} bytes)"

            return exec_result.returncode == 0, stdout, stderr

        except subprocess.TimeoutExpired:
            return False, "", f"La ejecución excedió el tiempo límite de {EXECUTION_TIMEOUT} segundos"
        except Exception as e:
            return False, "", f"Error de ejecución: {str(e)}"


def validate_output(actual_output: str, expected_output: str) -> Tuple[bool, str]:
    """
    Validate actual output against expected output
    Supports both exact match and regex patterns

    Expected output format:
    - Exact string: "hello world"
    - Regex pattern: "/pattern/" or "/^Hola, .+/"

    Returns:
        Tuple of (is_match, message)
    """
    # Clean outputs (strip trailing newlines and spaces)
    actual = actual_output.strip()
    expected = expected_output.strip()

    # Check if expected is a regex pattern (enclosed in /)
    if expected.startswith('/') and expected.endswith('/'):
        pattern = expected[1:-1]  # Remove slashes
        try:
            if re.search(pattern, actual):
                return True, "¡Correcto! El output coincide con el patrón esperado."
            else:
                return False, f"El output no coincide. Se esperaba un patrón como: {pattern}"
        except re.error as e:
            return False, f"Error en el patrón regex: {str(e)}"
    else:
        # Exact match
        if actual == expected:
            return True, "¡Perfecto! El output es exactamente el esperado."
        else:
            return False, f"El output no coincide.\nEsperado: {expected}\nRecibido: {actual}"


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Lambda handler for executing Go code

    Expected request body:
    {
        "code": "package main\\n\\nimport \\"fmt\\"\\n\\nfunc main() { fmt.Println(\\"hello\\") }",
        "expectedOutput": "/^hello$/"
    }

    Response:
    {
        "success": true,
        "correct": true,
        "message": "¡Correcto! El output coincide...",
        "output": "hello\\n",
        "expectedOutput": "/^hello$/"
    }
    """
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        code = body.get('code', '')
        expected_output = body.get('expectedOutput', '')

        if not code:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': 'El código es requerido'
                })
            }

        # Validate code for security
        is_valid, error_msg = validate_code(code)
        if not is_valid:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': error_msg
                })
            }

        # Execute code
        success, stdout, stderr = execute_go_code(code)

        if not success:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': 'Error de compilación o ejecución',
                    'stderr': stderr,
                    'stdout': stdout
                })
            }

        # Validate output if expected output is provided
        if expected_output:
            is_match, message = validate_output(stdout, expected_output)

            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'correct': is_match,
                    'message': message,
                    'output': stdout,
                    'expectedOutput': expected_output
                })
            }
        else:
            # No validation needed, just return output
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'output': stdout
                })
            }

    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'JSON inválido en el body'
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': f'Error interno del servidor: {str(e)}'
            })
        }
