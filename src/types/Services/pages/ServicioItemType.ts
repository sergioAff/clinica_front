export interface ServicioItemType {
  currentSection: string;
  label?: string;
  onClick?: () => void;
  setCurrentSection?: (page: string) => void;
}
