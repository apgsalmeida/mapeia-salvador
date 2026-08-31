// lib/api-auth.ts
import { NextRequest, NextResponse } from 'next/server';

export function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  return apiKey === process.env.API_KEY;
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Acesso não autorizado. API Key inválida.' },
    { status: 401 }
  );
}