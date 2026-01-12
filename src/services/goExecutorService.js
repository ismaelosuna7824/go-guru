/**
 * Service to interact with the Go Guru API (AWS Lambda)
 * Handles code execution and validation against expected output
 */

// Get API URL from environment variable
// After deploying with SAM, update .env with: VITE_GO_EXECUTOR_API_URL=https://your-api-id.execute-api.region.amazonaws.com/Prod/execute
const API_URL = import.meta.env.VITE_GO_EXECUTOR_API_URL || 'http://localhost:3000/execute';

/**
 * Execute Go code and validate against expected output
 *
 * @param {string} code - Go source code to execute
 * @param {string} expectedOutput - Expected output (supports regex: /pattern/)
 * @returns {Promise<Object>} Result object with execution details
 */
export const executeCode = async (code, expectedOutput = '') => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                expectedOutput,
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error executing code:', error);

        // Return a user-friendly error
        return {
            success: false,
            error: error.message || 'No se pudo conectar con el servidor. Verifica tu conexión.',
        };
    }
};

/**
 * Execute Go code without validation (just run and return output)
 *
 * @param {string} code - Go source code to execute
 * @returns {Promise<Object>} Result object with execution output
 */
export const runCode = async (code) => {
    return executeCode(code, '');
};

/**
 * Validate if the code is valid before sending to API
 * This provides instant feedback before making API calls
 *
 * @param {string} code - Go source code to validate
 * @returns {Object} Validation result
 */
export const validateCode = (code) => {
    if (!code || !code.trim()) {
        return {
            valid: false,
            error: 'El código no puede estar vacío',
        };
    }

    if (!code.includes('package main')) {
        return {
            valid: false,
            error: 'El código debe contener "package main"',
        };
    }

    if (!code.includes('func main()')) {
        return {
            valid: false,
            error: 'El código debe contener "func main()"',
        };
    }

    return {
        valid: true,
    };
};
