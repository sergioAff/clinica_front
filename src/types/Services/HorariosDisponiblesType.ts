export interface HorariosDisponiblesType {
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
  selectedTime: string | null;
  daySelected: Date;
}
