import type { DocumentData } from "firebase-admin/firestore";
import { dataPoint, mainDb } from "~/server/database/mainDb.server";


const templateCollection = () => 
dataPoint<DocumentData>(`${mainDb}/templates`);

const readById = async(id: string) => {
  const templateDoc = await templateCollection().doc(id).get();

  if (!templateDoc.exists) {
    return null;
  }

  return templateDoc.data();
}



const createTemplate = async(templateData: DocumentData) => {
  const newTemplate = templateCollection().doc();
  await newTemplate.set(templateData);

  return newTemplate.id;
}



const templates= {
  readById: readById,
  createTemplate: createTemplate,
  updateTemplate:()=>{},
  deleteTemplate:()=>{},
}