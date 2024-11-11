import { CardServiceType } from "../CardServiceType";

export interface AddDateType {
  setCurrentSection: (section: string) => void;
  date: Date | null;
  selectedService: CardServiceType | null;
  selectedTime: string | null;
  time: string;
  setSelectedTime: (time: string) => void;
  daySelected: Date;
  setAvailableTimes: React.Dispatch<React.SetStateAction<string[]>>;
}
