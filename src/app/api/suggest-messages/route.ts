import OpenAI from 'openai';
//import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import { Stream } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';
async function OpenAIStream(openaiResponse: Stream<OpenAI.Completions.Completion>): Promise<ReadableStream> {
  const reader = openaiResponse.getReader(); // Get the reader from the OpenAI stream
  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value); // Push the streamed value to the ReadableStream
      }
    },
    cancel() {
      reader.cancel(); // Close the reader if the stream is canceled
    },
  });
}

export async function POST(req : Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 400,
      stream: true,
      prompt,
    });

    const stream = await OpenAIStream(response);
    
    
    return new Response(stream,{
      headers :{'Content-Type' : 'text/event-stream'},
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      // General error handling
      console.error('An unexpected error occurred:', error);
     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
}