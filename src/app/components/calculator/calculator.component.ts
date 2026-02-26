import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatesService } from '../../services/rates.service';

// Definir interfaz para las tarifas
interface TarifaData {
  sobre: number;
  menos1kg: number;
  cajas1_10: number;
  cajas11_20: number;
  cajas21_30: number;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  result: any = null;
  showResult = false;
  loading = false;
  destinos: string[] = [];
  error: string | null = null;
  showModal = false;

  // Lista completa de destinos para el modal
  listaDestinosCompleta: string[] = [
    'Caborca, Sonora',
    'Ciudad Obregón, Son.',
    'Culiacán, Sin.',
    'Empalme, Sonora',
    'Guamúchil, Sinaloa',
    'Guasave, Sinaloa',
    'Guaymas, Sonora',
    'Imuris, Son.',
    'Los Mochis, Sin.',
    'Mazatlán, Sin.',
    'Mexicali, B.C.',
    'Navojoa Centro, Son.',
    'Nogales, Son.',
    'San Luis Río Colorado, Son.',
    'Santa Ana, Sonora',
    'Sonoyta, Sonora',
    'Tepic Terminal Colosio',
    'Tepic, Nay.',
    'Terminal Hermosillo, Son.',
    'Tijuana, B.C.',
    'Ciudad Guzman, Jal.',
    'Tuxpan Jal.',
    'Colima, Col.',
    'Manzanillo, Col.'
  ];

  // ✅ CORREGIDO: Tipado correcto para tarifas
  tarifas: { [key: string]: TarifaData } = {
    'Caborca, Sonora': { sobre: 191, menos1kg: 287, cajas1_10: 383, cajas11_20: 575, cajas21_30: 766 },
    'Ciudad Obregón, Son.': { sobre: 163, menos1kg: 246, cajas1_10: 327, cajas11_20: 492, cajas21_30: 656 },
    'Culiacán, Sin.': { sobre: 124, menos1kg: 187, cajas1_10: 250, cajas11_20: 376, cajas21_30: 501 },
    'Empalme, Sonora': { sobre: 170, menos1kg: 256, cajas1_10: 341, cajas11_20: 512, cajas21_30: 683 },
    'Guamúchil, Sinaloa': { sobre: 134, menos1kg: 201, cajas1_10: 268, cajas11_20: 403, cajas21_30: 537 },
    'Guasave, Sinaloa': { sobre: 140, menos1kg: 211, cajas1_10: 281, cajas11_20: 423, cajas21_30: 563 },
    'Guaymas, Sonora': { sobre: 170, menos1kg: 256, cajas1_10: 341, cajas11_20: 512, cajas21_30: 683 },
    'Imuris, Son.': { sobre: 189, menos1kg: 283, cajas1_10: 370, cajas11_20: 568, cajas21_30: 758 },
    'Los Mochis, Sin.': { sobre: 144, menos1kg: 217, cajas1_10: 290, cajas11_20: 435, cajas21_30: 581 },
    'Mazatlán, Sin.': { sobre: 115, menos1kg: 173, cajas1_10: 231, cajas11_20: 346, cajas21_30: 463 },
    'Mexicali, B.C.': { sobre: 201, menos1kg: 302, cajas1_10: 403, cajas11_20: 604, cajas21_30: 806 },
    'Navojoa Centro, Son.': { sobre: 155, menos1kg: 233, cajas1_10: 310, cajas11_20: 466, cajas21_30: 621 },
    'Nogales, Son.': { sobre: 190, menos1kg: 286, cajas1_10: 381, cajas11_20: 571, cajas21_30: 762 },
    'San Luis Río Colorado, Son.': { sobre: 195, menos1kg: 294, cajas1_10: 391, cajas11_20: 588, cajas21_30: 784 },
    'Santa Ana, Sonora': { sobre: 184, menos1kg: 277, cajas1_10: 369, cajas11_20: 555, cajas21_30: 740 },
    'Sonoyta, Sonora': { sobre: 192, menos1kg: 289, cajas1_10: 385, cajas11_20: 578, cajas21_30: 771 },
    'Tepic Terminal Colosio': { sobre: 92, menos1kg: 138, cajas1_10: 184, cajas11_20: 277, cajas21_30: 369 },
    'Tepic, Nay.': { sobre: 92, menos1kg: 138, cajas1_10: 184, cajas11_20: 277, cajas21_30: 369 },
    'Terminal Hermosillo, Son.': { sobre: 174, menos1kg: 292, cajas1_10: 349, cajas11_20: 525, cajas21_30: 700 },
    'Tijuana, B.C.': { sobre: 203, menos1kg: 305, cajas1_10: 407, cajas11_20: 611, cajas21_30: 815 },
    'Ciudad Guzman, Jal.': { sobre: 95, menos1kg: 144, cajas1_10: 193, cajas11_20: 317, cajas21_30: 423 },
    'Tuxpan Jal.': { sobre: 84, menos1kg: 126, cajas1_10: 168, cajas11_20: 252, cajas21_30: 336 },
    'Colima, Col.': { sobre: 95, menos1kg: 144, cajas1_10: 193, cajas11_20: 317, cajas21_30: 423 },
    'Manzanillo, Col.': { sobre: 107, menos1kg: 162, cajas1_10: 217, cajas11_20: 357, cajas21_30: 475 }
  };

  constructor(
    private fb: FormBuilder,
    private ratesService: RatesService
  ) {
    this.calculatorForm = this.fb.group({
      destino: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0.1), Validators.max(30)]]
    });
  }

  ngOnInit() {
    this.cargarDestinos();
    this.testConexion();
  }

  testConexion() {
    console.log('🔍 Probando conexión con backend...');
    this.ratesService.testConnection().subscribe({
      next: (res) => {
        console.log('✅ Conexión exitosa:', res);
      },
      error: (err) => {
        console.error('❌ Error de conexión:', err);
        this.error = 'No se puede conectar al servidor. Asegúrate que el backend esté corriendo.';
      }
    });
  }

  cargarDestinos() {
    console.log('📡 Cargando destinos...');
    this.ratesService.obtenerDestinos().subscribe({
      next: (data) => {
        console.log('✅ Destinos cargados:', data.length);
        this.destinos = data;
      },
      error: (err) => {
        console.error('❌ Error cargando destinos:', err);
        this.error = 'Error al cargar los destinos';
      }
    });
  }

  onSubmit() {
    console.log('📝 Formulario enviado');
    console.log('Valores:', this.calculatorForm.value);
    
    if (this.calculatorForm.invalid) {
      console.log('❌ Formulario inválido');
      return;
    }

    this.loading = true;
    this.error = null;
    this.showResult = false;

    const datos = {
      destino: this.calculatorForm.value.destino,
      peso: Number(this.calculatorForm.value.peso)
    };

    console.log('📤 Enviando a backend:', datos);

    this.ratesService.calcularEnvio(datos).subscribe({
      next: (response) => {
        console.log('✅ Respuesta recibida:', response);
        this.result = response;
        this.showResult = true;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error en cálculo:', err);
        this.error = err.error?.error || 'Error al calcular el precio';
        this.loading = false;
      }
    });
  }

  onClear() {
    console.log('🧹 Limpiando formulario');
    this.calculatorForm.reset();
    this.result = null;
    this.showResult = false;
    this.error = null;
  }

  openModal() {
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }
}