import type { DocumentData } from "firebase-admin/firestore";
import { dataPoint, mainDb } from "~/server/database/mainDb.server";


const templateCollection = () => 
dataPoint<DocumentData>(`templates`);

const readById = async(id: string) => {
  const templateDoc = await templateCollection().doc(id).get();

  // if (templateDoc.data() === undefined){
  //   return undefined;
  // }

  return templateDoc.data();
}



const createTemplate = async(templateData: DocumentData) => {
  const newTemplate = templateCollection().doc();
  await newTemplate.set(templateData);

  return newTemplate.id;
}

const updateTemplate = async(id: string, templateData: DocumentData) => {
  const writeUpdate = await templateCollection().doc(id).set(templateData, { merge: true });

  return writeUpdate;
};

const deleteTemplate = async(id: string) => {
  const deleteDoc = await templateCollection().doc(id).delete();
  return deleteDoc;
}



export const templates= {
  readById: readById,
  createTemplate: createTemplate,
  updateTemplate: updateTemplate,
  deleteTemplate: deleteTemplate,
}