import { Injectable } from '@angular/core';
import { Tariff, WeightRange, ShippingResult } from '../models/tariff.model';

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  readonly origin = 'Ciudad de México (CDMX)';

  // Tabla de tarifas ODM desde CDMX
  readonly tariffs: Tariff[] = [
    // Región Norte / Noroeste
    { destination: 'Caborca, Sonora',             region: 'Noroeste', sobre: 191, paqueteMenos1kg: 287, de1a10kg: 383, de11a20kg: 575, de21a30kg: 766 },
    { destination: 'Ciudad Obregón, Sonora',       region: 'Noroeste', sobre: 163, paqueteMenos1kg: 246, de1a10kg: 327, de11a20kg: 492, de21a30kg: 656 },
    { destination: 'Empalme, Sonora',              region: 'Noroeste', sobre: 170, paqueteMenos1kg: 256, de1a10kg: 341, de11a20kg: 512, de21a30kg: 683 },
    { destination: 'Guaymas, Sonora',              region: 'Noroeste', sobre: 170, paqueteMenos1kg: 256, de1a10kg: 341, de11a20kg: 512, de21a30kg: 683 },
    { destination: 'Imuris, Sonora',               region: 'Noroeste', sobre: 189, paqueteMenos1kg: 283, de1a10kg: 370, de11a20kg: 568, de21a30kg: 758 },
    { destination: 'Mexicali, Baja California',    region: 'Noroeste', sobre: 201, paqueteMenos1kg: 302, de1a10kg: 403, de11a20kg: 604, de21a30kg: 806 },
    { destination: 'Navojoa Centro, Sonora',       region: 'Noroeste', sobre: 155, paqueteMenos1kg: 233, de1a10kg: 310, de11a20kg: 466, de21a30kg: 621 },
    { destination: 'Nogales, Sonora',              region: 'Noroeste', sobre: 190, paqueteMenos1kg: 286, de1a10kg: 381, de11a20kg: 571, de21a30kg: 762 },
    { destination: 'San Luis Río Colorado, Sonora',region: 'Noroeste', sobre: 195, paqueteMenos1kg: 294, de1a10kg: 391, de11a20kg: 588, de21a30kg: 784 },
    { destination: 'Santa Ana, Sonora',            region: 'Noroeste', sobre: 184, paqueteMenos1kg: 277, de1a10kg: 369, de11a20kg: 555, de21a30kg: 740 },
    { destination: 'Sonoyta, Sonora',              region: 'Noroeste', sobre: 192, paqueteMenos1kg: 289, de1a10kg: 385, de11a20kg: 578, de21a30kg: 771 },
    { destination: 'Terminal Hermosillo, Sonora',  region: 'Noroeste', sobre: 174, paqueteMenos1kg: 292, de1a10kg: 349, de11a20kg: 525, de21a30kg: 700 },
    { destination: 'Tijuana, Baja California',     region: 'Noroeste', sobre: 203, paqueteMenos1kg: 305, de1a10kg: 407, de11a20kg: 611, de21a30kg: 815 },
    // Sinaloa
    { destination: 'Culiacán, Sinaloa',            region: 'Noroeste', sobre: 124, paqueteMenos1kg: 187, de1a10kg: 250, de11a20kg: 376, de21a30kg: 501 },
    { destination: 'Guamúchil, Sinaloa',           region: 'Noroeste', sobre: 134, paqueteMenos1kg: 201, de1a10kg: 268, de11a20kg: 403, de21a30kg: 537 },
    { destination: 'Guasave, Sinaloa',             region: 'Noroeste', sobre: 140, paqueteMenos1kg: 211, de1a10kg: 281, de11a20kg: 423, de21a30kg: 563 },
    { destination: 'Los Mochis, Sinaloa',          region: 'Noroeste', sobre: 144, paqueteMenos1kg: 217, de1a10kg: 290, de11a20kg: 435, de21a30kg: 581 },
    { destination: 'Mazatlán, Sinaloa',            region: 'Noroeste', sobre: 115, paqueteMenos1kg: 173, de1a10kg: 231, de11a20kg: 346, de21a30kg: 463 },
    // Nayarit
    { destination: 'Tepic Terminal Colosio, Nayarit', region: 'Occidente', sobre: 92, paqueteMenos1kg: 138, de1a10kg: 184, de11a20kg: 277, de21a30kg: 369 },
    { destination: 'Tepic, Nayarit',              region: 'Occidente', sobre: 92,  paqueteMenos1kg: 138, de1a10kg: 184, de11a20kg: 277, de21a30kg: 369 },
    // Jalisco / Colima
    { destination: 'Ciudad Guzmán, Jalisco',       region: 'Occidente', sobre: 95, paqueteMenos1kg: 144, de1a10kg: 193, de11a20kg: 317, de21a30kg: 423 },
    { destination: 'Tuxpan, Jalisco',              region: 'Occidente', sobre: 84, paqueteMenos1kg: 126, de1a10kg: 168, de11a20kg: 252, de21a30kg: 336 },
    { destination: 'Colima, Colima',               region: 'Occidente', sobre: 95, paqueteMenos1kg: 144, de1a10kg: 193, de11a20kg: 317, de21a30kg: 423 },
    { destination: 'Manzanillo, Colima',           region: 'Occidente', sobre: 107,paqueteMenos1kg: 162, de1a10kg: 217, de11a20kg: 357, de21a30kg: 475 },
  ];

  // Rangos de peso con sus etiquetas y límites
  readonly weightRanges: WeightRange[] = [
    { label: 'Sobre / Documento',    key: 'sobre',           min: 0,    max: 0.1  },
    { label: 'Paquete menos de 1 kg', key: 'paqueteMenos1kg', min: 0.1,  max: 1    },
    { label: 'Caja / Bulto 1 – 10 kg',key: 'de1a10kg',        min: 1,    max: 10   },
    { label: 'Caja / Bulto 11 – 20 kg',key: 'de11a20kg',      min: 10,   max: 20   },
    { label: 'Caja / Bulto 21 – 30 kg',key: 'de21a30kg',      min: 20,   max: 30   },
  ];

  getDestinations(): string[] {
    return this.tariffs.map(t => t.destination).sort();
  }

  getRegions(): string[] {
    return [...new Set(this.tariffs.map(t => t.region))];
  }

  getWeightRange(weight: number): WeightRange | null {
    return this.weightRanges.find(r => weight > r.min && weight <= r.max) ?? null;
  }

  calculateShipping(destination: string, weight: number): ShippingResult | null {
    const tariff = this.tariffs.find(t => t.destination === destination);
    if (!tariff) return null;

    const range = this.getWeightRange(weight);
    if (!range) return null;

    return {
      destination: tariff.destination,
      weightRange: range.label,
      price: tariff[range.key] as number,
      weight
    };
  }
}
