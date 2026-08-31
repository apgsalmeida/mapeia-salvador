'use server';

import dbConnect from '@/lib/db/mongoose';
import Comunidade from '@/lib/models/Comunidade';
import { IComunidade } from '@/types/comunidade';

/**
 * Busca todas as comunidades – acessa diretamente o banco de dados.
 * Nenhuma chave é enviada pelo cliente; a ação roda no servidor.
 */
export async function getComunidades(): Promise<IComunidade[]> {
  await dbConnect();
  const comunidades = await Comunidade.find({}).sort({ dataRegistro: -1 }).lean();
  return comunidades as IComunidade[];
}

/**
 * Cria uma nova comunidade – também acessa diretamente o banco.
 * A validação dos campos pode ser feita aqui.
 */
export async function createComunidade(data: Partial<IComunidade>) {
  await dbConnect();

  // Validação básica (exemplo)
  const { nomeComunidade, tipoComunidade, localizacao, numeroFamilias, liderComunidade, atividadesProdutos, consentimento } = data;
  if (!nomeComunidade || !tipoComunidade || !localizacao || !numeroFamilias || !liderComunidade || !atividadesProdutos || !consentimento) {
    throw new Error('Campos obrigatórios faltando');
  }

  const nova = await Comunidade.create({
    ...data,
    numeroFamilias: Number(numeroFamilias),
  });

  return nova;
}