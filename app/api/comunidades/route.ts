import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Comunidade from '@/lib/models/Comunidade';
import { validateApiKey, unauthorizedResponse } from '@/lib/auth';

/**
 * Rota GET – retorna todas as comunidades.
 * Apenas requisições com a chave correta no cabeçalho 'x-api-key' são aceitas.
 * Esta rota é útil para integrações externas ou para ser chamada internamente
 * (por exemplo, a partir de uma Server Action, mas atualmente o frontend
 * usa diretamente a Server Action, que é mais segura).
 */
export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    await dbConnect();
    const comunidades = await Comunidade.find({}).sort({ dataRegistro: -1 }).lean();
    return NextResponse.json(comunidades);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar comunidades';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Rota POST – cria uma nova comunidade.
 * Também protegida pela chave.
 */
export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    await dbConnect();

    const { nomeComunidade, tipoComunidade, localizacao, numeroFamilias, liderComunidade, atividadesProdutos, consentimento } = body;
    if (!nomeComunidade || !tipoComunidade || !localizacao || !numeroFamilias || !liderComunidade || !atividadesProdutos || !consentimento) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    const novaComunidade = await Comunidade.create({
      ...body,
      numeroFamilias: Number(numeroFamilias),
    });

    return NextResponse.json(novaComunidade, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar comunidade';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}