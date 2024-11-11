export type ElementoAcordeonServiciosType = {
  item: {
    id: number;
    title: string;
    content: string;
  };
  active: number | null;
  handleToggle: (id: number) => void;
};
