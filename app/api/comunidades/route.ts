import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Comunidade from '@/lib/models/Comunidade';

export async function GET() {
  try {
    await dbConnect();
    const comunidades = await Comunidade.find({}).sort({ dataRegistro: -1 }).lean();
    return NextResponse.json(comunidades);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar comunidades' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();

    // Validação básica
    const { nomeComunidade, tipoComunidade, localizacao, numeroFamilias, liderComunidade, atividadesProdutos, consentimento } = body;
    if (!nomeComunidade || !tipoComunidade || !localizacao || !numeroFamilias || !liderComunidade || !atividadesProdutos || !consentimento) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    const novaComunidade = await Comunidade.create({
      ...body,
      numeroFamilias: Number(numeroFamilias),
    });

    return NextResponse.json(novaComunidade, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}