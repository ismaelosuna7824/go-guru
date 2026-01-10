export const topics = [
    {
        id: 'installation', category: 'Getting Started', title: 'Installation (Instalación)', description: 'Cómo instalar Go en Windows, Mac y Linux.', guide: `Instalar Go es el primer paso para convertirte en un Gopher.        
    **Descarga Oficial:**
    Siempre descarga desde [go.dev/dl](https://go.dev/dl/).
    
    **Windows:**
    1. Descarga el instalador \`.msi\`.
    2. Ejecútalo y sigue las instrucciones.
    3. Abre una nueva terminal (cmd o PowerShell) y escribe \`go version\`.
    
    **Mac (macOS):**
    *   Opción A (Recomendada): Descarga el paquete \`.pkg\` de la web oficial.
    *   Opción B (Homebrew): \`brew install go\`.
    
    **Linux:**
    1. Descarga el tarball \`.tar.gz\`.
    2. Extrae en \`/usr/local\`: \`tar -C /usr/local -xzf go1.xx.linux-amd64.tar.gz\`.
    3. Añade al PATH en tu \`.bashrc\` o \`.zshrc\`: \`export PATH=$PATH:/usr/local/go/bin\`.
    
    **Verificación:**
    En cualquier sistema, ejecuta \`go version\` para confirmar.

    **Core Go Commands (Comandos Esenciales):**

    *   \`go run [archivo.go]\`: Compila y ejecuta tu código en el momento. Ideal para desarrollo rápido.
    *   \`go build [archivo.go]\`: Compila tu código y genera un binario ejecutable (.exe en Windows).
    *   \`go install [paquete]\`: Compila e instala el binario en tu \`$GOPATH/bin\`.
    *   \`go test [./...]\`: Ejecuta los tests de tu proyecto.
    *   \`go fmt [./...]\`: Formatea tu código automáticamente (¡Go es muy estricto con el estilo!).
    *   \`go mod init [nombre]\`: Inicializa un nuevo módulo (crea \`go.mod\`).
    *   \`go mod tidy\`: Añade dependencias que faltan y elimina las que no usas en \`go.mod\`.
    *   \`go get [url]\`: Descarga e instala una librería externa (ej. \`go get github.com/gin-gonic/gin\`).
    *   \`go clean\`: Elimina archivos objeto y binarios temporales (limpia el cache de build).
    *   \`go doc [paquete]\`: Muestra la documentación de un paquete en la terminal (ej. \`go doc fmt\`).`,
        explanation: [
            { text: "Comando para verificar la versión instalada.", lineCode: 'go version' },
            { text: "Comando para ver el entorno de Go.", lineCode: 'go env' },
            { text: "Comando para iniciar un módulo nuevo.", lineCode: 'go mod init mi-proyecto' },
            { text: "Comando para ejecutar un archivo.", lineCode: 'go run main.go' },
            { text: "Comando para compilar un binario.", lineCode: 'go build' }
        ],
        code: `// No hay código Go per se para la instalación,
// pero aquí tienes los comandos de terminal comunes:

$ go version
go version go1.22.0 darwin/arm64

$ go env GOPATH
/Users/usuario/go

$ mkdir hello
$ cd hello
$ go mod init example/hello
go: creating new go.mod: module example/hello

$ echo 'package main; import "fmt"; func main() { fmt.Println("Hello") }' > main.go

$ go run main.go
Hello

$ go build
$ ./hello
Hello`,
        exercise: {
            question: "¿Cuál es el comando para verificar que Go está instalado correctamente y ver su versión?", initialCode: `// Escribe el comando aquí como comentario\n// $ ...`,
            solution: `// $ go version`
        }
    },
    {
        id: 'hello-world', category: 'Getting Started', title: 'Hello World', description: 'Tu primer programa en Go.', guide: `Bienvenido a Go. Este es el punto de partida fundamental.
    ¿Por qué Go?
    Go (o Golang) es un lenguaje compilado, concurrente, imperativo y estructurado. Fue creado en Google para resolver problemas de ingeniería de software a escala.

    **Estructura de un Archivo Go:**
    **1. Paquete (Package):** Todo archivo Go comienza con una declaración de paquete. \`package main\` es especial: indica que este código generará un ejecutable, no una librería compartida.
    **2. Importaciones (Imports):** Aquí traemos funcionalidad de otros paquetes. \`fmt\` es el paquete estándar para formatear texto (input/output).
    **3. Función Main:** \`func main()\` es donde comienza la ejecución. Es obligatorio en el paquete \`main\`.

    **Consejo Experto:**
    Go es muy estricto con las llaves \`{\`. La llave de apertura de una función *debe* estar en la misma línea que la declaración de la función, o el código no compilará. Esto elimina debates sobre estilo y hace que todo el código Go se vea uniforme.`,
        explanation: [
            {
                text: 'Go es un lenguaje compilado y tipado estáticamente. Para empezar, escribamos un programa simple que imprima "hello world".', lineCode: null
            },
            {
                text: 'La primera línea `package main` define el nombre del paquete. Los programas ejecutables siempre deben usar `package main`.', lineCode: 'package main'
            },
            {
                text: 'Importamos el paquete `fmt` que contiene funciones de formateo, incluyendo la impresión en consola.', lineCode: 'import "fmt"'
            },
            {
                text: 'La función `main` es el punto de entrada del programa. Cuando ejecutas el programa, esta función se ejecuta primero.', lineCode: 'func main() {'
            },
            {
                text: 'Dentro de `main`, usamos `fmt.Println` para imprimir una cadena en la consola.', lineCode: '    fmt.Println("hello world")\n}'
            }
        ],
        code: `package main

import "fmt"

func main() {
    fmt.Println("hello world")
}`,
        exercise: {
            question: 'Modifica el programa para imprimir "Hola, [Tu Nombre]" en lugar de "hello world".', initialCode: `package main

import "fmt"

func main() {
    fmt.Println("hello world")
}`,
            solution: `package main

import "fmt"

func main() {
    fmt.Println("Hola, Antigravity")
}`
        }
    },
    {
        id: 'data-types', category: 'Basic Data Types & Variables', title: 'Data Types (Tipos de Datos)', description: 'Go es un lenguaje fuertemente tipado. Conoce todos los tipos primitivos y compuestos disponibles.', guide: `Go tiene un sistema de tipos rico y preciso.        
    1.  **Booleanos:**
          * \`bool\`: \`true\` o \`false\`.
        
    2.  **Numeros Enteros:**
          * Con signo: \`int8\`, \`int16\`, \`int32\`, \`int64\`, \`int\` (depende de CPU, 32 o 64 bits).
          * Sin signo: \`uint8\`, \`uint16\`, \`uint32\`, \`uint64\`, \`uint\`, \`uintptr\`.
          * Aliases: \`byte\` (uint8), \`rune\` (int32, representa un código Unicode).
        
    3.  **Flotantes y Complejos:**
           * Flotantes: \`float32\`, \`float64\`.
           * Complejos: \`complex64\` (real/imag float32), \`complex128\` (real/imag float64).
        
    4.  **Texto:**
           * \`string\`: Inmutable secuencia de bytes (UTF-8 por convención).
        
    5.  **Tipos Agregados y de Referencia (se ven en detalle en otros temas):**
           * Arrays, Structs.
           * Pointers, Slices, Maps, Functions, Channels.
           * Interfaces.`,
        explanation: [
            { text: "Enteros con signo y sin signo.", lineCode: 'var a int8 = -10\nvar b uint = 10' },
            { text: "Flotantes para decimales.", lineCode: 'f := 3.1416' },
            { text: "Números complejos nativos.", lineCode: 'c := 3 + 4i' },
            { text: "Strings y Runes (caracteres).", lineCode: 'str := "Hola"\nchar := \'A\' // rune' }
        ],
        code: `package main

import (
    "fmt"
    "math/cmplx"
)

var (
    ToBe   bool       = false
    MaxInt uint64     = 1<<64 - 1
    z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
    fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)
    fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt)
    fmt.Printf("Type: %T Value: %v\n", z, z)
    
    // Bytes y Runes
    var b byte = 255
    var r rune = '🤯'
    fmt.Printf("Byte: %v, Rune: %c\n", b, r)
}`,
        testExample: {
            description: "Probamos los tipos numéricos y sus límites.", functionCode: `func AddFloat(a, b float64) float64 {
    return a + b
}`,
            testCode: `func TestTypes(t *testing.T) {
    if AddFloat(1.5, 2.5) != 4.0 {
        t.Error("Suma de flotantes incorrecta")
    }
}`
        },
        exercise: {
            question: "Declara una variable compleja `c` con valor 5 + 5i e imprime su tipo.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    c := 5 + 5i\n    fmt.Printf("%T", c)\n}`
        }
    },
    {
        id: 'binary-operators', category: 'Operators', title: 'Binary Operators (Operadores Binarios)', description: 'Manipulación directa de bits: AND, OR, XOR, Shifts.', guide: `Go ofrece soporte completo para operadores a nivel de bits (bitwise). Son fundamentales para programación de sistemas, protocolos de red y optimización.        
    **Operadores Principales:**
    *   \`&\` (AND): 1 si ambos bits son 1.
    *   \`|\` (OR): 1 si alguno de los bits es 1.
    *   \`^\` (XOR): 1 si los bits son diferentes.
    *   \`&^\` (AND NOT): Limpia bits (Bit Clear). Específico de Go.
    *   \`<<\` (Left Shift): Desplaza bits a la izquierda (multiplica por 2^n).
    *   \`>>\` (Right Shift): Desplaza bits a la derecha (divide por 2^n).
    
    **Nota:** Go no tiene un operador \`~\` (NOT) unario para enteros, se usa \`^x\` (XOR con -1).`,
        explanation: [
            { text: "AND: 1 & 1 = 1", lineCode: 'fmt.Println(3 & 1) // 1 (0011 & 0001 = 0001)' },
            { text: "OR: 1 | 0 = 1", lineCode: 'fmt.Println(3 | 4) // 7 (0011 | 0100 = 0111)' },
            { text: "XOR: 1 ^ 1 = 0", lineCode: 'fmt.Println(3 ^ 3) // 0' },
            { text: "Shifts: Desplazamiento rápido.", lineCode: 'fmt.Println(1 << 3) // 8 (2^3)' }
        ],
        code: `package main

import "fmt"

func main() {
    // a = 0011 1100 (60)
    // b = 0000 1101 (13)
    var a uint8 = 60
    var b uint8 = 13
    
    fmt.Printf("a = %08b\n", a)
    fmt.Printf("b = %08b\n", b)
    fmt.Println("----------------")
    
    // AND
    fmt.Printf("a & b  = %08b (AND)\n", a&b)
    
    // OR
    fmt.Printf("a | b  = %08b (OR)\n", a|b)
    
    // XOR
    fmt.Printf("a ^ b  = %08b (XOR)\n", a^b)
    
    // Shift
    fmt.Printf("a << 1 = %08b (Left 1)\n", a<<1)
}`,
        useCase: {
            title: "Sistema de Permisos (Bitmasks)", description: "Usamos bits individuales para representar permisos (Leer, Escribir, Ejecutar). Esto permite almacenar múltiples opciones en un solo entero.", code: `const (
    Read   = 1 << 0 // 001
    Write  = 1 << 1 // 010
    Exec   = 1 << 2 // 100
)

func main() {
    // Dar permisos de Lectura y Ejecución
    perms := Read | Exec // 001 | 100 = 101 (5)
    
    // Verificar permiso (AND)
    if perms & Write != 0 {
        fmt.Println("Puede escribir")
    }
}`
        },
        testExample: {
            description: "Probamos una función que verifica si un bit específico está encendido.", functionCode: `func HasBit(n int, pos uint) bool {
    val := 1 << pos
    return (n & val) > 0
}`,
            testCode: `func TestHasBit(t *testing.T) {
    // 5 en binario es 101 (bits 0 y 2 encendidos)
    if !HasBit(5, 0) { t.Error("Bit 0 debería ser 1") }
    if HasBit(5, 1) { t.Error("Bit 1 debería ser 0") } 
}`
        },
        exercise: {
            question: "Usa el operador Left Shift `<<` para calcular 2 elevado a la 5 (2^5).", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tu cálculo\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println(1 << 5)\n}`
        }
    },
    {
        id: 'variables', category: 'Basic Data Types & Variables', title: 'Variables', description: 'En Go, las variables se declaran explícitamente para comprobar la corrección de tipos.', guide: `Las variables almacenan valores. Go ofrece dos formas principales de declararlas: la forma larga (\`var\`) y la forma corta (\`:=\`).
    **Forma Larga (\`var\`):**
    Útil cuando quieres declarar una variable sin inicializarla inmediatamente (tomará su "valor cero"), o cuando quieres ser explícito con el tipo.
    \`var x int = 10\`

    **Forma Corta (\`:=\`):**
    Solo disponible DENTRO de funciones. Es la forma más idiomática y común en Go para variables locales. Go "infiere" el tipo basándose en el valor.
    \`x := 10\` (Go sabe que x es int)

    **Valores Cero (Zero Values):**
    En Go, NO existe el concepto de variables "no inicializadas" con basura de memoria.
    *   \`int\` = 0
    *   \`string\` = "" (cadena vacía)
    *   \`bool\` = false
    *   Punteros/Funciones/Interfaces = nil`,
        explanation: [
            { text: "La palabra clave `var` declara una o más variables.", lineCode: 'var a = "initial"' },
            { text: "Puedes declarar múltiples variables a la vez.", lineCode: 'var b, c int = 1, 2' },
            { text: "Go inferirá el tipo de las variables inicializadas.", lineCode: 'var d = true' },
            { text: "Las variables declaradas sin un valor inicial tendrán su valor cero (zero-valued). Por ejemplo, el valor cero de un `int` es `0`.", lineCode: 'var e int' },
            { text: "La sintaxis `:=` es una forma corta de declarar e inicializar una variable dentro de una función.", lineCode: 'f := "apple"' }
        ],
        code: `package main

import "fmt"

func main() {
    var a = "initial"
    fmt.Println(a)

    var b, c int = 1, 2
    fmt.Println(b, c)

    var d = true
    fmt.Println(d)

    var e int
    fmt.Println(e)

    f := "apple"
    fmt.Println(f)
}`,
        testExample: {
            description: "Probamos una función que retorna el valor cero de un entero.", functionCode: `// zero.go
func GetZeroValue() int {
    var x int
    return x
}`,
            testCode: `// zero_test.go
func TestGetZeroValue(t *testing.T) {
    result := GetZeroValue()
    if result != 0 {
        t.Errorf("GetZeroValue() = %d; esperado 0", result)
    }
}`
        },
        exercise: {
            question: "Declara una variable entera llamada `x` con valor 5 usando la sintaxis corta `:=` e imprímela.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tu código aquí\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    x := 5\n    fmt.Println(x)\n}`
        }
    },
    {
        id: 'constants', category: 'Basic Data Types & Variables', title: 'Constants (Constantes)', description: 'Go soporta constantes de caracteres, cadenas, booleanos y valores numéricos.', guide: `Las constantes se declaran con \`const\`. A diferencia de las variables, su valor debe conocerse en tiempo de compilación y no puede cambiar.
    **Tipos Numéricos Flexibles:**
    Lo más interesante de las constantes en Go es que los números literales son de "precisión arbitraria" y no tienen un tipo fijo hasta que se usan.
    Por ejemplo, \`const N = 500000000\` no es ni int32 ni int64 todavía. Si lo usas donde se espera un float, actuará como float. Esto evita muchos bugs de desbordamiento (overflow) comunes en otros lenguajes.`,
        explanation: [
            { text: "`const` declara un valor constante.", lineCode: 'const s string = "constant"' },
            { text: "Una declaración `const` puede aparecer donde sea que una declaración `var` pueda.", lineCode: 'const n = 500000000' },
            { text: "Las constantes numéricas no tienen tipo hasta que se les da uno, como por una conversión explícita o uso en contexto.", lineCode: 'fmt.Println(int64(d))' }
        ],
        code: `package main

import (
    "fmt"
    "math"
)

const s string = "constant"

func main() {
    fmt.Println(s)

    const n = 500000000
    const d = 3e20 / n
    fmt.Println(d)

    fmt.Println(int64(d))

    fmt.Println(math.Sin(n))
}`,
        testExample: {
            description: "Probamos una función que usa una constante para calcular el área de un círculo.", functionCode: `// circle.go
const Pi = 3.14159

func CircleArea(radius float64) float64 {
    return Pi * radius * radius
}`,
            testCode: `// circle_test.go
func TestCircleArea(t *testing.T) {
    result := CircleArea(2.0)
    expected := 12.56636
    if result != expected {
        t.Errorf("CircleArea(2.0) = %f; esperado %f", result, expected)
    }
}`
        },
        exercise: {
            question: "Declara una constante `Pi` con valor 3.1416 e imprime su valor.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Declara Pi aquí\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    const Pi = 3.1416\n    fmt.Println(Pi)\n}`
        }
    },
    {
        id: 'for', category: 'Control Flow', title: 'For', description: '`for` es la única estructura de bucle en Go.', guide: `¡Sorpresa! Go no tiene \`while\` ni \`do-while\`. Solo tiene \`for\`.    **Pero este \`for\` es extremadamente versátil y cubre todos los casos de uso:**

    1.  **Estilo C/Java:** \`for i := 0; i < 10; i++ { ... }\`
    2.  **Estilo While:** \`for condicion { ... }\` - Se ejecuta mientras la condición sea verdadera.
    3.  **Bucle Infinito:** \`for { ... }\` - Útil para servidores que escuchan eternamente, o cuando usas \`break\` manualmente.
    4.  **Range:** \`for i, v := range coleccion { ... }\` - Para iterar arrays, slices, mapas y canales.

    **Control de Flujo:**
    *   \`break\`: Sale del bucle inmediatamente.
    *   \`continue\`: Salta a la siguiente iteración.`,
        useCase: {
            title: "Reintentar Conexión Fallida (Retry Logic)", description: "Intentas conectar a una base de datos. Si falla, no te rindas al instante. Inténtalo 3 veces con una pausa entre cada intento.", code: `func connectToDB() error {
    var err error
    for i := 0; i < 3; i++ {
        err = tryConnect()
        if err == nil {
            return nil // Conectado!
        }
        fmt.Println("Fallo intento", i+1, "reintentando...")
        time.Sleep(time.Second)
    }
    return fmt.Errorf("imposible conectar tras 3 intentos: %v", err)
}`
        },
        testExample: {
            description: "Probamos una función que suma números del 1 al N usando un bucle for.", functionCode: `// math.go
func SumRange(n int) int {
    sum := 0
    for i := 1; i <= n; i++ {
        sum += i
    }
    return sum
}`,
            testCode: `// math_test.go
func TestSumRange(t *testing.T) {
    result := SumRange(5)
    expected := 15 // 1+2+3+4+5
    if result != expected {
        t.Errorf("SumRange(5) = %d; esperado %d", result, expected)
    }
}`
        },
        explanation: [
            { text: "El tipo más básico, con una sola condición (como un `while`).", lineCode: 'for i <= 3 { ... }' },
            { text: "Un bucle clásico `inicial/condición/final`.", lineCode: 'for j := 7; j <= 9; j++ { ... }' },
            { text: "`for` sin condición itera repetidamente hasta que uses `break` o `return`.", lineCode: 'for { ... break }' },
            { text: "También puedes usar `continue` para saltar a la siguiente iteración.", lineCode: 'if n%2 == 0 { continue }' }
        ],
        code: `package main

import "fmt"

func main() {

    i := 1
    for i <= 3 {
        fmt.Println(i)
        i = i + 1
    }

    for j := 7; j <= 9; j++ {
        fmt.Println(j)
    }

    for {
        fmt.Println("loop")
        break
    }

    for n := 0; n <= 5; n++ {
        if n%2 == 0 {
            continue
        }
        fmt.Println(n)
    }
}`,
        exercise: {
            question: "Usa un bucle `for` para imprimir los números del 1 al 5.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Escribe tu bucle aquí\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    for i := 1; i <= 5; i++ {\n        fmt.Println(i)\n    }\n}`
        }
    },
    {
        id: 'if-else', category: 'Control Flow', title: 'If/Else', description: 'Ramificación con `if` y `else` en Go.', guide: `En Go, \`if\` es la estructura de control condicional estándar.
    **Diferencias Clave con otros lenguajes:**
    **1.  Sin Paréntesis:** No necesitas rodear la condición con paréntesis \`()\`. De hecho, el linter te los quitará.
    **2.  Llaves Obligatorias:** Incluso para una sola línea de código, las llaves \`{}\` son obligatorias. Esto previene errores comunes de refactorización.
    **3.  Declaración Previa:** Puedes ejecutar una pequeña sentencia *antes* de la condición, separada por punto y coma.
        \`if err := funcion(); err != nil { ... }\`
        Esto es increíblemente útil para el manejo de errores, manteniendo el alcance (scope) de la variable variable limitado al bloque \`if\`.`,
        useCase: {
            title: "Validación de Roles (Auth Middleware)", description: "Verificas si un usuario tiene permisos para borrar un recurso. Si es admin, pasa. Si no, error 403.", code: `func DeleteUser(u User) error {
    if u.Role == "admin" {
        // Lógica de borrado
        return nil
    } else if u.Role == "moderator" {
        return errors.New("los moderadores no pueden borrar usuarios")
    } else {
        return errors.New("permiso denegado")
    }
}`
        },
        testExample: {
            description: "Probamos una función que valida si un número es par usando if/else.", functionCode: `// validator.go
func IsEven(n int) bool {
    if n%2 == 0 {
        return true
    } else {
        return false
    }
}`,
            testCode: `// validator_test.go
func TestIsEven(t *testing.T) {
    if !IsEven(4) {
        t.Error("4 debería ser par")
    }
    if IsEven(3) {
        t.Error("3 no debería ser par")
    }
}`
        },
        explanation: [
            { text: "No se necesitan paréntesis alrededor de las condiciones, pero las llaves son obligatorias.", lineCode: 'if 7%2 == 0 { ... }' },
            { text: "Puedes tener una rama `else`.", lineCode: 'if ... {} else { ... }' },
            { text: "Una declaración puede preceder a los condicionales; cualquier variable declarada allí estará disponible en todas las ramas.", lineCode: 'if num := 9; num < 0 { ... }' }
        ],
        code: `package main

import "fmt"

func main() {

    if 7%2 == 0 {
        fmt.Println("7 is even")
    } else {
        fmt.Println("7 is odd")
    }

    if 8%4 == 0 {
        fmt.Println("8 is divisible by 4")
    }

    if num := 9; num < 0 {
        fmt.Println(num, "is negative")
    } else if num < 10 {
        fmt.Println(num, "has 1 digit")
    } else {
        fmt.Println(num, "has multiple digits")
    }
}`,
        exercise: {
            question: "Escribe un `if` que imprima 'Mayor' si una variable `edad` (defínela como 18) es mayor o igual a 18.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    edad := 18\n    // Tu if aquí\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    edad := 18\n    if edad >= 18 {\n        fmt.Println("Mayor")\n    }\n}`
        }
    },
    {
        id: 'switch', category: 'Control Flow', title: 'Switch', description: '`switch` expresa condicionales a través de muchas ramas.', guide: `El \`switch\` en Go es más poderoso y limpio que en C o Java.
    **Características Únicas:**
    *   **Break Automático:** No necesitas escribir \`break\` al final de cada \`case\`. Go lo hace por ti. Si *realmente* quieres que continúe al siguiente caso (fallthrough), debes usar la palabra clave \`fallthrough\`.
    *   **Cualquier Valor:** Los casos no tienen que ser enteros o constantes. Pueden ser strings, tipos, o incluso expresiones lógicas.
    *   **Switch sin Condición:** Un \`switch\` sin una expresión inicial equivale a \`switch true\`. Es una forma muy limpia de escribir largas cadenas de \`if-else-if\`.
    *   **Múltiples Expresiones:** Puedes agrupar valores en un mismo case: \`case "Lunes", "Martes":\`.`,
        useCase: {
            title: "Mapeo de Comandos CLI", description: "Estás construyendo una herramienta de línea de comandos. El usuario escribe 'start', 'stop' o 'status'. Un switch es más limpio que muchos if/else.", code: `func ejecutarComando(cmd string) {
    switch cmd {
    case "start":
        iniciarServidor()
    case "stop":
        detenerServidor()
    case "status", "info":
        mostrarEstado()
    default:
        fmt.Println("Comando desconocido:", cmd)
    }
}`
        },
        testExample: {
            description: "Probamos una función que convierte números a palabras usando switch.", functionCode: `// converter.go
func NumberToWord(n int) string {
    switch n {
    case 1:
        return "uno"
    case 2:
        return "dos"
    case 3:
        return "tres"
    default:
        return "desconocido"
    }
}`,
            testCode: `// converter_test.go
func TestNumberToWord(t *testing.T) {
    if NumberToWord(1) != "uno" {
        t.Error("Esperaba 'uno'")
    }
    if NumberToWord(99) != "desconocido" {
        t.Error("Esperaba 'desconocido'")
    }
}`
        },
        explanation: [
            { text: "Puedes usar comas para separar múltiples expresiones en la misma declaración `case`.", lineCode: 'case time.Saturday, time.Sunday: ...' },
            { text: "`switch` sin una expresión es una forma alternativa de expresar lógica de `if/else`.", lineCode: 'switch { case t.Hour() < 12: ... }' },
            { text: "Un `type switch` compara tipos en lugar de valores.", lineCode: 'switch t := i.(type) { ... }' }
        ],
        code: `package main

import (
    "fmt"
    "time"
)

func main() {

    i := 2
    fmt.Print("Write ", i, " as ")
    switch i {
    case 1:
        fmt.Println("one")
    case 2:
        fmt.Println("two")
    case 3:
        fmt.Println("three")
    }

    switch time.Now().Weekday() {
    case time.Saturday, time.Sunday:
        fmt.Println("It's the weekend")
    default:
        fmt.Println("It's a weekday")
    }

    t := time.Now()
    switch {
    case t.Hour() < 12:
        fmt.Println("It's before noon")
    default:
        fmt.Println("It's after noon")
    }
}`,
        exercise: {
            question: "Crea un switch para una variable `dia` (con valor 'Lunes') que imprima 'Inicio de semana' si es 'Lunes'.", initialCode: `package main\\n\\nimport "fmt"\\n\\nfunc main() {\\n    dia := "Lunes"\\n    // Tu switch aquí\\n}`,
            solution: `package main\\n\\nimport "fmt"\\n\\nfunc main() {\\n    dia := "Lunes"\\n    switch dia {\\n    case "Lunes":\\n        fmt.Println("Inicio de semana")\\n    }\\n}`
        }
    },
    {
        id: 'arrays', category: 'Data Structures', title: 'Arrays (Arreglos)', description: 'Un array es una secuencia numerada de elementos de una longitud específica.', guide: `Los arrays en Go son bloques de construcción básicos, pero rara vez se usan directamente en el código de aplicación (se prefieren los Slices).
    **Comportamiento Rígido:**
    *   Longitud Fija: La longitud es parte del tipo. \`[4]int\` y \`[5]int\` son tipos distintos e incompatibles. No puedes redimensionar un array.
    *   Paso por Valor: Si pasas un array a una función, Go copiará todo el array. Esto puede ser costoso para arrays grandes.
    
    ¿Por qué existen? Son la estructura subyacente que respalda a los Slices.`,
        useCase: {
            title: "Buffer de Tamaño Fijo (I/O)", description: "Al leer un archivo o socket, a menudo usas un pequeño buffer fijo (ej. 1KB) para leer datos en trozos manejables. Aquí un array es perfecto porque el tamaño es constante.", code: `func copiarArchivo(src io.Reader, dst io.Writer) {
    // Buffer de 1KB en el Stack (muy rápido)
    var buf [1024]byte 
    
    for {
        n, err := src.Read(buf[:])
        if n > 0 {
            dst.Write(buf[:n])
        }
        if err != nil { break }
    }
}`
        },
        testExample: {
            description: "Probamos que un array de tamaño fijo mantiene sus valores correctamente.", functionCode: `// storage.go
func CreateBuffer() [3]int {
    var buffer [3]int
    buffer[0] = 10
    buffer[1] = 20
    buffer[2] = 30
    return buffer
}`,
            testCode: `// storage_test.go
func TestCreateBuffer(t *testing.T) {
    buf := CreateBuffer()
    if buf[0] != 10 || buf[1] != 20 || buf[2] != 30 {
        t.Errorf("Buffer incorrecto: %v", buf)
    }
    if len(buf) != 3 {
        t.Error("Longitud incorrecta")
    }
}`
        },
        explanation: [
            { text: "Creamos un array de 5 `int`s. El tipo de elementos y longitud son parte del tipo del array.", lineCode: 'var a [5]int' },
            { text: "Por defecto, un array tiene valor cero (0 para ints).", lineCode: 'fmt.Println("emp:", a)' },
            { text: "Podemos establecer un valor en un índice.", lineCode: 'a[4] = 100' },
            { text: "La función incorporada `len` devuelve la longitud del array.", lineCode: 'fmt.Println("len:", len(a))' },
            { text: "Sintaxis para declarar e inicializar en una línea.", lineCode: 'b := [5]int{1, 2, 3, 4, 5}' }
        ],
        code: `package main

import "fmt"

func main() {

    var a [5]int
    fmt.Println("emp:", a)

    a[4] = 100
    fmt.Println("set:", a)
    fmt.Println("get:", a[4])

    fmt.Println("len:", len(a))

    b := [5]int{1, 2, 3, 4, 5}
    fmt.Println("dcl:", b)

    var twoD [2][3]int
    for i := 0; i < 2; i++ {
        for j := 0; j < 3; j++ {
            twoD[i][j] = i + j
        }
    }
    fmt.Println("2d: ", twoD)
}`,
        exercise: {
            question: "Crea un array de 3 enteros con valores 1, 2, 3 e imprime el segundo elemento.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tu código aquí\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    a := [3]int{1, 2, 3}\n    fmt.Println(a[1])\n}`
        }
    },
    {
        id: 'slices', category: 'Data Structures', title: 'Slices', description: 'Los Slices son un tipo de dato clave en Go, ofreciendo una interfaz más poderosa para secuencias que los arrays.', guide: `Los Slices son la estructura de datos más importante que usarás en Go para listas de elementos.    
    **Conceptualmente:**
    Un slice es una "ventana" dinámica a un array subyacente.
    **Tiene tres componentes:**
    **1.  Puntero:** Apunta al primer elemento del array accesible a través del slice.
    **2.  Longitud (len):** El número de elementos en el slice.
    **3.  Capacidad (cap):** El número de elementos en el array subyacente (cuánto puede crecer antes de necesitar reubicarse).

    **Operaciones Clave:**
    *   \`make([]T, len, cap)\`: Crea un slice (y su array subyacente).
    *   \`append(s, newElement)\`: Añade elementos. Si supera la capacidad, Go crea automáticamente un nuevo array más grande y copia los datos. ¡Siempre asigna el resultado de vuelta a tu variable! (\`s = append(s, val)\`).
    *   \`subslice[low:high]\`: Crea un nuevo slice compartiendo el mismo array.`,
        useCase: {
            title: "Lista de Compras Dinámica", description: "No sabes cuántos productos comprará el usuario. Un array fijo `[10]string` se queda corto o desperdicia espacio. Un slice comienza vacío y crece según sea necesario.", code: `func main() {
    var carrito []string

    // El usuario agrega cosas
    carrito = append(carrito, "Manzanas")
    carrito = append(carrito, "Pan", "Leche")

    fmt.Printf("Tienes %d productos: %v", len(carrito), carrito)
}`
        },
        testExample: {
            description: "Probamos que append agrega elementos correctamente a un slice.", functionCode: `// list.go
func AddItems(items []string, newItem string) []string {
    return append(items, newItem)
}`,
            testCode: `// list_test.go
func TestAddItems(t *testing.T) {
    items := []string{"a", "b"}
    result := AddItems(items, "c")
    
    if len(result) != 3 {
        t.Errorf("Longitud = %d; esperado 3", len(result))
    }
    if result[2] != "c" {
        t.Error("Último elemento debería ser 'c'")
    }
}`
        },
        explanation: [
            { text: "A diferencia de los arrays, los slices son tipados solo por los elementos que contienen (no por el número de elementos).", lineCode: 's := make([]string, 3)' },
            { text: "`make` crea un slice con longitud inicial.", lineCode: 'make([]Type, len)' },
            { text: "`append` devuelve un nuevo slice conteniendo uno o más valores nuevos.", lineCode: 's = append(s, "d")' },
            { text: "Los Slices pueden copiarse.", lineCode: 'copy(c, s)' },
            { text: "Slices soportan un operador de 'slice' con la sintaxis `slice[bajo:alto]`.", lineCode: 'l := s[2:5]' }
        ],
        code: `package main

import "fmt"

func main() {

    s := make([]string, 3)
    fmt.Println("emp:", s)

    s[0] = "a"
    s[1] = "b"
    s[2] = "c"
    fmt.Println("set:", s)
    fmt.Println("get:", s[2])

    fmt.Println("len:", len(s))

    s = append(s, "d")
    s = append(s, "e", "f")
    fmt.Println("apd:", s)

    c := make([]string, len(s))
    copy(c, s)
    fmt.Println("cpy:", c)

    l := s[2:5]
    fmt.Println("sl1:", l)

    l = s[:5]
    fmt.Println("sl2:", l)

    l = s[2:]
    fmt.Println("sl3:", l)

    t := []string{"g", "h", "i"}
    fmt.Println("dcl:", t)
}`,
        exercise: {
            question: "Crea un slice de strings, agrégale 'Go' y 'Lang', e imprímelo.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    s := make([]string, 0)\n    // Tu código aquí\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    s := make([]string, 0)\n    s = append(s, "Go", "Lang")\n    fmt.Println(s)\n}`
        }
    },
    {
        id: 'make', category: 'Data Structures', title: 'Make', description: 'La función `make` asigna e inicializa objetos de tipo slice, map y chan.', guide: `A diferencia de \`new\` (que solo asigna memoria y devuelve un puntero zero-value), \`make\` se usa exclusivamente para inicializar tipos que requieren una estructura interna compleja antes de usarse:           
    **1.  Slices:** Crea el array subyacente y sets len/cap.
    **2.  Maps:** Inicializa la hash table interna.
    **3.  Channels:** Inicializa el buffer de comunicación.
    
    **Firmas:**
    *   \`make([]T, len, cap)\`
    *   \`make(map[K]V, hint)\`
    *   \`make(chan T, cap)\``,
        explanation: [
            { text: "Crear un slice de longitud 5 y capacidad 5.", lineCode: 's := make([]int, 5)' },
            { text: "Crear un slice con longitud 0 pero capacidad 10 (pre-reserva memoria).", lineCode: 's := make([]int, 0, 10)' },
            { text: "Crear un mapa.", lineCode: 'm := make(map[string]int)' },
            { text: "Crear un canal con buffer.", lineCode: 'c := make(chan int, 100)' }
        ],
        code: `package main

import "fmt"

func main() {
    // 1. Slash con make
    // make([]Type, len, cap)
    s := make([]string, 3)
    fmt.Println("Slice:", s, "Len:", len(s), "Cap:", cap(s))

    // 2. Map con make
    m := make(map[string]int)
    m["edad"] = 30
    fmt.Println("Map:", m)

    // 3. Canal con make (buffered)
    c := make(chan int, 2)
    c <- 1
    c <- 2
    fmt.Println("Chan len:", len(c))
}`,
        useCase: {
            title: "Pre-Allocating Slices (Performance)", description: "Si sabes que vas a agregar 1000 elementos, usa `make([]int, 0, 1000)` en lugar de un slice vacío. Esto evita reasignaciones de memoria costosas cada vez que el slice crece.", code: `func GenerateNumbers() []int {
    // Eficiente: Reserva espacio de antemano
    nums := make([]int, 0, 1000)
    for i := 0; i < 1000; i++ {
        nums = append(nums, i)
    }
    return nums
}`
        },
        testExample: {
            description: "Verificamos que make crea las estructuras con la capacidad correcta.", functionCode: `func MakeSlice(size int) []int {
    return make([]int, 0, size)
}`,
            testCode: `func TestMakeSlice(t *testing.T) {
    s := MakeSlice(10)
    if cap(s) != 10 {
        t.Errorf("Expected capacity 10, got %d", cap(s))
    }
}`
        },
        exercise: {
            question: "Crea un slice de `int` usando `make` con longitud 2 y capacidad 5, e imprime su capacidad.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    s := make([]int, 2, 5)\n    fmt.Println(cap(s))\n}`
        }
    },
    {
        id: 'maps', category: 'Data Structures', title: 'Maps (Mapas)', description: 'Los mapas son el tipo de dato asociativo incorporado en Go (hashes o dicts en otros lenguajes).', guide: `Los Maps (diccionarios, hash tables) asocian claves con valores.    
    **Detalles Importantes:**
    *   Aleatorios: El orden de iteración de un mapa es *aleatorio* por diseño. No confíes en que el orden se mantenga.
    *   Referencia: Los mapas son tipos por referencia. Si pasas un mapa a una función y esa función lo modifica, el mapa original cambia.
    *   No Inicializados: Un mapa declarado pero no inicializado es \`nil\`. Puedes leer de él (dará valores cero), pero si intentas escribir te dará un pánico (crash). Siempre usa \`make\` o un literal \`map{}\`.
    
    **Comprobación de Existencia:**
    Al leer un mapa, puedes obtener dos valores: el valor y un booleano.
    \`val, ok := m["clave"]\`
    Si \`ok\` es false, la clave no existe y \`val\` será el valor cero.`,
        useCase: {
            title: "Contador de Frecuencia", description: "Quieres saber qué productos se venden más. Usas un mapa donde la CLAVE es el ID del producto y el VALOR es la cantidad vendida.", code: `ventas := []string{"TV", "PC", "TV", "Mouse", "PC", "TV"}
frecuencia := make(map[string]int)

for _, producto := range ventas {
    frecuencia[producto]++
}

fmt.Println(frecuencia) 
// map[TV:3 PC:2 Mouse:1]`
        },
        explanation: [
            { text: "Para crear un mapa vacío, usa `make(map[key-type]val-type)`.", lineCode: 'm := make(map[string]int)' },
            { text: "Establece pares clave/valor usando la sintaxis `[clave] = valor`.", lineCode: 'm["k1"] = 7' },
            { text: "Imprimir un mapa muestra todos sus pares clave/valor.", lineCode: 'fmt.Println("map:", m)' },
            { text: "`delete` remueve pares clave/valor de un mapa.", lineCode: 'delete(m, "k2")' },
            { text: "El segundo valor de retorno al obtener un valor indica si la clave existe.", lineCode: '_, prs := m["k2"]' }
        ],
        code: `package main

import "fmt"

func main() {

    m := make(map[string]int)

    m["k1"] = 7
    m["k2"] = 13

    fmt.Println("map:", m)

    v1 := m["k1"]
    fmt.Println("v1: ", v1)

    fmt.Println("len:", len(m))

    delete(m, "k2")
    fmt.Println("map:", m)

    _, prs := m["k2"]
    fmt.Println("prs:", prs)

    n := map[string]int{"foo": 1, "bar": 2}
    fmt.Println("map:", n)
}`,
        testExample: {
            description: "Probamos una función que cuenta la frecuencia de elementos en un slice usando un mapa.", functionCode: `// frequency.go
func CountFrequency(items []string) map[string]int {
    freq := make(map[string]int)
    for _, item := range items {
        freq[item]++
    }
    return freq
}`,
            testCode: `// frequency_test.go
func TestCountFrequency(t *testing.T) {
    items := []string{"a", "b", "a", "c", "b", "a"}
    result := CountFrequency(items)

    if result["a"] != 3 {
        t.Errorf("Frecuencia de 'a' = %d; esperado 3", result["a"])
    }
    if result["b"] != 2 {
        t.Errorf("Frecuencia de 'b' = %d; esperado 2", result["b"])
    }
}`
        },
        exercise: {
            question: "Crea un mapa donde la clave sea el nombre de una fruta y el valor su color. Añade 'Manzana': 'Roja'.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tu mapa aquí\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    frutas := make(map[string]string)\n    frutas["Manzana"] = "Roja"\n    fmt.Println(frutas)\n}`
        }
    },
    {
        id: 'functions', category: 'Functions', title: 'Functions (Funciones)', description: 'Las funciones son centrales en Go.', guide: `Las funciones en Go son ciudadanas de primera clase.    
    **Sintaxis:**
    \`func Nombre(param Tipo) Retorno { ... }\`
    
    **Características:**
    *   Tipado Fuerte: Debes declarar el tipo de cada parámetro y de los valores de retorno.
    *   Retornos Múltiples: (Ver siguiente tema) Una de las características "killer" de Go.
    *   Funciones como valores: Puedes pasar funciones como argumentos a otras funciones.
    
    **Privado vs Público:**
    **En Go no hay palabras clave \`public\` o \`private\`. La visibilidad se define por la mayúscula:**
    *   \`func MiFuncion()\` -> Pública (exportada fuera del paquete).
    *   \`func miFuncion()\` -> Privada (solo visible dentro del paquete).`,
        explanation: [
            { text: "Una función toma parámetros tipados y devuelve un resultado tipado.", lineCode: 'func plus(a int, b int) int { ... }' },
            { text: "Si varios parámetros consecutivos tienen el mismo tipo, puedes omitir el tipo en todos menos el último.", lineCode: 'func plusPlus(a, b, c int) int { ... }' },
            { text: "Llamas a la función pasando los argumentos.", lineCode: 'res := plus(1, 2)' }
        ],
        code: `package main

import "fmt"

func plus(a int, b int) int {
    return a + b
}

func plusPlus(a, b, c int) int {
    return a + b + c
}

func main() {

    res := plus(1, 2)
    fmt.Println("1+2 =", res)

    res = plusPlus(1, 2, 3)
    fmt.Println("1+2+3 =", res)
}`,
        testExample: {
            description: "Probamos una función que multiplica dos números.", functionCode: `// operations.go
func Multiply(a, b int) int {
    return a * b
}`,
            testCode: `// operations_test.go
func TestMultiply(t *testing.T) {
    result := Multiply(4, 5)
    expected := 20
    if result != expected {
        t.Errorf("Multiply(4, 5) = %d; esperado %d", result, expected)
    }
}`
        },
        exercise: {
            question: "Escribe una función `resta` que tome dos enteros y devuelva su diferencia.", initialCode: `package main\n\nimport "fmt"\n\n// Tu función aquí\n\nfunc main() {\n    fmt.Println(resta(10, 5))\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc resta(a int, b int) int {\n    return a - b\n}\n\nfunc main() {\n    fmt.Println(resta(10, 5))\n}`
        }
    },
    {
        id: 'multiple-return-values', category: 'Functions', title: 'Multiple Return Values', description: 'Go tiene soporte incorporado para múltiples valores de retorno.', guide: `Dejar de depender de excepciones para el control de flujo es un cambio de mentalidad en Go.    
    **El Patrón (Result, Error):**
    El uso más común de los retornos múltiples es devolver \`(resultado, error)\`.
    
    \`file, err := os.Open("archivo.txt")\`
    \`if err != nil { ... manejar error ... }\`
    
    Esto hace que el manejo de errores sea explícito y visible, en lugar de estar oculto en bloques try-catch que pueden romper el flujo lógico inesperadamente.`,
        useCase: {
            title: "Resultados Seguros (Valor + Error)", description: "En otros lenguajes, si una función falla, lanza una excepción que rompe el flujo. En Go, devuelves el valor y un error. Quien llama decide qué hacer.", code: `func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("no se puede dividir por cero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Resultado:", result)
}`
        },
        explanation: [
            { text: "Las funciones pueden devolver múltiples valores. Esto se usa a menudo para devolver un resultado y un error.", lineCode: 'func vals() (int, int) { return 3, 7 }' },
            { text: "Aquí usamos los 2 diferentes valores de retorno de la llamada con asignación múltiple.", lineCode: 'a, b := vals()' },
            { text: "Si solo quieres un subconjunto de los valores devueltos, usa el identificador en blanco `_`.", lineCode: '_, c := vals()' }
        ],
        code: `package main

import "fmt"

func vals() (int, int) {
    return 3, 7
}

func main() {

    a, b := vals()
    fmt.Println(a)
    fmt.Println(b)

    _, c := vals()
    fmt.Println(c)
}`,
        testExample: {
            description: "Probamos una función con múltiples valores de retorno incluyendo manejo de errores.", functionCode: `// divider.go
func SafeDivide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("división por cero")
    }
    return a / b, nil
}`,
            testCode: `// divider_test.go
func TestSafeDivide(t *testing.T) {
    result, err := SafeDivide(10, 2)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    if result != 5 {
        t.Errorf("SafeDivide(10, 2) = %d; esperado 5", result)
    }

    _, err = SafeDivide(10, 0)
    if err == nil {
        t.Error("Esperaba error al dividir por cero")
    }
}`
        },
        exercise: {
            question: "Escribe una función que devuelva dos strings: 'Hola' y 'Mundo'.", initialCode: `package main\n\nimport "fmt"\n\n// Tu función aquí\n\nfunc main() {\n    // Llama a tu función\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc saludar() (string, string) {\n    return "Hola", "Mundo"\n}\n\nfunc main() {\n    a, b := saludar()\n    fmt.Println(a, b)\n}`
        }
    },
    {
        id: 'variadic-functions', category: 'Functions', title: 'Variadic Functions', description: 'Las funciones variádicas pueden ser llamadas con cualquier número de argumentos finales.', guide: `Una función variádica acepta un número variable de argumentos. El ejemplo más famoso es \`fmt.Println\`, que puede tomar 1, 2, o 20 cosas para imprimir.    
    **Cómo funciona:**
    El último parámetro se declara con \`...Tipo\`.
    Dentro de la función, ese parámetro se comporta exactamente como un Slice (\`[]Tipo\`).
    
    **Spread Operator Inverso:**
    Si ya tienes un slice y quieres pasarlo a una función variádica, sufijas el slice con \`...\` para "desempaquetarlo".
    \`slice := []int{1, 2, 3}\`
    \`sum(slice...)\``,
        useCase: {
            title: "Logger Flexible", description: "Quieres una función de log que acepte un mensaje base y CUALQUIER cantidad de detalles extra, sin obligarte a crear un slice manualmente.", code: `func Log(msg string, details ...string) {
    fmt.Println("[LOG]:", msg)
    for _, d := range details {
        fmt.Println(" -", d)
    }
}

func main() {
    Log("Error de conexión") 
    Log("Usuario creado", "ID: 55", "Rol: Admin")
}`
        },
        explanation: [
            { text: "`fmt.Println` es una función variádica común.", lineCode: null },
            { text: "Aquí hay una función que tomará un número arbitrario de `ints` como argumentos.", lineCode: 'func sum(nums ...int) { ... }' },
            { text: "Dentro de la función, el tipo de `nums` es equivalente a `[]int`.", lineCode: 'for _, num := range nums { ... }' },
            { text: "Si ya tienes múltiples argumentos en un slice, aplícalos a una función variádica usando `func(slice...)`.", lineCode: 'sum(nums...)' }
        ],
        code: `package main

import "fmt"

func sum(nums ...int) {
    fmt.Print(nums, " ")
    total := 0
    for _, num := range nums {
        total += num
    }
    fmt.Println(total)
}

func main() {

    sum(1, 2)
    sum(1, 2, 3)

    nums := []int{1, 2, 3, 4}
    sum(nums...)
}`,
        testExample: {
            description: "Probamos una función variádica que suma números.", functionCode: `// variadic.go
func Sum(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}`,
            testCode: `// variadic_test.go
func TestSum(t *testing.T) {
    if Sum(1, 2, 3) != 6 {
        t.Error("Sum(1, 2, 3) debería ser 6")
    }
    if Sum() != 0 {
        t.Error("Sum() sin argumentos debería ser 0")
    }
    if Sum(10) != 10 {
        t.Error("Sum(10) debería ser 10")
    }
}`
        },
        exercise: {
            question: "Modifica la función variádica `sum` para que multiplique los números en lugar de sumarlos.", initialCode: `package main\n\nimport "fmt"\n\nfunc mult(nums ...int) {\n    total := 1\n    // Tu lógica aquí\n    fmt.Println(total)\n}\n\nfunc main() {\n    mult(2, 3, 4)\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc mult(nums ...int) {\n    total := 1\n    for _, num := range nums {\n        total *= num\n    }\n    fmt.Println(total)\n}\n\nfunc main() {\n    mult(2, 3, 4)\n}`
        }
    },
    {
        id: 'closures', category: 'Functions', title: 'Closures', description: 'Go soporta funciones anónimas, que pueden formar closures.', guide: `**¿Qué es un Closure?**    Imagina una función que viaja con una **Mochila**.
    
    Normalmente, cuando una función termina, sus variables locales desaparecen. Pero un Closure es especial: "captura" o "cierra sobre" las variables que existían cuando fue creada y las guarda en su mochila.
    
    *   **Estado Privado**: Solo la función tiene acceso a lo que hay en su mochila.
    *   **Persistencia**: Cada vez que llamas a la función, abre la misma mochila y encuentra sus datos tal como los dejó (modificados).
    
    **Analogía:**
    Es como tener un contador manual (clicker). El contador *recuerda* el número actual. Puedes pasárselo a un amigo, y seguirá contando desde donde lo dejaste. No empieza de cero.`,
        useCase: {
            title: "Generador de IDs Secuenciales", description: "Necesitas generar IDs únicos (1, 2, 3...) sin usar variables globales peligrosas. Un closure puede encapsular el estado del contador de forma segura y privada.", code: `func NewIDGenerator() func() int {
    id := 0
    return func() int {
        id++
        return id
    }
}

func main() {
    gen := NewIDGenerator()
    println(gen()) // 1
    println(gen()) // 2
}`
        },
        explanation: [
            { text: "Esta función `intSeq` devuelve otra función, que definimos anónimamente en el cuerpo de `intSeq`. La función devuelta 'cierra sobre' la variable `i` para formar una closure.", lineCode: 'func intSeq() func() int { ... }' },
            { text: "Llamamos a `intSeq`, asignando el resultado (una función) a `nextInt`. Esta función captura su propio valor de `i`, que se actualizará cada vez que llamemos a `nextInt`.", lineCode: 'nextInt := intSeq()' }
        ],
        code: `package main

import "fmt"

func intSeq() func() int {
    i := 0
    return func() int {
        i++
        return i
    }
}

func main() {

    nextInt := intSeq()

    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())

    newInts := intSeq()
    fmt.Println(newInts())
}`,
        testExample: {
            description: "Probamos un closure que mantiene estado entre llamadas.", functionCode: `// counter.go
func MakeCounter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}`,
            testCode: `// counter_test.go
func TestMakeCounter(t *testing.T) {
    counter := MakeCounter()

    if counter() != 1 {
        t.Error("Primera llamada debería ser 1")
    }
    if counter() != 2 {
        t.Error("Segunda llamada debería ser 2")
    }
    if counter() != 3 {
        t.Error("Tercera llamada debería ser 3")
    }
}`
        },
        exercise: {
            question: "Crea un closure que actúe como contador, incrementando de 10 en 10.", initialCode: `package main\n\nimport "fmt"\n\nfunc contador() func() int {\n    i := 0\n    // Tu código aquí\n}\n\nfunc main() {\n    c := contador()\n    fmt.Println(c())\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc contador() func() int {\n    i := 0\n    return func() int {\n        i += 10\n        return i\n    }\n}\n\nfunc main() {\n    c := contador()\n    fmt.Println(c())\n}`
        }
    },
    {
        id: 'recursion', category: 'Functions', title: 'Recursion (Recursión)', description: 'Go soporta funciones recursivas.', guide: `La recursión ocurre cuando una función se llama a sí misma.    
    **Advertencia:**
    A diferencia de algunos lenguajes funcionales, Go NO garantiza la optimización de llamada de cola (Tail Call Optimization).
    Esto significa que una recursión muy profunda podría causar un desbordamiento de pila (Stack Overflow). Para iteraciones masivas, prefiere usar bucles \`for\`.
    
    Sin embargo, para algoritmos como recorrer árboles o estructuras de datos anidadas, la recursión sigue siendo la herramienta más limpia y legible.`,
        useCase: {
            title: "Navegar un Sistema de Archivos", description: "Necesitas listar todos los archivos dentro de una carpeta y sus subcarpetas ( y las subcarpetas de sus subcarpetas...). La estructura es un árbol, ideal para recursión.", code: `func listarArchivos(dir string) {
    archivos, _ := os.ReadDir(dir)
    for _, f := range archivos {
        path := filepath.Join(dir, f.Name())
        if f.IsDir() {
            listarArchivos(path) // Llamada Recursiva
        } else {
            fmt.Println("Archivo:", path)
        }
    }
}`
        },
        explanation: [
            { text: "Esta función `fact` se llama a sí misma hasta que llega al caso base de `fact(0)`.", lineCode: 'func fact(n int) int { ... }' },
            { text: "Las closures también pueden ser recursivas, pero esto requiere que la closure se declare con `var` tipado explícitamente antes de que se defina.", lineCode: 'var fib func(n int) int' }
        ],
        code: `package main

import "fmt"

func fact(n int) int {
    if n == 0 {
        return 1
    }
    return n * fact(n-1)
}

func main() {
    fmt.Println(fact(7))

    var fib func(n int) int

    fib = func(n int) int {
        if n < 2 {
            return n
        }
        return fib(n-1) + fib(n-2)
    }

    fmt.Println(fib(7))
}`,
        testExample: {
            description: "Probamos una función recursiva que calcula el factorial.", functionCode: `// factorial.go
func Factorial(n int) int {
    if n == 0 {
        return 1
    }
    return n * Factorial(n-1)
}`,
            testCode: `// factorial_test.go
func TestFactorial(t *testing.T) {
    if Factorial(0) != 1 {
        t.Error("Factorial(0) debería ser 1")
    }
    if Factorial(5) != 120 {
        t.Error("Factorial(5) debería ser 120")
    }
    if Factorial(3) != 6 {
        t.Error("Factorial(3) debería ser 6")
    }
}`
        },
        exercise: {
            question: "Escribe una función recursiva `countdown` que imprima los números desde n hasta 1. (Usa 5 como ejemplo).", initialCode: `package main\n\nimport "fmt"\n\nfunc countdown(n int) {\n    // Tu lógica recursiva aquí\n}\n\nfunc main() {\n    countdown(5)\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc countdown(n int) {\n    if n > 0 {\n        fmt.Println(n)\n        countdown(n - 1)\n    }\n}\n\nfunc main() {\n    countdown(5)\n}`
        }
    },
    {
        id: 'range-over-built-in-types', category: 'Iteration', title: 'Range over Built-in Types', description: '`range` itera sobre elementos en varias estructuras de datos.', guide: `El bucle \`range\` es la navaja suiza de la iteración en Go. Se adapta inteligentemente a la estructura de datos que le pases.
    **Comportamiento por Tipo:**
    *   Slice/Array: Devuelve \`(índice, valor)\`.
    *   Map: Devuelve \`(clave, valor)\`. ¡Recuerda que el orden es aleatorio!
    *   String: Devuelve \`(índice, runa)\`. Itera sobre caracteres Unicode, no solo bytes sueltos.
    *   Channel: Devuelve \`(valor)\`. Itera hasta que el canal se cierra.

    **Consejo Pro:**
    Si no necesitas el índice (o la clave), usa el guion bajo \`_\` para descartarlo: \`for _, value := range slice { ... }\`.`,
        explanation: [
            { text: "Usamos `range` para sumar números en un slice. Arreglos funcionan igual.", lineCode: 'for _, num := range nums { ... }' },
            { text: "`range` en arrays y slices proporciona tanto el índice como el valor.", lineCode: 'for i, num := range nums { ... }' },
            { text: "`range` en mapas itera sobre pares clave/valor.", lineCode: 'for k, v := range kvs { ... }' },
            { text: "`range` también puede iterar solo sobre las claves de un mapa.", lineCode: 'for k := range kvs { ... }' },
            { text: "`range` en cadenas itera sobre puntos de código Unicode (runes).", lineCode: 'for i, c := range "go" { ... }' }
        ],
        code: `package main
import "fmt"
func main() {
    nums := []int{2, 3, 4}
    sum := 0
    for _, num := range nums {
        sum += num
    }
    fmt.Println("sum:", sum)

    for i, num := range nums {
        if num == 3 {
            fmt.Println("index:", i)
        }
    }

    kvs := map[string]string{"a": "apple", "b": "banana"}
    for k, v := range kvs {
        fmt.Printf("%s -> %s\\n", k, v)
    }

    for k := range kvs {
        fmt.Println("key:", k)
    }

    for i, c := range "go" {
        fmt.Println(i, c)
    }
}`,
        testExample: {
            description: "Probamos una función que suma todos los elementos de un slice usando range.", functionCode: `// rangesum.go
func SumWithRange(nums []int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}`,
            testCode: `// rangesum_test.go
func TestSumWithRange(t *testing.T) {
    nums := []int{1, 2, 3, 4, 5}
    result := SumWithRange(nums)
    expected := 15
    if result != expected {
        t.Errorf("SumWithRange(%v) = %d; esperado %d", nums, result, expected)
    }
}`
        },
        exercise: {
            question: "Itera sobre el slice `['a', 'b', 'c']` e imprime cada índice y su valor.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    chars := []string{"a", "b", "c"}\n    // Tu bucle range aquí\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    chars := []string{"a", "b", "c"}\n    for i, char := range chars {\n        fmt.Println(i, char)\n    }\n}`
        }
    },
    {
        id: 'pointers', category: 'Basic Data Types & Variables', title: 'Pointers (Punteros)', description: 'Go soporta punteros, permitiendo pasar referencias a valores.', guide: `Punteros vs Valores: La Analogía del Documento    
    *   **Por Valor (Copia)**: Es como enviarle un **PDF** a un amigo. Si él edita el PDF, tu archivo original NO cambia. Son copias independientes.
    *   **Por Puntero (Referencia)**: Es como compartir un **Link de Google Docs**. Si tu amigo edita el documento accediendo al link, TÚ verás los cambios en tiempo real. Solo hay UN documento original.
    
    **Sintaxis Go:**
    1.  **\`&variable\` (Obtener Link)**: "Dame la dirección de memoria (el link) de esta variable".
    2.  **\`*puntero\` (Abrir Link)**: "Ve a esta dirección y dame el valor que hay ahí" (Desreferenciar).
    
    **¿Cuándo usarlos?**
    1.  **Modificar**: Quieres cambiar el dato original (mutabilidad).
    2.  **Eficiencia**: Tienes una estructura gigante (ej. imagen 4K). No quieres copiar 50MB cada vez que llamas a una función. Pasas el "link" (puntero), que pesa nada (8 bytes).
    
    **Pointers with Structs (Structura Mágica):**
    En C, para acceder a un campo de un puntero a struct usabas \`->\`.
    En Go, Go **interpreta** el operador \`.\` automáticamente (autodesreferencia).
    \`\`\`go
    p := &User{Name: "Alice"}
    // Ambas funcionan igual, Go hace la desreferencia por ti:
    fmt.Println((*p).Name) // Forma explícita (Desreferencia manual)
    fmt.Println(p.Name)    // Forma Go (azúcar sintáctico)
    \`\`\`
    
    **Pointers with Maps & Slices:**
    ¡Cuidado! Slices y Maps YA se comportan como referencias (tienen punteros internos).
    *   **Maps & Slices**: Normalmente **NO** necesitas pasar punteros a ellos (\`*[]int\` o \`*map\`).
    *   Si pasas un Slice a una función y modificas el contenido (\`s[0] = 1\`), el cambio **SE VE** fuera.
    *   Solo usa punteros a slices si necesitas modificar el *header* del slice (ej. hacer \`append\` y que el cambio de tamaño se vea fuera sin retornar el slice).`,
        useCase: {
            title: "Actualizar Email de Usuario (Estado Mutable)", description: "Si pasas un usuario a una función `UpdateEmail(u User)`, Go trabaja sobre una COPIA. El usuario original no cambiará. Debes pasar un puntero `UpdateEmail(u * User)` para modificar el original.", code: `type User struct { Email string }

// Mal: Modifica una copia
func updateBad(u User) {
        u.Email = "new@mail.com"
    }

// Bien: Modifica el original
func updateGood(u * User) {
        u.Email = "new@mail.com"
    }

func main() {
        u:= User{ Email: "old@mail.com" }
    
    updateGood(& u) // Pasamos la dirección (&)
    println(u.Email) // Imprime: new@mail.com
}`
        },

        explanation: [
            { text: "`zeroval` tiene un parámetro `int`, por lo que los argumentos se pasarán por valor. `zeroval` obtendrá una copia de `ival` distinta a la de la función llamante.", lineCode: 'func zeroval(ival int) { ... }' },
            { text: "`zeroptr` tiene un parámetro ` * int`, lo que significa que toma un puntero a un `int`. El ` * iptr` en el cuerpo desreferencia el puntero para acceder al valor actual.", lineCode: 'func zeroptr(iptr *int) { ... }' },
            { text: "La sintaxis `& i` obtiene la dirección de memoria de `i`, es decir, un puntero a `i`.", lineCode: 'zeroptr(&i)' }
        ],
        code: `package main
import "fmt"
func zeroval(ival int) {
    ival = 0
}
func zeroptr(iptr * int) {
    * iptr = 0
}
func main() {
    i:= 1
    fmt.Println("initial:", i)
    zeroval(i)
    fmt.Println("zeroval:", i)
    zeroptr(& i)
    fmt.Println("zeroptr:", i)
    fmt.Println("pointer:", & i)
} `,
        testExample: {
            description: "Probamos una función que incrementa un valor usando punteros.", functionCode: `// pointer.go
func Increment(n * int) {
    * n = * n + 1
} `,
            testCode: `// pointer_test.go
func TestIncrement(t * testing.T) {
    value:= 5
    Increment(& value)
    if value != 6 {
        t.Errorf("Después de Increment, value = %d; esperado 6", value)
    }
} `
        },
        exercise: {
            question: "Crea una función que tome un puntero a entero y duplique su valor.", initialCode: `package main\n\nimport "fmt"\n\nfunc duplicar(n * int) {
\n    // Tu lógica aquí\n}\n\nfunc main() {\n    x := 5\n    duplicar(&x)\n    fmt.Println(x) // Debería imprimir 10\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc duplicar(n *int) {\n    *n = *n * 2\n}\n\nfunc main() {\n    x := 5\n    duplicar(&x)\n    fmt.Println(x)\n}`
        }
    },
    {
        id: 'strings-and-runes', category: 'Basic Data Types & Variables', title: 'Strings and Runes', description: 'Un string en Go es un slice de bytes de solo lectura. El concepto de carácter se llama `rune`.', guide: `El manejo de texto en Go distingue entre Bytes y Caracteres (Runes). Esto es crucial para el soporte de Unicode (emojis, alfabetos no latinos, etc.).
    *   String: Una secuencia inmutable de bytes. Normalmente codificada en UTF-8.
    *   Rune: Un entero (alias de \`int32\`) que representa un punto de código Unicode. Un emoji como '👋' es UN rune, pero ocupa 4 bytes en un string UTF-8.
    
    Al iterar un string con \`range\`, Go decodifica automáticamente los bytes UTF-8 en runes.`,
        explanation: [
            { text: "`s` es un literal de string con caracteres especiales (tailandés).", lineCode: 'const s = "สวัสดี"' },
            { text: "Indexing nos da los bytes brutos.", lineCode: 's[i]' },
            { text: "Un bucle `range` maneja cadenas de forma especial y decodifica cada `rune` junto con su offset.", lineCode: 'for idx, runeValue := range s { ... }' }
        ],
        code: `package main
import (
    "fmt"
    "unicode/utf8"
)
func main() {
    const s = "สวัสดี"
    fmt.Println("Len:", len(s))
    for i := 0; i < len(s); i++ {
        fmt.Printf("%x ", s[i])
    }
    fmt.Println()
    fmt.Println("Rune count:", utf8.RuneCountInString(s))
    for idx, runeValue := range s {
        fmt.Printf("%#U starts at %d\\n", runeValue, idx)
    }
}`,
        testExample: {
            description: "Probamos una función que cuenta runas en un string Unicode.", functionCode: `// runecount.go
func CountRunes(s string) int {
    return utf8.RuneCountInString(s)
}`,
            testCode: `// runecount_test.go
func TestCountRunes(t *testing.T) {
    if CountRunes("hello") != 5 {
        t.Error("CountRunes('hello') debería ser 5")
    }
    if CountRunes("日本語") != 3 {
        t.Error("CountRunes('日本語') debería ser 3")
    }
}`
        },
        exercise: {
            question: "Imprime la longitud en bytes y el conteo de runas de la cadena 'Holá'.", initialCode: `package main\n\nimport (\n    "fmt"\n    "unicode/utf8"\n)\n\nfunc main() {\n    s := "Holá"\n    // Tu código\n}`,
            solution: `package main\n\nimport (\n    "fmt"\n    "unicode/utf8"\n)\n\nfunc main() {\n    s := "Holá"\n    fmt.Println("Bytes:", len(s))\n    fmt.Println("Runas:", utf8.RuneCountInString(s))\n}`
        }
    },
    {
        id: 'structs', category: 'Data Structures', title: 'Structs (Estructuras)', description: 'Los structs son colecciones tipadas de campos. Son útiles para agrupar datos.', guide: `Los Structs son la versión de Go de las clases o objetos.    Te permiten definir tus propios tipos de datos compuestos.

    **No hay herencia de clases:**
    Go prefiere la Composición sobre la Herencia. No extiendes clases; incrustas structs dentro de otros structs.

    **Inicialización:**
    Puedes crear structs posicionalmente \`Punto{1, 2}\` o, preferiblemente, usando nombres de campos: \`Punto{X: 1, Y: 2}\`. Esta última forma es más robusta a futuros cambios en el struct.`,
        useCase: {
            title: "Modelado de Datos (Perfil de Usuario)", description: "En lugar de tener variables sueltas (`userName`, `userAge`, `userEmail`) o un mapa sin tipo, agrupas todo en una entidad lógica. Esto da estructura y seguridad a tu código.", code: `// Definición clara de la entidad
type User struct {
    ID    int
    Name  string
    Email string
    Admin bool
}

func main() {
    // Creación limpia
    u := User{
        ID:    1,
        Name:  "Alice",
        Email: "alice@example.com",
    }
    fmt.Println(u.Name)
}`
        },
        explanation: [
            { text: "Este struct `person` tiene campos `name` y `age`.", lineCode: 'type person struct { ... }' },
            { text: "Crea un nuevo struct.", lineCode: 'person{"Bob", 20}' },
            { text: "Puedes nombrar los campos al inicializar.", lineCode: 'person{name: "Alice", age: 30}' },
            { text: "Accede a los campos con un punto.", lineCode: 's.name' },
            { text: "Los punteros a structs también se desreferencian automáticamente.", lineCode: 'sp := &s\nfmt.Println(sp.age)' }
        ],
        code: `package main
import "fmt"
type person struct {
    name string
    age  int
}
func newPerson(name string) *person {
    p := person{name: name}
    p.age = 42
    return &p
}
func main() {
    fmt.Println(person{"Bob", 20})
    fmt.Println(person{name: "Alice", age: 30})
    fmt.Println(person{name: "Fred"})
    fmt.Println(&person{name: "Ann", age: 40})
    fmt.Println(newPerson("Jon"))

    s := person{name: "Sean", age: 50}
    fmt.Println(s.name)

    sp := &s
    fmt.Println(sp.age)

    sp.age = 51
    fmt.Println(sp.age)
}`,
        testExample: {
            description: "Probamos una función que crea y trabaja con estructuras.", functionCode: `// person.go
type Person struct {
    Name string
    Age  int
}

func NewPerson(name string, age int) Person {
    return Person{Name: name, Age: age}
}`,
            testCode: `// person_test.go
func TestNewPerson(t *testing.T) {
    p := NewPerson("Alice", 30)
    if p.Name != "Alice" {
        t.Errorf("Name = %s; esperado Alice", p.Name)
    }
    if p.Age != 30 {
        t.Errorf("Age = %d; esperado 30", p.Age)
    }
}`
        },
        exercise: {
            question: "Define una estructura `Coche` con campos `Marca` y `Modelo`. Crea una instancia e imprímela.", initialCode: `package main\n\nimport "fmt"\n\n// Tu struct aquí\n\nfunc main() {\n    // Crea e imprime tu instancia\n}`,
            solution: `package main\n\nimport "fmt"\n\ntype Coche struct {\n    Marca string\n    Modelo string\n}\n\nfunc main() {\n    c := Coche{Marca: "Toyota", Modelo: "Corolla"}\n    fmt.Println(c)\n}`
        }
    },
    {
        id: 'methods', category: 'Object-Oriented Concepts', title: 'Methods (Métodos)', description: 'Go soporta métodos definidos en tipos de struct.', guide: `Un Método en Go es simplemente una función que tiene un "receptor" especial.    
    \`func (r *Rectangulo) Area() int\`

    **Receptores de Puntero vs Valor:**
    *   Puntero (\`*T\`): Usa esto si necesitas MODIFICAR el struct, o si el struct es muy grande y quieres evitar copiarlo. Es lo más común.
    *   Valor (\`T\`): Usa esto si el struct es pequeño, inmutable, o si quieres asegurar que el método no tenga efectos secundarios sobre el objeto original.`,
        useCase: {
            title: "Encapsulación (Cuenta Bancaria)", description: "En lugar de permitir cambiar `saldo` directamente (peligroso), obligas a usar métodos `Depositar()` que incluyen validaciones. Proteges el estado de tu objeto.", code: `type Cuenta struct { saldo float64 }

func (c *Cuenta) Depositar(monto float64) {
    if monto > 0 {
        c.saldo += monto
    }
}

func main() {
    c := Cuenta{saldo: 10}
    c.Depositar(50)
    // c.Depositar(-100) // Lógica protegida
    fmt.Println(c.saldo) // 60
}`
        },
        explanation: [
            { text: "`area` tiene un receptor de tipo `*rect` (puntero).", lineCode: 'func (r *rect) area() int' },
            { text: "Los métodos pueden definirse para receptores de valor o de puntero.", lineCode: 'func (r rect) perim() int' },
            { text: "Go maneja automáticamente la conversión entre valores y punteros para llamadas a métodos.", lineCode: 'rp.area()' }
        ],
        code: `package main
import "fmt"
type rect struct {
    width, height int
}
func (r *rect) area() int {
    return r.width * r.height
}
func (r rect) perim() int {
    return 2*r.width + 2*r.height
}
func main() {
    r := rect{width: 10, height: 5}
    fmt.Println("area: ", r.area())
    fmt.Println("perim:", r.perim())

    rp := &r
    fmt.Println("area: ", rp.area())
    fmt.Println("perim:", rp.perim())
}`,
        testExample: {
            description: "Probamos métodos definidos en una estructura.", functionCode: `// rectangle.go
type Rectangle struct {
    Width, Height int
}

func (r *Rectangle) Area() int {
    return r.Width * r.Height
}`,
            testCode: `// rectangle_test.go
func TestRectangleArea(t *testing.T) {
    r := Rectangle{Width: 5, Height: 10}
    area := r.Area()
    if area != 50 {
        t.Errorf("Area() = %d; esperado 50", area)
    }
}`
        },
        exercise: {
            question: "Añade un método `Escalar(f int)` al struct `rect` que multiplique su ancho y alto por `f`. (Usa receptor puntero).", initialCode: `package main\n\nimport "fmt"\n\ntype rect struct {\n    width, height int\n}\n\n// Tu método Escalar aquí\n\nfunc main() {\n    r := rect{10, 5}\n    // r.Escalar(2)\n    fmt.Println(r)\n}`,
            solution: `package main\n\nimport "fmt"\n\ntype rect struct {\n    width, height int\n}\n\nfunc (r *rect) Escalar(f int) {\n    r.width *= f\n    r.height *= f\n}\n\nfunc main() {\n    r := rect{10, 5}\n    r.Escalar(2)\n    fmt.Println(r)\n}`
        }
    },
    {
        id: 'interfaces', category: 'Object-Oriented Concepts', title: 'Interfaces', description: 'Las interfaces son colecciones nombradas de firmas de métodos.', guide: `Las Interfaces son la clave del polimorfismo y la flexibilidad en Go.    
    **Implementación Implícita:**
    A diferencia de Java/C#, en Go no declaras explícitamente que un tipo implementa una interfaz.
    Si un struct tiene los métodos que pide la interfaz, entonces *automáticamente* la implementa. Esto se conoce como "Duck Typing" estructural.
    
    **Interfaces Pequeñas:**
    El "Proverbio de Go" dice: "Cuanto más grande la interfaz, más débil la abstracción". Se prefieren interfaces de un solo método (como \`io.Reader\`) que sean fáciles de componer.`,
        useCase: {
            title: "Mocking de Base de Datos para Testing", description: "Imagina que tienes una función que guarda usuarios en Postgres. Si usas directamente el struct de Postgres, tus tests dependerán de tener una DB corriendo. Usando una interfaz, puedes inyectar una DB falsa (Mock) en los tests.", code: `// Interfaz
type UserSaver interface {
    Save(User) error
}

// Prod: Struct real
type PostgresDB struct {}
func (pg PostgresDB) Save(u User) error { ... }

// Test: Mock en memoria
type MockDB struct { stored []User }
func (m *MockDB) Save(u User) error {
    m.stored = append(m.stored, u)
    return nil
}`
        },
        explanation: [
            { text: "Aquí hay una interfaz para formas geométricas.", lineCode: 'type geometry interface { ... }' },
            { text: "`rect` implementa `geometry` porque tiene todos sus métodos.", lineCode: 'func (r rect) area() float64 ...' },
            { text: "`measure` es una función genérica que funciona con cualquier `geometry`.", lineCode: 'func measure(g geometry) { ... }' }
        ],
        code: `package main
import (
    "fmt"
    "math"
)
type geometry interface {
    area() float64
    perim() float64
}
type rect struct {
    width, height float64
}
type circle struct {
    radius float64
}
func (r rect) area() float64 {
    return r.width * r.height
}
func (r rect) perim() float64 {
    return 2*r.width + 2*r.height
}
func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
    return 2 * math.Pi * c.radius
}
func measure(g geometry) {
    fmt.Println(g)
    fmt.Println(g.area())
    fmt.Println(g.perim())
}
func main() {
    r := rect{width: 3, height: 4}
    c := circle{radius: 5}
    measure(r)
    measure(c)
}`,
        testExample: {
            description: "Probamos una interfaz con diferentes implementaciones y verificamos polimorfismo.", functionCode: `// shape.go
type Shape interface {
    Area() float64
}

type Square struct {
    Side float64
}

func (s Square) Area() float64 {
    return s.Side * s.Side
}`,
            testCode: `// shape_test.go
func TestShapeInterface(t *testing.T) {
    var shape Shape = Square{Side: 4}
    result := shape.Area()
    expected := 16.0
    if result != expected {
        t.Errorf("Square.Area() = %f; esperado %f", result, expected)
    }
}`
        },
        exercise: {
            question: "Define una interfaz `Hablador` con un método `Hablar() string`. Implementala para un tipo `Perro`.", initialCode: `package main\n\nimport "fmt"\n\n// Interfaz y Struct aquí\n\nfunc main() {\n    // Llama a Hablar\n}`,
            solution: `package main\n\nimport "fmt"\n\ntype Hablador interface {\n    Hablar() string\n}\n\ntype Perro struct{}\n\nfunc (p Perro) Hablar() string {\n    return "Guau"\n}\n\nfunc main() {\n    var h Hablador = Perro{}\n    fmt.Println(h.Hablar())\n}`
        }
    },
    {
        id: 'enums', category: 'Data Structures', title: 'Enums', description: 'Los tipos enumerados (enums) se expresan usando constantes y `iota`.', guide: `Go no tiene una palabra clave \`enum\`. En su lugar, usa una combinación de constantes y el identificador especial \`iota\`.    
    **Patrón iota:**
    \`iota\` es un contador de constantes. Empieza en 0 y se incrementa en 1 en cada línea dentro de un bloque \`const\`.
    
    \`\`\`go
    const (
        Domingo = iota // 0
        Lunes          // 1
        Martes         // 2
    )
    \`\`\``,
        useCase: {
            title: "Estados de un Pedido (Order Status)", description: "En lugar de usar strings mágicos como 'pendiente' o 'enviado' (propensos a typos), usa un Enum seguro con constantes.", code: `type Estado int
const (
    Pendiente Estado = iota
    Pagado
    Enviado
    Entregado
)

func Procesar(e Estado) {
    if e == Pagado {
        fmt.Println("Empaquetando...")
    }
}`
        },
        explanation: [
            { text: "`iota` genera constantes sucesivas automáticamente.", lineCode: 'const ( StateIdle = iota ... )' },
            { text: "Podemos mapear los valores del enum a strings para imprimirlos.", lineCode: 'var stateName = map[ServerState]string{...}' },
            { text: "Implementar `String()` hace que se imprima bonito.", lineCode: 'func (ss ServerState) String() string { ... }' }
        ],
        code: `package main
import "fmt"
type ServerState int
const (
    StateIdle ServerState = iota
    StateConnected
    StateError
    StateRetrying
)
var stateName = map[ServerState]string{
    StateIdle:      "idle",
    StateConnected: "connected",
    StateError:     "error",
    StateRetrying:  "retrying",
}
func (ss ServerState) String() string {
    return stateName[ss]
}
func main() {
    ns := StateIdle
    fmt.Println("state:", ns)
    
    nst := StateConnected
    fmt.Println("state:", nst)
}`,
        testExample: {
            description: "Probamos que los valores de un enum con iota se asignan correctamente.", functionCode: `// priority.go
type Priority int

const (
    Low Priority = iota
    Medium
    High
)

func GetPriority(p Priority) int {
    return int(p)
}`,
            testCode: `// priority_test.go
func TestEnumValues(t *testing.T) {
    if GetPriority(Low) != 0 {
        t.Errorf("Low = %d; esperado 0", GetPriority(Low))
    }
    if GetPriority(Medium) != 1 {
        t.Errorf("Medium = %d; esperado 1", GetPriority(Medium))
    }
    if GetPriority(High) != 2 {
        t.Errorf("High = %d; esperado 2", GetPriority(High))
    }
}`
        },
        exercise: {
            question: "Crea un enum `Semana` con `Lunes` y `Martes` usando iota.", initialCode: `package main\n\nimport "fmt"\n\n// Define el enum\n\nfunc main() {\n    // Imprime los valos\n}`,
            solution: `package main\n\nimport "fmt"\n\ntype Semana int\nconst (\n    Lunes Semana = iota\n    Martes\n)\nfunc main() {\n    fmt.Println(Lunes, Martes)\n}`
        }
    },
    {
        id: 'struct-embedding', category: 'Object-Oriented Concepts', title: 'Struct Embedding', description: 'Go soporta la incrustación de structs para usar composición.', guide: `La Incrustación (Embedding) es la forma en que Go aborda la reutilización de código (similar a la herencia).    
    Si incrustas un struct anónimo dentro de otro, el struct externo "adopta" o "promueve" automáticamente los campos y métodos del interno.
    
    Es composición pura, pero con azúcar sintáctico para que parezca herencia. Puedes llamar a \`Expeterno.CampoInterno\` directamente si no hay conflictos de nombres.`,
        useCase: {
            title: "Herencia de Comportamiento (Base Logger)", description: "Tienes varios servicios que necesitan loguear. Creas un `BaseJob` que tiene el logger y otros métodos comunes, y lo incrustas en `EmailJob` y `SMSJob`.", code: `type BaseJob struct { Logger *log.Logger }
func (b *BaseJob) Log(msg string) { b.Logger.Println(msg) }

type EmailJob struct {
    BaseJob // Incrustado (Herencia funcional)
    Email   string
}

func main() {
    job := EmailJob{BaseJob: BaseJob{Logger: log.Default()}}
    job.Log("Job started") // Método heredado de BaseJob
}`
        },
        explanation: [
            { text: "`container` incrusta `base`. `container` hereda los campos y métodos de `base`.", lineCode: 'type container struct { base ... }' },
            { text: "Podemos acceder a `co.num` directamente, aunque `num` está en `base`.", lineCode: 'fmt.Println("co.num:", co.num)' },
            { text: "También hereda métodos.", lineCode: 'co.describe()' }
        ],
        code: `package main
import "fmt"
type base struct {
    num int
}
func (b base) describe() string {
    return fmt.Sprintf("base with num=%v", b.num)
}
type container struct {
    base
    str string
}
func main() {
    co := container{
        base: base{
            num: 1,
        },
        str: "some name",
    }
    fmt.Printf("co={num: %v, str: %v}\\n", co.num, co.str)
    fmt.Println("also num:", co.base.num)
    fmt.Println("describe:", co.describe())
    type describer interface {
        describe() string
    }
    var d describer = co
    fmt.Println("describer:", d.describe())
}`,
        testExample: {
            description: "Probamos que un struct incrustado promueve correctamente campos y métodos.", functionCode: `// employee.go
type Person struct {
    Name string
}

func (p Person) GetName() string {
    return p.Name
}

type Employee struct {
    Person
    Position string
}`,
            testCode: `// employee_test.go
func TestStructEmbedding(t *testing.T) {
    emp := Employee{Person: Person{Name: "Juan"}, Position: "Developer"}
    if emp.Name != "Juan" {
        t.Errorf("emp.Name = %s; esperado Juan", emp.Name)
    }
    if emp.GetName() != "Juan" {
        t.Errorf("emp.GetName() = %s; esperado Juan", emp.GetName())
    }
}`
        },
        exercise: {
            question: "Define `Persona` con campo `Nombre`, y `Empleado` que incruste `Persona` y añada `Puesto`. Crea un empleado.", initialCode: `package main\n\nimport "fmt"\n\n// Structs aquí\n\nfunc main() {\n    // Instancia\n}`,
            solution: `package main\n\nimport "fmt"\n\ntype Persona struct {\n    Nombre string\n}\ntype Empleado struct {\n    Persona\n    Puesto string\n}\nfunc main() {\n    e := Empleado{Persona: Persona{"Ana"}, Puesto: "Jefa"}\n    fmt.Println(e.Nombre, e.Puesto)\n}`
        }
    },
    {
        id: 'generics', category: 'Object-Oriented Concepts', title: 'Generics (Genéricos)', description: 'Desde Go 1.18, podemos escribir código genérico usando parámetros de tipo.', guide: `Los Genéricos fueron la característica más solicitada en la historia de Go. Permiten escribir estructuras de datos y funciones que funcionen con *cualquier* tipo, manteniendo la seguridad de tipos.
    **Sintaxis \`[T any]\`:**
    Define un parámetro de tipo \`T\`. \`any\` es una restricción (constraint) que significa "cualquier tipo" (es un alias de \`interface{}\`).
    
    **Restricciones:**
    A veces necesitas que el tipo sea comparable (soporte \`==\`). Para eso usas \`comparable\` en lugar de \`any\`.`,
        useCase: {
            title: "Pila (Stack) Genérica", description: "Antes de Go 1.18, necesitabas implementar IntStack, StringStack, etc. Con genéricos, defines una sola estructura Stack[T] que funciona con cualquier tipo, manteniendo la seguridad de compilación.", code: `type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(val T) {
    s.items = append(s.items, val)
}

func main() {
    // Funciona para ints
    s1 := Stack[int]{}
    s1.Push(10)
    
    // Funciona para strings
    s2 := Stack[string]{}
    s2.Push("hello")
}`
        },
        explanation: [
            { text: "`SlicesIndex` toma un slice de cualquier tipo `E` (que sea comparable).", lineCode: 'func SlicesIndex[S ~[]E, E comparable](s S, v E) int' },
            { text: "Podemos definir tipos struct genéricos también.", lineCode: 'type List[T any] struct { ... }' }
        ],
        code: `package main
import "fmt"
func SlicesIndex[S ~[]E, E comparable](s S, v E) int {
    for i := range s {
        if v == s[i] {
            return i
        }
    }
    return -1
}
type List[T any] struct {
    head, tail *element[T]
}
type element[T any] struct {
    next *element[T]
    val  T
}
func (l *List[T]) Push(v T) {
    if l.tail == nil {
        l.head = &element[T]{val: v}
        l.tail = l.head
    } else {
        l.tail.next = &element[T]{val: v}
        l.tail = l.tail.next
    }
}
func (l *List[T]) GetAll() []T {
    var elems []T
    for e := l.head; e != nil; e = e.next {
        elems = append(elems, e.val)
    }
    return elems
}
func main() {
    var s = []string{"foo", "bar", "zoo"}
    fmt.Println("index of zoo:", SlicesIndex(s, "zoo"))
    _ = SlicesIndex[[]string, string](s, "zoo")
    lst := List[int]{}
    lst.Push(10)
    lst.Push(13)
    lst.Push(23)
    fmt.Println("list:", lst.GetAll())
}`,
        testExample: {
            description: "Probamos una función genérica que encuentra el máximo entre dos valores comparables.", functionCode: `// max.go
func Max[T comparable](a, b T) T {
    // Nota: esta implementación simplificada asume que T tiene operador >
    // En la práctica real necesitarías constraints.Ordered
    if a > b {
        return a
    }
    return b
}`,
            testCode: `// max_test.go
func TestMax(t *testing.T) {
    result := Max(5, 3)
    if result != 5 {
        t.Errorf("Max(5, 3) = %d; esperado 5", result)
    }

    resultStr := Max("beta", "alfa")
    if resultStr != "beta" {
        t.Errorf("Max(beta, alfa) = %s; esperado beta", resultStr)
    }
}`
        },
        exercise: {
            question: "Escribe una función genérica `Identidad[T any](v T) T` que simplemente devuelva el valor recibido.", initialCode: `package main\n\nimport "fmt"\n\n// Tu función genérica\n\nfunc main() {\n    fmt.Println(Identidad("Hola"))\n    fmt.Println(Identidad(123))\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc Identidad[T any](v T) T {\n    return v\n}\n\nfunc main() {\n    fmt.Println(Identidad("Hola"))\n    fmt.Println(Identidad(123))\n}`
        }
    },
    {
        id: 'range-over-iterators', category: 'Iteration', title: 'Range over Iterators', description: 'Go 1.23 introduce iteradores estándar para usar con `range`.', guide: `Nuevo en Go 1.23+: Ahora puedes crear tus propios iteradores personalizados y usarlos directamente en un bucle \`for range\`.    
    Esto estandariza cómo se iteran las secuencias personalizadas (como un generador de Fibonacci, o filas de una base de datos), sin tener que exponer detalles internos o usar canales (que son más lentos para este propósito).`,
        explanation: [
            { text: "Un iterador es una función que recibe una función `yield` y la llama para cada valor.", lineCode: 'func genFib() iter.Seq[int]' },
            { text: "Podemos usar `for n := range iterador()` para consumir valores.", lineCode: 'for n := range genFib()' }
        ],
        code: `package main
import (
    "fmt"
    "iter"
)
func genFib() iter.Seq[int] {
    return func(yield func(int) bool) {
        a, b := 1, 1
        for {
            if !yield(a) {
                return
            }
            a, b = b, a+b
        }
    }
}
func main() {
    for n := range genFib() {
        if n >= 10 {
            break
        }
        fmt.Println(n)
    }
}`,
        testExample: {
            description: "Probamos un generador de números que implementa un iterador personalizado.", functionCode: `// generator.go
import "iter"

func GenerateNumbers(max int) iter.Seq[int] {
    return func(yield func(int) bool) {
        for i := 1; i <= max; i++ {
            if !yield(i) {
                return
            }
        }
    }
}`,
            testCode: `// generator_test.go
func TestGenerateNumbers(t *testing.T) {
    var result []int
    for n := range GenerateNumbers(3) {
        result = append(result, n)
    }
    if len(result) != 3 {
        t.Errorf("GenerateNumbers(3) produjo %d valores; esperado 3", len(result))
    }
    if result[0] != 1 || result[1] != 2 || result[2] != 3 {
        t.Errorf("GenerateNumbers(3) = %v; esperado [1 2 3]", result)
    }
}`
        },
        exercise: {
            question: "Para este ejercicio, simularemos un iterador simple que produzca 1, 2, 3. (Nota: Requiere Go 1.23+)", initialCode: `package main\n\nimport "fmt"\n// import "iter" (simulado)\n\nfunc main() {\n    // ... \n}`,
            solution: `// Solución conceptual, requiere Go 1.23 environment\npackage main\nimport "fmt"\nimport "iter"\nfunc oneTwoThree() iter.Seq[int] {\n return func(yield func(int) bool) {\n   yield(1); yield(2); yield(3)\n }\n}`
        }
    },
    {
        id: 'errors', category: 'Error Handling', title: 'Errors (Errores)', description: 'Es idiomático en Go comunicar errores mediante un valor de retorno explícito y separado.', guide: `En Go, los errores son valores. No excepciones.    
    Esto significa que manejas los errores con la misma lógica que usas para cualquier dato: \`if\`, condicionales, retornos.
    
    *   No entres en pánico (panic) a menos que sea un error verdaderamente irrecuperable (como fallar al iniciar el programa).
    *   Devuelve siempre el error como el último valor de retorno.`,
        useCase: {
            title: "Enriquecer Errores (Error Wrapping)", description: "Una consulta SQL falla. Si solo devuelves el error original, pierdes el contexto (¿qué usuario falló?). Usa `fmt.Errorf` con `%w` para envolver el error con contexto extra.", code: `func GetUser(id int) error {
    err := db.Query("...")
    if err != nil {
        // Añade contexto: "fetching user 42: sql connection error"
        return fmt.Errorf("fetching user %d: %w", id, err)
    }
    return nil
}`
        },
        explanation: [
            { text: "Por convención, el error es el último valor de retorno y tiene tipo `error`.", lineCode: 'func f(arg int) (int, error)' },
            { text: "`errors.New` construye un error básico.", lineCode: 'errors.New("mensaje")' },
            { text: "Un valor `nil` indica que no hubo error.", lineCode: 'return arg + 3, nil' },
            { text: "`e.Error()` obtiene el mensaje de error.", lineCode: 'e.Error()' }
        ],
        code: `package main
import (
    "errors"
    "fmt"
)
func f1(arg int) (int, error) {
    if arg == 42 {
        return -1, errors.New("can't work with 42")
    }
    return arg + 3, nil
}
type argError struct {
    arg  int
    prob string
}
func (e *argError) Error() string {
    return fmt.Sprintf("%d - %s", e.arg, e.prob)
}
func f2(arg int) (int, error) {
    if arg == 42 {
        return -1, &argError{arg, "can't work with 42"}
    }
    return arg + 3, nil
}
func main() {
    for _, i := range []int{7, 42} {
        if r, e := f1(i); e != nil {
            fmt.Println("f1 failed:", e)
        } else {
            fmt.Println("f1 worked:", r)
        }
    }
    for _, i := range []int{7, 42} {
        if r, e := f2(i); e != nil {
            fmt.Println("f2 failed:", e)
        } else {
            fmt.Println("f2 worked:", r)
        }
    }
}`,
        testExample: {
            description: "Probamos el manejo de errores en una función que puede fallar.", functionCode: `// division.go
import "errors"

func Divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("no se puede dividir por cero")
    }
    return a / b, nil
}`,
            testCode: `// division_test.go
func TestDivide(t *testing.T) {
    result, err := Divide(10, 2)
    if err != nil {
        t.Errorf("Divide(10, 2) retornó error inesperado: %v", err)
    }
    if result != 5 {
        t.Errorf("Divide(10, 2) = %d; esperado 5", result)
    }

    _, err = Divide(10, 0)
    if err == nil {
        t.Error("Divide(10, 0) debería retornar error")
    }
}`
        },
        exercise: {
            question: "Crea una función `dividir(a, b int)` que devuelva un error si `b` es 0.", initialCode: `package main\n\nimport ("errors"; "fmt")\n\n// Tu función dividir\n\nfunc main() {\n    // Prueba con 10/0\n}`,
            solution: `package main\n\nimport ("errors"; "fmt")\n\nfunc dividir(a, b int) (int, error) {\n    if b == 0 {\n        return 0, errors.New("división por cero")\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    if _, err := dividir(10, 0); err != nil {\n        fmt.Println(err)\n    }\n}`
        }
    },
    {
        id: 'custom-errors', category: 'Error Handling', title: 'Custom Errors', description: 'Se pueden crear errores personalizados implementando el método `Error()`.', guide: `**Dado que \`error\` es solo una interfaz:**    \`type error interface { Error() string }\`    
    Cualquier struct que implemente este método puede ser tratado como un error. Esto te permite adjuntar contexto adicional al error (como códigos de error, IDs de usuario, o metadatos de reintento) en lugar de solo devolver un string plano.`,
        explanation: [
            { text: "Un struct personalizado puede almacenar metadatos del error.", lineCode: 'type argError struct { ... }' },
            { text: "Implementar `Error() string` satisface la interfaz `error`.", lineCode: 'func (e *argError) Error() string { ... }' },
            { text: "`errors.As` se usa para comprobar si un error es de un tipo específico.", lineCode: 'errors.As(err, &ae)' }
        ],
        code: `package main
import (
    "errors"
    "fmt"
)
type argError struct {
    arg  int
    prob string
}
func (e *argError) Error() string {
    return fmt.Sprintf("%d - %s", e.arg, e.prob)
}
func f(arg int) (int, error) {
    if arg == 42 {
        return -1, &argError{arg, "can't work with 42"}
    }
    return arg + 3, nil
}
func main() {
    _, err := f(42)
    var ae *argError
    if errors.As(err, &ae) {
        fmt.Println(ae.arg)
        fmt.Println(ae.prob)
    }
}`,
        testExample: {
            description: "Probamos un error personalizado con metadatos adicionales usando errors.As.", functionCode: `// validation.go
import "fmt"

type ValidationError struct {
    Field string
    Value interface{}
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("campo %s tiene valor inválido: %v", e.Field, e.Value)
}

func ValidateAge(age int) error {
    if age < 0 {
        return &ValidationError{Field: "age", Value: age}
    }
    return nil
}`,
            testCode: `// validation_test.go
import "errors"

func TestValidationError(t *testing.T) {
    err := ValidateAge(-5)
    if err == nil {
        t.Fatal("ValidateAge(-5) debería retornar error")
    }

    var ve *ValidationError
    if !errors.As(err, &ve) {
        t.Fatal("El error debería ser del tipo ValidationError")
    }
    if ve.Field != "age" {
        t.Errorf("ValidationError.Field = %s; esperado age", ve.Field)
    }
}`
        },
        exercise: {
            question: "Define un error `miError` (struct vacío) e implementa el método `Error()` que devuelva 'error fatal'.", initialCode: `package main\n\nimport "fmt"\n\n// Tu struct y método\n\nfunc main() {\n    var e error = &miError{}\n    fmt.Println(e)\n}`,
            solution: `package main\n\nimport "fmt"\n\ntype miError struct{}\n\nfunc (m *miError) Error() string {\n    return "error fatal"\n}\n\nfunc main() {\n    var e error = &miError{}\n    fmt.Println(e)\n}`
        }
    },
    {
        id: 'goroutines', category: 'Concurrency (Goroutines & Channels)', title: 'Goroutines', description: 'Una goroutine es un hilo de ejecución ligero.', guide: `**¿Qué es una Goroutine?**    Imagina que estás cocinando. Tienes muchas tareas: cortar verduras, hervir agua, freír carne.
    
    *   **Secuencial (Sin Goroutines)**: Cortas todo, **luego** hierves el agua (esperas mirando la olla), **luego** fríes. Tardas mucho.
    *   **Concurrente (Goroutines)**: Pones el agua a hervir y, **mientras** se calienta, cortas las verduras. Aprovechas el tiempo de espera.
    
    **En términos técnicos:**
    Una Goroutine es una función que se ejecuta de manera **independiente** (concurrentemente) al resto del programa. Es extremademente ligera (2KB de memoria vs 1-2MB de un hilo tradicional). Puedes tener millones de ellas.
    
    **¿Cómo se usa?**
    **Simplemente agrega la palabra clave \`go\` antes de llamar a una función:**
    \`go miFuncion(param)\`
    
    **El problema de la sincronización**
    Si lanzas una goroutine, el programa principal NO espera a que termine. Si la función \`main\` acaba, todas las goroutines mueren instantáneamente.
    
    **La Solución: Channels (Canales)**
    Los canales son "tuberías" por donde las goroutines se pasan datos o se avisan de que terminaron. Evitan que tengas que usar "bloqueos" (locks) de memoria manuales.
    
    **Sintaxis de Canales:**
    Piensa en la flecha \`<-\` como el flujo de datos.
    1.  **Enviar Datos**: \`canal <- dato\` (Mete el dato EN el canal).
    2.  **Recibir Datos**: \`dato := <-canal\` (Saca el dato DEL canal).
    
    **Advertencia:**
    *   Enviar a un canal sin receptor bloquea la goroutine.
    *   Recibir de un canal vacío bloquea la goroutine hasta que llegue algo.`,
        useCase: {
            title: "Procesamiento de Logs en Background", description: "Cuando un usuario hace login, quieres registrar ese evento en un servicio externo (lo cual es lento). No hagas esperar al usuario. Lanza una goroutine para enviar el log en segundo plano.", code: `func LoginHandler(w http.ResponseWriter, r *http.Request) {
    // 1. Validar usuario (rápido)
    user := validateUser(r)

    // 2. Responder al usuario inmediatamente
    fmt.Fprintln(w, "Login exitoso!")

    // 3. Enviar log en background (lento)
    go func() {
        sendToLogService("User logged in: " + user.ID)
    }()
}`
        },
        explanation: [
            { text: "Llamar a una función con `go` la ejecuta concurrentemente.", lineCode: 'go f("goroutine")' },
            { text: "También puedes iniciar goroutines con funciones anónimas.", lineCode: 'go func(msg string) { ... }' },
            { text: "El operador `<-` se usa para enviar o recibir datos de un canal.", lineCode: 'ch <- v    // Enviar v al canal ch\nv := <-ch  // Recibir del canal ch' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func f(from string) {
    for i := 0; i < 3; i++ {
        fmt.Println(from, ":", i)
    }
}
func main() {
    f("direct")
    go f("goroutine")
    
    // Canal para sincronización
    done := make(chan bool)
    
    go func(msg string) {
        fmt.Println(msg)
        done <- true // Enviamos señal
    }("going")
    
    <-done // Esperamos señal
    fmt.Println("done")
}`,
        testExample: {
            description: "Probamos que una goroutine ejecuta una función concurrentemente usando un canal. Nota: `<-` es el operador de canal. `canal <- valor` envía datos, `variable := <-canal` recibe datos.", functionCode: `// worker.go
func DoWork(done chan bool) {
    // Simula trabajo
    done <- true
}`,
            testCode: `// worker_test.go
func TestGoroutine(t *testing.T) {
    done := make(chan bool)
    go DoWork(done)

    result := <-done
    if !result {
        t.Error("La goroutine no completó el trabajo correctamente")
    }
}`
        },
        exercise: {
            question: "Lanza una goroutine que imprima 'Hola desde goroutine' 5 veces.", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    // Tu goroutine\n    time.Sleep(100 * time.Millisecond)\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    go func() {\n        for i:=0; i<5; i++ {\n            fmt.Println("Hola desde goroutine")\n        }\n    }()\n    time.Sleep(100 * time.Millisecond)\n}`
        }
    },
    {
        id: 'channels', category: 'Concurrency (Goroutines & Channels)', title: 'Channels (Canales)', description: 'Los canales son las tuberías que conectan goroutines concurrentes.', guide: `**Channels: La carrera de relevos**    
    Imagina una carrera de relevos donde un corredor debe pasarle el testigo (baton) al siguiente.
    
    *   **Bloqueo (Sincronización)**: El corredor que recibe (receptor) NO puede correr hasta que le den el testigo. Y el que entrega (emisor) NO puede soltarlo hasta que alguien lo agarre. Ambos se "bloquean" en el momento del intercambio.
    
    **Analogía de la Cinta Transportadora:**
    Imagina una fábrica. Una Goroutine coloca una caja en la cinta (\`ch <- caja\`). Otra Goroutine al final la recoge (\`caja := <-ch\`).
    
    *   **Unbuffered (Sin buffer)**: La cinta es de tamaño 0. El que pone la caja debe ESPERAR a que alguien ponga las manos para recibirla instantáneamente.
    *   **Buffered (Con buffer)**: La cinta tiene espacio para N cajas. Puedes poner cajas y seguir trabajando, hasta que la cinta se llene.
    
    **Filosofía Go:**
    "No te comuniques compartiendo memoria (locks complejos); comparte memoria comunicándote (channels)."`,
        useCase: {
            title: "Sistema de Cola de Trabajos (Job Queue)", description: "Tienes que redimensionar 1000 imágenes. Si lanzas 1000 goroutines a la vez, saturas el servidor. Usa un canal con buffer y un número fijo de workers para procesarlas a un ritmo constante.", code: `func main() {
    jobs := make(chan Image, 100)

    // Lanza solo 3 workers (consumidores)
    for w := 1; w <= 3; w++ {
        go worker(w, jobs)
    }

    // Envía 1000 trabajos (productores)
    for _, img := range images {
        jobs <- img
    }
    close(jobs)
}`
        },
        explanation: [
            { text: "Crea un canal con `make(chan val-type)`.", lineCode: 'messages := make(chan string)' },
            { text: "Envía un valor al canal.", lineCode: 'channel <- value' },
            { text: "Recibe un valor del canal.", lineCode: 'value := <-channel' },
            { text: "El envío y recepción bloquean hasta que ambos lados están listos.", lineCode: null }
        ],
        code: `package main
import "fmt"
func main() {
    messages := make(chan string)
    go func() { messages <- "ping" }()
    msg := <-messages
    fmt.Println(msg)
}`,
        testExample: {
            description: "Probamos la comunicación entre goroutines usando un canal.", functionCode: `// messenger.go
func SendMessage(ch chan string, msg string) {
    ch <- msg
}`,
            testCode: `// messenger_test.go
func TestChannel(t *testing.T) {
    ch := make(chan string)
    go SendMessage(ch, "test message")

    result := <-ch
    expected := "test message"
    if result != expected {
        t.Errorf("Recibido %s; esperado %s", result, expected)
    }
}`
        },
        exercise: {
            question: "Crea un canal entero, envía el número 42 en una goroutine, y léelo en el main.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int)\n    go func() { ch <- 42 }()\n    fmt.Println(<-ch)\n}`
        }
    },
    {
        id: 'channel-buffering', category: 'Concurrency (Goroutines & Channels)', title: 'Channel Buffering', description: 'Los canales pueden tener un buffer (capacidad) para no bloquearse inmediatamente.', guide: `Los canales pueden tener un Buffer interno.    \`make(chan int, 5)\`
    
    **Buffered vs Unbuffered: La Analogía del Buzón**
    
    *   **Unbuffered (Sin Buffer)**: Es como entregar una carta **en mano**.
        *   Tú (emisor) debes esperar a que la otra persona (receptor) esté ahí para tomarla.
        *   Si no hay nadie, te quedas esperando bloqueado.
        *   *Sincronización instantánea.*
    
    *   **Buffered (Con Buffer)**: Es como dejar la carta en un **buzón**.
        *   El buzón tiene capacidad (ej. 5 cartas).
        *   Tú dejas la carta y te vas (no bloquea) MIENTRAS el buzón no esté lleno.
        *   Si el buzón está lleno, te toca esperar a que alguien saque una carta.
        *   El receptor va al buzón y saca cartas cuando puede. Si está vacío, espera.`,
        explanation: [
            { text: "Un canal con capacidad 2.", lineCode: 'messages := make(chan string, 2)' },
            { text: "Podemos enviar 2 valores sin que haya un receptor simultáneo.", lineCode: 'messages <- "buffered"' }
        ],
        code: `package main
import "fmt"
func main() {
    messages := make(chan string, 2)
    messages <- "buffered"
    messages <- "channel"
    fmt.Println(<-messages)
    fmt.Println(<-messages)
}`,
        testExample: {
            description: "Probamos que un canal con buffer permite enviar sin bloqueo inmediato.", functionCode: `// buffer.go
func FillBuffer(ch chan int, values []int) {
    for _, v := range values {
        ch <- v
    }
}`,
            testCode: `// buffer_test.go
func TestBufferedChannel(t *testing.T) {
    ch := make(chan int, 3)
    values := []int{1, 2, 3}
    FillBuffer(ch, values)

    for i, expected := range values {
        result := <-ch
        if result != expected {
            t.Errorf("Posición %d: recibido %d; esperado %d", i, result, expected)
        }
    }
}`
        },
        exercise: {
            question: "Crea un canal con buffer de tamaño 1. Envía un texto y léelo sin usar goroutines adicionales.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan string, 1)\n    ch <- "buffer"\n    fmt.Println(<-ch)\n}`
        }
    },
    {
        id: 'channel-synchronization', category: 'Concurrency (Goroutines & Channels)', title: 'Channel Synchronization', description: 'Podemos usar canales para sincronizar la ejecución entre goroutines.', guide: `Los canales son excelentes para notificar cuando algo ha terminado.    
    **Patrón "Done" Channel:**
    Es común pasar un canal (a menudo llamado \`done\`) a una goroutine.
    La goroutine hace su trabajo y, al terminar, envía un valor (o cierra el canal).
    El hilo principal espera bloquedado en \`<-done\` hasta recibir esa señal.
    
    Sin esto, el programa podría salir (\`main\` termina) antes de que la goroutine finalice su trabajo.`,
        explanation: [
            { text: "Esta función `worker` dormirá un segundo para simular un trabajo costoso.", lineCode: 'func worker(done chan bool) { ... }' },
            { text: "Enviamos un valor para notificar que hemos terminado.", lineCode: 'done <- true' },
            { text: "Iniciamos una goroutine worker, dándole el canal para notificar.", lineCode: 'done := make(chan bool, 1)\ngo worker(done)' },
            { text: "Bloqueamos hasta que recibimos una notificación del worker en el canal.", lineCode: '<-done' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func worker(done chan bool) {
    fmt.Print("working...")
    time.Sleep(time.Second)
    fmt.Println("done")
    done <- true
}
func main() {
    done := make(chan bool, 1)
    go worker(done)
    <-done
}`,
        testExample: {
            description: "Probamos la sincronización entre goroutines usando un canal done.", functionCode: `// sync.go
func Task(done chan bool) {
    // Simula trabajo
    done <- true
}`,
            testCode: `// sync_test.go
import "time"

func TestChannelSynchronization(t *testing.T) {
    done := make(chan bool)
    go Task(done)

    select {
    case <-done:
        // Tarea completada exitosamente
    case <-time.After(1 * time.Second):
        t.Error("La tarea no completó en el tiempo esperado")
    }
}`
        },
        exercise: {
            question: "Modifica el ejemplo para que la goroutine envíe 'Fin' (string) en lugar de true.", initialCode: `package main\n\nimport ("fmt"; "time")\n\n// Cambia la firma y el envío\nfunc worker(done chan bool) {\n    time.Sleep(time.Second)\n    fmt.Println("trabajo terminado")\n    done <- true\n}\n\nfunc main() {\n    done := make(chan bool, 1)\n    go worker(done)\n    <-done\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc worker(done chan string) {\n    time.Sleep(time.Second)\n    fmt.Println("trabajo terminado")\n    done <- "Fin"\n}\n\nfunc main() {\n    done := make(chan string, 1)\n    go worker(done)\n    fmt.Println(<-done)\n}`
        }
    },
    {
        id: 'channel-directions', category: 'Concurrency (Goroutines & Channels)', title: 'Channel Directions', description: 'Podemos especificar si un canal es solo para enviar o solo para recibir.', guide: `Cuando usas canales como parámetros de función, puedes aumentar la seguridad de tipos especificando la dirección.    
    *   \`chan<- Tipo\`: Canal Send-only (solo puedes escribir en él).
    *   \`<-chan Tipo\`: Canal Receive-only (solo puedes leer de él).
    
    Esto ayuda al compilador a prevenir errores lógicos, como leer de un canal donde solo deberías estar escribiendo.`,
        useCase: {
            title: "Seguridad de Tipos (Read-Only Consumers)", description: "Tienes una función que procesa datos. Declara que solo recibe datos (`<-chan`), así el compilador te impide por error intentar enviar algo y romper la lógica.", code: `// Solo puede LEER de jobs
func consumer(jobs <-chan int) {
    for j := range jobs {
        fmt.Println(j)
        // jobs <- 1 // Esto daría ERROR de compilación!
    }
}

func main() {
    ch := make(chan int)
    go consumer(ch) // Convierte bidireccional a read-only automáticamente
}`
        },
        explanation: [
            { text: "`ping` solo acepta un canal para enviar valores (`chan<-`). Intentar recibir daría un error de compilación.", lineCode: 'func ping(pings chan<- string, msg string)' },
            { text: "`pong` acepta un canal para recibir (`pings`) y otro para enviar (`pongs`).", lineCode: 'func pong(pings <-chan string, pongs chan<- string)' }
        ],
        code: `package main
import "fmt"
func ping(pings chan<- string, msg string) {
    pings <- msg
}
func pong(pings <-chan string, pongs chan<- string) {
    msg := <-pings
    pongs <- msg
}
func main() {
    pings := make(chan string, 1)
    pongs := make(chan string, 1)
    ping(pings, "passed message")
    pong(pings, pongs)
    fmt.Println(<-pongs)
}`,
        testExample: {
            description: "Probamos que los canales direccionales previenen operaciones inválidas en tiempo de compilación.", functionCode: `// producer.go
func Producer(ch chan<- int) {
    ch <- 42
}

func Consumer(ch <-chan int) int {
    return <-ch
}`,
            testCode: `// producer_test.go
func TestChannelDirections(t *testing.T) {
    ch := make(chan int, 1)
    Producer(ch)
    result := Consumer(ch)

    if result != 42 {
        t.Errorf("Consumer recibió %d; esperado 42", result)
    }
}`
        },
        exercise: {
            question: "Escribe una función `soloEnviar` que reciba un canal send-only de int y envíe el número 10.", initialCode: `package main\n\nimport "fmt"\n\n// Tu función soloEnviar\n\nfunc main() {\n    ch := make(chan int, 1)\n    soloEnviar(ch)\n    fmt.Println(<-ch)\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc soloEnviar(c chan<- int) {\n    c <- 10\n}\n\nfunc main() {\n    ch := make(chan int, 1)\n    soloEnviar(ch)\n    fmt.Println(<-ch)\n}`
        }
    },
    {
        id: 'select', category: 'Concurrency (Goroutines & Channels)', title: 'Select', description: 'La sentencia `select` nos permite esperar en múltiples operaciones de canales.', guide: `    **Select: El Malabarista de Canales**    
    \`select\` permite a una Go routine esperar en **múltiples** operaciones de canales a la vez. Es como un \`switch\`, pero diseñado para la concurrencia.

    **La Analogía de la Centralita Telefónica:**
    **Imagina que eres un operador con varios teléfonos enfrente:**
    1.  **Bloqueo**: Si ningún teléfono suena, esperas (te bloqueas).
    2.  **Reacción**: En cuanto suena UNO, contestas ese.
    3.  **Aleatoriedad Justa**: Si suenan DOS a la vez, Go elige uno **al azar** para contestar (esto evita que el primer caso siempre gane y "hambre" a los demás).
    4.  **Default (No Bloqueante)**: Si añades un caso \`default\`, dices: "Si nadie llama AHORA MISMO, haz esto otro y no esperes".

    **Usos Clave:**
    *   **Timeouts**: \`case <-time.After(3s):\` (Dejar de esperar si tarda mucho).
    *   **Non-blocking Sends**: Intentar enviar sin quedarse pegado si el canal está lleno.`,
        useCase: {
            title: "Timeout en Peticiones API", description: "Llamas a una API externa de pagos que a veces se cuelga. Usa `select` con `time.After` para abortar si tarda demasiado, en lugar de dejar al usuario esperando indefinidamente.", code: `select {
case res := <-apiCallChannel:
    fmt.Println("Respuesta recibida:", res)
case <-time.After(2 * time.Second):
    fmt.Println("Error: La API tardó demasiado. Cancelando.")
}`
        },
        explanation: [
            { text: "Seleccionaremos a través de dos canales.", lineCode: 'c1 := make(chan string)\nc2 := make(chan string)' },
            { text: "Cada canal recibirá un valor después de cierto tiempo para simular bloqueo.", lineCode: 'go func() { ... }()' },
            { text: "Usamos `select` para esperar a ambos valores simultáneamente, imprimiendo cada uno a medida que llega.", lineCode: 'select { case msg1 := <-c1: ... case msg2 := <-c2: ... }' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func main() {
    c1 := make(chan string)
    c2 := make(chan string)
    go func() {
        time.Sleep(1 * time.Second)
        c1 <- "one"
    }()
    go func() {
        time.Sleep(2 * time.Second)
        c2 <- "two"
    }()
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-c1:
            fmt.Println("received", msg1)
        case msg2 := <-c2:
            fmt.Println("received", msg2)
        }
    }
}`,
        testExample: {
            description: "Probamos que select permite esperar en múltiples canales y procesa el primero disponible.", functionCode: `// selector.go
func SelectFirst(c1, c2 chan string) string {
    select {
    case msg := <-c1:
        return msg
    case msg := <-c2:
        return msg
    }
}`,
            testCode: `// selector_test.go
func TestSelect(t *testing.T) {
    c1 := make(chan string, 1)
    c2 := make(chan string, 1)

    c1 <- "primero"
    result := SelectFirst(c1, c2)

    if result != "primero" {
        t.Errorf("SelectFirst retornó %s; esperado primero", result)
    }
}`
        },
        exercise: {
            question: "Usa `select` para recibir del canal que responda primero (c1 o c2). Simula c1 rápido y c2 lento.", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    c1 := make(chan string, 1)\n    c2 := make(chan string, 1)\n    c1 <- "rápido"\n    // Tu select\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    c1 := make(chan string, 1)\n    c2 := make(chan string, 1)\n    c1 <- "rápido"\n    select {\n    case m1 := <-c1:\n        fmt.Println(m1)\n    case m2 := <-c2:\n        fmt.Println(m2)\n    }\n}`
        }
    },
    {
        id: 'timeouts', category: 'Concurrency Patterns & Synchronization', title: 'Timeouts', description: 'Los timeouts son importantes para programas que conectan a recursos externos.', guide: `En Go, no necesitas complejas librerías de temporizadores para hacer timeouts.    Usas \`select\` y \`time.After\`.
    
    \`time.After(duracion)\` devuelve un canal que envía el tiempo actual después de esa duración.
    
    Simplemente añádelo como un \`case\` más en tu \`select\`. Si tu operación tarda más que el tiempo especificado, el caso del timeout se ejecutará primero.`,
        explanation: [
            { text: "Aquí hay un select implementando un timeout.", lineCode: 'select { case res := <-c1: ... case <-time.After(1 * time.Second): ... }' },
            { text: "`res := <-c1` espera el resultado, y `<-time.After(1 * time.Second)` espera un valor que se enviará después de 1 segundo.", lineCode: null },
            { text: "Como el select procede con el primer envío que esté listo, si la operación toma más de 1s, tomaremos el caso del timeout.", lineCode: null }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func main() {
    c1 := make(chan string, 1)
    go func() {
        time.Sleep(2 * time.Second)
        c1 <- "result 1"
    }()
    select {
    case res := <-c1:
        fmt.Println(res)
    case <-time.After(1 * time.Second):
        fmt.Println("timeout 1")
    }
    c2 := make(chan string, 1)
    go func() {
        time.Sleep(2 * time.Second)
        c2 <- "result 2"
    }()
    select {
    case res := <-c2:
        fmt.Println(res)
    case <-time.After(3 * time.Second):
        fmt.Println("timeout 2")
    }
}`,
        testExample: {
            description: "Probamos que un timeout cancela una operación que tarda demasiado.", functionCode: `// timeout.go
import "time"

func SlowOperation(result chan string) {
    time.Sleep(2 * time.Second)
    result <- "completado"
}

func WithTimeout(timeout time.Duration) (string, bool) {
    result := make(chan string)
    go SlowOperation(result)

    select {
    case res := <-result:
        return res, true
    case <-time.After(timeout):
        return "timeout", false
    }
}`,
            testCode: `// timeout_test.go
import "time"

func TestTimeout(t *testing.T) {
    result, ok := WithTimeout(100 * time.Millisecond)

    if ok {
        t.Error("La operación debería haber expirado")
    }
    if result != "timeout" {
        t.Errorf("Resultado = %s; esperado timeout", result)
    }
}`
        },
        exercise: {
            question: "Implementa un timeout de 500ms para una operación que tarda 1 segundo.", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    c := make(chan bool)\n    go func() { time.Sleep(time.Second); c <- true }()\n    // Tu select con timeout\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    c := make(chan bool)\n    go func() { time.Sleep(time.Second); c <- true }()\n    select {\n    case <-c:\n        fmt.Println("éxito")\n    case <-time.After(500 * time.Millisecond):\n        fmt.Println("timeout")\n    }\n}`
        }
    },
    {
        id: 'non-blocking-channel-operations', category: 'Concurrency (Goroutines & Channels)', title: 'Non-Blocking Channel Operations', description: 'Podemos usar `select` con una cláusula `default` para comunicaciones no bloqueantes.', guide: `Normalmente envíos y recepciones en canales son bloqueantes.    **Sin embargo, podemos usar \`default\` en un \`select\` para decir:**
    "Si no puedo hacer esto AHORA MISMO, haz esto otro en su lugar".
    
    **Esto es útil para:**
    1.  Intentar recibir sin esperar si está vacío.
    2.  Intentar enviar sin esperar si está lleno (drop message).
    3.  Implementar polling multi-vía.`,
        explanation: [
            { text: "Aquí hay una recepción no bloqueante. Si hay un valor en `messages`, lo toma. Si no, ejecuta inmediatamente el caso `default`.", lineCode: 'select { case msg := <-messages: ... default: ... }' },
            { text: "Un envío no bloqueante funciona igual.", lineCode: 'select { case messages <- msg: ... default: ... }' }
        ],
        code: `package main
import "fmt"
func main() {
    messages := make(chan string)
    signals := make(chan bool)
    select {
    case msg := <-messages:
        fmt.Println("received message", msg)
    default:
        fmt.Println("no message received")
    }
    msg := "hi"
    select {
    case messages <- msg:
        fmt.Println("sent message", msg)
    default:
        fmt.Println("no message sent")
    }
    select {
    case msg := <-messages:
        fmt.Println("received message", msg)
    case sig := <-signals:
        fmt.Println("received signal", sig)
    default:
        fmt.Println("no activity")
    }
}`,
        testExample: {
            description: "Probamos operaciones no bloqueantes con select y default.", functionCode: `// nonblocking.go
func TryReceive(ch chan int) (int, bool) {
    select {
    case val := <-ch:
        return val, true
    default:
        return 0, false
    }
}`,
            testCode: `// nonblocking_test.go
func TestNonBlockingReceive(t *testing.T) {
    ch := make(chan int)
    val, ok := TryReceive(ch)

    if ok {
        t.Error("TryReceive no debería recibir de un canal vacío")
    }
    if val != 0 {
        t.Errorf("TryReceive retornó %d; esperado 0", val)
    }

    ch2 := make(chan int, 1)
    ch2 <- 42
    val2, ok2 := TryReceive(ch2)

    if !ok2 {
        t.Error("TryReceive debería recibir cuando hay datos")
    }
    if val2 != 42 {
        t.Errorf("TryReceive retornó %d; esperado 42", val2)
    }
}`
        },
        exercise: {
            question: "Intenta leer de un canal vacío `c` de forma no bloquante e imprime 'vacío' en el default.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    c := make(chan int)\n    // Tu select\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    c := make(chan int)\n    select {\n    case v := <-c:\n        fmt.Println(v)\n    default:\n        fmt.Println("vacío")\n    }\n}`
        }
    },
    {
        id: 'closing-channels', category: 'Concurrency (Goroutines & Channels)', title: 'Closing Channels', description: 'Cerrar un canal indica que no se enviarán más valores.', guide: `Normalmente no necesitas cerrar canales como cierras archivos. solo es necesario cuando el receptor necesita saber que no llegarán más datos (por ejemplo, para terminar un bucle \`range\`).    
    *   Envío en canal cerrado: Pánico (panic).
    *   Recepción de canal cerrado: Devuelve inmediatamente el valor cero y \`false\` como segundo valor de retorno.
    
    \`v, ok := <-ch\`
    Si \`ok\` es \`false\`, el canal está cerrado y vacío.`,
        useCase: {
            title: "Broadcast de Cancelación (Signal)", description: "Queremos avisar a 100 goroutines que se detengan. Enviar 100 mensajes es lento. Cerrar un canal es una señal instantánea que reciben TODOS los que están escuchando.", code: `func main() {
    stop := make(chan struct{})

    // 100 workers escuchando
    for i := 0; i < 100; i++ {
        go func() {
            <-stop // Bloqueado hasta que se cierre el canal
            fmt.Println("Deteniendo...")
        }()
    }

    close(stop) // ¡BUM! Despertamos a las 100 goroutines a la vez
}`
        },
        explanation: [
            { text: "En esta goroutine enviamos trabajos y luego cerramos el canal.", lineCode: 'close(jobs)' },
            { text: "Recibimos hasta que el canal se cierre. `more` será falso si e canal ha sido cerrado.", lineCode: 'j, more := <-jobs' }
        ],
        code: `package main
import "fmt"
func main() {
    jobs := make(chan int, 5)
    done := make(chan bool)
    go func() {
        for {
            j, more := <-jobs
            if more {
                fmt.Println("received job", j)
            } else {
                fmt.Println("received all jobs")
                done <- true
                return
            }
        }
    }()
    for j := 1; j <= 3; j++ {
        jobs <- j
        fmt.Println("sent job", j)
    }
    close(jobs)
    fmt.Println("sent all jobs")
    <-done
}`,
        testExample: {
            description: "Probamos que cerrar un canal permite detectar el cierre con el segundo valor de retorno.", functionCode: `// closer.go
func SendAndClose(ch chan int, values []int) {
    for _, v := range values {
        ch <- v
    }
    close(ch)
}

func ReceiveAll(ch chan int) ([]int, bool) {
    var result []int
    for {
        val, ok := <-ch
        if !ok {
            return result, true
        }
        result = append(result, val)
    }
}`,
            testCode: `// closer_test.go
func TestClosingChannel(t *testing.T) {
    ch := make(chan int, 3)
    values := []int{1, 2, 3}
    SendAndClose(ch, values)

    result, closed := ReceiveAll(ch)
    if !closed {
        t.Error("El canal debería estar cerrado")
    }
    if len(result) != 3 {
        t.Errorf("Recibidos %d valores; esperado 3", len(result))
    }
}`
        },
        exercise: {
            question: "Envía 3 números a un canal, ciérralo y luego intenta leer un cuarto valor. ¿Qué obtienes y qué valor tiene `ok`?", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int, 3)\n    // Tu código\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int, 3)\n    ch <- 1; ch <- 2; ch <- 3\n    close(ch)\n    <-ch; <-ch; <-ch\n    val, ok := <-ch\n    fmt.Println(val, ok)\n}`
        }
    },
    {
        id: 'range-over-channels', category: 'Iteration', title: 'Range over Channels', description: 'Podemos usar la sintaxis `for ... range` para iterar valores recibidos de un canal.', guide: `Esta es la forma más idiomática de procesar flujos de datos.    
    \`for elem := range ch { ... }\`
    
    **Este bucle:**
    1.  Recibe valores de \`ch\` repetidamente.
    2.  Se bloquea si no hay datos.
    3.  Termina automáticamente cuando el canal se cierra.
    
    Si olvidas cerrar el canal, el bucle se quedará bloqueado esperando eternamente (deadlock), a menos que haya otras goroutines activas.`,
        explanation: [
            { text: "Iteramos sobre el canal `queue`.", lineCode: 'for elem := range queue' },
            { text: "Como cerramos el canal antes, el bucle itera sobre los 2 elementos y termina.", lineCode: 'close(queue)' }
        ],
        code: `package main
import "fmt"
func main() {
    queue := make(chan string, 2)
    queue <- "one"
    queue <- "two"
    close(queue)
    for elem := range queue {
        fmt.Println(elem)
    }
}`,
        testExample: {
            description: "Probamos que range sobre un canal itera todos los valores hasta que se cierra.", functionCode: `// ranger.go
func SumFromChannel(ch chan int) int {
    sum := 0
    for val := range ch {
        sum += val
    }
    return sum
}`,
            testCode: `// ranger_test.go
func TestRangeOverChannel(t *testing.T) {
    ch := make(chan int, 3)
    ch <- 1
    ch <- 2
    ch <- 3
    close(ch)

    result := SumFromChannel(ch)
    expected := 6
    if result != expected {
        t.Errorf("SumFromChannel() = %d; esperado %d", result, expected)
    }
}`
        },
        exercise: {
            question: "Usa range para sumar todos los números enviados a un canal (envía 1, 2, 3, 4, 5 y cierra).", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    nums := make(chan int, 5)\n    // Llena y cierra\n    // Suma con range\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    nums := make(chan int, 5)\n    for i:=1; i<=5; i++ { nums <- i }\n    close(nums)\n    sum := 0\n    for n := range nums {\n        sum += n\n    }\n    fmt.Println(sum)\n}`
        }
    },
    {
        id: 'timers', category: 'Time & Scheduling', title: 'Timers (Temporizadores)', description: '`time.Timer` representa un evento único en el futuro.', guide: `Un Timer es para cuando quieres hacer algo UNA vez en el futuro.    
    Te da un canal que te notifica cuando el tiempo ha expirado.
    
    La gran diferencia con \`time.Sleep\` es que un Timer se puede cancelar antes de que dispare, usando \`timer.Stop()\`.`,
        explanation: [
            { text: "Los timers representan un evento único en el futuro.", lineCode: 'timer1 := time.NewTimer(2 * time.Second)' },
            { text: "El `<-timer1.C` bloquea el canal C del timer hasta que envía un valor indicando que el tiempo expiró.", lineCode: '<-timer1.C' },
            { text: "Si simplemente quisieras esperar, podrías haber usado `time.Sleep`. Una razón para usar un timer es que puedes cancelarlo antes de que expire.", lineCode: 'stop2 := timer2.Stop()' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func main() {
    timer1 := time.NewTimer(2 * time.Second)
    <-timer1.C
    fmt.Println("Timer 1 fired")
    timer2 := time.NewTimer(time.Second)
    go func() {
        <-timer2.C
        fmt.Println("Timer 2 fired")
    }()
    stop2 := timer2.Stop()
    if stop2 {
        fmt.Println("Timer 2 stopped")
    }
    time.Sleep(2 * time.Second)
}`,
        testExample: {
            description: "Probamos que un timer dispara después del tiempo especificado.", functionCode: `// timer.go
import "time"

func WaitForTimer(duration time.Duration) bool {
    timer := time.NewTimer(duration)
    <-timer.C
    return true
}`,
            testCode: `// timer_test.go
import "time"

func TestTimer(t *testing.T) {
    start := time.Now()
    WaitForTimer(100 * time.Millisecond)
    elapsed := time.Since(start)

    if elapsed < 100*time.Millisecond {
        t.Errorf("Timer disparó demasiado pronto: %v", elapsed)
    }
}`
        },
        exercise: {
            question: "Crea un timer de 5 segundos, pero cancélalo inmediatamente.", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    // Tu timer aquí\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    t := time.NewTimer(5 * time.Second)\n    if t.Stop() {\n        fmt.Println("Cancelado")\n    }\n}`
        }
    },
    {
        id: 'tickers', category: 'Time & Scheduling', title: 'Tickers', description: '`time.Ticker` funciona para intervalos recurrentes.', guide: `Un Ticker es para cuando quieres hacer algo REPETIDAMENTE (cada X tiempo).    
    Es como un metrónomo.
    Es importante llamar a \`Stop()\` en los tickers cuando ya no los necesites para liberar recursos, ya que no se recolectan automáticamente por el Garbage Collector si siguen activos.`,
        explanation: [
            { text: "Los tickers usan un mecanismo similar a los timers: un canal que recibe valores.", lineCode: 'ticker := time.NewTicker(500 * time.Millisecond)' },
            { text: "Aquí usaremos `range` para iterar sobre los valores que llegan cada 500ms.", lineCode: 'for t := range ticker.C' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func main() {
    ticker := time.NewTicker(500 * time.Millisecond)
    done := make(chan bool)
    go func() {
        for {
            select {
            case <-done:
                return
            case t := <-ticker.C:
                fmt.Println("Tick at", t)
            }
        }
    }()
    time.Sleep(1600 * time.Millisecond)
    ticker.Stop()
    done <- true
    fmt.Println("Ticker stopped")
}`,
        testExample: {
            description: "Probamos que un ticker dispara múltiples veces a intervalos regulares.", functionCode: `// ticker.go
import "time"

func CountTicks(duration, interval time.Duration) int {
    ticker := time.NewTicker(interval)
    defer ticker.Stop()
    count := 0
    timeout := time.After(duration)

    for {
        select {
        case <-ticker.C:
            count++
        case <-timeout:
            return count
        }
    }
}`,
            testCode: `// ticker_test.go
import "time"

func TestTicker(t *testing.T) {
    count := CountTicks(250*time.Millisecond, 100*time.Millisecond)
    if count < 2 || count > 3 {
        t.Errorf("CountTicks = %d; esperado 2 o 3", count)
    }
}`
        },
        exercise: {
            question: "Crea un ticker que imprima 'Hola' cada 100ms y deténlo después de 300ms.", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    ticker := time.NewTicker(100 * time.Millisecond)\n    go func() { \n        for range ticker.C { \n            fmt.Println("Hola") \n        } \n    }()\n    time.Sleep(350 * time.Millisecond)\n    ticker.Stop()\n    fmt.Println("Fin")\n}`
        }
    },
    {
        id: 'worker-pools', category: 'Concurrency Patterns & Synchronization', title: 'Worker Pools', description: 'Implementando un pool de trabajadores usando goroutines y canales.', guide: `El patrón Worker Pool es clásico para la concurrencia.    
    Tienes una cola de "trabajos" (un canal) y un grupo de goroutines "trabajadoras" consumiendo de esa cola.
    
    1.  Crea un canal \`jobs\`.
    2.  Lanza N goroutines que lean de \`jobs\`.
    3.  Envía trabajos a \`jobs\`.
    4.  Cierra \`jobs\` cuando termines.
    
    Esto permite limitar la concurrencia (e.g. solo 5 workers simultáneos) aunque tengas miles de tareas.`,
        explanation: [
            { text: "Aquí están los trabajadores, de los cuales ejecutaremos varias instancias concurrentes.", lineCode: 'func worker(id int, jobs <-chan int, results chan<- int)' },
            { text: "Para usar nuestro pool de trabajadores necesitamos enviarles trabajo y recolectar sus resultados.", lineCode: 'jobs := make(chan int, 100)\nresults := make(chan int, 100)' },
            { text: "Esto inicia 3 trabajadores, inicialmente bloqueados porque todavía no hay trabajos.", lineCode: 'for w := 1; w <= 3; w++ {\n    go worker(w, jobs, results)\n}' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Println("worker", id, "started  job", j)
        time.Sleep(time.Second)
        fmt.Println("worker", id, "finished job", j)
        results <- j * 2
    }
}
func main() {
    const numJobs = 5
    jobs := make(chan int, numJobs)
    results := make(chan int, numJobs)
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)
    for a := 1; a <= numJobs; a++ {
        <-results
    }
}`,
        testExample: {
            description: "Probamos un worker pool que procesa múltiples trabajos concurrentemente.", functionCode: `// pool.go
func ProcessJobs(numWorkers, numJobs int) []int {
    jobs := make(chan int, numJobs)
    results := make(chan int, numJobs)

    worker := func(id int, jobs <-chan int, results chan<- int) {
        for j := range jobs {
            results <- j * 2
        }
    }

    for w := 1; w <= numWorkers; w++ {
        go worker(w, jobs, results)
    }

    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)

    var output []int
    for a := 1; a <= numJobs; a++ {
        output = append(output, <-results)
    }
    return output
}`,
            testCode: `// pool_test.go
func TestWorkerPool(t *testing.T) {
    results := ProcessJobs(3, 5)
    if len(results) != 5 {
        t.Errorf("ProcessJobs retornó %d resultados; esperado 5", len(results))
    }
}`
        },
        exercise: {
            question: "Modifica el ejemplo para que haya 100 trabajos y 10 workers. ¿Cuánto tarda?", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        time.Sleep(100 * time.Millisecond)\n        results <- j * 2\n    }\n}\n\nfunc main() {\n    // Configura 10 workers y 100 jobs\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        time.Sleep(100 * time.Millisecond)\n        results <- j * 2\n    }\n}\n\nfunc main() {\n    jobs := make(chan int, 100)\n    results := make(chan int, 100)\n    for w:=1; w<=10; w++ { go worker(w, jobs, results) }\n    for j:=1; j<=100; j++ { jobs <- j }\n    close(jobs)\n    for a:=1; a<=100; a++ { <-results }\n    fmt.Println("Terminado")\n}`
        }
    },
    {
        id: 'rate-limiting', category: 'Concurrency Patterns & Synchronization', title: 'Rate Limiting', description: 'La limitación de velocidad es un mecanismo importante para controlar el uso de recursos.', guide: `El Rate Limiting previene que tu programa sature servicios externos o sea saturado.    
    En Go, usamos Tickers y Canales para esto.
    
    *   Rate Limiting Básico: Un Ticker que "gotea" permisos cada 200ms.
    *   Burst Limiting: Un canal con buffer permite ráfagas de actividad hasta llenar el buffer, luego se comporta como el limitador básico.`,
        explanation: [
            { text: "El canal `limiter` recibirá un valor cada 200ms.", lineCode: 'limiter := time.Tick(200 * time.Millisecond)' },
            { text: "Al bloquearnos esperando recibir de `limiter` antes de procesar cada solicitud, nos limitamos a 1 cada 200ms.", lineCode: '<-limiter' },
            { text: "Para permitir ráfagas, usamos un canal con buffer.", lineCode: 'burstyLimiter := make(chan time.Time, 3)' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func main() {
    requests := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        requests <- i
    }
    close(requests)
    limiter := time.Tick(200 * time.Millisecond)
    for req := range requests {
        <-limiter
        fmt.Println("request", req, time.Now())
    }
    burstyLimiter := make(chan time.Time, 3)
    for i := 0; i < 3; i++ {
        burstyLimiter <- time.Now()
    }
    go func() {
        for t := range time.Tick(200 * time.Millisecond) {
            burstyLimiter <- t
        }
    }()
    burstyRequests := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        burstyRequests <- i
    }
    close(burstyRequests)
    for req := range burstyRequests {
        <-burstyLimiter
        fmt.Println("request", req, time.Now())
    }
}`,
        testExample: {
            description: "Probamos que el rate limiting controla la velocidad de procesamiento.", functionCode: `// ratelimit.go
import "time"

func ProcessWithRateLimit(count int, interval time.Duration) time.Duration {
    start := time.Now()
    limiter := time.Tick(interval)

    for i := 0; i < count; i++ {
        <-limiter
    }

    return time.Since(start)
}`,
            testCode: `// ratelimit_test.go
import "time"

func TestRateLimit(t *testing.T) {
    elapsed := ProcessWithRateLimit(3, 100*time.Millisecond)
    expected := 200 * time.Millisecond

    if elapsed < expected {
        t.Errorf("Procesamiento demasiado rápido: %v", elapsed)
    }
}`
        },
        exercise: {
            question: "Implementa un limitador que permita 10 operaciones por segundo (1 cada 100ms).", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    // Tu limitador\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    limiter := time.Tick(100 * time.Millisecond)\n    for i:=0; i<5; i++ {\n        <-limiter\n        fmt.Println("Op", i)\n    }\n}`
        }
    },
    {
        id: 'atomic-counters', category: 'Concurrency Patterns & Synchronization', title: 'Atomic Counters', description: 'El mecanismo principal para gestionar el estado en Go es la comunicación a través de canales, pero también están disponibles primitivas de sincronización atómica.', guide: `A veces, canales son demasiado pesados para algo simple como incrementar un contador compartido.    
    El paquete \`sync/atomic\` provee operaciones de bajo nivel seguras para la memoria.
    
    *   \`atomic.AddUint64(&ops, 1)\`: Incrementa atómicamente.
    *   \`atomic.LoadUint64(&ops)\`: Lee atómicamente.
    
    Usar \`ops++\` en múltiples goroutines causará race conditions y datos corruptos. \`atomic\` lo evita.`,
        explanation: [
            { text: "Usamos un entero sin signo para contar operaciones.", lineCode: 'var ops uint64' },
            { text: "Usamos `AddUint64` para incrementar el contador de forma segura.", lineCode: 'atomic.AddUint64(&ops, 1)' }
        ],
        code: `package main
import (
    "fmt"
    "sync"
    "sync/atomic"
)
func main() {
    var ops uint64
    var wg sync.WaitGroup
    for i := 0; i < 50; i++ {
        wg.Add(1)
        go func() {
            for c := 0; c < 1000; c++ {
                atomic.AddUint64(&ops, 1)
            }
            wg.Done()
        }()
    }
    wg.Wait()
    fmt.Println("ops:", ops)
}`,
        testExample: {
            description: "Probamos que operaciones atómicas previenen race conditions en contadores compartidos.", functionCode: `// atomic.go
import (
    "sync"
    "sync/atomic"
)

func AtomicIncrement(iterations int) uint64 {
    var counter uint64
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := 0; j < iterations; j++ {
                atomic.AddUint64(&counter, 1)
            }
        }()
    }

    wg.Wait()
    return counter
}`,
            testCode: `// atomic_test.go
func TestAtomicCounter(t *testing.T) {
    result := AtomicIncrement(100)
    expected := uint64(1000)

    if result != expected {
        t.Errorf("AtomicIncrement(100) = %d; esperado %d", result, expected)
    }
}`
        },
        exercise: {
            question: "Intenta hacer esto SIN atomic (usando `ops++`) y observa si el resultado es 50000 exacto (pista: probablemente no). Arréglalo con atomic.", initialCode: `package main\n\nimport ("fmt"; "sync")\n\nfunc main() {\n    var ops int\n    var wg sync.WaitGroup\n    for i := 0; i < 50; i++ {\n        wg.Add(1)\n        go func() {\n            for c := 0; c < 1000; c++ {\n                ops++ // ¡INSEGURO!\n            }\n            wg.Done()\n        }()\n    }\n    wg.Wait()\n    fmt.Println("ops:", ops)\n}`,
            solution: `package main\n\nimport ("fmt"; "sync"; "sync/atomic")\n\nfunc main() {\n    var ops uint64\n    var wg sync.WaitGroup\n    for i := 0; i < 50; i++ {\n        wg.Add(1)\n        go func() {\n            for c := 0; c < 1000; c++ {\n                atomic.AddUint64(&ops, 1)\n            }\n            wg.Done()\n        }()\n    }\n    wg.Wait()\n    fmt.Println("ops:", ops)\n}`
        }
    },
    {
        id: 'mutexes', category: 'Concurrency Patterns & Synchronization', title: 'Mutexes', description: 'Para estados más complejos, usamos un mutex para bloquear el acceso a los datos de manera exclusiva.', guide: `**¿Qué es un Mutex?**    Imagina un baño público con una sola llave.
    
    *   **Lock() (Cerrar)**: Entras al baño y cierras con llave. Si alguien más llega, encuentra la puerta cerrada y debe **esperar** en fila hasta que salgas.
    *   **Unlock() (Abrir)**: Sales y abres la puerta. El siguiente en la fila puede entrar ahora.
    
    En programación, el "baño" es una **Sección Crítica** (una parte del código que modifica datos compartidos). El Mutex asegura que **solo una goroutine** toque esos datos a la vez. Sin Mutex, dos goroutines podrían escribir al mismo tiempo y corromper la memoria (Race Condition).
    
    **Reglas de Seguridad:**
    1.  **Siempre** desbloquea (\`Unlock\`). Si olvidas desbloquear, el programa se congelará para siempre (Deadlock).
    2.  Usa \`defer mut.Unlock()\` justo después de \`Lock()\`. Esto garantiza que se desbloquee incluso si la función falla o retorna error.
    
    **Tip Pro: RWMutex**
    Si tienes muchas lecturas y pocas escrituras, usa \`sync.RWMutex\`. Permite múltiples lectores simultáneos, pero solo un escritor.`,
        useCase: {
            title: "Cache en Memoria Thread-Safe", description: "Un mapa normal en Go NO es seguro para uso concurrente y causará pánico (crash) si múltiples goroutines escriben en él. Protegelo con un Mutex.", code: `type SafeCache struct {
    mu    sync.Mutex
    store map[string]string
}

func (c *SafeCache) Set(key, val string) {
    c.mu.Lock()         // Bloquea
    defer c.mu.Unlock() // Desbloquea al salir
    c.store[key] = val
}`
        },
        explanation: [
            { text: "El `sync.Mutex` zero-value está desbloqueado.", lineCode: 'var mu sync.Mutex' },
            { text: "Bloqueamos el mutex antes de acceder a `counters`.", lineCode: 'mu.Lock()' },
            { text: "Podemos 'deferir' el desbloqueo.", lineCode: 'defer mu.Unlock()' }
        ],
        code: `package main
import (
    "fmt"
    "sync"
)
type Container struct {
    mu       sync.Mutex
    counters map[string]int
}
func (c *Container) inc(name string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.counters[name]++
}
func main() {
    c := Container{
        counters: map[string]int{"a": 0, "b": 0},
    }
    var wg sync.WaitGroup
    doIncrement := func(name string, n int) {
        for i := 0; i < n; i++ {
            c.inc(name)
        }
        wg.Done()
    }
    wg.Add(3)
    go doIncrement("a", 10000)
    go doIncrement("a", 10000)
    go doIncrement("b", 10000)
    wg.Wait()
    fmt.Println(c.counters)
}`,
        testExample: {
            description: "Probamos que un Mutex protege el acceso concurrente a datos compartidos.", functionCode: `// mutex.go
import "sync"

type SafeCounter struct {
    mu    sync.Mutex
    value int
}

func (s *SafeCounter) Inc() {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.value++
}

func (s *SafeCounter) Value() int {
    s.mu.Lock()
    defer s.mu.Unlock()
    return s.value
}

func IncrementConcurrently(times int) int {
    counter := &SafeCounter{}
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := 0; j < times; j++ {
                counter.Inc()
            }
        }()
    }

    wg.Wait()
    return counter.Value()
}`,
            testCode: `// mutex_test.go
func TestMutex(t *testing.T) {
    result := IncrementConcurrently(100)
    expected := 1000

    if result != expected {
        t.Errorf("IncrementConcurrently(100) = %d; esperado %d", result, expected)
    }
}`
        },
        exercise: {
            question: "Protege una variable global `balance` con un Mutex en una función `Deposit(amount int)`.", initialCode: `package main\n\nimport ("fmt"; "sync")\n\nvar balance int\n// Declara mutex\n\nfunc Deposit(amount int) {\n    // Usa mutex\n    balance += amount\n}\n\nfunc main() {\n    // Llama a Deposit concurrentemente\n}`,
            solution: `package main\n\nimport ("fmt"; "sync")\n\nvar balance int\nvar mu sync.Mutex\n\nfunc Deposit(amount int) {\n    mu.Lock()\n    defer mu.Unlock()\n    balance += amount\n}\n\nfunc main() {\n    var wg sync.WaitGroup\n    for i:=0; i<100; i++ {\n        wg.Add(1)\n        go func(){ Deposit(10); wg.Done() }()\n    }\n    wg.Wait()\n    fmt.Println(balance)\n}`
        }
    },
    {
        id: 'wait-groups', category: 'Concurrency Patterns & Synchronization', title: 'WaitGroups', description: 'La forma básica de esperar a que múltiples goroutines terminen.', guide: `**WaitGroups: El Coordinador de Salida**
    ¿Cómo esperas a que terminen 5 goroutines? \`time.Sleep\` es una mala idea (¡lento y race-prone!).
    
    **\`sync.WaitGroup\` es un contador thread-safe:**
    1.  **Add(1)**: Incrementa el contador (tengo 1 goroutine más).
    2.  **Done()**: Decrementa el contador (una goroutine terminó).
    3.  **Wait()**: Bloquea hasta que el contador sea 0.

    **Patrón Común:**
    \`\`\`go
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1) // ¡Siempre antes de 'go'!
        go func(id int) {
            defer wg.Done() // ¡Siempre al salir!
            // Trabajar...
        }(i)
    }
    wg.Wait() // Esperar a todos
    \`\`\``,
        useCase: {
            title: "Descarga Paralela de URLs", description: "Lanzamos N peticiones HTTP simultáneas y esperamos a que todas terminen antes de seguir.", code: `package main
import (
    "fmt"
    "net/http"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    urls := []string{
        "http://google.com",
        "http://golang.org",
        "http://github.com",
    }

    for _, url := range urls {
        wg.Add(1)
        go func(u string) {
            defer wg.Done()
            res, err := http.Get(u)
            if err == nil {
                fmt.Printf("%s: %s\n", u, res.Status)
            }
        }(url)
    }

    wg.Wait()
    fmt.Println("Todas las descargas completadas.")
}`
        },
        explanation: [
            { text: "Incrementamos el contador antes de lanzar la goroutine.", lineCode: 'wg.Add(1)' },
            { text: "Usamos `defer` para asegurar que Done() se llame incluso si hay panic.", lineCode: 'defer wg.Done()' },
            { text: "Esperamos a que todas terminen.", lineCode: 'wg.Wait()' }
        ],
        code: `// Regla de Oro:
// Pasa el WaitGroup como puntero (*sync.WaitGroup) a las funciones, si no, se copia el estado y no funciona.`,
        testExample: {
            description: "Verificamos que la función espere correctamente a las goroutines.", functionCode: `func RunConcurrent(count int) int {
    var wg sync.WaitGroup
    var counter int
    var mu sync.Mutex

    for i := 0; i < count; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.Lock()
            counter++
            mu.Unlock()
        }()
    }
    wg.Wait()
    return counter
}`,
            testCode: `func TestWaitGroup(t *testing.T) {
    total := RunConcurrent(50)
    if total != 50 {
        t.Errorf("Esperaba 50, recibí %d", total)
    }
}`
        },
        exercise: {
            question: "Completa el código para esperar a que la goroutine termine antes de imprimir 'Fin'.", initialCode: `var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    // marca como hecha\n    fmt.Println("Async")\n}()\n// espera aquí\nfmt.Println("Fin")`,
            solution: `var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    defer wg.Done()\n    fmt.Println("Async")\n}()\nwg.Wait()\nfmt.Println("Fin")`
        }
    },
    {
        id: 'stateful-goroutines', category: 'Concurrency Patterns & Synchronization', title: 'Stateful Goroutines', description: 'Otra opción es usar las funciones incorporadas de sincronización de goroutines y canales para lograr el mismo resultado.', guide: `En este enfoque, una sola goroutine posee el estado. Otras goroutines le envían mensajes para leer o escribir.    
    Esto evita Mutexes explícitos y sigue el mantra de Go: "Share memory by communicating".
    
    *   Creas canales \`reads\` y \`writes\`.
    *   La goroutine central hace un \`select\` infinito sobre estos canales y actualiza/responde.
    *   Esto serializa el acceso al estado automáticamente.`,
        useCase: {
            title: "Manejo de Estado sin Mutex (Actor Model)", description: "Un 'Contador' que vive en su propia goroutine. La única forma de cambiar su valor es enviándole un mensaje. Es seguro (thread-safe) sin usar locks.", code: `type Op int // Mensaje
const Inc Op = 1

func counterActor(ops <-chan Op) {
    count := 0
    for op := range ops {
        if op == Inc { count++ }
        fmt.Println("Count:", count)
    }
}

func main() {
    ops := make(chan Op)
    go counterActor(ops)
    ops <- Inc // Envíamos mensaje
}`
        },
        explanation: [
            { text: "Este canal llevará las solicitudes de lectura.", lineCode: 'reads := make(chan readOp)' },
            { text: "Este canal llevará las solicitudes de escritura.", lineCode: 'writes := make(chan writeOp)' },
            { text: "La goroutine `state` selecciona repetidamente entre los canales.", lineCode: 'go func() { ... for { select { ... } } }()' }
        ],
        code: `package main
import (
    "fmt"
    "math/rand"
    "sync/atomic"
    "time"
)
type readOp struct {
    key  int
    resp chan int
}
type writeOp struct {
    key  int
    val  int
    resp chan bool
}
func main() {
    var readOps uint64
    var writeOps uint64
    reads := make(chan readOp)
    writes := make(chan writeOp)
    go func() {
        var state = make(map[int]int)
        for {
            select {
            case read := <-reads:
                read.resp <- state[read.key]
            case write := <-writes:
                state[write.key] = write.val
                write.resp <- true
            }
        }
    }()
    for r := 0; r < 100; r++ {
        go func() {
            for {
                read := readOp{
                    key:  rand.Intn(5),
                    resp: make(chan int)}
                reads <- read
                <-read.resp
                atomic.AddUint64(&readOps, 1)
                time.Sleep(time.Millisecond)
            }
        }()
    }
    for w := 0; w < 10; w++ {
        go func() {
            for {
                write := writeOp{
                    key:  rand.Intn(5),
                    val:  rand.Intn(100),
                    resp: make(chan bool)}
                writes <- write
                <-write.resp
                atomic.AddUint64(&writeOps, 1)
                time.Sleep(time.Millisecond)
            }
        }()
    }
    time.Sleep(time.Second)
    readOpsFinal := atomic.LoadUint64(&readOps)
    fmt.Println("readOps:", readOpsFinal)
    writeOpsFinal := atomic.LoadUint64(&writeOps)
    fmt.Println("writeOps:", writeOpsFinal)
}`,
        testExample: {
            description: "Probamos el patrón de goroutine con estado que maneja concurrencia mediante canales.", functionCode: `// stateful.go
type SetOp struct {
    key  string
    val  int
    resp chan bool
}

type GetOp struct {
    key  string
    resp chan int
}

func StatefulStore() (chan SetOp, chan GetOp) {
    sets := make(chan SetOp)
    gets := make(chan GetOp)

    go func() {
        store := make(map[string]int)
        for {
            select {
            case op := <-sets:
                store[op.key] = op.val
                op.resp <- true
            case op := <-gets:
                op.resp <- store[op.key]
            }
        }
    }()

    return sets, gets
}`,
            testCode: `// stateful_test.go
func TestStatefulGoroutine(t *testing.T) {
    sets, gets := StatefulStore()

    setOp := SetOp{key: "test", val: 42, resp: make(chan bool)}
    sets <- setOp
    <-setOp.resp

    getOp := GetOp{key: "test", resp: make(chan int)}
    gets <- getOp
    result := <-getOp.resp

    if result != 42 {
        t.Errorf("Valor recuperado = %d; esperado 42", result)
    }
}`
        },
        exercise: {
            question: "Modifica el ejemplo para agregar una operación `deleteOp`.", initialCode: `package main\n\n// Define deleteOp\n// Agrega case al select\n// Envía solicitudes de borrado`,
            solution: `// Solución conceptual: \n// 1. type deleteOp struct { key int; resp chan bool }\n// 2. deletes := make(chan deleteOp)\n// 3. case del := <-deletes: delete(state, del.key); del.resp <- true\n`
        }
    },
    {
        id: 'sorting', category: 'Sorting & Data Manipulation', title: 'Sorting', description: 'Go tiene capacidades de ordenamiento robustas en el paquete `sort` (y `slices` en versiones nuevas).', guide: `El paquete \`slices\` (Go 1.21+) y \`sort\` (legacy, pre-1.21) facilitan el ordenamiento.    
    *   Tipos básicos: \`slices.Sort(ints)\` o \`sort.Ints(ints)\`.
    *   Estabilidad: El ordenamiento es in-place, lo que significa que modifica el slice original y no devuelve uno nuevo.`,
        explanation: [
            { text: "Ordenando un slice de strings.", lineCode: 'strs := []string{"c", "a", "b"}\nslices.Sort(strs)' },
            { text: "Ordenando un slice de ints.", lineCode: 'ints := []int{7, 2, 4}\nslices.Sort(ints)' },
            { text: "Podemos comprobar si un slice ya está ordenado.", lineCode: 'slices.IsSorted(ints)' }
        ],
        code: `package main
import (
    "fmt"
    "slices"
)
func main() {
    strs := []string{"c", "a", "b"}
    // Nota: Si usas una versión vieja de Go, usa sort.Strings(strs)
    slices.Sort(strs)
    fmt.Println("Strings:", strs)
    ints := []int{7, 2, 4}
    slices.Sort(ints)
    fmt.Println("Ints:   ", ints)
    s := slices.IsSorted(ints)
    fmt.Println("Sorted: ", s)
}`,
        testExample: {
            description: "Probamos que slices.Sort ordena correctamente un slice de enteros.", functionCode: `// sorting.go
import "slices"

func SortNumbers(nums []int) []int {
    slices.Sort(nums)
    return nums
}`,
            testCode: `// sorting_test.go
import "slices"

func TestSorting(t *testing.T) {
    nums := []int{3, 1, 4, 1, 5, 9}
    result := SortNumbers(nums)

    if !slices.IsSorted(result) {
        t.Error("El slice no está ordenado")
    }
    if result[0] != 1 || result[len(result)-1] != 9 {
        t.Errorf("Ordenamiento incorrecto: %v", result)
    }
}`
        },
        exercise: {
            question: "Ordena el slice `[10, 5, 8]` e imprime si está ordenado.", initialCode: `package main\n\nimport ("fmt"; "slices")\n\nfunc main() {\n    nums := []int{10, 5, 8}\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "slices")\n\nfunc main() {\n    nums := []int{10, 5, 8}\n    slices.Sort(nums)\n    fmt.Println(nums, slices.IsSorted(nums))\n}`
        }
    },
    {
        id: 'sorting-by-functions', category: 'Sorting & Data Manipulation', title: 'Sorting by Functions', description: 'Podemos usar ordenamiento personalizado usando funciones comparadoras.', guide: `A veces el orden natural no es lo que queremos. Por ejemplo, ordenar strings por longitud en lugar de alfabéticamente.    
    *   Use \`slices.SortFunc\`.
    *   Provee una función que tome \`(a, b)\` y devuelva:**
        *   negativo si a < b
        *   0 si a == b
        *   positivo si a > b
        
    (Nota: En versiones antiguas se usaba \`sort.Slice\`).`,
        explanation: [
            { text: "Usamos `slices.SortFunc` con una función anónima.", lineCode: 'slices.SortFunc(fruits, func(a, b string) int { ... })' },
            { text: "Devolvemos la diferencia de longitudes para ordenar por tamaño.", lineCode: 'return len(a) - len(b)' },
            { text: "También podemos definir un tipo personalizado para `sort.Interface` (método antiguo), pero las funciones son más fáciles.", lineCode: null }
        ],
        code: `package main
import (
    "cmp"
    "fmt"
    "slices"
)
func main() {
    fruits := []string{"peach", "banana", "kiwi"}
    lenCmp := func(a, b string) int {
        return cmp.Compare(len(a), len(b))
    }
    slices.SortFunc(fruits, lenCmp)
    fmt.Println(fruits)
    type Person struct {
        name string
        age  int
    }
    people := []Person{
        {name: "Jax", age: 37},
        {name: "TJ", age: 25},
        {name: "Alex", age: 72},
    }
    slices.SortFunc(people, func(a, b Person) int {
        return cmp.Compare(a.age, b.age)
    })
    fmt.Println(people)
}`,
        testExample: {
            description: "Probamos ordenamiento personalizado con una función comparadora.", functionCode: `// custom_sort.go
import (
    "cmp"
    "slices"
)

type Item struct {
    Name  string
    Value int
}

func SortByValue(items []Item) []Item {
    slices.SortFunc(items, func(a, b Item) int {
        return cmp.Compare(a.Value, b.Value)
    })
    return items
}`,
            testCode: `// custom_sort_test.go
func TestSortingByFunctions(t *testing.T) {
    items := []Item{
        {Name: "c", Value: 3},
        {Name: "a", Value: 1},
        {Name: "b", Value: 2},
    }

    result := SortByValue(items)

    if result[0].Value != 1 || result[2].Value != 3 {
        t.Errorf("Ordenamiento incorrecto: %v", result)
    }
}`
        },
        exercise: {
            question: "Ordena una lista de palabras en orden inverso (alfabéticamente descendente).", initialCode: `package main\n\nimport ("fmt"; "slices"; "strings")\n\nfunc main() {\n    p := []string{"a", "c", "b"}\n    // slices.SortFunc...\n    fmt.Println(p)\n}`,
            solution: `package main\n\nimport ("fmt"; "slices"; "strings")\n\nfunc main() {\n    p := []string{"a", "c", "b"}\n    slices.SortFunc(p, func(a, b string) int {\n        return strings.Compare(b, a)\n    })\n    fmt.Println(p)\n}`
        }
    },
    {
        id: 'panic', category: 'Error Handling', title: 'Panic', description: 'Un `panic` significa que algo salió inesperadamente mal. Úsalo para errores irrecuperables.', guide: `Un Panic detiene inmediatamente la ejecución de la goroutine actual.    
    *   Es similar a lanzar una excepción no capturada en otros lenguajes.
    *   No lo uses para manejo normal de errores. (Para eso devuelve \`error\`).
    *   Úsalo solo cuando el programa no puede continuar bajo ninguna circunstancia (e.g., configuración corrupta al inicio).`,
        explanation: [
            { text: "`panic` aborta el programa e imprime el mensaje y el stack trace.", lineCode: 'panic("a problem")' },
            { text: "Un uso común es abortar si una función que devuelve error falla y no sabemos qué hacer.", lineCode: 'if err != nil { panic(err) }' }
        ],
        code: `package main
import "os"
func main() {
    // panic("a problem")
    _, err := os.Create("/tmp/file")
    if err != nil {
        panic(err)
    }
}`,
        testExample: {
            description: "Probamos que panic detiene la ejecución (nota: este test usa recover para capturarlo).", functionCode: `// panic.go
func MayPanic(shouldPanic bool) (recovered bool) {
    defer func() {
        if r := recover(); r != nil {
            recovered = true
        }
    }()

    if shouldPanic {
        panic("algo salió mal")
    }
    return false
}`,
            testCode: `// panic_test.go
func TestPanic(t *testing.T) {
    recovered := MayPanic(true)
    if !recovered {
        t.Error("Debería haber recuperado del panic")
    }

    notPanicked := MayPanic(false)
    if notPanicked {
        t.Error("No debería haber panic")
    }
}`
        },
        exercise: {
            question: "Provoca un pánico con el mensaje 'Error fatal'.", initialCode: `package main\n\nfunc main() {\n    // Tu pánico\n}`,
            solution: `package main\n\nfunc main() {\n    panic("Error fatal")\n}`
        }
    },
    {
        id: 'defer', category: 'Error Handling', title: 'Defer', description: '`defer` asegura que una llamada a función se realice al final de la ejecución de la función actual.', guide: `Defer (aferir/posponer) es esencial para la limpieza de recursos.    
    \`defer funcion()\`
    
    *   La función diferida se ejecuta cuando la función contenedora retorna.
    *   Se ejecuta incluso si ocurre un pánico.
    *   Los argumentos se evalúan en el momento del \`defer\`, no al final.
    *   Si hay varios \`defer\`, se ejecutan en orden LIFO (Last-In, First-Out).
    
    Uso clásico: \`f = open(); defer f.close()\`.`,
        useCase: {
            title: "Timer de Ejecución de Función", description: "Quieres medir cuánto tarda en ejecutarse una función compleja. Usa defer con una función anónima que calcule la diferencia de tiempo al salir.", code: `func heavyOperation() {
    start := time.Now()
    defer func() {
        fmt.Println("La función tardó:", time.Since(start))
    }()

    // Simulamos trabajo pesado
    time.Sleep(2 * time.Second)
}`
        },
        explanation: [
            { text: "Supongamos que creamos un archivo, escribimos en él y lo cerramos.", lineCode: 'f := createFile("/tmp/defer.txt")' },
            { text: "Inmediatamente después de obtener el archivo, diferimos el cierre.", lineCode: 'defer closeFile(f)' },
            { text: "Esto asegura que `closeFile` se ejecutará al salir de `main`, incluso si hay returns o panics intermedios.", lineCode: null }
        ],
        code: `package main
import (
    "fmt"
    "os"
)
func createFile(p string) *os.File {
    fmt.Println("creating")
    f, err := os.Create(p)
    if err != nil {
        panic(err)
    }
    return f
}
func writeFile(f *os.File) {
    fmt.Println("writing")
    fmt.Fprintln(f, "data")
}
func closeFile(f *os.File) {
    fmt.Println("closing")
    err := f.Close()
    if err != nil {
        fmt.Fprintf(os.Stderr, "error: %v\\n", err)
        os.Exit(1)
    }
}
func main() {
    f := createFile("/tmp/defer.txt")
    defer closeFile(f)
    writeFile(f)
}`,
        testExample: {
            description: "Probamos que defer ejecuta una función al final, incluso si hay un return temprano.", functionCode: `// defer.go
func WithDefer() string {
    result := "inicio"
    defer func() {
        result = "modificado por defer"
    }()
    return result
}

func Counter() int {
    count := 0
    defer func() { count++ }()
    defer func() { count++ }()
    defer func() { count++ }()
    return count
}`,
            testCode: `// defer_test.go
func TestDefer(t *testing.T) {
    // Nota: defer no puede modificar valores de retorno nombrados en este caso
    // porque result ya se evaluó antes del defer
    result := WithDefer()
    if result != "inicio" {
        t.Errorf("WithDefer() = %s; esperado inicio", result)
    }

    // Los defers se ejecutan pero count ya fue retornado
    count := Counter()
    if count != 0 {
        t.Errorf("Counter() = %d; esperado 0", count)
    }
}`
        },
        exercise: {
            question: "Usa `defer` para imprimir 'Mundo' DESPUÉS de imprimir 'Hola', aunque 'Mundo' aparezca primero en el código.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // deferred print Mundo\n    fmt.Println("Hola")\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    defer fmt.Println("Mundo")\n    fmt.Println("Hola")\n}`
        }
    },
    {
        id: 'recover', category: 'Error Handling', title: 'Recover', description: '`recover` permite recuperar el control de una goroutine en pánico.', guide: `Recover solo funciona dentro de una función diferida (\`defer\`).    
    **Cuando ocurre un pánico:**
    1.  La ejecución normal se detiene.
    2.  Se ejecutan las funciones diferidas.
    **3.  Si una de ellas llama a \`recover()\`:**
        *   Captura el valor del pánico.
        *   Detiene el pánico.
        *   La ejecución continúa normalmente *después* de la función diferida (no vuelve al punto del pánico).
    
    Es útil para evitar que todo el servidor web caiga si un handler falla.`,
        explanation: [
            { text: "Esta función provoca un pánico.", lineCode: 'func mayPanic() { panic("a problem") }' },
            { text: "`recover` debe llamarse dentro de una función diferida.", lineCode: 'defer func() { if r := recover(); r != nil { ... } }()' },
            { text: "El código después del pánico NO se ejecutará.", lineCode: 'fmt.Println("After panic")' }
        ],
        code: `package main
import "fmt"
func mayPanic() {
    panic("a problem")
}
func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered. Error:\\n", r)
        }
    }()
    mayPanic()
    fmt.Println("After mayPanic()")
}`,
        testExample: {
            description: "Probamos que recover captura un panic y permite continuar la ejecución.", functionCode: `// recover.go
func SafeExecute(fn func()) (recovered bool, panicValue interface{}) {
    defer func() {
        if r := recover(); r != nil {
            recovered = true
            panicValue = r
        }
    }()

    fn()
    return false, nil
}`,
            testCode: `// recover_test.go
func TestRecover(t *testing.T) {
    recovered, val := SafeExecute(func() {
        panic("error de prueba")
    })

    if !recovered {
        t.Error("Debería haber recuperado del panic")
    }
    if val != "error de prueba" {
        t.Errorf("Valor del panic = %v; esperado 'error de prueba'", val)
    }

    notPanicked, _ := SafeExecute(func() {
        // Función normal sin panic
    })
    if notPanicked {
        t.Error("No debería haber panic en función normal")
    }
}`
        },
        exercise: {
            question: "Llama a `panic(123)` y recupéralo imprimiendo 'Recuperado: 123'.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Tu defer con recover\n    panic(123)\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println("Recuperado:", r)\n        }\n    }()\n    panic(123)\n}`
        }
    },
    {
        id: 'string-functions', category: 'String Operations', title: 'String Functions', description: 'La biblioteca estándar `strings` provee muchas funciones útiles para manipular cadenas.', guide: `El paquete strings es tu navaja suiza para texto.    
    **Funciones comunes:**
    *   **\`Contains(s, substr)\`:** ¿Contiene el substring?
    *   **\`Count(s, substr)\`:** ¿Cuántas veces aparece?.
    *   **\`Index(s, substr)\`:** Posición del substring.
    *   **\`Join(slice, sep)\`:** Une un slice con un separador.
    *   **\`Repeat(s, count)\`:** Repite la cadena.
    *   **\`Replace(s, old, new, n)\`:** Reemplaza ocurrencias.
    *   **\`Split(s, sep)\`:** Divide la cadena en un slice.
    *   \`ToLower(s)\`, \`ToUpper(s)\`.`,
        explanation: [
            { text: "Todas las funciones están disponibles importando `strings`.", lineCode: 'import "strings"' },
            { text: "Son funciones puras, no modifican la cadena original (recordemos que los strings en Go son inmutables).", lineCode: 'p("Contains:  ", s.Contains("test", "es"))' }
        ],
        code: `package main
import (
    "fmt"
    s "strings"
)
var p = fmt.Println
func main() {
    p("Contains:  ", s.Contains("test", "es"))
    p("Count:     ", s.Count("test", "t"))
    p("HasPrefix: ", s.HasPrefix("test", "te"))
    p("HasSuffix: ", s.HasSuffix("test", "st"))
    p("Index:     ", s.Index("test", "e"))
    p("Join:      ", s.Join([]string{"a", "b"}, "-"))
    p("Repeat:    ", s.Repeat("a", 5))
    p("Replace:   ", s.Replace("foo", "o", "0", -1))
    p("Replace:   ", s.Replace("foo", "o", "0", 1))
    p("Split:     ", s.Split("a-b-c", "-"))
    p("ToLower:   ", s.ToLower("TEST"))
    p("ToUpper:   ", s.ToUpper("test"))
}`,
        testExample: {
            description: "Probamos funciones comunes del paquete strings para manipular cadenas.", functionCode: `// stringfuncs.go
import "strings"

func ProcessString(s string) map[string]interface{} {
    return map[string]interface{}{
        "upper":      strings.ToUpper(s),
        "lower":      strings.ToLower(s),
        "hasPrefix":  strings.HasPrefix(s, "te"),
        "wordCount":  len(strings.Split(s, " ")),
        "replaced":   strings.Replace(s, "e", "3", -1),
    }
}`,
            testCode: `// stringfuncs_test.go
func TestStringFunctions(t *testing.T) {
    result := ProcessString("test string")

    if result["upper"] != "TEST STRING" {
        t.Errorf("ToUpper falló: %v", result["upper"])
    }
    if result["lower"] != "test string" {
        t.Errorf("ToLower falló: %v", result["lower"])
    }
    if result["hasPrefix"] != true {
        t.Error("HasPrefix debería ser true")
    }
    if result["wordCount"] != 2 {
        t.Errorf("WordCount = %v; esperado 2", result["wordCount"])
    }
}`
        },
        exercise: {
            question: "Usa `strings.ToUpper` y `strings.Join` para convertir `['hola', 'mundo']` en `HOLA def MUNDO`.", initialCode: `package main\n\nimport ("fmt"; "strings")\n\nfunc main() {\n    words := []string{"hola", "mundo"}\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "strings")\n\nfunc main() {\n    words := []string{"hola", "mundo"}\n    upper := []string{}\n    for _, w := range words {\n        upper = append(upper, strings.ToUpper(w))\n    }\n    fmt.Println(strings.Join(upper, " def "))\n}`
        }
    },
    {
        id: 'string-formatting', category: 'String Operations', title: 'String Formatting', description: 'Go ofrece un excelente soporte para formateo de cadenas al estilo printf de C.', guide: `El paquete fmt no solo imprime, también formatea strings con \`Sprintf\`.    
    **Verbos comunes:**
    *   \`%v\`: Valor en formato por defecto.
    *   \`%+v\`: Incluye nombres de campos en structs.
    *   \`%#v\`: Representación de sintaxis Go del valor.
    *   \`%T\`: Tipo del valor.
    *   \`%d\`: Base 10 (int).
    *   \`%b\`: Binario.
    *   \`%f\`: Float.
    *   \`%s\`: String.
    *   \`%q\`: String con comillas dobles.`,
        explanation: [
            { text: "Sprintf devuelve el string formateado sin imprimirlo.", lineCode: 's := fmt.Sprintf("a %s", "string")' },
            { text: "Fprintf escribe en un `io.Writer` (como un archivo o stderr).", lineCode: 'fmt.Fprintf(os.Stderr, "an %s\\n", "error")' }
        ],
        code: `package main
import (
    "fmt"
    "os"
)
type point struct {
    x, y int
}
func main() {
    p := point{1, 2}
    fmt.Printf("struct1: %v\\n", p)
    fmt.Printf("struct2: %+v\\n", p)
    fmt.Printf("struct3: %#v\\n", p)
    fmt.Printf("type: %T\\n", p)
    fmt.Printf("bool: %t\\n", true)
    fmt.Printf("int: %d\\n", 123)
    fmt.Printf("bin: %b\\n", 14)
    fmt.Printf("char: %c\\n", 33)
    fmt.Printf("hex: %x\\n", 456)
    fmt.Printf("float1: %f\\n", 78.9)
    fmt.Printf("float2: %e\\n", 123400000.0)
    fmt.Printf("float3: %E\\n", 123400000.0)
    fmt.Printf("str1: %s\\n", "\\"string\\"")
    fmt.Printf("str2: %q\\n", "\\"string\\"")
    fmt.Printf("str3: %x\\n", "hex this")
    fmt.Printf("pointer: %p\\n", &p)
    fmt.Printf("width1: |%6d|%6d|\\n", 12, 345)
    fmt.Printf("width2: |%6.2f|%6.2f|\\n", 1.2, 3.45)
    fmt.Printf("width3: |%-6.2f|%-6.2f|\\n", 1.2, 3.45)
    fmt.Printf("width4: |%6s|%6s|\\n", "foo", "b")
    fmt.Printf("width5: |%-6s|%-6s|\\n", "foo", "b")
    s := fmt.Sprintf("sprintf: a %s", "string")
    fmt.Println(s)
    fmt.Fprintf(os.Stderr, "io: an %s\\n", "error")
}`,
        testExample: {
            description: "Probamos la función fmt.Sprintf() para formatear strings con diferentes tipos de datos.", functionCode: `// formatter.go
package main

import "fmt"

func FormatPersonInfo(name string, age int, height float64) string {
    return fmt.Sprintf("%s tiene %d años y mide %.2f metros", name, age, height)
}`,
            testCode: `// formatter_test.go
package main

import "testing"

func TestFormatPersonInfo(t *testing.T) {
    result := FormatPersonInfo("Ana", 25, 1.65)
    expected := "Ana tiene 25 años y mide 1.65 metros"
    if result != expected {
        t.Errorf("FormatPersonInfo() = %q; esperado %q", result, expected)
    }

    result2 := FormatPersonInfo("Carlos", 30, 1.80)
    expected2 := "Carlos tiene 30 años y mide 1.80 metros"
    if result2 != expected2 {
        t.Errorf("FormatPersonInfo() = %q; esperado %q", result2, expected2)
    }
}`
        },
        exercise: {
            question: "Usa `Sprintf` para formatear un float `3.14159` con solo 2 decimales.", initialCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    pi := 3.14159\n    // Tu código\n}`,
            solution: `package main\n\nimport "fmt"\n\nfunc main() {\n    pi := 3.14159\n    s := fmt.Sprintf("%.2f", pi)\n    fmt.Println(s)\n}`
        }
    },
    {
        id: 'text-templates', category: 'String Operations', title: 'Text Templates', description: 'Go tiene un potente motor de plantillas para generar texto dinámico.', guide: `El paquete text/template permite crear contenido dinámico insertando valores en texto.    
    *   \`{{.}}\`: El valor actual (el punto).
    *   \`{{.Campo}}\`: Accede al campo de un struct o mapa.
    *   \`{{if .}} ... {{else}} ... {{end}}\`: Condicionales.
    *   \`{{range .}} ... {{end}}\`: Mjora sobre slices/arrays.
    
    **Pasos:**
    **1.  Crear plantilla:** \`t := template.New("nombre")\`.
    **2.  Parsear texto:** \`t.Parse("texto {{.}}")\`.
    3.  Ejecutar: \`t.Execute(os.Stdout, datos)\`.`,
        explanation: [
            { text: "Podemos ejecutar la misma plantilla con diferentes datos.", lineCode: 't1.Execute(os.Stdout, "Go")' },
            { text: "Si el dato es un struct, accedemos a sus campos.", lineCode: 't2.Execute(os.Stdout, struct{Name string}{"Jane Doe"})' },
            { text: "El bloque range permite iterar.", lineCode: 'range . // itera sobre el slice pasado' }
        ],
        code: `package main
import (
    "os"
    "text/template"
)
func main() {
    t1 := template.New("t1")
    t1, _ = t1.Parse("Value is {{}}\\n")
    t1.Execute(os.Stdout, "some text")
    t1.Execute(os.Stdout, 5)
    t1.Execute(os.Stdout, []string{"Go", "Rust", "C++"})
    Create := func(name, t string) *template.Template {
        t1 := template.New(name)
        t1, _ = t1.Parse(t)
        return t1
    }
    t2 := Create("t2", "Name: {{.Name}}\\n")
    t2.Execute(os.Stdout, struct{ Name string }{"Jane Doe"})
    t2.Execute(os.Stdout, map[string]string{
        "Name": "Mickey Mouse",
    })
    t3 := Create("t3", "{{if . -}} yes {{else -}} no {{end}}\\n")
    t3.Execute(os.Stdout, "not empty")
    t3.Execute(os.Stdout, "")
    t4 := Create("t4", "Range: {{range .}}{{.}} {{end}}\\n")
    t4.Execute(os.Stdout, []string{"Go", "Rust", "C++", "C#"})
}`,
        testExample: {
            description: "Probamos la ejecución de plantillas de texto con diferentes tipos de datos.", functionCode: `// templates.go
package main

import (
    "bytes"
    "text/template"
)

func RenderGreeting(name string) (string, error) {
    tmpl, err := template.New("greeting").Parse("Hola, {{.}}!")
    if err != nil {
        return "", err
    }
    var buf bytes.Buffer
    err = tmpl.Execute(&buf, name)
    return buf.String(), err
}`,
            testCode: `// templates_test.go
package main

import "testing"

func TestRenderGreeting(t *testing.T) {
    result, err := RenderGreeting("María")
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    expected := "Hola, María!"
    if result != expected {
        t.Errorf("RenderGreeting() = %q; esperado %q", result, expected)
    }

    result2, _ := RenderGreeting("Go")
    expected2 := "Hola, Go!"
    if result2 != expected2 {
        t.Errorf("RenderGreeting() = %q; esperado %q", result2, expected2)
    }
}`
        },
        exercise: {
            question: "Crea una plantilla que imprima 'Hola, [Nombre]!' dado un struct {Nombre string}.", initialCode: `package main\n\nimport ("os"; "text/template")\n\ntype Persona struct { Nombre string }\n\nfunc main() {\n    yo := Persona{"Gru"}\n    // Tu plantilla\n}`,
            solution: `package main\n\nimport ("os"; "text/template")\n\ntype Persona struct { Nombre string }\n\nfunc main() {\n    yo := Persona{"Gru"}\n    t := template.New("saludo")\n    t, _ = t.Parse("Hola, {{.Nombre}}!\\n")\n    t.Execute(os.Stdout, yo)\n}`
        }
    },
    {
        id: 'regular-expressions', category: 'String Operations', title: 'Regular Expressions', description: 'Go ofrece soporte integrado para expresiones regulares (regex).', guide: `El paquete regexp implementa búsqueda de expresiones regulares.    
    *   \`MatchString\`: Chequeo simple bool.
    *   \`Compile\`: Compila la regex para uso optimizado y repetido (recomendado).
    *   \`MustCompile\`: Como Compile, pero hace panic si falla (útil para variables globales).
    
    **Métodos comunes en el objeto \`Regexp\`:**
    *   \`MatchString\`
    *   \`FindString\`
    *   \`FindStringIndex\`
    *   \`FindAllString\`
    *   \`ReplaceAllString\``,
        explanation: [
            { text: "Compilamos la regex una vez. Note el uso de raw strings (backticks) para evitar escapar backslashes.", lineCode: 'r, _ := regexp.Compile("p([a-z]+)ch")' },
            { text: "Buscamos coincidencias.", lineCode: 'r.MatchString("peach")' },
            { text: "Podemos reemplazar texto.", lineCode: 'r.ReplaceAllString("a peach", "<fruit>")' }
        ],
        code: `package main
import (
    "bytes"
    "fmt"
    "regexp"
)
func main() {
    match, _ := regexp.MatchString("p([a-z]+)ch", "peach")
    fmt.Println(match)
    r, _ := regexp.Compile("p([a-z]+)ch")
    fmt.Println(r.MatchString("peach"))
    fmt.Println(r.FindString("peach punch"))
    fmt.Println("idx:", r.FindStringIndex("peach punch"))
    fmt.Println(r.FindStringSubmatch("peach punch"))
    fmt.Println(r.FindStringSubmatchIndex("peach punch"))
    fmt.Println(r.FindAllString("peach punch pinch", -1))
    fmt.Println("all:", r.FindAllStringSubmatchIndex(
        "peach punch pinch", -1))
    fmt.Println(r.FindAllString("peach punch pinch", 2))
    fmt.Println(r.Match([]byte("peach")))
    r = regexp.MustCompile("p([a-z]+)ch")
    fmt.Println("regexp:", r)
    fmt.Println(r.ReplaceAllString("a peach", "<fruit>"))
    in := []byte("a peach")
    out := r.ReplaceAllFunc(in, bytes.ToUpper)
    fmt.Println(string(out))
}`,
        testExample: {
            description: "Probamos expresiones regulares para buscar y extraer patrones de texto.", functionCode: `// validator.go
package main

import "regexp"

func ExtractEmails(text string) []string {
    r := regexp.MustCompile(\`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\`)
    return r.FindAllString(text, -1)
}`,
            testCode: `// validator_test.go
package main

import (
    "reflect"
    "testing"
)

func TestExtractEmails(t *testing.T) {
    text := "Contactos: ana@example.com y bob@test.org para más info"
    result := ExtractEmails(text)
    expected := []string{"ana@example.com", "bob@test.org"}

    if !reflect.DeepEqual(result, expected) {
        t.Errorf("ExtractEmails() = %v; esperado %v", result, expected)
    }

    text2 := "No hay emails aquí"
    result2 := ExtractEmails(text2)
    if len(result2) != 0 {
        t.Errorf("ExtractEmails() debería retornar slice vacío, obtuvo %v", result2)
    }
}`
        },
        exercise: {
            question: "Usa regex para encontrar todos los números en el string 'abc 123 def 456'.", initialCode: `package main\n\nimport ("fmt"; "regexp")\n\nfunc main() {\n    s := "abc 123 def 456"\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "regexp")\n\nfunc main() {\n    s := "abc 123 def 456"\n    r := regexp.MustCompile("[0-9]+")\n    fmt.Println(r.FindAllString(s, -1))\n}`
        }
    },
    {
        id: 'json', category: 'Data Formats', title: 'JSON', description: 'Go ofrece soporte integrado para la codificación y decodificación de JSON.', guide: `El paquete encoding/json convierte entre datos Go y texto JSON.    
    ***   Marshal (Go -> JSON):**
        \`b, err := json.Marshal(v)\`
    ***   Unmarshal (JSON -> Go):**
        \`err := json.Unmarshal(b, &v)\`
    
    **Etiquetas de struct (\`tags\`) personalizan los nombres de los campos JSON:**
    \`Field int \`json:"myName"\` \``,
        useCase: {
            title: "Consumir API REST con Respuesta Gigante", description: "La API de GitHub devuelve un JSON enorme. No necesitas todo. Define un struct con tags `json` solo para los campos que te interesan y Go filtrará el resto automáticamente.", code: `// JSON entra con 50 campos, solo queremos estos 2:
type Repo struct {
    Name  string \`json:"full_name"\`
    Stars int    \`json:"stargazers_count"\`
}

func parse(body []byte) {
    var r Repo
    json.Unmarshal(body, &r) // Solo llena Name y Stars
}`
        },
        explanation: [
            { text: "Marshal convierte structs y mapas a JSON.", lineCode: 'bolB, _ := json.Marshal(true)' },
            { text: "Para structs personalizados, solo los campos exportados (Mayúscula) se codifican.", lineCode: null },
            { text: "Unmarshal requiere un puntero donde decodificar.", lineCode: 'json.Unmarshal(byt, &dat)' }
        ],
        code: `package main
import (
    "encoding/json"
    "fmt"
    "os"
)
type response1 struct {
    Page   int
    Fruits []string
}
type response2 struct {
    Page   int      \`json:"page"\`
    Fruits []string \`json:"fruits"\`
}
func main() {
    bolB, _ := json.Marshal(true)
    fmt.Println(string(bolB))
    intB, _ := json.Marshal(1)
    fmt.Println(string(intB))
    fltB, _ := json.Marshal(2.34)
    fmt.Println(string(fltB))
    strB, _ := json.Marshal("gopher")
    fmt.Println(string(strB))
    slcD := []string{"apple", "peach", "pear"}
    slcB, _ := json.Marshal(slcD)
    fmt.Println(string(slcB))
    mapD := map[string]int{"apple": 5, "lettuce": 7}
    mapB, _ := json.Marshal(mapD)
    fmt.Println(string(mapB))
    res1D := &response1{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res1B, _ := json.Marshal(res1D)
    fmt.Println(string(res1B))
    res2D := &response2{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res2B, _ := json.Marshal(res2D)
    fmt.Println(string(res2B))
    byt := []byte(\`{"num":6.13,"strs":["a","b"]}\`)
    var dat map[string]interface{}
    if err := json.Unmarshal(byt, &dat); err != nil {
        panic(err)
    }
    fmt.Println(dat)
    num := dat["num"].(float64)
    fmt.Println(num)
    strs := dat["strs"].([]interface{})
    str1 := strs[0].(string)
    fmt.Println(str1)
    str := \`{"page": 1, "fruits": ["apple", "peach"]}\`
    res := response2{}
    json.Unmarshal([]byte(str), &res)
    fmt.Println(res)
    fmt.Println(res.Fruits[0])
    enc := json.NewEncoder(os.Stdout)
    d := map[string]int{"apple": 5, "lettuce": 7}
    enc.Encode(d)
}`,
        testExample: {
            description: "Probamos la codificación y decodificación de JSON con structs personalizados.", functionCode: `// user.go
package main

import "encoding/json"

type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
    Age   int    \`json:"age"\`
}

func UserToJSON(u User) (string, error) {
    bytes, err := json.Marshal(u)
    return string(bytes), err
}

func JSONToUser(jsonStr string) (User, error) {
    var u User
    err := json.Unmarshal([]byte(jsonStr), &u)
    return u, err
}`,
            testCode: `// user_test.go
package main

import "testing"

func TestUserToJSON(t *testing.T) {
    user := User{Name: "Ana", Email: "ana@example.com", Age: 28}
    result, err := UserToJSON(user)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    expected := \`{"name":"Ana","email":"ana@example.com","age":28}\`
    if result != expected {
        t.Errorf("UserToJSON() = %q; esperado %q", result, expected)
    }
}

func TestJSONToUser(t *testing.T) {
    jsonStr := \`{"name":"Carlos","email":"carlos@test.com","age":35}\`
    user, err := JSONToUser(jsonStr)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    if user.Name != "Carlos" || user.Email != "carlos@test.com" || user.Age != 35 {
        t.Errorf("JSONToUser() = %+v; datos incorrectos", user)
    }
}`
        },
        exercise: {
            question: "Define un struct `Persona` con campos `Nombre` (json: name) y `Edad` (json: age). Crea una instancia y conviértela a JSON.", initialCode: `package main\n\nimport ("encoding/json"; "fmt")\n\ntype Persona struct {\n    // Tus campos\n}\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("encoding/json"; "fmt")\n\ntype Persona struct {\n    Nombre string \`json:"name"\`\n    Edad   int    \`json:"age"\`\n}\n\nfunc main() {\n    p := Persona{"Gru", 42}\n    b, _ := json.Marshal(p)\n    fmt.Println(string(b))\n}`
        }
    },
    {
        id: 'xml', category: 'Data Formats', title: 'XML', description: 'Go también soporta XML de manera similar a JSON, usando `encoding/xml`.', guide: `El paquete encoding/xml funciona casi igual que JSON, pero con etiquetas \`xml\`.    
    *   \`xml.Marshal(v)\`
    *   \`xml.Unmarshal(b, &v)\`
    
    **Etiquetas XML:**
    *   \`xml:"name"\`: Nombre del elemento.
    *   \`xml:"attr"\`: Atributo del elemento padre.
    *   \`xml:",chardata"\`: Contenido de texto dentro de la etiqueta.
    *   \`xml:",innerxml"\`: XML crudo anidado.`,
        explanation: [
            { text: "Plant usa etiquetas XML para definir la estructura.", lineCode: 'type Plant struct { XMLName xml.Name `xml:"plant"` ... }' },
            { text: "El campo `Id` es un atributo (`<plant id=...>`).", lineCode: 'Id int `xml:"id,attr"`' },
            { text: "Las listas anidadas se manejan con slices.", lineCode: '<parent><child>...</child><child>...</child></parent>' }
        ],
        code: `package main
import (
    "encoding/xml"
    "fmt"
)
type Plant struct {
    XMLName xml.Name \`xml:"plant"\`
    Id      int      \`xml:"id,attr"\`
    Name    string   \`xml:"name"\`
    Origin  []string \`xml:"origin"\`
}
func main() {
    coffee := &Plant{Id: 27, Name: "Coffee"}
    coffee.Origin = []string{"Ethiopia", "Brazil"}
    out, _ := xml.MarshalIndent(coffee, " ", "  ")
    fmt.Println(string(out))
    fmt.Println(xml.Header + string(out))
    var p Plant
    if err := xml.Unmarshal(out, &p); err != nil {
        panic(err)
    }
    fmt.Println(p)
    tomato := &Plant{Id: 81, Name: "Tomato"}
    tomato.Origin = []string{"Mexico", "California"}
    type Nesting struct {
        XMLName xml.Name \`xml:"nesting"\`
        Plants  []*Plant \`xml:"parent>child>plant"\`
    }
    nesting := &Nesting{}
    nesting.Plants = []*Plant{coffee, tomato}
    out, _ = xml.MarshalIndent(nesting, " ", "  ")
    fmt.Println(string(out))
}`,
        testExample: {
            description: "Probamos la codificación y decodificación de XML con structs personalizados.", functionCode: `// product.go
package main

import "encoding/xml"

type Product struct {
    XMLName xml.Name \`xml:"product"\`
    ID      int      \`xml:"id,attr"\`
    Name    string   \`xml:"name"\`
    Price   float64  \`xml:"price"\`
}

func ProductToXML(p Product) (string, error) {
    bytes, err := xml.MarshalIndent(p, "", "  ")
    return string(bytes), err
}

func XMLToProduct(xmlStr string) (Product, error) {
    var p Product
    err := xml.Unmarshal([]byte(xmlStr), &p)
    return p, err
}`,
            testCode: `// product_test.go
package main

import (
    "strings"
    "testing"
)

func TestProductToXML(t *testing.T) {
    product := Product{ID: 1, Name: "Laptop", Price: 999.99}
    result, err := ProductToXML(product)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    if !strings.Contains(result, \`<product id="1">\`) {
        t.Errorf("XML no contiene el atributo id correcto")
    }
    if !strings.Contains(result, "<name>Laptop</name>") {
        t.Errorf("XML no contiene el nombre correcto")
    }
}

func TestXMLToProduct(t *testing.T) {
    xmlStr := \`<product id="2"><name>Mouse</name><price>25.50</price></product>\`
    product, err := XMLToProduct(xmlStr)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    if product.ID != 2 || product.Name != "Mouse" || product.Price != 25.50 {
        t.Errorf("XMLToProduct() = %+v; datos incorrectos", product)
    }
}`
        },
        exercise: {
            question: "Crea una estructura para `<book id='1'><title>The Go Gopher</title></book>` y decodifícalo.", initialCode: `package main\n\nimport ("encoding/xml"; "fmt")\n\ntype Book struct {\n    // Tus etiquetas xml\n}\n\nfunc main() {\n    data := []byte("<book id='1'><title>The Go Gopher</title></book>")\n    // Unmarshal\n}`,
            solution: `package main\n\nimport ("encoding/xml"; "fmt")\n\ntype Book struct {\n    XMLName xml.Name \`xml:"book"\`\n    ID      int      \`xml:"id,attr"\`\n    Title   string   \`xml:"title"\`\n}\n\nfunc main() {\n    data := []byte("<book id='1'><title>The Go Gopher</title></book>")\n    var b Book\n    xml.Unmarshal(data, &b)\n    fmt.Println(b)\n}`
        }
    },
    {
        id: 'time', category: 'Time & Scheduling', title: 'Time', description: 'Go ofrece un amplio soporte para tiempos y duraciones.', guide: `El paquete time maneja instantes y duraciones.    
    *   \`time.Now()\`: Momento actual.
    *   \`time.Date(...)\`: Construir fecha específica.
    *   \`t.Year()\`, \`t.Month()\`, etc.: Acceder componentes.
    *   \`time.Duration\`: Representa un lapso (e.g., \`10 * time.Second\`).
    *   \`t.Add(d)\`, \`t.Sub(t2)\`: Operaciones aritméticas.`,
        explanation: [
            { text: "Obtenemos la hora actual.", lineCode: 'now := time.Now()' },
            { text: "Construimos una fecha.", lineCode: 'then := time.Date(2009, 11, 17, 20, 34, 58, 651387237, time.UTC)' },
            { text: "Calculamos la diferencia (duración) entre dos tiempos.", lineCode: 'diff := now.Sub(then)' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func main() {
    p := fmt.Println
    now := time.Now()
    p(now)
    then := time.Date(
        2009, 11, 17, 20, 34, 58, 651387237, time.UTC)
    p(then)
    p(then.Year())
    p(then.Month())
    p(then.Day())
    p(then.Hour())
    p(then.Minute())
    p(then.Second())
    p(then.Nanosecond())
    p(then.Location())
    p(then.Weekday())
    p(then.Before(now))
    p(then.After(now))
    p(then.Equal(now))
    diff := now.Sub(then)
    p(diff)
    p(diff.Hours())
    p(diff.Minutes())
    p(diff.Seconds())
    p(diff.Nanoseconds())
    p(then.Add(diff))
    p(then.Add(-diff))
}`,
        testExample: {
            description: "Probamos operaciones con fechas y duraciones usando el paquete time.", functionCode: `// datetime.go
package main

import "time"

func DaysBetween(date1, date2 time.Time) int {
    diff := date2.Sub(date1)
    return int(diff.Hours() / 24)
}

func AddDays(t time.Time, days int) time.Time {
    return t.Add(time.Duration(days) * 24 * time.Hour)
}`,
            testCode: `// datetime_test.go
package main

import (
    "testing"
    "time"
)

func TestDaysBetween(t *testing.T) {
    date1 := time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC)
    date2 := time.Date(2024, 1, 11, 0, 0, 0, 0, time.UTC)
    result := DaysBetween(date1, date2)
    expected := 10
    if result != expected {
        t.Errorf("DaysBetween() = %d; esperado %d", result, expected)
    }
}

func TestAddDays(t *testing.T) {
    date := time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC)
    result := AddDays(date, 7)
    expected := time.Date(2024, 1, 8, 0, 0, 0, 0, time.UTC)
    if !result.Equal(expected) {
        t.Errorf("AddDays() = %v; esperado %v", result, expected)
    }
}`
        },
        exercise: {
            question: "¿Cuánto tiempo ha pasado desde el 1 de enero de 2000? Imprímelo en horas.", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    start := time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    start := time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)\n    fmt.Println(time.Since(start).Hours())\n}`
        }
    },
    {
        id: 'epoch', category: 'Time & Scheduling', title: 'Epoch', description: 'Un uso común del tiempo es obtener el número de segundos desde la época Unix.', guide: `Unix Epoch: Enero 1, 1970 UTC.    
    *   \`now.Unix()\`: Segundos desde la época.
    *   \`now.UnixMilli()\`: Milisegundos.
    *   \`now.UnixNano()\`: Nanosegundos.
    
    También puedes convertir de vuelta de timestamp a \`time.Time\` con \`time.Unix(sec, nsec)\`.`,
        explanation: [
            { text: "Obtenemos tiempo actual.", lineCode: 'now := time.Now()' },
            { text: "Segundos desde 1970.", lineCode: 'secs := now.Unix()' },
            { text: "Milisegundos.", lineCode: 'millis := now.UnixMilli()' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func main() {
    now := time.Now()
    secs := now.Unix()
    nanos := now.UnixNano()
    fmt.Println(now)
    fmt.Println(secs)
    fmt.Println(nanos)
    millis := nanos / 1000000
    fmt.Println(millis)
    fmt.Println(time.Unix(secs, 0))
    fmt.Println(time.Unix(0, nanos))
}`,
        testExample: {
            description: "Probamos la conversión entre timestamps Unix y objetos time.Time.", functionCode: `// epoch.go
package main

import "time"

func TimeToUnix(t time.Time) int64 {
    return t.Unix()
}

func UnixToTime(timestamp int64) time.Time {
    return time.Unix(timestamp, 0)
}`,
            testCode: `// epoch_test.go
package main

import (
    "testing"
    "time"
)

func TestTimeToUnix(t *testing.T) {
    date := time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)
    result := TimeToUnix(date)
    expected := int64(1577836800)
    if result != expected {
        t.Errorf("TimeToUnix() = %d; esperado %d", result, expected)
    }
}

func TestUnixToTime(t *testing.T) {
    timestamp := int64(1577836800)
    result := UnixToTime(timestamp)
    expected := time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)
    if !result.Equal(expected) {
        t.Errorf("UnixToTime() = %v; esperado %v", result, expected)
    }
}`
        },
        exercise: {
            question: "Obtén la fecha correspondiente al timestamp Unix 1000000000.", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    fmt.Println(time.Unix(1000000000, 0))\n}`
        }
    },
    {
        id: 'time-formatting-parsing', category: 'Time & Scheduling', title: 'Time Formatting / Parsing', description: 'Go utiliza un enfoque basado en patrones para formatear y parsear tiempos.', guide: `En lugar de códigos como \`%Y-%m-%d\`, Go usa una fecha de referencia específica:        Mon Jan 2 15:04:05 MST 2006
    (1 2 3 4 5 6)
    
    Para formatear o parsear, simplemente escribes esa fecha de referencia en el formato que quieres.
    
    *   \`t.Format("2006-01-02")\` -> "YYYY-MM-DD"
    *   \`time.Parse("3:04PM", "8:41PM")\``,
        explanation: [
            { text: "Formato RFC3339 estándar.", lineCode: 't.Format(time.RFC3339)' },
            { text: "Parsear un horario de cocina.", lineCode: 'time.Parse("3:04PM", "8:41PM")' },
            { text: "Si el parse falla, devuelve error.", lineCode: '_, err := time.Parse(...)' }
        ],
        code: `package main
import (
    "fmt"
    "time"
)
func main() {
    p := fmt.Println
    t := time.Now()
    p(t.Format(time.RFC3339))
    p(t.Format("3:04PM"))
    p(t.Format("Mon Jan _2 15:04:05 2006"))
    p(t.Format("2006-01-02T15:04:05.999999-07:00"))
    form := "3 04 PM"
    t2, _ := time.Parse(form, "8 41 PM")
    p(t2)
    fmt.Printf("%d-%02d-%02dT%02d:%02d:%02d-00:00\\n",
        t.Year(), t.Month(), t.Day(),
        t.Hour(), t.Minute(), t.Second())
    ansic := "Mon Jan _2 15:04:05 2006"
    _, e := time.Parse(ansic, "8:41PM")
    p(e)
}`,
        testExample: {
            description: "Probamos el formateo y parseo de fechas usando patrones de referencia de Go.", functionCode: `// timeformat.go
package main

import "time"

func FormatDate(t time.Time) string {
    return t.Format("2006-01-02")
}

func ParseDate(dateStr string) (time.Time, error) {
    return time.Parse("2006-01-02", dateStr)
}`,
            testCode: `// timeformat_test.go
package main

import (
    "testing"
    "time"
)

func TestFormatDate(t *testing.T) {
    date := time.Date(2024, 3, 15, 10, 30, 0, 0, time.UTC)
    result := FormatDate(date)
    expected := "2024-03-15"
    if result != expected {
        t.Errorf("FormatDate() = %q; esperado %q", result, expected)
    }
}

func TestParseDate(t *testing.T) {
    dateStr := "2024-03-15"
    result, err := ParseDate(dateStr)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    expected := time.Date(2024, 3, 15, 0, 0, 0, 0, time.UTC)
    if !result.Equal(expected) {
        t.Errorf("ParseDate() = %v; esperado %v", result, expected)
    }
}`
        },
        exercise: {
            question: "Formatea la hora actual como 'Día/Mes/Año' (e.g., 25/12/2023).", initialCode: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    t := time.Now()\n    // fmt.Println(t.Format(...))\n}`,
            solution: `package main\n\nimport ("fmt"; "time")\n\nfunc main() {\n    t := time.Now()\n    fmt.Println(t.Format("02/01/2006"))\n}`
        }
    },
    {
        id: 'random-numbers', category: 'Random & Number Operations', title: 'Random Numbers', description: 'El paquete `math/rand/v2` (Go 1.22+) o `math/rand` provee generación de números pseudoaleatorios.', guide: `Generar números aleatorios es útil para simulaciones, juegos, etc.    
    *   \`rand.IntN(100)\`: Entero entre [0, 100).
    *   \`rand.Float64()\`: Float entre [0.0, 1.0).
    
    Nota: En versiones viejas (\`math/rand\`), necesitabas sembrar el generador (\`rand.Seed\`) o siempre obtenías los mismos números. Desde Go 1.20+ el seed es automático al inicio.`,
        explanation: [
            { text: "Entero aleatorio entre 0 y 99.", lineCode: 'rand.IntN(100)' },
            { text: "Float aleatorio.", lineCode: 'rand.Float64()' },
            { text: "Permutación aleatoria de n enteros.", lineCode: 'rand.Perm(5)' }
        ],
        code: `package main
import (
    "fmt"
    "math/rand/v2" 
)
// Nota: Si usas Go < 1.22, usa "math/rand" y rand.Intn
func main() {
    fmt.Print(rand.IntN(100), ",")
    fmt.Print(rand.IntN(100))
    fmt.Println()
    fmt.Println(rand.Float64())
    fmt.Print((rand.Float64()*5)+5, ",")
    fmt.Print((rand.Float64() * 5) + 5)
    fmt.Println()
    // Si quieres un generador determinista (misma semilla):
    s2 := rand.NewPCG(42, 1024)
    r2 := rand.New(s2)
    fmt.Print(r2.IntN(100), ",")
    fmt.Print(r2.IntN(100))
    fmt.Println()
}`,
        testExample: {
            description: "Probamos la generación de números aleatorios en rangos específicos.", functionCode: `// random.go
package main

import "math/rand/v2"

func RandomInRange(min, max int) int {
    return rand.IntN(max-min+1) + min
}

func RandomFloat() float64 {
    return rand.Float64()
}`,
            testCode: `// random_test.go
package main

import "testing"

func TestRandomInRange(t *testing.T) {
    // Ejecutamos varias veces para verificar que está en el rango
    for i := 0; i < 100; i++ {
        result := RandomInRange(10, 20)
        if result < 10 || result > 20 {
            t.Errorf("RandomInRange(10, 20) = %d; fuera del rango [10, 20]", result)
        }
    }
}

func TestRandomFloat(t *testing.T) {
    for i := 0; i < 100; i++ {
        result := RandomFloat()
        if result < 0.0 || result >= 1.0 {
            t.Errorf("RandomFloat() = %f; fuera del rango [0.0, 1.0)", result)
        }
    }
}`
        },
        exercise: {
            question: "Genera un número entero aleatorio entre 50 y 100.", initialCode: `package main\n\nimport ("fmt"; "math/rand/v2")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "math/rand/v2")\n\nfunc main() {\n    // [0, 50) + 50 = [50, 100)\n    fmt.Println(rand.IntN(51) + 50)\n}`
        }
    },
    {
        id: 'number-parsing', category: 'Random & Number Operations', title: 'Number Parsing', description: 'Parseo de números desde cadenas strings.', guide: `Parsear números es una tarea común al trabajar con entradas de usuario o archivos de texto. Go utiliza el paquete \`strconv\` para esto.    
    **Funciones Principales:**
    *   \`strconv.ParseFloat(str, bitSize)\`: Convierte a punto flotante. \`bitSize\` 64 para float64.
    *   \`strconv.ParseInt(str, base, bitSize)\`: Convierte a entero. \`base\` 0 infiere la base (hex, octal, etc).
    *   \`strconv.Atoi(str)\`: "Ascii to Integer". Es un atajo conveniente para \`ParseInt(str, 10, 0)\`.
    
    **Manejo de Errores:**
    Todas estas funciones devuelven \`(valor, error)\`. Es crucial chequear el error por si la cadena no es un número válido.`,
        explanation: [
            { text: "Con `ParseFloat`, el 64 indica cuántos bits de precisión usar.", lineCode: 'f, _ := strconv.ParseFloat("1.234", 64)' },
            { text: "Para `ParseInt`, el 0 indica que infiera la base de la cadena. El 64 requiere que el resultado quepa en 64 bits.", lineCode: 'i, _ := strconv.ParseInt("123", 0, 64)' },
            { text: "`ParserInt` reconoce formatos hexadecimales.", lineCode: 'd, _ := strconv.ParseInt("0x1c8", 0, 64)' },
            { text: "`Atoi` es una función de conveniencia para parseo básico en base-10.", lineCode: 'k, _ := strconv.Atoi("135")' }
        ],
        code: `package main

import (
    "fmt"
    "strconv"
)

func main() {

    f, _ := strconv.ParseFloat("1.234", 64)
    fmt.Println(f)

    i, _ := strconv.ParseInt("123", 0, 64)
    fmt.Println(i)

    d, _ := strconv.ParseInt("0x1c8", 0, 64)
    fmt.Println(d)

    u, _ := strconv.ParseUint("789", 0, 64)
    fmt.Println(u)

    k, _ := strconv.Atoi("135")
    fmt.Println(k)

    _, e := strconv.Atoi("wat")
    fmt.Println(e)
}`,
        testExample: {
            description: "Probamos el parseo de strings a diferentes tipos numéricos con manejo de errores.", functionCode: `// parser.go
package main

import "strconv"

func ParseInteger(s string) (int, error) {
    return strconv.Atoi(s)
}

func ParseFloat(s string) (float64, error) {
    return strconv.ParseFloat(s, 64)
}`,
            testCode: `// parser_test.go
package main

import "testing"

func TestParseInteger(t *testing.T) {
    result, err := ParseInteger("42")
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    if result != 42 {
        t.Errorf("ParseInteger('42') = %d; esperado 42", result)
    }

    _, err = ParseInteger("no es un numero")
    if err == nil {
        t.Error("ParseInteger debería retornar error para entrada inválida")
    }
}

func TestParseFloat(t *testing.T) {
    result, err := ParseFloat("3.14")
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    if result != 3.14 {
        t.Errorf("ParseFloat('3.14') = %f; esperado 3.14", result)
    }

    _, err = ParseFloat("invalido")
    if err == nil {
        t.Error("ParseFloat debería retornar error para entrada inválida")
    }
}`
        },
        exercise: {
            question: "Convierte la cadena '3.14' a un float y súmale 1. Imprime el resultado.", initialCode: `package main\n\nimport ("fmt"; "strconv")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "strconv")\n\nfunc main() {\n    f, _ := strconv.ParseFloat("3.14", 64)\n    fmt.Println(f + 1)\n}`
        }
    },
    {
        id: 'url-parsing', category: 'URL & Network Utilities', title: 'URL Parsing', description: 'Las URLs proveen una forma uniforme de localizar recursos.', guide: `El paquete \`net/url\` facilita el parseo de URLs.    
    **Componentes:**
    **Una URL como \`postgres://user:pass@host.com:5432/path?k=v#f\` se descompone en:**
    *   Scheme: \`postgres\`
    *   User: \`user:pass\`
    *   Host: \`host.com:5432\`
    *   Path: \`/path\`
    *   Query: \`k=v\`
    *   Fragment: \`f\`
    
    **Consejo Experto:**
    Ten cuidado al leer Query Params. \`u.RawQuery\` te da el string completo, pero \`u.Query()\` te devuelve un mapa \`Values\` más fácil de usar.`,
        explanation: [
            { text: "Parseamos una URL de ejemplo que incluye esquema, autenticación, host, puerto, ruta, parámetros de consulta y fragmento.", lineCode: 's := "postgres://user:pass@host.com:5432/path?k=v#f"' },
            { text: "Accediendo al esquema (scheme).", lineCode: 'fmt.Println(u.Scheme)' },
            { text: "Para extraer el puerto, si está presente.", lineCode: 'fmt.Println(u.Port())' },
            { text: "Para obtener los parámetros de consulta en un mapa k=v.", lineCode: 'm, _ := url.ParseQuery(u.RawQuery)' }
        ],
        code: `package main

import (
    "fmt"
    "net"
    "net/url"
)

func main() {

    s := "postgres://user:pass@host.com:5432/path?k=v#f"

    u, err := url.Parse(s)
    if err != nil {
        panic(err)
    }

    fmt.Println(u.Scheme)

    fmt.Println(u.User)
    fmt.Println(u.User.Username())
    p, _ := u.User.Password()
    fmt.Println(p)

    fmt.Println(u.Host)
    host, port, _ := net.SplitHostPort(u.Host)
    fmt.Println(host)
    fmt.Println(port)

    fmt.Println(u.Path)
    fmt.Println(u.Fragment)

    fmt.Println(u.RawQuery)
    m, _ := url.ParseQuery(u.RawQuery)
    fmt.Println(m)
    fmt.Println(m["k"][0])
}`,
        testExample: {
            description: "Probamos el parseo de URLs y la extracción de sus componentes.", functionCode: `// urlparser.go
package main

import "net/url"

func GetQueryParam(urlStr, param string) (string, error) {
    u, err := url.Parse(urlStr)
    if err != nil {
        return "", err
    }
    values := u.Query()
    if val, ok := values[param]; ok && len(val) > 0 {
        return val[0], nil
    }
    return "", nil
}

func GetHost(urlStr string) (string, error) {
    u, err := url.Parse(urlStr)
    if err != nil {
        return "", err
    }
    return u.Host, nil
}`,
            testCode: `// urlparser_test.go
package main

import "testing"

func TestGetQueryParam(t *testing.T) {
    urlStr := "http://example.com/search?q=golang&page=1"
    result, err := GetQueryParam(urlStr, "q")
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    if result != "golang" {
        t.Errorf("GetQueryParam() = %q; esperado 'golang'", result)
    }
}

func TestGetHost(t *testing.T) {
    urlStr := "https://www.example.com:8080/path"
    result, err := GetHost(urlStr)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    if result != "www.example.com:8080" {
        t.Errorf("GetHost() = %q; esperado 'www.example.com:8080'", result)
    }
}`
        },
        exercise: {
            question: "Parsea 'http://google.com/search?q=golang' e imprime solo el valor del parámetro 'q'.", initialCode: `package main\n\nimport ("fmt"; "net/url")\n\nfunc main() {\n    s := "http://google.com/search?q=golang"\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "net/url")\n\nfunc main() {\n    u, _ := url.Parse("http://google.com/search?q=golang")\n    q := u.Query()\n    fmt.Println(q["q"][0])\n}`
        }
    },
    {
        id: 'sha256-hashes', category: 'Cryptography & Security', title: 'SHA256 Hashes', description: 'SHA256 es una función hash criptográfica común.', guide: `Los hashes se usan para verificar integridad de datos, firmas digitales, etc. Go implementa varias funciones hash en el paquete \`crypto/*\`.    
    **Uso:**
    **1.  Crear un nuevo hash:** \`h := sha256.New()\`
    **2.  Escribir bytes:** \`h.Write([]byte("texto"))\`
    **3.  Obtener el resultado final:** \`bs := h.Sum(nil)\`
    
    **Seguridad:**
    SHA256 es rápido y seguro para firmas, pero NO es recomendable para almacenar contraseñas en bases de datos porque es *demasiado rápido* (vulnerable a fuerza bruta). Para passwords, usa bcrypt o argon2.`,
        explanation: [
            { text: "Importa crypto/sha256.", lineCode: 'import "crypto/sha256"' },
            { text: "`Write` espera bytes. Si tienes un string, usa `[]byte(s)`.", lineCode: 'h.Write([]byte(s))' },
            { text: "`Sum` calcula y devuelve el hash. El argumento es un slice de bytes al cual se agrega el hash (usualmente nil).", lineCode: 'bs := h.Sum(nil)' }
        ],
        code: `package main

import (
    "crypto/sha256"
    "fmt"
)

func main() {
    s := "sha256 this string"

    h := sha256.New()

    h.Write([]byte(s))

    bs := h.Sum(nil)

    fmt.Println(s)
    fmt.Printf("%x\\n", bs)
}`,
        testExample: {
            description: "Probamos la generación de hashes SHA256 para verificar integridad de datos.", functionCode: `// hasher.go
package main

import (
    "crypto/sha256"
    "fmt"
)

func HashString(s string) string {
    h := sha256.New()
    h.Write([]byte(s))
    return fmt.Sprintf("%x", h.Sum(nil))
}`,
            testCode: `// hasher_test.go
package main

import "testing"

func TestHashString(t *testing.T) {
    input := "hello"
    result := HashString(input)
    // Hash conocido de "hello" en SHA256
    expected := "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    if result != expected {
        t.Errorf("HashString('hello') = %q; esperado %q", result, expected)
    }

    // Verificar que strings diferentes producen hashes diferentes
    result2 := HashString("world")
    if result == result2 {
        t.Error("HashString debería producir hashes diferentes para entradas diferentes")
    }
}`
        },
        exercise: {
            question: "Calcula el hash SHA256 de la palabra 'secreto' e imprímelo en formato hexadecimal (%x).", initialCode: `package main\n\nimport ("fmt"; "crypto/sha256")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "crypto/sha256")\n\nfunc main() {\n    h := sha256.New()\n    h.Write([]byte("secreto"))\n    fmt.Printf("%x\\n", h.Sum(nil))\n}`
        }
    },
    {
        id: 'base64-encoding', category: 'Data Formats', title: 'Base64 Encoding', description: 'Codificación y decodificación Base64 estándar y compatible con URLs.', guide: `Base64 es un esquema para representar datos binarios en formato de texto ASCII.    
    **Variantes:**
    *   StdEncoding: El estándar (usa \`+\` y \`/\`). Común en email y headers MIME.
    *   URLEncoding: Seguro para URLs (usa \`-\` y \`_\`).
    
    **Consejo:**
    Recuerda que Base64 aumenta el tamaño de los datos en aproximadamente un 33%.`,
        explanation: [
            { text: "Codificación estándar.", lineCode: 'base64.StdEncoding.EncodeToString(data)' },
            { text: "La decodificación puede devolver error si el input no es válido.", lineCode: 'uDec, _ := base64.URLEncoding.DecodeString(uEnc)' }
        ],
        code: `package main

import (
    "encoding/base64"
    "fmt"
)

func main() {

    data := "abc123!@#"

    sEnc := base64.StdEncoding.EncodeToString([]byte(data))
    fmt.Println(sEnc)

    sDec, _ := base64.StdEncoding.DecodeString(sEnc)
    fmt.Println(string(sDec))

    uEnc := base64.URLEncoding.EncodeToString([]byte(data))
    fmt.Println(uEnc)

    uDec, _ := base64.URLEncoding.DecodeString(uEnc)
    fmt.Println(string(uDec))
}`,
        testExample: {
            description: "Probamos la codificación y decodificación Base64 de strings.", functionCode: `// encoder.go
package main

import "encoding/base64"

func EncodeBase64(s string) string {
    return base64.StdEncoding.EncodeToString([]byte(s))
}

func DecodeBase64(encoded string) (string, error) {
    decoded, err := base64.StdEncoding.DecodeString(encoded)
    if err != nil {
        return "", err
    }
    return string(decoded), nil
}`,
            testCode: `// encoder_test.go
package main

import "testing"

func TestEncodeBase64(t *testing.T) {
    input := "Hello, World!"
    result := EncodeBase64(input)
    expected := "SGVsbG8sIFdvcmxkIQ=="
    if result != expected {
        t.Errorf("EncodeBase64() = %q; esperado %q", result, expected)
    }
}

func TestDecodeBase64(t *testing.T) {
    encoded := "SGVsbG8sIFdvcmxkIQ=="
    result, err := DecodeBase64(encoded)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    expected := "Hello, World!"
    if result != expected {
        t.Errorf("DecodeBase64() = %q; esperado %q", result, expected)
    }

    _, err = DecodeBase64("!!!invalido!!!")
    if err == nil {
        t.Error("DecodeBase64 debería retornar error para entrada inválida")
    }
}`
        },
        exercise: {
            question: "Codifica el string 'Golang' a Base64 estándar.", initialCode: `package main\n\nimport ("fmt"; "encoding/base64")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "encoding/base64")\n\nfunc main() {\n    fmt.Println(base64.StdEncoding.EncodeToString([]byte("Golang")))\n}`
        }
    },
    {
        id: 'reading-files', category: 'File System & I/O', title: 'Reading Files', description: 'Lectura y procesamiento de archivos.', guide: `Leer archivos en Go puede hacerse de varias formas según la necesidad.    
    **1.  Rápido:** \`os.ReadFile("path")\`. Lee TODO el archivo a memoria. Fácil pero peligroso con archivos gigantes.
    **2.  Controlado:** \`os.Open()\` devuelve un \`File\` descriptor. Puedes leer por partes.
    **3.  Buffer:** \`bufio.NewReader(f)\`. Ideal para leer eficientemente y usar métodos como \`Peek\`.
    
    ¡Recuerda cerrar!
    Siempre usa \`defer f.Close()\` inmediatamente después de abrir un archivo para evitar fugas de recursos.`,
        useCase: {
            title: "Cargar Configuración (JSON)", description: "Es común leer un archivo 'config.json' al iniciar tu app. `os.ReadFile` es perfecto aquí porque el archivo es pequeño y lo necesitas todo en memoria.", code: `type Config struct { Port int; Env string }

func loadConfig() {
    data, err := os.ReadFile("config.json")
    if err != nil {
        panic(err)
    }
    var cfg Config
    json.Unmarshal(data, &cfg)
    fmt.Println("Config loaded:", cfg)
}`
        },
        explanation: [
            { text: "Lo más básico: meter todo el archivo en memoria.", lineCode: 'dat, err := os.ReadFile("/tmp/dat")' },
            { text: "Para más control, abre el archivo primero.", lineCode: 'f, err := os.Open("/tmp/dat")' },
            { text: "Lee bytes iniciales.", lineCode: 'b1 := make([]byte, 5)\nn1, err := f.Read(b1)' },
            { text: "`Seek` te permite saltar a una posición conocida.", lineCode: 'o2, err := f.Seek(6, 0)' },
            { text: "El paquete `bufio` implementa lectura con buffer, útil para muchos chunks pequeños.", lineCode: 'r4 := bufio.NewReader(f)' }
        ],
        code: `package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {

    dat, err := os.ReadFile("/tmp/dat")
    check(err)
    fmt.Print(string(dat))

    f, err := os.Open("/tmp/dat")
    check(err)

    b1 := make([]byte, 5)
    n1, err := f.Read(b1)
    check(err)
    fmt.Printf("%d bytes: %s\\n", n1, string(b1[:n1]))

    o2, err := f.Seek(6, 0)
    check(err)
    b2 := make([]byte, 2)
    n2, err := f.Read(b2)
    check(err)
    fmt.Printf("%d bytes @ %d: ", n2, o2)
    fmt.Printf("%v\\n", string(b2[:n2]))

    o3, err := f.Seek(6, 0)
    check(err)
    b3 := make([]byte, 2)
    n3, err := io.ReadAtLeast(f, b3, 2)
    check(err)
    fmt.Printf("%d bytes @ %d: %s\\n", n3, o3, string(b3))

    _, err = f.Seek(0, 0)
    check(err)

    r4 := bufio.NewReader(f)
    b4, err := r4.Peek(5)
    check(err)
    fmt.Printf("5 bytes: %s\\n", string(b4))

    f.Close()
}`,
        testExample: {
            description: "Probamos la lectura de archivos usando diferentes métodos.", functionCode: `// filereader.go
package main

import "os"

func ReadEntireFile(path string) (string, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return "", err
    }
    return string(data), nil
}

func ReadFirstNBytes(path string, n int) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()

    buffer := make([]byte, n)
    bytesRead, err := f.Read(buffer)
    if err != nil {
        return nil, err
    }
    return buffer[:bytesRead], nil
}`,
            testCode: `// filereader_test.go
package main

import (
    "os"
    "testing"
)

func TestReadEntireFile(t *testing.T) {
    // Crear archivo temporal para testing
    tmpFile, err := os.CreateTemp("", "test_*.txt")
    if err != nil {
        t.Fatalf("Error creando archivo temporal: %v", err)
    }
    defer os.Remove(tmpFile.Name())

    content := "Contenido de prueba"
    tmpFile.WriteString(content)
    tmpFile.Close()

    result, err := ReadEntireFile(tmpFile.Name())
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    if result != content {
        t.Errorf("ReadEntireFile() = %q; esperado %q", result, content)
    }
}

func TestReadFirstNBytes(t *testing.T) {
    tmpFile, err := os.CreateTemp("", "test_*.txt")
    if err != nil {
        t.Fatalf("Error creando archivo temporal: %v", err)
    }
    defer os.Remove(tmpFile.Name())

    tmpFile.WriteString("Hello, World!")
    tmpFile.Close()

    result, err := ReadFirstNBytes(tmpFile.Name(), 5)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }
    expected := "Hello"
    if string(result) != expected {
        t.Errorf("ReadFirstNBytes() = %q; esperado %q", string(result), expected)
    }
}`
        },
        exercise: {
            question: "Usa `os.ReadFile` para leer un archivo ficticio 'hola.txt'. Asume que existe.", initialCode: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    dat, _ := os.ReadFile("hola.txt")\n    fmt.Print(string(dat))\n}`
        }
    },
    {
        id: 'writing-files', category: 'File System & I/O', title: 'Writing Files', description: 'Escribiendo datos a archivos en Go.', guide: `Escribir archivos es similar a leerlos.    
    **1.  Rápido:** \`os.WriteFile\`. Escribe todo de una vez.
    **2.  Controlado:** \`os.Create\` abre un archivo para escritura.
    **3.  Buffer:** \`bufio.NewWriter\`.
    
    **Sync:**
    Go, como la mayoría de los lenguajes, usa buffers del sistema operativo. Si necesitas garantizar que los datos están en el disco físico (ej. base de datos), llama a \`f.Sync()\`.`,
        useCase: {
            title: "Guardar Reporte CSV", description: "Tienes una lista de usuarios y quieres exportarlos. Escribir línea por línea es ineficiente. Usar un `bufio.Writer` agrupa las escrituras y mejora el rendimiento.", code: `func exportUsers(users []string) {
    f, _ := os.Create("users.csv")
    defer f.Close()
    
    w := bufio.NewWriter(f)
    for _, u := range users {
        w.WriteString(u + "\n")
    }
    w.Flush() // ¡Crucial! Vuelca el buffer al disco
}`
        },
        explanation: [
            { text: "Para volcar un string/bytes a un archivo rápidamente.", lineCode: 'err := os.WriteFile("/tmp/dat1", d1, 0644)' },
            { text: "Para escritura granular, abre un archivo.", lineCode: 'f, err := os.Create("/tmp/dat2")' },
            { text: "Es buena práctica diferir el Close.", lineCode: 'defer f.Close()' },
            { text: "Escribe bytes.", lineCode: 'n2, err := f.Write(d2)' },
            { text: "Escribe string.", lineCode: 'n3, err := f.WriteString("writes\\n")' },
            { text: "Sync hace flush a disco.", lineCode: 'f.Sync()' },
            { text: "bufio provee escritura con buffer.", lineCode: 'w := bufio.NewWriter(f)' }
        ],
        code: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {

    d1 := []byte("hello\\ngo\\n")
    err := os.WriteFile("/tmp/dat1", d1, 0644)
    check(err)

    f, err := os.Create("/tmp/dat2")
    check(err)

    defer f.Close()

    d2 := []byte{115, 111, 109, 101, 10}
    n2, err := f.Write(d2)
    check(err)
    fmt.Printf("wrote %d bytes\\n", n2)

    n3, err := f.WriteString("writes\\n")
    check(err)
    fmt.Printf("wrote %d bytes\\n", n3)

    f.Sync()

    w := bufio.NewWriter(f)
    n4, err := w.WriteString("buffered\\n")
    check(err)
    fmt.Printf("wrote %d bytes\\n", n4)

    w.Flush()

}`,
        testExample: {
            description: "Probamos la escritura de archivos usando diferentes métodos.", functionCode: `// filewriter.go
package main

import "os"

func WriteToFile(path, content string) error {
    return os.WriteFile(path, []byte(content), 0644)
}

func AppendToFile(path, content string) error {
    f, err := os.OpenFile(path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        return err
    }
    defer f.Close()

    _, err = f.WriteString(content)
    return err
}`,
            testCode: `// filewriter_test.go
package main

import (
    "os"
    "testing"
)

func TestWriteToFile(t *testing.T) {
    tmpFile, err := os.CreateTemp("", "test_*.txt")
    if err != nil {
        t.Fatalf("Error creando archivo temporal: %v", err)
    }
    path := tmpFile.Name()
    tmpFile.Close()
    defer os.Remove(path)

    content := "Hello, Go!"
    err = WriteToFile(path, content)
    if err != nil {
        t.Errorf("Error inesperado: %v", err)
    }

    data, _ := os.ReadFile(path)
    if string(data) != content {
        t.Errorf("Contenido = %q; esperado %q", string(data), content)
    }
}

func TestAppendToFile(t *testing.T) {
    tmpFile, err := os.CreateTemp("", "test_*.txt")
    if err != nil {
        t.Fatalf("Error creando archivo temporal: %v", err)
    }
    path := tmpFile.Name()
    tmpFile.Close()
    defer os.Remove(path)

    WriteToFile(path, "Line 1\n")
    AppendToFile(path, "Line 2\n")

    data, _ := os.ReadFile(path)
    expected := "Line 1\nLine 2\n"
    if string(data) != expected {
        t.Errorf("Contenido = %q; esperado %q", string(data), expected)
    }
}`
        },
        exercise: {
            question: "Crea un archivo 'test.txt' y escribe la palabra 'Go' en él.", initialCode: `package main\n\nimport ("os")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("os")\n\nfunc main() {\n    os.WriteFile("test.txt", []byte("Go"), 0644)\n}`
        }
    },
    {
        id: 'line-filters', category: 'File System & I/O', title: 'Line Filters', description: 'Un "line filter" es un programa que lee de stdin, procesa y escribe en stdout.', guide: `Muchos comandos de Unix (grep, sed, awk) son filtros de línea. Go facilita escribir los tuyos.    
    Herramienta Clave: \`bufio.Scanner\`.
    Envuelve unt \`io.Reader\` (como \`os.Stdin\`) y provee un método \`Scan()\` conveniente que avanza token por token (por defecto líneas).
    
    **Escenario:**
    Hacer un programa que convierta todo el texto de entrada a MAYÚSCULAS.`,
        explanation: [
            { text: "Scanner bufferizado que escanea líneas.", lineCode: 'scanner := bufio.NewScanner(os.Stdin)' },
            { text: "`Scan` avanza al siguiente token. Devuelve false al final.", lineCode: 'for scanner.Scan() { ... }' },
            { text: "`Text` obtiene el token actual.", lineCode: 'ucl := strings.ToUpper(scanner.Text())' }
        ],
        code: `package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {

    scanner := bufio.NewScanner(os.Stdin)

    for scanner.Scan() {
        ucl := strings.ToUpper(scanner.Text())
        fmt.Println(ucl)
    }

    if err := scanner.Err(); err != nil {
        fmt.Fprintln(os.Stderr, "error:", err)
        os.Exit(1)
    }
}`,
        testExample: {
            description: "Probamos una función que filtra líneas que contienen una palabra específica.", functionCode: `// filter.go
package main

import (
    "bufio"
    "strings"
)

func FilterLines(lines []string, keyword string) []string {
    var result []string
    for _, line := range lines {
        if strings.Contains(line, keyword) {
            result = append(result, line)
        }
    }
    return result
}`,
            testCode: `// filter_test.go
package main

import (
    "testing"
)

func TestFilterLines(t *testing.T) {
    lines := []string{"hola mundo", "ERROR: fallo", "todo bien", "ERROR: otro fallo"}
    result := FilterLines(lines, "ERROR")
    expected := 2
    if len(result) != expected {
        t.Errorf("FilterLines devolvió %d líneas; esperado %d", len(result), expected)
    }
}`
        },
        exercise: {
            question: "Escribe un programa que lea líneas de stdin e imprima solo las que contienen 'ERROR'. (Usa strings.Contains).", initialCode: `package main\n\nimport ("bufio"; "fmt"; "os"; "strings")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("bufio"; "fmt"; "os"; "strings")\n\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    for scanner.Scan() {\n        if strings.Contains(scanner.Text(), "ERROR") {\n            fmt.Println(scanner.Text())\n        }\n    }\n}`
        }
    },
    {
        id: 'file-paths', category: 'File System & I/O', title: 'File Paths', description: 'El paquete `filepath` permite manipular rutas de archivos de forma portable.', guide: `Nunca concatenes rutas con \`+\` o \`fmt.Sprintf\`. Windows usa \`\\\`, Linux usa \`/\`.    
    **Usar \`path/filepath\`:**
    *   \`Join(a, b)\`: Une partes de ruta correctamente.
    *   \`Base(p)\`: El nombre del archivo final.
    *   \`Dir(p)\`: El directorio contenedor.
    *   \`Ext(p)\`: La extensión (.jpg).
    *   \`Rel(base, target)\`: Encuentra la ruta relativa entre dos paths.`,
        explanation: [
            { text: "`Join` debe usarse para construir rutas portables.", lineCode: 'p := filepath.Join("dir1", "dir2", "filename")' },
            { text: "`Dir` y `Base` descomponen la ruta.", lineCode: 'fmt.Println("Dir(p):", filepath.Dir(p))' },
            { text: "`Ext` obtiene la extensión.", lineCode: 'fmt.Println("Ext(p):", filepath.Ext(p))' },
            { text: "`Rel` busca un camino relativo.", lineCode: 'rel, err := filepath.Rel("a/b", "a/b/t/file")' }
        ],
        code: `package main

import (
    "fmt"
    "path/filepath"
    "strings"
)

func main() {

    p := filepath.Join("dir1", "dir2", "filename")
    fmt.Println("p:", p)

    fmt.Println(filepath.Join("dir1//", "filename"))
    fmt.Println(filepath.Join("dir1/../dir1", "filename"))

    fmt.Println("Dir(p):", filepath.Dir(p))
    fmt.Println("Base(p):", filepath.Base(p))

    fmt.Println(filepath.IsAbs("dir/file"))
    fmt.Println(filepath.IsAbs("/dir/file"))

    filename := "config.json"
    ext := filepath.Ext(filename)
    fmt.Println(ext)

    fmt.Println(strings.TrimSuffix(filename, ext))

    rel, err := filepath.Rel("a/b", "a/b/t/file")
    if err != nil {
        panic(err)
    }
    fmt.Println(rel)

    rel, err = filepath.Rel("a/b", "a/c/t/file")
    if err != nil {
        panic(err)
    }
    fmt.Println(rel)
}`,
        testExample: {
            description: "Probamos funciones que manipulan rutas de archivos de forma portable.", functionCode: `// pathutils.go
package main

import "path/filepath"

func GetFileExtension(path string) string {
    return filepath.Ext(path)
}

func GetFileName(path string) string {
    return filepath.Base(path)
}`,
            testCode: `// pathutils_test.go
package main

import "testing"

func TestGetFileExtension(t *testing.T) {
    ext := GetFileExtension("documento.pdf")
    if ext != ".pdf" {
        t.Errorf("GetFileExtension = %s; esperado .pdf", ext)
    }
}

func TestGetFileName(t *testing.T) {
    name := GetFileName("carpeta/archivo.txt")
    if name != "archivo.txt" {
        t.Errorf("GetFileName = %s; esperado archivo.txt", name)
    }
}`
        },
        exercise: {
            question: "Combina los directorios 'carpeta', 'subcarpeta' y el archivo 'foto.png' en una ruta.", initialCode: `package main\n\nimport ("fmt"; "path/filepath")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "path/filepath")\n\nfunc main() {\n    p := filepath.Join("carpeta", "subcarpeta", "foto.png")\n    fmt.Println(p)\n}`
        }
    },
    {
        id: 'directories', category: 'File System & I/O', title: 'Directories', description: 'Operaciones con directorios: crear, leer contenido, navegar.', guide: `Trabajar con directorios en Go.    
    *   \`os.Mkdir(name, perm)\`: Crea un directorio.
    *   \`os.MkdirAll(path, perm)\`: Crea directorio y padres (como \`mkdir -p\`).
    *   \`os.ReadDir(path)\`: Lee el contenido. Devuelve entradas \`DirEntry\`.
    *   \`os.Chdir(path)\`: Cambia el directorio de trabajo actual (cd).
    *   \`filepath.WalkDir\`: Recorre recursivamente un árbol de directorios.`,
        explanation: [
            { text: "Crea un subdirectorio.", lineCode: 'err := os.Mkdir("subdir", 0755)' },
            { text: "Crea jerarquía completa.", lineCode: 'err := os.MkdirAll("subdir/parent/child", 0755)' },
            { text: "Lee el contenido de un directorio.", lineCode: 'c, err := os.ReadDir("subdir/parent")' },
            { text: "Cambia el directorio actual.", lineCode: 'os.Chdir("subdir/parent/child")' },
            { text: "Recorre recursivamente.", lineCode: 'filepath.WalkDir("subdir", visit)' }
        ],
        code: `package main

import (
    "fmt"
    "io/fs"
    "os"
    "path/filepath"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {

    err := os.Mkdir("subdir", 0755)
    check(err)

    defer os.RemoveAll("subdir")

    createEmptyFile := func(name string) {
        d := []byte("")
        check(os.WriteFile(name, d, 0644))
    }

    createEmptyFile("subdir/file1")

    err = os.MkdirAll("subdir/parent/child", 0755)
    check(err)

    createEmptyFile("subdir/parent/file2")
    createEmptyFile("subdir/parent/file3")
    createEmptyFile("subdir/parent/child/file4")

    c, err := os.ReadDir("subdir/parent")
    check(err)

    fmt.Println("Listing subdir/parent")
    for _, entry := range c {
        fmt.Println(" ", entry.Name(), entry.IsDir())
    }

    err = os.Chdir("subdir/parent/child")
    check(err)

    c, err = os.ReadDir(".")
    check(err)

    fmt.Println("Listing subdir/parent/child")
    for _, entry := range c {
        fmt.Println(" ", entry.Name(), entry.IsDir())
    }

    err = os.Chdir("../../..")
    check(err)

    fmt.Println("Visiting subdir")
    err = filepath.WalkDir("subdir", visit)
}

func visit(path string, d fs.DirEntry, err error) error {
    if err != nil {
        return err
    }
    fmt.Println(" ", path, d.IsDir())
    return nil
}`,
        testExample: {
            description: "Probamos una función que crea directorios y lista su contenido.", functionCode: `// dirutils.go
package main

import "os"

func CreateDirectoryWithFile(dirName, fileName string) error {
    if err := os.MkdirAll(dirName, 0755); err != nil {
        return err
    }
    data := []byte("contenido de prueba")
    return os.WriteFile(dirName+"/"+fileName, data, 0644)
}`,
            testCode: `// dirutils_test.go
package main

import (
    "os"
    "testing"
)

func TestCreateDirectoryWithFile(t *testing.T) {
    testDir := "test_dir"
    defer os.RemoveAll(testDir)

    err := CreateDirectoryWithFile(testDir, "test.txt")
    if err != nil {
        t.Errorf("Error creando directorio: %v", err)
    }

    if _, err := os.Stat(testDir + "/test.txt"); os.IsNotExist(err) {
        t.Error("El archivo no fue creado")
    }
}`
        },
        exercise: {
            question: "Crea un directorio llamado 'datos' y dentro un archivo 'info.txt'.", initialCode: `package main\n\nimport ("os")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("os")\n\nfunc main() {\n    os.Mkdir("datos", 0755)\n    os.WriteFile("datos/info.txt", []byte(""), 0644)\n    // Limpieza opcional: os.RemoveAll("datos")\n}`
        }
    },
    {
        id: 'temporary-files-and-directories', category: 'File System & I/O', title: 'Temporary Files/Directories', description: 'Creación segura de archivos y directorios temporales.', guide: `A menudo necesitamos crear archivos temporales para pruebas o procesamiento intermedio que no choquen con otros procesos.    
    *   \`os.CreateTemp(dir, patterns)\`: Crea un archivo temporal. Si \`dir\` es "", usa el temp del sistema.
    *   \`os.MkdirTemp(dir, pattern)\`: Crea un directorio temporal.
    
    **Limpieza:**
    Es responsabilidad del que llama borrar los archivos temporales. Generalmente se usa \`defer os.Remove(f.Name())\`.`,
        explanation: [
            { text: "Crea un archivo temporal.", lineCode: 'f, err := os.CreateTemp("", "sample")' },
            { text: "Obtener el nombre del archivo generado.", lineCode: 'fmt.Println("Temp file name:", f.Name())' },
            { text: "Limpieza automática.", lineCode: 'defer os.Remove(f.Name())' },
            { text: "Crea un directorio temporal.", lineCode: 'dname, err := os.MkdirTemp("", "sampledir")' }
        ],
        code: `package main

import (
    "fmt"
    "os"
    "path/filepath"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {

    f, err := os.CreateTemp("", "sample")
    check(err)

    fmt.Println("Temp file name:", f.Name())

    defer os.Remove(f.Name())

    _, err = f.Write([]byte{1, 2, 3, 4})
    check(err)

    dname, err := os.MkdirTemp("", "sampledir")
    check(err)
    fmt.Println("Temp dir name:", dname)

    defer os.RemoveAll(dname)

    fname := filepath.Join(dname, "file1")
    err = os.WriteFile(fname, []byte{1, 2}, 0666)
    check(err)
}`,
        testExample: {
            description: "Probamos una función que crea y escribe en un archivo temporal.", functionCode: `// tempfile.go
package main

import "os"

func WriteToTempFile(content string) (string, error) {
    tmpFile, err := os.CreateTemp("", "example-*.txt")
    if err != nil {
        return "", err
    }
    defer tmpFile.Close()

    if _, err := tmpFile.Write([]byte(content)); err != nil {
        return "", err
    }
    return tmpFile.Name(), nil
}`,
            testCode: `// tempfile_test.go
package main

import (
    "os"
    "testing"
)

func TestWriteToTempFile(t *testing.T) {
    content := "datos temporales"
    filename, err := WriteToTempFile(content)
    if err != nil {
        t.Fatalf("Error creando archivo temporal: %v", err)
    }
    defer os.Remove(filename)

    data, err := os.ReadFile(filename)
    if err != nil {
        t.Fatalf("Error leyendo archivo: %v", err)
    }
    if string(data) != content {
        t.Errorf("Contenido = %s; esperado %s", string(data), content)
    }
}`
        },
        exercise: {
            question: "Crea un archivo temporal e imprime su nombre.", initialCode: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    f, _ := os.CreateTemp("", "temp")\n    defer os.Remove(f.Name())\n    fmt.Println(f.Name())\n}`
        }
    },
    {
        id: 'embed-directive', category: 'File System & I/O', title: 'Embed Directive', description: 'Embebiendo archivos estáticos directamente en el binario de Go.', guide: `La directiva \`//go:embed\` permite incluir el contenido de archivos externos dentro del ejecutable compilado.    
    Esto simplifica el despliegue de aplicaciones, ya que no necesitas copiar carpetas de assets, plantillas HTML, migraciones SQL, etc. junto con el binario. ¡Es un solo archivo todo incluido!
    
    **Uso:**
    \`//go:embed file.txt\`
    \`var s string\`
    
    Puedes embeder en variables \`string\`, \`[]byte\` o \`embed.FS\` (sistema de archivos). \`embed.FS\` es ideal para múltiples archivos.`,
        explanation: [
            { text: "Importa el paquete `embed`, aunque no lo uses directamente (para el efecto secundario).", lineCode: 'import "embed"' },
            { text: "La directiva va INMEDIATAMENTE encima de la variable.", lineCode: '//go:embed folder/single_file.txt' },
            { text: "Embeder como string.", lineCode: 'var fileString string' },
            { text: "Embeder como bytes.", lineCode: 'var fileByte []byte' },
            { text: "Embeder múltiples archivos/directorios como Filesystem.", lineCode: '//go:embed folder/*.txt' }
        ],
        code: `package main

import (
    "embed"
    "fmt"
)

//go:embed folder/single_file.txt
var fileString string

//go:embed folder/single_file.txt
var fileByte []byte

//go:embed folder/single_file.txt
//go:embed folder/*.hash
var folder embed.FS

func main() {

    fmt.Print(fileString)
    fmt.Print(string(fileByte))

    content1, _ := folder.ReadFile("folder/single_file.txt")
    fmt.Print(string(content1))

    content2, _ := folder.ReadFile("folder/file1.hash")
    fmt.Print(string(content2))
}`,
        testExample: {
            description: "Probamos una función que retorna contenido embebido en el binario.", functionCode: `// embedder.go
package main

import _ "embed"

//go:embed config.txt
var configData string

func GetEmbeddedConfig() string {
    return configData
}`,
            testCode: `// embedder_test.go
package main

import "testing"

func TestGetEmbeddedConfig(t *testing.T) {
    // Nota: Este test asume que config.txt existe durante la compilación
    config := GetEmbeddedConfig()
    if config == "" {
        t.Error("La configuración embebida no debería estar vacía")
    }
}`
        },
        exercise: {
            question: "Imagina que tienes 'version.txt'. Escribe la directiva para embeberlo en una variable `version` de tipo string.", initialCode: `package main\n\nimport "embed"\n\n// Tu directiva y variable\n\nfunc main() {\n    // Print version\n}`,
            solution: `package main\n\nimport ("embed"; "fmt")\n\n//go:embed version.txt\nvar version string\n\nfunc main() {\n    fmt.Println(version)\n}`
        }
    },
    {
        id: 'testing-and-benchmarking', category: 'Testing & Quality', title: 'Testing / Benchmarking', description: 'Go tiene un framework de testing ligero incorporado.', guide: `Las pruebas unitarias viven junto al código que prueban, en archivos terminados en \`_test.go\`.    
    *   Unit Tests: Funciones que empiezan con \`TestXxx(t *testing.T)\`.
    *   Benchmarks: Funciones que empiezan con \`BenchmarkXxx(b *testing.B)\`.
    
    **Ejecución:**
    \`go test .\` -> Corre tests.
    \`go test -v .\` -> Verbose.
    \`go test -bench=.\` -> Corre benchmarks.
    
    **Table Driven Tests:**
    Es el patrón idiomático en Go: define un slice de structs con "inputs" y "outputs" esperados, y recórrelo con un bucle.`,
        explanation: [
            { text: "Función simple a probar.", lineCode: 'func IntMin(a, b int) int { ... }' },
            { text: "Un test básico.", lineCode: 'func TestIntMinBasic(t *testing.T) { ... }' },
            { text: "Table driven test.", lineCode: 'tests := []struct{...}{...}' },
            { text: "Benchmark.", lineCode: 'func BenchmarkIntMin(b *testing.B) { ... }' }
        ],
        code: `// main_test.go
package main

import (
    "fmt"
    "testing"
)

func IntMin(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func TestIntMinBasic(t *testing.T) {
    ans := IntMin(2, -2)
    if ans != -2 {
        t.Errorf("IntMin(2, -2) = %d; want -2", ans)
    }
}

func TestIntMinTableDriven(t *testing.T) {
    var tests = []struct {
        a, b int
        want int
    }{
        {0, 1, 0},
        {1, 0, 0},
        {2, -2, -2},
        {0, -1, -1},
        {-1, 0, -1},
    }

    for _, tt := range tests {
        testname := fmt.Sprintf("%d,%d", tt.a, tt.b)
        t.Run(testname, func(t *testing.T) {
            ans := IntMin(tt.a, tt.b)
            if ans != tt.want {
                t.Errorf("got %d, want %d", ans, tt.want)
            }
        })
    }
}

func BenchmarkIntMin(b *testing.B) {
    for i := 0; i < b.N; i++ {
        IntMin(1, 2)
    }
}`,
        testExample: {
            description: "Probamos una función con múltiples casos usando table-driven tests.", functionCode: `// math.go
package main

func Multiply(a, b int) int {
    return a * b
}`,
            testCode: `// math_test.go
package main

import "testing"

func TestMultiply(t *testing.T) {
    tests := []struct {
        a, b     int
        expected int
    }{
        {2, 3, 6},
        {5, 4, 20},
        {-2, 3, -6},
        {0, 10, 0},
    }

    for _, tt := range tests {
        result := Multiply(tt.a, tt.b)
        if result != tt.expected {
            t.Errorf("Multiply(%d, %d) = %d; esperado %d", tt.a, tt.b, result, tt.expected)
        }
    }
}`
        },
        exercise: {
            question: "Escribe un test simple para una función `Suma(a, b int) int` que verifique `Suma(1, 1) == 2`.", initialCode: `package main\n\nimport "testing"\n\nfunc Suma(a, b int) int { return a + b }\n\nfunc TestSuma(t *testing.T) {\n    // Tu assert aquí\n}`,
            solution: `package main\n\nimport "testing"\n\nfunc Suma(a, b int) int { return a + b }\n\nfunc TestSuma(t *testing.T) {\n    if Suma(1, 1) != 2 {\n        t.Error("1+1 debería ser 2")\n    }\n}`
        }
    },
    {
        id: 'command-line-arguments', category: 'Command Line', title: 'Command-Line Arguments', description: 'Acceso directo a los argumentos del programa.', guide: `Los argumentos de línea de comandos son la forma básica de parametrizar la ejecución de un programa.    
    Go provee \`os.Args\`, que es un slice de strings.
    
    *   \`os.Args[0]\`: Es el nombre o ruta del programa ejecutándose.
    *   \`os.Args[1:]\`: Son los argumentos reales pasados por el usuario.`,
        explanation: [
            { text: "os.Args nos da acceso a los argumentos.", lineCode: 'argsWithProg := os.Args' },
            { text: "Generalmente queremos los argumentos sin el nombre del programa.", lineCode: 'argsWithoutProg := os.Args[1:]' },
            { text: "Acceder a un argumento específico.", lineCode: 'arg := os.Args[3]' }
        ],
        code: `package main

import (
    "fmt"
    "os"
)

func main() {

    argsWithProg := os.Args
    argsWithoutProg := os.Args[1:]

    arg := os.Args[3]

    fmt.Println(argsWithProg)
    fmt.Println(argsWithoutProg)
    fmt.Println(arg)
}`,
        testExample: {
            description: "Probamos una función que procesa argumentos de línea de comandos.", functionCode: `// argsparser.go
package main

func CountArgs(args []string) int {
    // Excluir el nombre del programa (primer argumento)
    if len(args) > 0 {
        return len(args) - 1
    }
    return 0
}

func GetArgAt(args []string, index int) string {
    if index >= 0 && index < len(args) {
        return args[index]
    }
    return ""
}`,
            testCode: `// argsparser_test.go
package main

import "testing"

func TestCountArgs(t *testing.T) {
    args := []string{"programa", "arg1", "arg2", "arg3"}
    count := CountArgs(args)
    if count != 3 {
        t.Errorf("CountArgs = %d; esperado 3", count)
    }
}

func TestGetArgAt(t *testing.T) {
    args := []string{"programa", "primero", "segundo"}
    arg := GetArgAt(args, 1)
    if arg != "primero" {
        t.Errorf("GetArgAt(1) = %s; esperado primero", arg)
    }
}`
        },
        exercise: {
            question: "Imprime la cantidad de argumentos recibidos (sin contar el nombre del programa).", initialCode: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    fmt.Println(len(os.Args) - 1)\n}`
        }
    },
    {
        id: 'command-line-flags', category: 'Command Line', title: 'Command-Line Flags', description: 'Parseo robusto de opciones de línea de comandos (flags).', guide: `El paquete \`flag\` es la forma estándar de manejar opciones como \`-port=8080\` o \`-verbose\`.    
    **Tipos:**
    *   \`flag.String\`, \`flag.Int\`, \`flag.Bool\`: Definen flags y devuelven un *puntero* al valor.
    *   \`flag.StringVar\`: Vincula el flag a una variable existente.
    
    **Importante:**
    Debes llamar a \`flag.Parse()\` después de definir todos los flags y antes de usar sus valores. Los argumentos que no son flags quedan en \`flag.Args()\`.`,
        explanation: [
            { text: "Declaramos un flag string 'word' con valor default 'foo' y descripción.", lineCode: 'wordPtr := flag.String("word", "foo", "a string")' },
            { text: "Flags numéricos y booleanos funcionan igual.", lineCode: 'numbPtr := flag.Int("numb", 42, "an int")' },
            { text: "Podemos vincular a una variable existente.", lineCode: 'flag.StringVar(&svar, "svar", "bar", "a string var")' },
            { text: "Una vez declarados, llama a Parse.", lineCode: 'flag.Parse()' },
            { text: "Usa los punteros para acceder a los valores.", lineCode: 'fmt.Println("word:", *wordPtr)' }
        ],
        code: `package main

import (
    "flag"
    "fmt"
)

func main() {

    wordPtr := flag.String("word", "foo", "a string")

    numbPtr := flag.Int("numb", 42, "an int")
    forkPtr := flag.Bool("fork", false, "a bool")

    var svar string
    flag.StringVar(&svar, "svar", "bar", "a string var")

    flag.Parse()

    fmt.Println("word:", *wordPtr)
    fmt.Println("numb:", *numbPtr)
    fmt.Println("fork:", *forkPtr)
    fmt.Println("svar:", svar)
    fmt.Println("tail:", flag.Args())
}`,
        testExample: {
            description: "Probamos una función que parsea y valida flags de línea de comandos.", functionCode: `// config.go
package main

import "flag"

type Config struct {
    Port    int
    Verbose bool
    Name    string
}

func ParseFlags(args []string) *Config {
    fs := flag.NewFlagSet("config", flag.ContinueOnError)
    cfg := &Config{}
    fs.IntVar(&cfg.Port, "port", 8080, "Puerto del servidor")
    fs.BoolVar(&cfg.Verbose, "verbose", false, "Modo verbose")
    fs.StringVar(&cfg.Name, "name", "app", "Nombre de la aplicación")
    fs.Parse(args)
    return cfg
}`,
            testCode: `// config_test.go
package main

import "testing"

func TestParseFlags(t *testing.T) {
    args := []string{"-port", "9000", "-verbose", "-name", "miapp"}
    cfg := ParseFlags(args)

    if cfg.Port != 9000 {
        t.Errorf("Port = %d; esperado 9000", cfg.Port)
    }
    if !cfg.Verbose {
        t.Error("Verbose debería ser true")
    }
    if cfg.Name != "miapp" {
        t.Errorf("Name = %s; esperado miapp", cfg.Name)
    }
}`
        },
        exercise: {
            question: "Define un flag booleano `-debug` que por defecto sea false. Imprime su valor.", initialCode: `package main\n\nimport ("flag"; "fmt")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("flag"; "fmt")\n\nfunc main() {\n    debug := flag.Bool("debug", false, "Enable debug mode")\n    flag.Parse()\n    fmt.Println(*debug)\n}`
        }
    },
    {
        id: 'command-line-subcommands', category: 'Command Line', title: 'Command-Line Subcommands', description: 'Subcomandos como `go build` o `git commit`.', guide: `Para herramientas complejas, el paquete \`flag\` permite definir FlagSets propios para cada subcomando.    
    **Estrategia:**
    1.  Verifica \`os.Args[1]\` para saber qué subcomando se llamó.
    2.  Define un \`NewFlagSet\` para ese subcomando.
    3.  Define flags específicos para ese FlagSet.
    **4.  Llama a \`subcomando.Parse(os.Args[2:**])\`.
    
    Esto permite que \`mi-tool foo -enable\` y \`mi-tool bar -enable\` tengan flags independientes.`,
        explanation: [
            { text: "Definimos un FlagSet para el subcomando 'foo'.", lineCode: 'fooCmd := flag.NewFlagSet("foo", flag.ExitOnError)' },
            { text: "'foo' tiene sus propios flags.", lineCode: 'fooEnable := fooCmd.Bool("enable", false, "enable")' },
            { text: "Revisamos el primer argumento para decidir qué switch ejecutar.", lineCode: 'switch os.Args[1] { case "foo": fooCmd.Parse(os.Args[2:]) ... }' }
        ],
        code: `package main

import (
    "flag"
    "fmt"
    "os"
)

func main() {

    fooCmd := flag.NewFlagSet("foo", flag.ExitOnError)
    fooEnable := fooCmd.Bool("enable", false, "enable")
    fooName := fooCmd.String("name", "", "name")

    barCmd := flag.NewFlagSet("bar", flag.ExitOnError)
    barLevel := barCmd.Int("level", 0, "level")

    if len(os.Args) < 2 {
        fmt.Println("expected 'foo' or 'bar' subcommands")
        os.Exit(1)
    }

    switch os.Args[1] {

    case "foo":
        fooCmd.Parse(os.Args[2:])
        fmt.Println("subcommand 'foo'")
        fmt.Println("  enable:", *fooEnable)
        fmt.Println("  name:", *fooName)
        fmt.Println("  tail:", fooCmd.Args())
    case "bar":
        barCmd.Parse(os.Args[2:])
        fmt.Println("subcommand 'bar'")
        fmt.Println("  level:", *barLevel)
        fmt.Println("  tail:", barCmd.Args())
    default:
        fmt.Println("expected 'foo' or 'bar' subcommands")
        os.Exit(1)
    }
}`,
        testExample: {
            description: "Probamos una función que maneja múltiples subcomandos con sus propios flags.", functionCode: `// subcmd.go
package main

import "flag"

type SubcommandResult struct {
    Name   string
    Action string
}

func ParseSubcommand(args []string) *SubcommandResult {
    if len(args) < 1 {
        return nil
    }

    result := &SubcommandResult{}

    switch args[0] {
    case "start":
        startCmd := flag.NewFlagSet("start", flag.ContinueOnError)
        port := startCmd.Int("port", 8080, "puerto")
        startCmd.Parse(args[1:])
        result.Name = "start"
        result.Action = "iniciado"
    case "stop":
        result.Name = "stop"
        result.Action = "detenido"
    }

    return result
}`,
            testCode: `// subcmd_test.go
package main

import "testing"

func TestParseSubcommand(t *testing.T) {
    result := ParseSubcommand([]string{"start", "-port", "9000"})
    if result == nil {
        t.Fatal("El resultado no debería ser nil")
    }
    if result.Name != "start" {
        t.Errorf("Name = %s; esperado start", result.Name)
    }
}

func TestParseStopSubcommand(t *testing.T) {
    result := ParseSubcommand([]string{"stop"})
    if result.Name != "stop" {
        t.Errorf("Name = %s; esperado stop", result.Name)
    }
}`
        },
        exercise: {
            question: "Crea una estructura para un subcomando 'version' que no tenga flags, solo imprima 'v1.0'.", initialCode: `package main\n\nimport ("flag"; "fmt"; "os")\n\nfunc main() {\n    // Tu switch con version\n}`,
            solution: `package main\n\nimport ("flag"; "fmt"; "os")\n\nfunc main() {\n    versionCmd := flag.NewFlagSet("version", flag.ExitOnError)\n    if len(os.Args) > 1 && os.Args[1] == "version" {\n        versionCmd.Parse(os.Args[2:])\n        fmt.Println("v1.0")\n    }\n}`
        }
    },
    {
        id: 'environment-variables', category: 'Command Line', title: 'Environment Variables', description: 'Variables de entorno.', guide: `Las variables de entorno son un mecanismo universal para configurar aplicaciones en Unix/Linux/Windows.    
    Go utiliza \`os.Setenv\` para establecer pares clave/valor, y \`os.Getenv\` o \`os.LookupEnv\` para leerlos.
    
    **Listar todas:**
    \`os.Environ()\` devuelve un slice de strings en formato "CLAVE=valor".`,
        useCase: {
            title: "Configuración de Secretos (API Keys)", description: "Nunca hardcodees API keys en el código. Usa variables de entorno. Docker, Kubernetes y servicios cloud las inyectan automáticamente.", code: `func main() {
    apiKey := os.Getenv("STRIPE_API_KEY")
    if apiKey == "" {
        log.Fatal("STRIPE_API_KEY no configurada")
    }
    
    // Usar apiKey para conectar a Stripe...
    fmt.Println("Conectado con API Key")
}`
        },
        explanation: [
            { text: "Establecer una variable clave/valor.", lineCode: 'os.Setenv("FOO", "1")' },
            { text: "Obtener un valor.", lineCode: 'fmt.Println("FOO:", os.Getenv("FOO"))' },
            { text: "Obtener un valor vacío si no existe.", lineCode: 'fmt.Println("BAR:", os.Getenv("BAR"))' },
            { text: "Usar `os.Environ` para listar todo.", lineCode: 'for _, e := range os.Environ() { ... }' }
        ],
        code: `package main

import (
    "fmt"
    "os"
    "strings"
)

func main() {

    os.Setenv("FOO", "1")
    fmt.Println("FOO:", os.Getenv("FOO"))
    fmt.Println("BAR:", os.Getenv("BAR"))

    fmt.Println()
    for _, e := range os.Environ() {
        pair := strings.SplitN(e, "=", 2)
        fmt.Println(pair[0])
    }
}`,
        testExample: {
            description: "Probamos funciones que obtienen y establecen variables de entorno.", functionCode: `// envutils.go
package main

import "os"

func GetEnvOrDefault(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func SetEnvVar(key, value string) error {
    return os.Setenv(key, value)
}`,
            testCode: `// envutils_test.go
package main

import (
    "os"
    "testing"
)

func TestGetEnvOrDefault(t *testing.T) {
    os.Setenv("TEST_VAR", "valor_test")
    defer os.Unsetenv("TEST_VAR")

    result := GetEnvOrDefault("TEST_VAR", "default")
    if result != "valor_test" {
        t.Errorf("GetEnvOrDefault = %s; esperado valor_test", result)
    }
}

func TestGetEnvOrDefaultWithMissing(t *testing.T) {
    result := GetEnvOrDefault("VAR_INEXISTENTE", "default")
    if result != "default" {
        t.Errorf("GetEnvOrDefault = %s; esperado default", result)
    }
}`
        },
        exercise: {
            question: "Establece la variable 'MI_VAR' con valor 'Hola' y luego imprímela.", initialCode: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    os.Setenv("MI_VAR", "Hola")\n    fmt.Println(os.Getenv("MI_VAR"))\n}`
        }
    },
    {
        id: 'logging', category: 'Logging', title: 'Logging', description: 'El paquete `log` de la librería estándar.', guide: `Go provee un sistema de logging simple pero efectivo.    
    **Niveles (Implícitos in stdlib):**
    *   \`Print\`: Imprime el mensaje.
    *   \`Fatal\`: Imprime y llama a \`os.Exit(1)\`.
    *   \`Panic\`: Imprime y llama a \`panic()\`.
    
    **Personalización:**
    Puedes configurar el prefijo (\`SetPrefix\`), las banderas de formato de fecha/hora (\`SetFlags\`) y la salida (\`SetOutput\`, por defecto stderr).
    
    *Nota: Para logs estructurados (JSON), en Go 1.21+ se introdujo el paquete \`log/slog\`.*`,
        useCase: {
            title: "Logging Estructurado (Producción)", description: "En producción necesitas logs que puedas buscar y filtrar. Añade contexto (userID, requestID) a cada log para debugging efectivo.", code: `func handleRequest(userID int) {
    logger := log.New(os.Stdout, fmt.Sprintf("[User:%d] ", userID), log.LstdFlags)
    
    logger.Println("Procesando pedido")
    // Lógica...
    logger.Println("Pedido completado")
    
    // En producción: usa log/slog para JSON
}`
        },
        explanation: [
            { text: "Ejemplo básico. Imprime fecha y hora por defecto.", lineCode: 'log.Println("standard logger")' },
            { text: "Aumentar flags para incluir microsegundos.", lineCode: 'log.SetFlags(log.LstdFlags | log.Lmicroseconds)' },
            { text: "Añadir prefijo para identificar origen.", lineCode: 'log.SetPrefix("mylog: ")' },
            { text: "Crear un logger personalizado.", lineCode: 'mylog := log.New(os.Stdout, "my: ", log.LstdFlags)' }
        ],
        code: `package main

import (
    "bytes"
    "fmt"
    "log"
    "os"
)

func main() {

    log.Println("standard logger")

    log.SetFlags(log.LstdFlags | log.Lmicroseconds)
    log.Println("with micro")

    log.SetFlags(log.LstdFlags | log.Lshortfile)
    log.Println("with file/line")

    mylog := log.New(os.Stdout, "my: ", log.LstdFlags)
    mylog.Println("from mylog")

    mylog.SetPrefix("ohmy: ")
    mylog.Println("from mylog")

    var buf bytes.Buffer
    buflog := log.New(&buf, "buf: ", log.LstdFlags)

    buflog.Println("hello")

    fmt.Print("from buflog:", buf.String())
}`,
        testExample: {
            description: "Probamos un logger personalizado que escribe en un buffer.", functionCode: `// logger.go
package main

import (
    "bytes"
    "log"
)

func CreateLogger(prefix string, buf *bytes.Buffer) *log.Logger {
    return log.New(buf, prefix, log.LstdFlags)
}

func LogMessage(logger *log.Logger, msg string) {
    logger.Println(msg)
}`,
            testCode: `// logger_test.go
package main

import (
    "bytes"
    "strings"
    "testing"
)

func TestCreateLogger(t *testing.T) {
    var buf bytes.Buffer
    logger := CreateLogger("TEST: ", &buf)
    LogMessage(logger, "mensaje de prueba")

    output := buf.String()
    if !strings.Contains(output, "TEST:") {
        t.Error("El log no contiene el prefijo TEST:")
    }
    if !strings.Contains(output, "mensaje de prueba") {
        t.Error("El log no contiene el mensaje")
    }
}`
        },
        exercise: {
            question: "Crea un logger que escriba en stdout (os.Stdout) con el prefijo 'TEST: '.", initialCode: `package main\n\nimport ("log"; "os")\n\nfunc main() {\n    // Tu logger\n}`,
            solution: `package main\n\nimport ("log"; "os")\n\nfunc main() {\n    l := log.New(os.Stdout, "TEST: ", log.LstdFlags)\n    l.Println("Hola logger")\n}`
        }
    },
    {
        id: 'http-client', category: 'HTTP & Web', title: 'HTTP Client', description: 'Realizar peticiones HTTP (GET, POST, etc).', guide: `El paquete \`net/http\` ofrece un cliente HTTP robusto.    
    **Métodos Rápidos:**
    \`http.Get(url)\`
    \`http.Post(url, contentType, body)\`
    
    ¡Cuidado con el Body!
    Es el error más común en Go: "leaking goroutines".
    SIEMPRE debes cerrar el body de la respuesta, incluso si no lo lees, o la conexión TCP quedará abierta.
    \`defer resp.Body.Close()\``,
        useCase: {
            title: "Consumir API Externa (Weather Service)", description: "Necesitas obtener datos del clima de una API pública. El cliente HTTP de Go hace que esto sea trivial.", code: `func getWeather(city string) {
    url := fmt.Sprintf("https://api.weather.com/v1/%s", city)
    resp, err := http.Get(url)
    if err != nil { return }
    defer resp.Body.Close()
    
    // Decodificar JSON...
    fmt.Println("Status:", resp.Status)
}`
        },
        explanation: [
            { text: "Realizar una petición GET.", lineCode: 'resp, err := http.Get("http://gobyexample.com")' },
            { text: "Imprimir el estado HTTP.", lineCode: 'fmt.Println("Response status:", resp.Status)' },
            { text: "Leer el cuerpo de la respuesta con `bufio` o `ioutil` (ahora `io`).", lineCode: 'scanner := bufio.NewScanner(resp.Body)' }
        ],
        code: `package main

import (
    "bufio"
    "fmt"
    "net/http"
)

func main() {

    resp, err := http.Get("https://gobyexample.com")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    fmt.Println("Response status:", resp.Status)

    scanner := bufio.NewScanner(resp.Body)
    for i := 0; scanner.Scan() && i < 5; i++ {
        fmt.Println(scanner.Text())
    }

    if err := scanner.Err(); err != nil {
        panic(err)
    }
}`,
        testExample: {
            description: "Probamos una función que valida el código de estado HTTP de una URL.", functionCode: `// httpclient.go
package main

import (
    "fmt"
    "net/http"
)

func CheckURL(url string) (int, error) {
    resp, err := http.Get(url)
    if err != nil {
        return 0, err
    }
    defer resp.Body.Close()
    return resp.StatusCode, nil
}

func IsURLOK(url string) bool {
    statusCode, err := CheckURL(url)
    return err == nil && statusCode == http.StatusOK
}`,
            testCode: `// httpclient_test.go
package main

import (
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestCheckURL(t *testing.T) {
    // Crear servidor de prueba
    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
    }))
    defer server.Close()

    statusCode, err := CheckURL(server.URL)
    if err != nil {
        t.Fatalf("Error inesperado: %v", err)
    }
    if statusCode != http.StatusOK {
        t.Errorf("StatusCode = %d; esperado %d", statusCode, http.StatusOK)
    }
}`
        },
        exercise: {
            question: "Haz un GET a 'https://example.com' e imprime el status code (resp.StatusCode).", initialCode: `package main\n\nimport ("fmt"; "net/http")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "net/http")\n\nfunc main() {\n    resp, _ := http.Get("https://example.com")\n    defer resp.Body.Close()\n    fmt.Println(resp.StatusCode)\n}`
        }
    },
    {
        id: 'http-server', category: 'HTTP & Web', title: 'HTTP Server', description: 'Escribir un servidor HTTP básico.', guide: `Crear servidores web es donde Go realmente brilla. \`net/http\` es calidad de producción.    
    **Conceptos:**
    *   Handler: Una interfaz que responde a una petición HTTP. \`ServeHTTP(ResponseWriter, *Request)\`.
    *   HandleFunc: Registra una función como handler en una ruta.
    *   ListenAndServe: Inicia el servidor.
    
    **Manejo de rutas:**
    Por defecto usa \`DefaultServeMux\`. Desde Go 1.22, el enrutador estándar es mucho más poderoso y soporta métodos (GET/POST) y path values (\`/users/{id}\`).`,
        useCase: {
            title: "API REST Básica (Health Check)", description: "El endpoint más simple que todo microservicio necesita: `/health`. Kubernetes lo usa para saber si tu servicio está vivo.", code: `func main() {
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        // Podrías chequear DB aquí
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("OK"))
    })
    
    log.Fatal(http.ListenAndServe(":8080", nil))
}`
        },
        explanation: [
            { text: "Un handler recibe un `ResponseWriter` y un puntero a `Request`.", lineCode: 'func hello(w http.ResponseWriter, req *http.Request) { ... }' },
            { text: "Escribimos la respuesta en el ResponseWriter.", lineCode: 'fmt.Fprintf(w, "hello\\n")' },
            { text: "Registramos el handler en una ruta.", lineCode: 'http.HandleFunc("/hello", hello)' },
            { text: "Iniciamos el servidor.", lineCode: 'http.ListenAndServe(":8090", nil)' }
        ],
        code: `package main

import (
    "fmt"
    "net/http"
)

func hello(w http.ResponseWriter, req *http.Request) {
    fmt.Fprintf(w, "hello\\n")
}

func headers(w http.ResponseWriter, req *http.Request) {
    for name, headers := range req.Header {
        for _, h := range headers {
            fmt.Fprintf(w, "%v: %v\\n", name, h)
        }
    }
}

func main() {

    http.HandleFunc("/hello", hello)
    http.HandleFunc("/headers", headers)

    http.ListenAndServe(":8090", nil)
}`,
        testExample: {
            description: "Probamos un handler HTTP que responde con un mensaje personalizado.", functionCode: `// httpserver.go
package main

import (
    "fmt"
    "net/http"
)

func GreetHandler(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    if name == "" {
        name = "invitado"
    }
    fmt.Fprintf(w, "Hola, %s!", name)
}`,
            testCode: `// httpserver_test.go
package main

import (
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestGreetHandler(t *testing.T) {
    req := httptest.NewRequest("GET", "/greet?name=Juan", nil)
    w := httptest.NewRecorder()

    GreetHandler(w, req)

    resp := w.Result()
    if resp.StatusCode != http.StatusOK {
        t.Errorf("StatusCode = %d; esperado %d", resp.StatusCode, http.StatusOK)
    }

    body := w.Body.String()
    expected := "Hola, Juan!"
    if body != expected {
        t.Errorf("Body = %s; esperado %s", body, expected)
    }
}`
        },
        exercise: {
            question: "Crea un handler para la ruta '/' que responda con 'Bienvenido'. (No necesitas llamar a ListenAndServe en el ejercicio).", initialCode: `package main\n\nimport ("fmt"; "net/http")\n\nfunc main() {\n    // http.HandleFunc("/", ...)\n}`,
            solution: `package main\n\nimport ("fmt"; "net/http")\n\nfunc main() {\n    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\n        fmt.Fprint(w, "Bienvenido")\n    })\n}`
        }
    },
    {
        id: 'tcp-server', category: 'Network Programming', title: 'TCP Server', description: 'Servidores y clientes TCP de bajo nivel.', guide: `Si necesitas algo más bajo nivel que HTTP (como chat, juegos, protocolos custom), usa el paquete \`net\`.    
    **Flujo de un Servidor:**
    **1.  \`ln, err :**= net.Listen("tcp", ":8080")\`: Escucha en el puerto.
    **2.  \`conn, err :**= ln.Accept()\`: Bloquea hasta que alguien se conecta.
    3.  \`go handle(conn)\`: CRUCIAL. Lanza una goroutine por cada conexión para poder atender a múltiples usuarios a la vez.`,
        useCase: {
            title: "Servidor de Chat Simple", description: "Un servidor que acepta conexiones telnet y repele (echo) todo lo que escribes.", code: `func main() {
    ln, _ := net.Listen("tcp", ":9000")
    for {
        conn, _ := ln.Accept()
        go func(c net.Conn) {
            defer c.Close()
            // Copia entrada a salida (Echo)
            io.Copy(c, c) 
        }(conn)
    }
}`
        },
        testExample: {
            description: "Usamos net.Pipe() para crear una conexión cliente-servidor en memoria y testear el manejador sin usar puertos reales.", functionCode: `// server.go
func HandleConn(c net.Conn) {
    defer c.Close()
    c.Write([]byte("Hello"))
}`,
            testCode: `// server_test.go
func TestHandleConn(t *testing.T) {
    server, client := net.Pipe()
    go HandleConn(server)
    
    buf := make([]byte, 5)
    _, err := client.Read(buf)
    if err != nil {
        t.Fatal(err)
    }
    if string(buf) != "Hello" {
        t.Errorf("Esperaba 'Hello', recibí '%s'", buf)
    }
}`
        },
        explanation: [
            { text: "Escuchar en un puerto TCP.", lineCode: 'ln, _ := net.Listen("tcp", ":8080")' },
            { text: "Aceptar conexiones entrantes.", lineCode: 'conn, _ := ln.Accept()' },
            { text: "Manejar la conexión en una goroutine.", lineCode: 'go handleConnection(conn)' }
        ],
        code: `package main

import (
    "bufio"
    "fmt"
    "net"
)

func handleConnection(c net.Conn) {
    fmt.Printf("Servidor: %v se ha conectado.\\n", c.RemoteAddr())
    c.Write([]byte("Hola cliente!\\n"))
    c.Close()
}

func main() {
    l, err := net.Listen("tcp", ":8080")
    if err != nil {
        fmt.Println("Error listening:", err.Error())
        return
    }
    defer l.Close()
    fmt.Println("Escuchando en :8080")

    for {
        conn, err := l.Accept()
        if err != nil {
            fmt.Println("Error accepting:", err.Error())
            return
        }
        go handleConnection(conn)
    }
}`,
        exercise: {
            question: "Escribe la línea para escuchar (Listen) conexiones TCP en el puerto 9000.", initialCode: `package main\n\nimport "net"\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport "net"\n\nfunc main() {\n    ln, _ := net.Listen("tcp", ":9000")\n    defer ln.Close()\n}`
        }
    },
    {
        id: 'context', category: 'System Programming', title: 'Context', description: 'Manejo de tiempos muertos, señales de cancelación y valores de ámbito.', guide: `**Context: El Jefe de Operaciones**    
    Imagina que \`Context\` es un **Gerente** que asigna una tarea a un empleado (Goroutine). Su trabajo es controlar *hasta cuándo* y *bajo qué condiciones* se trabaja.
    
    **Los 3 Superpoderes del Context:**
    
    1.  **Stop! (Cancelación)**:
        El usuario cerró la pestaña del navegador. No tiene sentido seguir calculando esa respuesta. El "Gerente" grita: "¡Paren todo!". Las goroutines escuchan esa señal (\`<-ctx.Done()\`) y limpian sus cosas inmediatamente.
        
    2.  **Tiempo Límite (Timeout/Deadline)**:
        "Tienes 2 segundos para conectarte a la base de datos". Si tarda 2.1s, el Context corta la operación automáticamente. Evita que tu servidor se quede colgado esperando eternamente.
        
    3.  **Datos de Misión (Values)**:
        Como una etiqueta en la orden de trabajo. "Esta petición viene del usuario ID: 50". Viaja con la petición, atravesando capas de funciones.`,
        useCase: {
            title: "Cancelación de Consulta SQL", description: "El usuario cierra el navegador en mitad de una petición pesada. El servidor debe abortar la consulta a la base de datos para no desperdiciar CPU.", code: `func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context() // Contexto ligado a la petición HTTP

    // Pasa el contexto a la DB
    rows, err := db.QueryContext(ctx, "SELECT * FROM huge_table")
    
    // Si el usuario cancela, db.QueryContext aborta inmediatamente
}`
        },
        testExample: {
            description: "Probamos que una función respete la cancelación del contexto.", functionCode: `// worker.go
func Work(ctx context.Context) error {
    select {
    case <-time.After(1 * time.Hour):
        return nil
    case <-ctx.Done():
        return ctx.Err()
    }
}`,
            testCode: `// worker_test.go
func TestWork_Cancel(t *testing.T) {
    ctx, cancel := context.WithCancel(context.Background())
    
    go func() {
        time.Sleep(10 * time.Millisecond)
        cancel()
    }()
    
    err := Work(ctx)
    if err != context.Canceled {
        t.Errorf("Esperaba error context.Canceled, recibí %v", err)
    }
}`
        },
        explanation: [
            { text: "Crea un contexto que se puede cancelar manualmente.", lineCode: 'ctx, cancel := context.WithCancel(context.Background())' },
            { text: "O un contexto con timeout.", lineCode: 'ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)' },
            { text: "Siempre llama a `cancel()` (usualmente con defer) para liberar recursos.", lineCode: 'defer cancel()' },
            { text: "Usa `select` para escuchar `ctx.Done()`.", lineCode: 'case <-ctx.Done(): return ctx.Err()' }
        ],
        code: `package main

import (
    "context"
    "fmt"
    "time"
)

func hello(ctx context.Context) {
    select {
    case <-time.After(500 * time.Millisecond):
        fmt.Println("overslept")
    case <-ctx.Done():
        err := ctx.Err()
        fmt.Println("hello halted:", err)
    }
}

func main() {

    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()

    go hello(ctx)

    select {
    case <-ctx.Done():
        fmt.Println("main context done:", ctx.Err())
    case <-time.After(2 * time.Second):
        fmt.Println("main finished")
    }
}`,
        exercise: {
            question: "Crea un contexto que expire (timeout) en 100 milisegundos.", initialCode: `package main\n\nimport ("context"; "fmt"; "time")\n\nfunc main() {\n    // Tu contexto\n}`,
            solution: `package main\n\nimport ("context"; "fmt"; "time")\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)\n    defer cancel()\n    <-ctx.Done()\n    fmt.Println(ctx.Err())\n}`
        }
    },
    {
        id: 'spawning-processes', category: 'System Programming', title: 'Spawning Processes', description: 'Ejecutar comandos externos desde Go.', guide: `A veces necesitamos llamar a comandos del sistema (como \`git\`, \`ls\`, o scripts de Python). El paquete \`os/exec\` hace esto.    
    *   \`exec.Command("cmd", "arg1", "arg2")\`: Prepara el comando.
    *   \`cmd.Output()\`: Corre el comando y devuelve stdout.
    *   \`cmd.Run()\`: Corre el comando (útil si manejas stdout/stderr manualmente).`,
        testExample: {
            description: "Probamos una función que ejecuta un comando simple.", functionCode: `// cmd.go
func Echo(msg string) string {
    out, _ := exec.Command("echo", msg).Output()
    return string(out)
}`,
            testCode: `// cmd_test.go
func TestEcho(t *testing.T) {
    // Nota: Esto depende de que 'echo' exista en el sistema
    res := Echo("hola")
    // echo añade un salto de línea
    if res != "hola\\n" { 
        t.Errorf("Salida inesperada: %q", res)
    }
}`
        },
        explanation: [
            { text: "Comando simple sin argumentos.", lineCode: 'dateCmd := exec.Command("date")' },
            { text: "Ejecutar y esperar salida.", lineCode: 'dateOut, err := dateCmd.Output()' },
            { text: "Manejar stdin/stdout pipeados.", lineCode: 'grepCmd.StdinPipe()' }
        ],
        code: `package main

import (
    "fmt"
    "io"
    "os/exec"
)

func main() {

    dateCmd := exec.Command("date")

    dateOut, err := dateCmd.Output()
    if err != nil {
        panic(err)
    }
    fmt.Println("> date")
    fmt.Println(string(dateOut))

    grepCmd := exec.Command("grep", "hello")

    grepIn, _ := grepCmd.StdinPipe()
    grepOut, _ := grepCmd.StdoutPipe()

    grepCmd.Start()
    grepIn.Write([]byte("hello grep\\ngoodbye grep"))
    grepIn.Close()
    grepBytes, _ := io.ReadAll(grepOut)
    grepCmd.Wait()

    fmt.Println("> grep hello")
    fmt.Println(string(grepBytes))

    lsCmd := exec.Command("bash", "-c", "ls -a -l -h")
    lsOut, err := lsCmd.Output()
    if err != nil {
        panic(err)
    }
    fmt.Println("> ls -a -l -h")
    fmt.Println(string(lsOut))
}`,
        exercise: {
            question: "Ejecuta el comando `echo 'Hola'` y captura su salida.", initialCode: `package main\n\nimport ("fmt"; "os/exec")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "os/exec")\n\nfunc main() {\n    out, _ := exec.Command("echo", "Hola").Output()\n    fmt.Printf("%s", out)\n}`
        }
    },
    {
        id: 'execing-processes', category: 'System Programming', title: 'Exec\'ing Processes', description: 'Reemplazar el proceso actual de Go con otro proceso.', guide: `Diferente a "Spawning". Aquí usamos \`syscall.Exec\` para que nuestro programa Go *deje de existir* y sea reemplazado por otro programa en el mismo PID.    
    Es lo que hace \`ssh\` cuando ejecuta tu shell, o lo que hacen los wrappers de comandos.`,
        testExample: {
            description: "Probamos la existencia del binario antes de intentar ejecutarlo (ya que syscall.Exec terminaría el test).", functionCode: `// launcher.go
func CheckBinary(name string) bool {
    _, err := exec.LookPath(name)
    return err == nil
}`,
            testCode: `// launcher_test.go
func TestCheckBinary(t *testing.T) {
    if !CheckBinary("ls") {
        t.Error("Debería encontrar 'ls'")
    }
    if CheckBinary("comando_imaginario_xyz") {
        t.Error("No debería encontrar comando inexistente")
    }
}`
        },
        explanation: [
            { text: "Necesitamos la ruta absoluta al binario.", lineCode: 'binary, lookErr := exec.LookPath("ls")' },
            { text: "Los argumentos deben incluir el nombre del programa como primer elemento (convención Unix).", lineCode: 'args := []string{"ls", "-a", "-l", "-h"}' },
            { text: "También necesitas el entorno.", lineCode: 'env := os.Environ()' },
            { text: "Ejecuta la llamada al sistema exec.", lineCode: 'syscall.Exec(binary, args, env)' }
        ],
        code: `package main

import (
    "os"
    "os/exec"
    "syscall"
)

func main() {

    binary, lookErr := exec.LookPath("ls")
    if lookErr != nil {
        panic(lookErr)
    }

    args := []string{"ls", "-a", "-l", "-h"}

    env := os.Environ()

    execErr := syscall.Exec(binary, args, env)
    if execErr != nil {
        panic(execErr)
    }
}`,
        exercise: {
            question: "Usa `exec.LookPath` para encontrar dónde está instalado `go`.", initialCode: `package main\n\nimport ("fmt"; "os/exec")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "os/exec")\n\nfunc main() {\n    path, _ := exec.LookPath("go")\n    fmt.Println(path)\n}`
        }
    },
    {
        id: 'signals', category: 'System Programming', title: 'Signals', description: 'Manejo de señales de Unix (como SIGTERM, SIGINT).', guide: `Las señales son la forma en que el SO le dice a tu programa que pare o recargue.    
    *   SIGINT (Ctrl+C): Interrupción de teclado.
    *   SIGTERM: Solicitud de terminación (ej. docker stop).
    
    En Go, usamos un canal (\`chan os.Signal\`) y \`signal.Notify\` para recibir estas notificaciones y cerrar grácilmente (graceful shutdown).`,
        useCase: {
            title: "Graceful Shutdown (Apagado Seguro)", description: "Tu servidor HTTP está procesando requests. Llega SIGTERM (docker stop). Debes terminar las requests actuales antes de morir, no cortarlas abruptamente.", code: `func main() {
    stop := make(chan os.Signal, 1)
    signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)
    
    srv := &http.Server{Addr: ":8080"}
    go srv.ListenAndServe()
    
    <-stop // Espera señal
    fmt.Println("Apagando...")
    srv.Shutdown(context.Background()) // Termina requests actuales
}`
        },
        testExample: {
            description: "Probamos que un canal reciba la señal correcta.", functionCode: `// app.go
func WaitForSignal(c chan os.Signal) os.Signal {
    return <-c
}`,
            testCode: `// app_test.go
func TestWaitForSignal(t *testing.T) {
    c := make(chan os.Signal, 1)
    c <- syscall.SIGINT
    
    sig := WaitForSignal(c)
    if sig != syscall.SIGINT {
        t.Errorf("Esperaba SIGINT, recibí %v", sig)
    }
}`
        },
        explanation: [
            { text: "Creamos un canal para recibir notificaciones de señales.", lineCode: 'sigs := make(chan os.Signal, 1)' },
            { text: "Registramos el canal para recibir notificaciones específicas.", lineCode: 'signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)' },
            { text: "Bloqueamos esperando la señal.", lineCode: 'sig := <-sigs' }
        ],
        code: `package main

import (
    "fmt"
    "os"
    "os/signal"
    "syscall"
)

func main() {

    sigs := make(chan os.Signal, 1)
    done := make(chan bool, 1)

    signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

    go func() {
        sig := <-sigs
        fmt.Println()
        fmt.Println(sig)
        done <- true
    }()

    fmt.Println("awaiting signal")
    <-done
    fmt.Println("exiting")
}`,
        exercise: {
            question: "Crea un código que espere un SIGINT (Ctrl+C). (Nota: Difícil de probar en playground, imagina la estructura).", initialCode: `package main\n\nimport ("os"; "os/signal"; "syscall")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "os"; "os/signal"; "syscall")\n\nfunc main() {\n    c := make(chan os.Signal, 1)\n    signal.Notify(c, syscall.SIGINT)\n    <-c\n    fmt.Println("Interrumpido")\n}`
        }
    },
    {
        id: 'exit', category: 'System Programming', title: 'Exit', description: 'Salir del programa. os.Exit.', guide: `Usa \`os.Exit\` para salir inmediatamente con un código de estado.    
    **Advertencia:**
    \`os.Exit\` sale INMEDIATAMENTE. Las funciones diferidas con \`defer\` NO se ejecutarán. Si necesitas limpieza, hazla antes de llamar a Exit.`,
        testExample: {
            description: "Para testear os.Exit, solemos envolverlo en una variable que podamos sustituir durante los tests.", functionCode: `// exiter.go
var osExit = os.Exit

func CheckAndExit(code int) {
    if code != 0 {
        osExit(code)
    }
}`,
            testCode: `// exiter_test.go
func TestCheckAndExit(t *testing.T) {
    // Mock de os.Exit
    capturedCode := -1
    osExit = func(code int) {
        capturedCode = code
    }
    defer func() { osExit = os.Exit }() // Restaurar

    CheckAndExit(5)
    if capturedCode != 5 {
        t.Errorf("Esperaba exit code 5, obtuve %d", capturedCode)
    }
}`
        },
        explanation: [
            { text: "Los defers no correrán al usar Exit.", lineCode: 'defer fmt.Println("!")' },
            { text: "Salimos con código 3.", lineCode: 'os.Exit(3)' }
        ],
        code: `package main

import (
    "fmt"
    "os"
)

func main() {

    defer fmt.Println("!")

    os.Exit(3)
}`,
        exercise: {
            question: "Intenta imprimir 'Fin' usando defer y luego llama a os.Exit(1). ¿Se imprimirá?", initialCode: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    // Tu código\n}`,
            solution: `package main\n\nimport ("fmt"; "os")\n\nfunc main() {\n    defer fmt.Println("Fin")\n    os.Exit(1)\n    // Respuesta: No, no se imprimirá.\n}`
        }
    },
    {
        id: 'dependency-injection', category: 'Advanced Concepts', title: 'Inyección de Dependencias', description: 'Patrón para desacoplar componentes pasando sus dependencias explícitamente.', guide: `La inyección de dependencias (DI) en Go se basa en pasar las dependencias (como conexiones a bases de datos o servicios) a los constructores o funciones, generalmente a través de interfaces.
Esto hace que el código sea más modular y fácil de probar, ya que puedes sustituir implementaciones reales por "mocks" o simulaciones durante los tests.`,
        explanation: [
            {
                text: "En lugar de que una estructura cree sus propias dependencias internamente, las recibe desde fuera.", lineCode: "func NewServer(db Database) *Server { return &Server{db: db} }"
            }
        ],
        code: `package main

import "fmt"

// 1. Definimos una interfaz para el comportamiento
type Greeter interface {
    Greet(name string) string
}

// 2. Implementación Real
type EnglishGreeter struct{}
func (e EnglishGreeter) Greet(name string) string {
    return "Hello " + name
}

// 3. El componente que "recibe" la dependencia
type Bot struct {
    greeter Greeter
}

func NewBot(g Greeter) *Bot {
    return &Bot{greeter: g}
}

func (b *Bot) SayHello(name string) {
    fmt.Println(b.greeter.Greet(name))
}

func main() {
    // Inyectamos la implementación real
    greeter := EnglishGreeter{}
    bot := NewBot(greeter)
    bot.SayHello("Gopher")
}`,
        useCase: {
            title: "Servicio de Usuarios con Base de Datos", description: "Un caso clásico: un servicio de usuario que no depende de MySQL ni Postgres directamente, sino de una interfaz `UserRepository`. Esto permite cambiar de base de datos sin tocar la lógica de negocio.", code: `type UserRepository interface {
    FindUser(id int) string
}

type UserService struct {
    repo UserRepository
}

func (s *UserService) GetUserName(id int) string {
    return s.repo.FindUser(id)
}`
        },
        testExample: {
            description: "Gracias a la inyección de dependencias, podemos crear un 'MockGreeter' para probar el bot sin necesitar la implementación real.", functionCode: `func (b *Bot) SayHello(name string) string {
    return b.greeter.Greet(name)
}`,
            testCode: `type MockGreeter struct{}
func (m MockGreeter) Greet(name string) string {
    return "Mock Hello " + name
}

func TestBot(t *testing.T) {
    mock := MockGreeter{}
    bot := NewBot(mock)
    
    if got := bot.SayHello("Test"); got != "Mock Hello Test" {
        t.Errorf("Expected mock response, got %s", got)
    }
}`
        },
        exercise: {
            question: "Modifica el `NewBot` para que acepte una implementación diferente de `Greeter` (por ejemplo `SpanishGreeter`) e inyéctala en `main`.", initialCode: `package main\n\nimport "fmt"\n\ntype Greeter interface {\n    Greet(name string) string\n}\n\n// Escribe SpanishGreeter aquí...\n\nfunc main() {\n    // Inyecta tu SpanishGreeter aquí\n}`,
            solution: `package main\n\nimport "fmt"\n\ntype Greeter interface {\n    Greet(name string) string\n}\n\ntype SpanishGreeter struct{}\nfunc (s SpanishGreeter) Greet(name string) string {\n    return "Hola " + name\n}\n\ntype Bot struct { g Greeter }\nfunc NewBot(g Greeter) *Bot { return &Bot{g} }\n\nfunc main() {\n    g := SpanishGreeter{}\n    b := NewBot(g)\n    fmt.Println(b.g.Greet("Mundo"))\n}`
        }
    },
    {
        id: 'third-party-modules', category: 'Package Management & Dependencies', title: 'Instalar Módulos de Terceros', description: 'Uso de `go get` y `go.mod` para gestionar librerías externas.', guide: `Go tiene un sistema de gestión de paquetes moderno integrado.        
**1.  go.mod:** Define el módulo y sus dependencias.
**2.  go get [url]:** Descarga e instala un paquete.
**3.  go mod tidy:** Limpia dependencias no usadas y descarga las faltantes.

Los paquetes se descargan de repositorios como GitHub.`,
        explanation: [
            {
                text: "Para iniciar un proyecto con módulos:", lineCode: "$ go mod init mi-proyecto"
            },
            {
                text: "Para instalar una librería externa (ej. uuid):", lineCode: "$ go get github.com/google/uuid"
            }
        ],
        code: `package main

import (
    "fmt"
    // Importamos el módulo externo con su ruta completa
    "github.com/google/uuid"
)

func main() {
    // Generamos un nuevo UUID v4
    id := uuid.New()
    fmt.Println("Generated ID:", id.String())
}

// Nota: Para correr esto necesitas:
// 1. go mod init demo
// 2. go get github.com/google/uuid
// 3. go run main.go`,
        useCase: {
            title: "Uso de DotEnv para Configuración", description: "Es muy común usar librerías como `godotenv` para cargar variables de entorno desde un archivo `.env`.", code: `import (
    "os"
    "log"
    "github.com/joho/godotenv"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    dbUser := os.Getenv("DB_USER")
    // ...
}`
        },
        testExample: {
            description: "No solemos testear las librerías de terceros (confiamos en ellas), pero sí testeamos que nuestra integración con ellas funcione.", functionCode: `func GenerateID() string {
    return uuid.New().String()
}`,
            testCode: `// En los tests, verificamos que el formato sea correcto
func TestGenerateID(t *testing.T) {
    id := GenerateID()
    if len(id) == 0 {
        t.Error("UUID should not be empty")
    }
}`
        },
        exercise: {
            question: "¿Qué comandos ejecutarías para instalar la librería 'github.com/gin-gonic/gin' y limpiar las dependencias sobrantes?", initialCode: `// Escribe los comandos bash aquí\n// 1. Instalar:\n// 2. Limpiar:`,
            solution: `// 1. go get github.com/gin-gonic/gin\n// 2. go mod tidy`
        }
    },
    {
        id: 'gorm', category: 'Database & ORM', title: 'GORM (ORM Library)', description: 'GORM es la librería ORM más popular para Go, facilitando la interacción con bases de datos.', guide: `**GORM: El Traductor Universal**
    Imagina que tu base de datos habla "SQLish" (tablas, filas, SELECT * FROM) y tu código Go habla "Structish" (structs, objetos, campos).
    
    GORM es un **intérprete** que se sienta en medio:
    **1.  Tú le das un struct de Go:** \`user := User{Name: "Juan"}\`
    **2.  Le dices:** \`db.Create(&user)\`
    **3.  GORM traduce eso a:** \`INSERT INTO users (name) VALUES ('Juan');\` y lo envía a la BD.
    
    **Ventajas:**
    *   **AutoMigrate**: Crea las tablas automáticamente basándose en tus structs. ¡Adiós CREATE TABLE a mano!
    *   **Hooks**: Dispara lógica antes/después de guardar (ej. hashear contraseña antes de guardar).
    *   **Driver Agnostic**: Cambia de SQLite a Postgres o MySQL cambiando solo una línea de configuración.`,
        useCase: {
            title: "CRUD Completo con PostgreSQL", description: "Ejemplo real de cómo conectar a Postgres y realizar las 4 operaciones básicas (Create, Read, Update, Delete).", code: `package main

import (
    "fmt"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

type Product struct {
    gorm.Model
    Code  string
    Price uint
}

func main() {
    dsn := "host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // 0. AutoMigrate: Crea la tabla si no existe
    db.AutoMigrate(&Product{})

    // 1. CREATE
    fmt.Println("Creando producto...")
    db.Create(&Product{Code: "D42", Price: 100})

    // 2. READ
    var product Product
    db.First(&product, "code = ?", "D42") // buscar producto con code D42
    fmt.Println("Leído:", product.Price)

    // 3. UPDATE
    fmt.Println("Actualizando precio...")
    db.Model(&product).Update("Price", 200) // actualiza precio a 200
    
    // 4. DELETE
    fmt.Println("Borrando producto...")
    db.Delete(&product, product.ID)
}`
        },
        explanation: [
            { text: "Definimos el modelo (Struct) que GORM convertirá en tabla.", lineCode: 'type Product struct { gorm.Model; Code string; Price uint }' },
            { text: "Conectamos a la DB (aquí SQLite para el ejemplo).", lineCode: 'db, _ := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})' },
            { text: "¡Magia! Crea la tabla 'products' si no existe.", lineCode: 'db.AutoMigrate(&Product{})' }
        ],
        code: `// GORM abstrae la base de datos
// https://gorm.io/docs/`,
        testExample: {
            description: "Podemos usar una base de datos en memoria (SQLite) para testear nuestra lógica de DB sin ensuciar la real.", functionCode: `type User struct {
    gorm.Model
    Name string
}

func CreateUser(db *gorm.DB, name string) error {
    return db.Create(&User{Name: name}).Error
}`,
            testCode: `func TestCreateUser(t *testing.T) {
    db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
    db.AutoMigrate(&User{})
    
    CreateUser(db, "Jinzhu")
    
    var user User
    db.First(&user, "name = ?", "Jinzhu")
    if user.Name != "Jinzhu" {
        t.Error("User not created")
    }
}`
        },
        exercise: {
            question: "Define un struct 'Book' con Title y Author. Escribe una query GORM para encontrar el primer libro con Author 'Cervantes'.", initialCode: `// Define struct Book\n\n// Escribe la query:\n// db.First(...)`,
            solution: `type Book struct {\n    gorm.Model\n    Title  string\n    Author string\n}\n\n// var book Book\n// db.First(&book, "author = ?", "Cervantes")`
        }
    },
    {
        id: 'web-frameworks', category: 'HTTP & Web', title: 'Web Frameworks (Gin, Echo, Fiber)', description: 'Comparativa de los frameworks web más populares: Gin, Echo y Fiber.', guide: `**Frameworks vs Standard Lib: La Analogía del Coche**
    Go tiene una librería estándar (\`net/http\`) increíble, es como construir tu propio coche pieza a pieza (Robusto, entiendes todo, pero tardas más).
    Los Frameworks son coches ya ensamblados por expertos.

    **Los 3 Grandes:**

    1.  **Gin (El Toyota Corolla)**:
        *   **Filosofía**: Rendimiento y estabilidad. Muy popular.
        *   **Standard**: Compatible 100% con \`net/http\`.
        *   **Uso**: API RESTs estándar, microservicios.
        *   *Slogan*: "Martini-like API with much better performance".

    2.  **Echo (El Tesla Model 3)**:
        *   **Filosofía**: Minimalista, Developer Experience (DX) increíble.
        *   **Standard**: Compatible 100% con \`net/http\`.
        *   **Destaca en**: Data Binding (recibir JSON/Formularios es un placer).
    
    3.  **Fiber (El Fórmula 1)**:
        *   **Filosofía**: VELOCIDAD EXTREMA. Inspirado en Express.js (Node).
        *   **NO Standard**: Usa \`fasthttp\` bajo el capó. No es compatible con librerías estándar de Go.
        *   **Uso**: Cuando cada microsegundo cuenta (AdTech, Gaming).`,
        useCase: {
            title: "Hello World x3", description: "Veamos cómo se escribe el mismo endpoint GET /hello en los 3 frameworks.", code: `// --- GIN ---
r := gin.Default()
r.GET("/hello", func(c *gin.Context) {
    c.JSON(200, gin.H{"msg": "Hola Gin"})
})

// --- ECHO ---
e := echo.New()
e.GET("/hello", func(c echo.Context) error {
    return c.JSON(200, map[string]string{"msg": "Hola Echo"})
})

// --- FIBER ---
app := fiber.New()
app.Get("/hello", func(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{"msg": "Hola Fiber"})
})`
        },
        explanation: [
            { text: "Gin usa `gin.Context` y `gin.H` (atajo para map[string]interface).", lineCode: 'c.JSON(200, gin.H{"msg": "Hola"})' },
            { text: "Echo obliga a retornar error, lo que facilita el manejo centralizado de errores.", lineCode: 'return c.JSON(200, ...)' },
            { text: "Fiber tiene una sintaxis muy parecida a Express.js (Node).", lineCode: 'app.Get("/hello", ...)' }
        ],
        code: `package main
import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
    r.Run() // escucha en 0.0.0.0:8080
}`,
        testExample: {
            description: "Go facilita testear handlers HTTP sin levantar un servidor real usando `httptest`.", functionCode: `func SetupRouter() *gin.Engine {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.String(200, "pong")
    })
    return r
}`,
            testCode: `func TestPingRoute(t *testing.T) {
    router := SetupRouter()

    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/ping", nil)
    router.ServeHTTP(w, req)

    if w.Code != 200 {
        t.Errorf("Esperaba 200, recibí %d", w.Code)
    }
    if w.Body.String() != "pong" {
        t.Errorf("Esperaba 'pong', recibí '%s'", w.Body.String())
    }
}`
        },
        exercise: {
            question: "Usando Gin, crea un endpoint POST /users que reciba un JSON `{'name': '...'}` y devuelva 201 Created.", initialCode: `r.POST("/users", func(c *gin.Context) {\n    // 1. Definir struct\n    // 2. BindJSON\n    // 3. c.JSON(201, ...)\n})`,
            solution: `type User struct { Name string }\nvar u User\nif err := c.BindJSON(&u); err == nil {\n    c.JSON(201, u)\n}`
        }
    },
    {
        id: 'code-quality', category: 'Testing & Quality', title: 'Code Quality (vet & imports)', description: 'Herramientas estándar de Go para mantener tu código limpio y correcto.', guide: `**Code Quality: El Corrector Ortográfico**
    Go incluye herramientas potentes "out of the box" para asegurar la calidad.
    
    1.  **go vet (El Detector de Bugs Lógicos)**:
        *   No busca errores de sintaxis (eso lo hace el compilador), busca código que *compila* pero probablemente está *mal*.
        *   Ejemplo: \`fmt.Printf("%d", "texto")\` -> Compila, pero \`vet\` te avisa que \`%d\` es para números.
        
    2.  **goimports (El Ordenador Automático)**:
        *   Como \`gofmt\` pero "con esteroides".
        *   Formatea el código Y ADEMÁS añade/quita los imports automáticamente.
        *   No más "unused import" errors manuales.`,
        useCase: {
            title: "Detectando errores silenciosos", description: "Un error común en concurrencia que el compilador ignora pero `go vet` detecta.", code: `package main
import "fmt"

func main() {
    // Error clásico: loop var capture
    // Antes de Go 1.22, esto imprimía valores inesperados.
    // 'go vet' te avisa de posibles problemas aquí.
    for i := 0; i < 3; i++ {
        go func() {
            fmt.Println(i) 
        }()
    }
}
// Run: go vet main.go`
        },
        explanation: [
            { text: "Ejecuta vet en todo el proyecto:", lineCode: "go vet ./..." },
            { text: "Instala y ejecuta goimports:", lineCode: "go install golang.org/x/tools/cmd/goimports@latest" }
        ],
        code: `// Mantén tu código sano:
// 1. Siempre corre 'go fmt' (o goimports)
// 2. Antes de commit, corre 'go vet'`,
        testExample: {
            description: "Podemos forzar que el CI falle si `go vet` encuentra problemas.", functionCode: `// En tu pipeline de CI/CD (GitHub Actions, GitLab CI):
// steps:
//   - name: Vet
//     run: go vet ./...`,
            testCode: `// No hay test de unidad per se, es análisis estático.`
        },
        exercise: {
            question: "¿Qué comando usarías para formatear tu código y además arreglar los imports faltantes automáticamente?", initialCode: `// Comando bash`,
            solution: `// goimports -w .`
        }
    },
    {
        id: 'linters', category: 'Testing & Quality', title: 'Linters (staticcheck, revive)', description: 'Herramientas de terceros para un análisis más estricto y profundo.', guide: `**Linters: El Editor Estricto**
    Mientras \`go vet\` busca errores graves, los Linters buscan **estilo, simplicidad y mejores prácticas**.

    **Los Favoritos:**

    1.  **Staticcheck (El Estándar de Oro)**:
        *   Es como un \`go vet\` supervitaminado.
        *   Detecta código muerto, simplificaciones posibles (ej. usar \`time.Since\` en lugar de \`time.Now().Sub\`), y problemas de rendimiento.
        *   *Muy recomendado*.

    2.  **GolangCI-Lint (El Agregador)**:
        *   Una herramienta que corre 50+ linters a la vez (incluyendo staticcheck, vet, revive, errcheck).
        *   Es el estándar en CI/CD. Configurable via \`.golangci.yml\`.`,
        useCase: {
            title: "Mejorando el Código", description: "Staticcheck te sugiere formas más idiomáticas de escribir Go.", code: `// Código original (Funciona, pero mejorable)
if x == true {
    return true
} else {
    return false
}

// Sugerencia de Linter:
// "Simplify boolean expression"
return x`
        },
        explanation: [
            { text: "Instalar Staticcheck:", lineCode: "go install honnef.co/go/tools/cmd/staticcheck@latest" },
            { text: "Correr en el proyecto:", lineCode: "staticcheck ./..." }
        ],
        code: `// Configuración típica de .golangci.yml
run:
  timeout: 5m
linters:
  enable:
    - staticcheck
    - revive
    - gosimple
    - unused`,
        testExample: {
            description: "Integrar golangci-lint en tus tests o pre-commit hooks asegura calidad consistente.", functionCode: `// Makefile
lint:
    golangci-lint run`,
            testCode: `// En local, corre 'make lint' antes de enviar tu PR.`
        },
        exercise: {
            question: "Estás usando `golangci-lint`. ¿En qué archivo configuras qué linters activar o desactivar?", initialCode: `// Nombre del archivo`,
            solution: `// .golangci.yml`
        }
    },
    {
        id: 'security', category: 'Cryptography & Security', title: 'Security (govulncheck)', description: 'Detecta vulnerabilidades conocidas en tus dependencias.', guide: `**Security: El Guardia de Seguridad**
    El software moderno depende de cientos de librerías de terceros. ¿Qué pasa si una tiene un agujero de seguridad?

    **govulncheck (La Base de Datos Oficial)**:
    *   Conecta con la Go Vulnerability Database.
    *   Analiza tu \`go.mod\` y tu código COMPILADO.
    *   Te dice: "Estás usando la versión X de la librería Y, que tiene la vulnerabilidad Z. Actualiza a la versión W".
    
    Es vital correr esto periódicamente.`,
        useCase: {
            title: "Auditoría de Seguridad", description: "Ejemplo de salida al encontrar una vulnerabilidad.", code: `$ govulncheck ./...

Scanning for dependencies with known vulnerabilities...
Found 1 known vulnerability:

Vulnerability #1: GO-202X-XXXX
    Severe: Remote Code Execution via ...
    Found in: github.com/bad/lib@v1.0.0
    Fixed in: github.com/bad/lib@v1.0.1`
        },
        explanation: [
            { text: "Instalar la herramienta:", lineCode: "go install golang.org/x/vuln/cmd/govulncheck@latest" },
            { text: "Escanear tu proyecto:", lineCode: "govulncheck ./..." }
        ],
        code: `// Seguridad primero:
// Mantén tus dependencias actualizadas.
// Usa govulncheck en tu CI.`,
        testExample: {
            description: "Automation is key. Add a security scanning step to your workflow.", functionCode: `// GitHub Action Step
- name: Vulnerability Scan
  run: govulncheck ./...`,
            testCode: `// Fail the build if vulnerabilities are found.`
        },
        exercise: {
            question: "¿Qué herramienta oficial de Go usarías para saber si las librerías que importaste tienen vulnerabilidades de seguridad conocidas?", initialCode: `// Comando`,
            solution: `// govulncheck`
        }
    },
    {
        id: 'performance-debugging', category: 'Performance & Debugging', title: 'Performance & Debugging', description: 'Herramientas avanzadas para optimizar y depurar aplicaciones Go.', guide: `**Las Herramientas del Mecánico**
    Go viene con un kit de diagnóstico de Fórmula 1 incorporado.

    1.  **Race Detector (\`-race\`)**:
        *   Detecta condiciones de carrera. **ÚSALO SIEMPRE** en tus tests.
        *   Comando: \`go test -race ./...\` o \`go run -race main.go\`.
        *   *Analogy*: Es como un copiloto que te grita si dos personas intentan agarrar el volante a la vez.

    2.  **pprof (Profiling)**:
        *   Analiza en qué gasta CPU o Memoria tu programa.
        *   Genera gráficos visuales (flamegraphs) increíbles.
        *   *Analogy*: Una radiografía completa del motor mientras está en marcha.

    3.  **Trace Tool**:
        *   Visualiza línea de tiempo de goroutines, syscalls y eventos del GC.
        *   Comando: \`go tool trace trace.out\`.
        *   *Analogy*: La telemetría segundo a segundo de la carrera.`,
        useCase: {
            title: "Cazando una Race Condition", description: "Este código tiene un bug de concurrencia grave. El Race Detector nos lo dirá.", code: `package main
import (
    "fmt"
    "sync"
)

func main() {
    c := 0
    var wg sync.WaitGroup
    
    // 1000 goroutines incrementando la misma variable sin mutex
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            c++ // DATA RACE!
            wg.Done()
        }()
    }
    wg.Wait()
    fmt.Println(c)
}
// Ejecuta: go run -race main.go
// Salida: WARNING: DATA RACE`
        },
        explanation: [
            { text: "Activar Race Detector:", lineCode: "go run -race main.go" },
            { text: "Ver perfil de CPU (necesita código pprof):", lineCode: "go tool pprof http://localhost:6060/debug/pprof/profile" }
        ],
        code: `// Regla de oro:
// Si tu programa se comporta raro en paralelo, corre con -race.`,
        testExample: {
            description: "Puedes y DEBES usar -race en tu CI Pipeline.", functionCode: `// CI config hint:
// script:
//   - go test -race -v ./...`,
            testCode: `// No test code here, flag usage.`
        },
        exercise: {
            question: "¿Qué flag debes añadir a `go test` o `go run` para detectar accesos concurrentes inseguros a memoria?", initialCode: `// Flag`,
            solution: `// -race`
        }
    },
    {
        id: 'deployment-tooling', category: 'Deployment', title: 'Deployment & Tooling', description: 'Compilación, Cross-Compilation y optimización de binarios.', guide: `**Deployment: El Contenedor de Envío**
    Una de las mejores cosas de Go es que compila a un **binario estático único**. Sin dependencias, sin instalar runtime en el servidor.

    1.  **Go Build**:
        *   \`go build\`: Crea un ejecutable en el directorio actual.
        *   \`-o bin/app\`: Define nombre y ruta de salida.
        *   \`-ldflags="-s -w"\`: Reduce el tamaño del binario quitando símbolos de debug (ideal para producción).

    2.  **Cross-Compilation (Magia Pura)**:
        *   ¿Estás en Mac pero despliegas en Linux Server? Fácil.
        *   \`GOOS=linux GOARCH=amd64 go build\`
        *   Puedes compilar para Windows, ARM, WebAssembly... ¡desde cualquier máquina!`,
        useCase: {
            title: "Compilando para Producción", description: "Un comando típico de build para generar un binario ligero para Linux.", code: `# Compilar para Linux 64-bit desde Mac/Windows
$ GOOS=linux GOARCH=amd64 go build -o mi-app-linux

# Verificar arquitectura
$ file mi-app-linux
mi-app-linux: ELF 64-bit LSB executable, x86-64...

# Reducir tamaño (Stripping binaries)
$ go build -ldflags="-s -w" -o mi-app-small`
        },
        explanation: [
            { text: "GOOS: Sistema Operativo destino (linux, windows, darwin).", lineCode: "GOOS=linux" },
            { text: "GOARCH: Arquitectura destino (amd64, arm64).", lineCode: "GOARCH=amd64" }
        ],
        code: `// Deployment Philosophy:
// "Build once, run anywhere." (literalmente)`,
        testExample: {
            description: "Podemos inyectar la versión en tiempo de compilación usando -ldflags.", functionCode: `var Version = "dev"
func main() { fmt.Println("Version:", Version) }`,
            testCode: `// Build command:
// go build -ldflags="-X main.Version=1.0.0"`
        },
        exercise: {
            question: "Estás en una MacBook (Darwin) y quieres compilar tu programa para un servidor Ubuntu (Linux). ¿Qué variables de entorno debes configurar antes de `go build`?", initialCode: `// Variables`,
            solution: `// GOOS=linux GOARCH=amd64`
        }
    },
    {
        id: 'advanced-topics', category: 'Advanced Concepts', title: 'Advanced Topics Deep Dive', description: 'Gestión de memoria, Reflection, Unsafe y más.', guide: `**1. Memory Management & Escape Analysis**    
    Go gestiona la memoria automáticamente, pero entender "Stack vs Heap" es clave para el rendimiento.
    *   **Stack**: Rápido, local a la goroutine. Se limpia sola al terminar la función.
    *   **Heap**: Más lento, compartido, gestionado por el Garbage Collector (GC).
    
    **Escape Analysis**:
    El compilador decide: "¿Esta variable se necesita fuera de esta función?".
    
    \`\`\`go
    package main
    
    type User struct { Name string }
    
    // NO escapa: 'u' muere al terminar la función. Se queda en Stack.
    func stayOnStack() {
        u := User{Name: "Stack"}
        _ = u // Uso local
    }
    
    // SÍ escapa: devolvemos un puntero. 'u' debe sobrevivir. Va al Heap.
    func escapeToHeap() *User {
        u := User{Name: "Heap"}
        return &u
    }
    \`\`\`
    *Tip*: \`go build -gcflags="-m"\` te muestra este análisis.

    ---

    **2. Reflection (\`reflect\`)**
    
    Permite inspeccionar tipos en runtime. Útil para serialización (JSON) pero lento y peligroso (sin type-safety).
    
    \`\`\`go
    import ("fmt"; "reflect")
    
    func Inspect(x interface{}) {
        t := reflect.TypeOf(x)
        v := reflect.ValueOf(x)
        fmt.Println("Type:", t)
        fmt.Println("Value:", v)
    }
    \`\`\`

    ---

    **3. Unsafe Package**
    
    Permite saltarse las reglas de tipado de Go y leer/escribir memoria arbitraria.
    
    \`\`\`go
    import ("fmt"; "unsafe")
    
    func main() {
        x := 10
        // Convertir *int a *float64 (ILEGAL y PELIGROSO)
        p := unsafe.Pointer(&x)
        y := (*float64)(p) 
        fmt.Println(*y) // Basura o crash
    }
    \`\`\`
    **Advertencia**: Puede causar Memory Corruption o Segmentation Faults.

    ---

    **4. Build Tags (Compilación Condicional)**
    
    Incluye o excluye archivos según el SO, arquitectura o flags custom.
    
    **Archivo: \`driver_linux.go\`**
    \`\`\`go
    //go:build linux
    package driver
    func Init() { println("Linux Driver") }
    \`\`\`

    **Archivo: \`driver_windows.go\`**
    \`\`\`go
    //go:build windows
    package driver
    func Init() { println("Windows Driver") }
    \`\`\`

    ---

    **5. CGO & Plugins**
    
    **CGO**: Llama a código C desde Go.
    \`\`\`go
    package main
    
    // #include <stdio.h>
    // void sayHello() { printf("Hello from C!\\n"); }
    import "C"
    
    func main() {
        C.sayHello()
    }
    \`\`\`
    *Nota*: CGO hace el build más lento y pierde portabilidad (cross-compilation es difícil).`,
        useCase: {
            title: "Advanced Use Case", description: "Los ejemplos principales están arriba en la guía.", code: `// Revisa la sección 'Guía Conceptual' para ver 
// ejemplos detallados de cada concepto avanzado.`
        },
        explanation: [
            { text: "Ver análisis de escape:", lineCode: "go build -gcflags=\"-m\" main.go" },
            { text: "Build tags manuales:", lineCode: "go build -tags=pro" }
        ],
        code: `// Con grandes poderes...
// evítalos si puedes. Go brilla por su simplicidad.`,
        testExample: {
            description: "", functionCode: `// --`,
            testCode: `// --`
        },
        exercise: {
            question: "", initialCode: ``,
            solution: ``
        }
    },
    {
        id: 'realtime-communication', category: 'HTTP & Web', title: 'Realtime Communication (WebSockets, SSE)', description: 'Cómo construir aplicaciones interactivas en tiempo real.', guide: `**Más allá de request-response**
    HTTP clásico es como enviar una carta y esperar respuesta. Realtime es como una llamada telefónica.

    **1. Conceptos Clave**:
    *   **Polling**: El cliente pregunta cada X segundos "¿hay algo nuevo?". Ineficiente.
    *   **Long-Polling**: El cliente pregunta, el servidor espera hasta que haya algo nuevo para responder.
    *   **WebSockets**: Un túnel TCP persistente y bidireccional. Ideal para chats, juegos.
    *   **SSE (Server-Sent Events)**: Unidireccional (Server -> Client) sobre HTTP. Ideal para feeds, notificaciones, tickers de bolsa.

    ---

    **2. WebSockets (con \`gorilla/websocket\`)**
    
    El estándar de facto en Go.
    
    \`\`\`go
    // Servidor Echo WebSocket
    var upgrader = websocket.Upgrader{} // Config por defecto
    
    func echo(w http.ResponseWriter, r *http.Request) {
        // Upgrade HTTP -> WebSocket
        conn, _ := upgrader.Upgrade(w, r, nil)
        defer conn.Close()
    
        for {
            // Leer del cliente
            msgType, msg, err := conn.ReadMessage()
            if err != nil { return }
    
            // Escribir al cliente (Echo back)
            if err := conn.WriteMessage(msgType, msg); err != nil {
                return
            }
        }
    }
    \`\`\`

    ---

    **3. Server-Sent Events (SSE)**
    
    Sencillo, nativo de HTTP, sin librerías externas complejas.
    
    \`\`\`go
    func sseHandler(w http.ResponseWriter, r *http.Request) {
        // Headers obligatorios
        w.Header().Set("Content-Type", "text/event-stream")
        w.Header().Set("Cache-Control", "no-cache")
        w.Header().Set("Connection", "keep-alive")
    
        flusher, _ := w.(http.Flusher)
    
        for {
            // Formato: "data: mensaje\n\n"
            fmt.Fprintf(w, "data: La hora es %s\\n\\n", time.Now())
            flusher.Flush() // Enviar inmediatamente
            time.Sleep(1 * time.Second)
        }
    }
    \`\`\`

    ---

    **4. Messaging Patterns (Fan-Out)**
    
    Un patrón común: Un productor envía un mensaje, N clientes conectados (WebSockets) lo reciben.
    
    *   Usa un \`map[*websocket.Conn]bool\` para guardar clientes activos.
    *   Protege el mapa con \`sync.Mutex\` (RWMutex).
    *   Cuando llega un evento, recorre el mapa y envía a todos.`,
        useCase: {
            title: "Hub de Chat (Fan-Out)", description: "Estructura básica para un servidor de chat con múltiples salas.", code: `type Hub struct {
    // Clientes registrados
    clients map[*websocket.Conn]bool
    // Canal de broadcasting
    broadcast chan []byte
    register  chan *websocket.Conn
    unregister chan *websocket.Conn
}

func (h *Hub) Run() {
    for {
        select {
        case client := <-h.register:
            h.clients[client] = true
        case client := <-h.unregister:
            delete(h.clients, client)
            client.Close()
        case message := <-h.broadcast:
            for client := range h.clients {
                client.WriteMessage(websocket.TextMessage, message)
            }
        }
    }
}`
        },
        explanation: [
            { text: "Librería estándar WebSocket:", lineCode: "go get github.com/gorilla/websocket" },
            { text: "Header clave para SSE:", lineCode: "Content-Type: text/event-stream" }
        ],
        code: `// Elección de Tecnología:
// - ¿Necesitas el cliente hablando al servidor rápido? -> WebSocket
// - ¿Solo el servidor notificando al cliente? -> SSE (Más simple, firewall friendly)`,
        testExample: {
            description: "", functionCode: `// --`,
            testCode: `// --`
        },
        exercise: {
            question: "¿Qué header HTTP es obligatorio para iniciar una conexión Server-Sent Events (SSE)?", initialCode: `// Header`,
            solution: `// Content-Type: text/event-stream`
        }
    }
];
