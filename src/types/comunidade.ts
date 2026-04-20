export interface IComunidade {
  _id?: string;
  nomeComunidade: string;
  tipoComunidade: 'Quilombola' | 'Pesqueira' | 'Indígena' | 'Outros';
  localizacao: string;
  numeroFamilias: number;
  liderComunidade: string;
  atividadesProdutos: string;
  contato?: string;
  latitude?: number;
  longitude?: number;
  dataRegistro: Date;
  consentimento: boolean;
}