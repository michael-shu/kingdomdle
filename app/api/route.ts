export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export function GET() {
    console.log("What is going on here...");
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}