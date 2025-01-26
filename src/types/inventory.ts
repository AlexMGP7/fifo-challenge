// Interface para cada lote/entrada individual
export interface Lote {
  lotId?: string;        // Puede ser un ID interno o generado, opcional si no está disponible
  date: string;          // Fecha de entrada
  units: number;         // Unidades disponibles en este lote
  pricePerUnit: number;  // Precio unitario de este lote
}

// Interface para el producto completo
export interface Product {
  id?: string;           // ID del documento en Firestore
  productName: string;   // Nombre del producto
  lots: Lote[];          // Array de lotes asociados al producto
  ownerId?: string;       // ID del usuario propietario
}


// Interface para los detalles de una salida de inventario
export interface ExitDetail {
  lotId?: string;    // ID del lote, opcional si no se conoce
  lotDate: string;   // Fecha del lote del que se retiran unidades
  units: number;     // Unidades retiradas de este lote
  pricePerUnit: number;
  total: number;     // Cálculo: units * pricePerUnit
}

// Interface para un registro de historial de salida
export interface ExitHistoryRecord {
  id?: string;              // ID del documento en Firestore (opcional)
  productId: string;        // ID del producto del que se realizó la salida
  productName: string;      // Nombre del producto
  date: string;             // Fecha y hora en que se realizó la salida
  units: number;            // Total de unidades retiradas en esta operación
  exitDetails: ExitDetail[];// Desglose FIFO de la salida
  totalValue: number;       // Valor total calculado de la salida
  ownerId: string;          // ID del usuario propietario
}

