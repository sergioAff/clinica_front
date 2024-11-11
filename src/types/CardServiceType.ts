export interface CardServiceType {
  id?: number;
  title: string;
  rangoPrecioUYU: [number, number];
  rangoPrecioUSD: [number, number];
  rangoPrecioEUR: [number, number];
  duracionMinutos: number;
  descripcion: string;
  setSelectedService?: (service: CardServiceType) => void;
  onSelect?: () => void;
  price_UYU?: number;
}
