import { PacientesFormType } from "@/types/Services/PacientesFormType";

export interface registrarPacientesType {
  e: React.FormEvent<HTMLFormElement>;
  setLoading: (loading: false | true) => void;
  setErrorMessage: (errorMessage: string) => void;
  formData: PacientesFormType;
  setShowSuccess: (showSuccess: false | true) => void;
  setFormData: ([]: PacientesFormType) => void;
}
