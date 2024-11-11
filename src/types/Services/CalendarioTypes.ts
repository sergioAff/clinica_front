export interface CalendarioType {
  handleDateChange: (
    value: Date | Date[],
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => void;
  date: Date | null;
}
