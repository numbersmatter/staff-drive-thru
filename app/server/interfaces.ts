export interface FormQuestion {
  id: string;
  englishText: string;
  spanishText: string;
}

export interface CisFormData {
  formTitle: string;
  formId: string;
  questions: FormQuestion[];
  language: string;
  responses: {
    [key: string]: number;
  };
}