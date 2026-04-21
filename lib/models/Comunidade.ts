import { Schema, models, model } from 'mongoose';
import { IComunidade } from '@/types/comunidade';

const ComunidadeSchema = new Schema<IComunidade>({
  nomeComunidade: { type: String, required: true },
  tipoComunidade: {
    type: String,
    enum: ['Quilombola', 'Pesqueira', 'Indígena', 'Outros'],
    required: true,
  },
  localizacao: { type: String, required: true },
  numeroFamilias: { type: Number, required: true },
  liderComunidade: { type: String, required: true },
  atividadesProdutos: { type: String, required: true },
  contato: { type: String },
  redesocial: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  dataRegistro: { type: Date, default: Date.now },
  consentimento: { type: Boolean, required: true },
});

const Comunidade = models.Comunidade || model<IComunidade>('Comunidade', ComunidadeSchema);

export default Comunidade;