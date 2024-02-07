import { redirect } from "@remix-run/node";
import { CisFormData } from "./interfaces";

export const checkAnswer = () => {};

const testFormData: CisFormData ={
  formTitle: "Drive-thru Form",
  formId: "123test",
  questions: [
    {
      id: "1",
      englishText: "How many adults are in your household?",
      spanishText: "¿Cuántos adultos esta en la casa?",
    },
    {
      id: "2",
      englishText: "How many children are in your household?",
      spanishText: "¿Cuántos niños esta en la casa?",
    },
    {
      id: "3",
      englishText:
        "I have ___ children attending primary school? (K-3 grade)",
      spanishText:
        "Tengo ___ niños asistiendo a la escuela primaria? (K-3 grado)",
    },
    {
      id: "4",
      englishText:
        "I have ___ children attending elementary school? (4-5 grade)",
      spanishText:
        "Tengo ___ niños asistiendo a la escuela secundaria? (4-5 grado)",
    },
    {
      id: "5",
      englishText: "I have ___ children attending middle school? (6-8 grade)",
      spanishText:
        "Tengo ___ niños asistiendo a la escuela secundaria? (6-8 grado)",
    },
    {
      id: "6",
      englishText: "I have ___ children attending high school? (9-12 grade)",
      spanishText:
        "Tengo ___ niños asistiendo a la escuela secundaria? (9-12 grado)",
    },
  ],
  language:"spanish",
  responses: {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
  },
};



export const readFormData = async (formId: string) => {
  const cisFormData: CisFormData = testFormData;

  return cisFormData;
};

export const getQuestionData = async (formId:string, questionId: string) => {

  const formData = await readFormData(formId);

  const language = formData.language;
  const questionData = formData.questions.find((question) => question.id === questionId)

  if (!questionData) {
    throw new Error("Question not found");
  }

  const questionText = language === "english" ? questionData?.englishText : questionData?.spanishText;


  return {
    questionText,
    questionResponse: formData.responses[questionId],
  };
};

const formQuestionOrder = [
  { id: "1", next: "2", previous: "" },
  { id: "2", next: "3", previous: "1" },
  { id: "3", next: "4", previous: "2" },
  { id: "4", next: "5", previous: "3" },
  { id: "5", next: "6", previous: "4" },
  { id: "6", next: "placement", previous: "5" },
]


export const handleBackRequest = ( 
  cisFormData : CisFormData, questionId: string,
) => {
  if(questionId === "1"){
    return  redirect(`/form/${cisFormData.formId}`);
  }

  const currentQuestionOrder = formQuestionOrder.find((question) => question.id === questionId);

  if(!currentQuestionOrder){
    throw new Error("Question not found");
  }


  return redirect(`/form/${cisFormData.formId}/${currentQuestionOrder.previous}`);
};


export const handleNextRequest = ( 
  cisFormData : CisFormData, questionId: string,
) => {
  const currentQuestionOrder = formQuestionOrder.find((question) => question.id === questionId);

  if(!currentQuestionOrder){
    throw new Error("Question not found");
  }

  if(currentQuestionOrder.next === "placement"){
    return redirect(`/form/${cisFormData.formId}/placement`);
  }

  return redirect(`/form/${cisFormData.formId}/${currentQuestionOrder.next}`);
};


export const handleSaveInputNumber = async (
  formId: string, questionId: string, value: number
) => {

  const formData = await readFormData(formId);


  return ( "success")
}