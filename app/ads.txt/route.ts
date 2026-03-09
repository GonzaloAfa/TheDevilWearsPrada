import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  const publisher =
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || process.env.ADSENSE_PUBLISHER_ID;

  if (!publisher) {
    return new NextResponse('', { status: 204 });
  }

  const body = `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
