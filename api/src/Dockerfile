# Multi-stage build: Stage 1 - Download Go
FROM alpine:3.19 AS go-installer

# Install tools needed to download Go
RUN apk add --no-cache wget tar

# Download and extract Go 1.22.0
RUN wget -q https://go.dev/dl/go1.22.0.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz && \
    rm go1.22.0.linux-amd64.tar.gz

# Stage 2 - Lambda runtime
FROM public.ecr.aws/lambda/python:3.11

# Copy Go from the first stage (reduces layer size)
COPY --from=go-installer /usr/local/go /usr/local/go

# Set Go environment variables
ENV PATH="/usr/local/go/bin:${PATH}" \
    GOPATH="/tmp/go" \
    GOCACHE="/tmp/go-build" \
    CGO_ENABLED=0

# Copy requirements
COPY requirements.txt ${LAMBDA_TASK_ROOT}/
RUN pip install --no-cache-dir -r requirements.txt

# Copy Lambda function code
COPY app.py ${LAMBDA_TASK_ROOT}/

# Set the Lambda handler
CMD [ "app.handler" ]
