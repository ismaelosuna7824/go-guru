import json
import os
from agno.agent import Agent
from agno.models.groq import Groq

def handler(event, context):
    """
    Lambda handler to generate a Go challenge using Groq API via Agno
    """
    api_key = os.environ.get('GROQ_API_KEY')
    
    if not api_key:
        print("[ERROR] GROQ_API_KEY is NOT SET!")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'GROQ_API_KEY no configurada'})
        }
    
    print(f"[DEBUG] Using GROQ_API_KEY: {api_key[:10]}...{api_key[-4:]}")
    
    # Set the API key for Groq
    os.environ['GROQ_API_KEY'] = api_key
    
    # Parse request body
    try:
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        body = {}
    
    difficulty = body.get('difficulty', 'beginner')
    language = body.get('language', 'es')  # 'es' or 'en'
    
    # Create agent
    agent = Agent(
        model=Groq("llama-3.3-70b-versatile"),
        description="You are an expert in Go (Golang) programming and education.",
        markdown=False
    )
    
    # Determine language-specific instructions
    if language == 'en':
        lang_instruction = "Generate the challenge in English. All text (title, description, comments) must be in English."
        example_comment = "// Your code here"
    else:  # Spanish by default
        lang_instruction = "Genera el desafío en Español. Todo el texto (título, descripción, comentarios) debe estar en Español."
        example_comment = "// Tu código aquí"
    
    # Prompt for challenge generation
    prompt = f"""Generate a programming challenge in Go (Golang) for {difficulty} level.
The challenge should be an interesting algorithmic problem solvable in 5-10 minutes.

{lang_instruction}

⚠️ MANDATORY RULE - NON-NEGOTIABLE ⚠️
The function MUST ALWAYS be named exactly "Solution".
NEVER use names like: ContarPalabras, SumNumbers, ReverseString, etc.
The function name is ALWAYS "Solution" - no exceptions.

CORRECT Example:
func Solution(input string) int {{
    // code here
}}

INCORRECT Example (DO NOT DO THIS):
func ContarPalabras(input string) int {{  // ❌ BAD - wrong name
    // code here
}}

Respond ONLY with valid JSON in the following structure, without additional text or markdown:
{{
    "title": "Challenge Title",
    "description": "Clear problem description. Explain what the Solution function should do.",
    "initialCode": "package main\\n\\nimport \\"fmt\\"\\n\\nfunc Solution(input string) string {{\\n\\t{example_comment}\\n\\treturn \\"\\"\\n}}\\n\\nfunc main() {{\\n\\tfmt.Println(Solution(\\"test\\"))\\n}}",
    "solution": "package main\\n\\nimport \\"fmt\\"\\n\\nfunc Solution(input string) string {{\\n\\treturn input\\n}}\\n\\nfunc main() {{\\n\\tfmt.Println(Solution(\\"test\\"))\\n}}",
    "testCases": [
        {{ "input": "example", "output": "expected_result" }}
    ]
}}

FINAL REMINDER: 
- Function name: "Solution" (MANDATORY)
- Adapt return type and parameters based on the problem
- Generate at least 3-4 varied test cases"""

    try:
        # Get response from agent
        response = agent.run(prompt)
        
        # Extract content from response
        content = response.content if hasattr(response, 'content') else str(response)
        
        print(f"[DEBUG] Raw response: {content[:200]}...")
        
        # Clean up potential markdown formatting
        if content.startswith('```'):
            content = content.split('```')[1]
            if content.startswith('json'):
                content = content[4:]
        
        content = content.strip()
        
        # Parse JSON
        challenge = json.loads(content)
        
        # VALIDATION: Check if initialCode and solution use "Solution" function
        initial_code = challenge.get('initialCode', '')
        solution_code = challenge.get('solution', '')
        
        if 'func Solution' not in initial_code:
            print("[ERROR] AI did not use 'Solution' as function name in initialCode")
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'AI generation error: Function must be named "Solution"',
                    'details': 'The AI generated code with incorrect function name. Please try again.'
                })
            }
        
        if 'func Solution' not in solution_code:
            print("[ERROR] AI did not use 'Solution' as function name in solution")
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'AI generation error: Function must be named "Solution"',
                    'details': 'The AI generated code with incorrect function name. Please try again.'
                })
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(challenge)
        }
        
    except json.JSONDecodeError as e:
        print(f"[ERROR] JSON Parse Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Invalid JSON from AI: {str(e)}'})
        }
    except Exception as e:
        print(f"[ERROR] Exception: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
