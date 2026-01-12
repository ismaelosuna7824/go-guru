# Go Guru API

Serverless backend for securely executing Go code and validating exercises.

## Architecture

- **AWS Lambda** with custom runtime (Docker)
- **API Gateway** to expose the REST endpoint
- **Go 1.22.0** installed in the Docker image to compile user code
- **Python 3.11** as Lambda runtime to handle validation logic

## Requirements

1. **AWS CLI** configured with credentials
   ```bash
   aws configure
   ```

2. **AWS SAM CLI** installed
   ```bash
   brew install aws-sam-cli  # macOS
   # or visit: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
   ```

3. **Docker** installed and running
   ```bash
   docker --version
   ```

## Deployment

### 1. Build

Build the Docker image and package the application:

```bash
cd api
sam build
```

### 2. Deploy

Deploy to AWS (first time will ask to confirm configurations):

```bash
sam deploy --guided
```

Answer the questions:
- **Stack Name**: `go-guru-api` (or your preferred name)
- **AWS Region**: `us-east-1` (or your preferred region)
- **Confirm changes**: `y`
- **Allow SAM CLI IAM role creation**: `y`
- **Disable rollback**: `n`
- **GoExecutorFunction has no authentication**: `y` (it is a public API)
- **Save arguments**: `y`

### 3. Get the API URL

Upon completion, you will see output similar to:

```
Outputs
-------------------------------------------------------------------------
Key                 GoExecutorApi
Description         API Gateway endpoint URL for executing Go code
Value               https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/Prod/execute/
-------------------------------------------------------------------------
```

Copy this URL to use in your frontend.

## API Usage

### Endpoint

```
POST /execute
```

### Request Body

```json
{
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World\")\n}",
  "expectedOutput": "/^Hello, .+/"
}
```

### Response (Correct)

```json
{
  "success": true,
  "correct": true,
  "message": "Correct! The output matches the expected pattern.",
  "output": "Hello, World\n",
  "expectedOutput": "/^Hello, .+/"
}
```

### Response (Incorrect)

```json
{
  "success": true,
  "correct": false,
  "message": "Output does not match. Expected pattern like: ^Hello, .+",
  "output": "hello world\n",
  "expectedOutput": "/^Hola, .+/"
}
```

### Response (Compilation Error)

```json
{
  "success": false,
  "error": "Compilation or execution error",
  "stderr": "./main.go:5:2: syntax error: unexpected newline, expecting comma or }",
  "stdout": ""
}
```

## `expectedOutput` Format

The `expectedOutput` field supports two formats:

1. **Exact Text**:
   ```json
   "expectedOutput": "Hello, World"
   ```

2. **Regex** (enclosed in `/`):
   ```json
   "expectedOutput": "/^Hello, .+/"
   ```

Regex examples:
- `/^Hello, .+/` - Starts with "Hello, " followed by any text
- `/\d+/` - Contains one or more digits
- `/^Sum: \d+$/` - Exactly "Sum: " followed by numbers

## Local Testing

### Option 1: Direct Python Server (Recommended for development)

**Faster, no Docker required**

```bash
cd api/src
python3 local_server.py
```

Then test with curl:

```bash
curl -X POST http://localhost:3000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 + 3)\n}",
    "expectedOutput": "8"
  }'
```

Or run the test script:

```bash
cd api
./test-local.sh
```

### Option 2: SAM Local (🐳 Simulates Lambda exactly)

**Requires Docker, slower, but simulates real environment**

```bash
cd api
sam local start-api
```

First time takes ~5-10 minutes building the image.

### Testing with test events

```bash
sam local invoke GoExecutorFunction --event events/test-suma.json
```

See more examples in `TEST_EXAMPLES.md` and `LOCAL_DEVELOPMENT.md`

## Configuration

### Environment Variables

Edit `template.yaml` to change configurations:

```yaml
Environment:
  Variables:
    MAX_EXECUTION_TIME: "10"  # Max execution time in seconds
```

### Memory and Timeout

```yaml
Globals:
  Function:
    Timeout: 30      # Total Lambda timeout
    MemorySize: 512  # Memory in MB
```

## Security

The API implements **multiple security layers** to protect against attacks:

### Automatic Protections

1. **Rate Limiting (API Gateway)**:
   - 100 requests/minute per IP
   - 50 concurrent requests max
   - 429 response when exceeded

2. **Resource Limits (Lambda)**:
   - 10 concurrent executions max
   - 30 seconds total timeout
   - 10KB source code max
   - 500 lines of code max
   - 50MB compiled binary max
   - 5KB output max

3. **Blocked Imports**:
   - `os/exec` - Prevents command execution
   - `syscall` - Prevents system calls
   - `unsafe` - Prevents unsafe operations
   - `net/http` - Prevents HTTP requests
   - `net/rpc`, `plugin`, `reflect` - Other dangerous imports

4. **Blocked Malicious Patterns**:
   - Infinite loops: `for {}`
   - Goto statements
   - Excessive recursion

5. **Monitoring (CloudWatch Alarms)**:
   - Alert if >500 invocations/min
   - Alert if >50 errors in 5 min
   - Alert if average duration >20 sec

### CORS - Origin Restriction (Recommended)

By default, the API allows requests from any domain (`AllowOrigin: '*'`). For production, **you should restrict it to your domain**:

```bash
# Development: allows all origins
sam deploy --parameter-overrides AllowedOrigin='*'

# Production: only your domain
sam deploy --parameter-overrides AllowedOrigin='https://your-app.web.app'
```

### Permission Error
Ensure your AWS user has these permissions:
- CloudFormation
- Lambda
- API Gateway
- ECR
- S3
- IAM (to create roles)

## Integration with Frontend

See `../src/services/goExecutorService.js` to see how to integrate with React.
