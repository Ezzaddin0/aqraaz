// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request) {
//   const { prompt } = await request.json();
// //   console.log(prompt);

//   try {
//     const response = await openai.completions.create({
//       model: 'gpt-3.5-turbo',
//       prompt,
//       max_tokens: 100,
//     });

//     return NextResponse.json({ text: response.choices[0].text });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
//   }
// }