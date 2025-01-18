export interface Movement {
    id: string;
    productName: string;
    date: string;
    entry?: {
      units: number;
      pricePerUnit: number;
      total: number;
    };
    exit?: {
      units: number;
      pricePerUnit: number;
      total: number;
    };
    inventory: {
      units: number;
      pricePerUnit: number;
      total: number;
    };
  }
  