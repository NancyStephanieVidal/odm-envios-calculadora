export interface Tariff {
  destination: string;
  region: string;
  sobre: number;          // Documentos / sobre
  paqueteMenos1kg: number; // Paquete < 1 kg
  de1a10kg: number;        // 1 – 10 kg
  de11a20kg: number;       // 11 – 20 kg
  de21a30kg: number;       // 21 – 30 kg
}

export interface WeightRange {
  label: string;
  key: keyof Omit<Tariff, 'destination' | 'region'>;
  min: number;
  max: number;
}

export interface ShippingResult {
  destination: string;
  weightRange: string;
  price: number;
  weight: number;
}
