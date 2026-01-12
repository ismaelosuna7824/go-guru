#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

API_URL="${1:-http://localhost:3000}"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🧪 Testing Go Guru API${NC}"
echo -e "${BLUE}📍 URL: $API_URL/execute${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Test 1: Suma simple
echo -e "${GREEN}Test 1: Suma de dos números (5 + 3 = 8)${NC}"
curl -s -X POST $API_URL/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    a := 5\n    b := 3\n    fmt.Println(a + b)\n}",
    "expectedOutput": "8"
  }' | jq
echo -e "\n"

# Test 2: Variables
echo -e "${GREEN}Test 2: Variables y tipos${NC}"
curl -s -X POST $API_URL/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var x int = 42\n    var name string = \"Go\"\n    fmt.Printf(\"%s: %d\", name, x)\n}",
    "expectedOutput": "Go: 42"
  }' | jq
echo -e "\n"

# Test 3: Printf con regex
echo -e "${GREEN}Test 3: Printf con validación regex${NC}"
curl -s -X POST $API_URL/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    a := 10\n    b := 20\n    fmt.Printf(\"La suma es: %d\", a + b)\n}",
    "expectedOutput": "/^La suma es: \\d+$/"
  }' | jq
echo -e "\n"

# Test 4: Loop (sin validación)
echo -e "${GREEN}Test 4: For loop (sin validación)${NC}"
curl -s -X POST $API_URL/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        fmt.Println(i)\n    }\n}"
  }' | jq
echo -e "\n"

# Test 5: Error de compilación
echo -e "${RED}Test 5: Error de compilación (esperado)${NC}"
curl -s -X POST $API_URL/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Sin cerrar\n}",
    "expectedOutput": "test"
  }' | jq
echo -e "\n"

# Test 6: Import prohibido
echo -e "${RED}Test 6: Import prohibido (esperado)${NC}"
curl -s -X POST $API_URL/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "package main\n\nimport \"os/exec\"\n\nfunc main() {\n    exec.Command(\"ls\").Run()\n}"
  }' | jq
echo -e "\n"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}✅ Tests completados${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
