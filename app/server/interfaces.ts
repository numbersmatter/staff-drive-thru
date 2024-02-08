export interface FormQuestion {
  id: string;
  englishText: string;
  spanishText: string;
}


export interface CisFormDataNoId {
  formTitle: string;
  questions: FormQuestion[];
  language: string;
  responses: {
    [key: string]: number;
  };
}

export interface CisFormData extends CisFormDataNoId {
  formId: string;
}