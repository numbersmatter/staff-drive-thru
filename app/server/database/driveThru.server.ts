import { FieldValue, type DocumentData } from "firebase-admin/firestore";
import { dataPoint, mainDb } from "~/server/database/mainDb.server";
import { CisFormDataNoId } from "../interfaces";



const driveThruFormCollection = () =>
  dataPoint<CisFormDataNoId>(`driveThruForms`);



const readById = async (id: string) => {
  const formDoc = await driveThruFormCollection().doc(id).get();
  const formDocData = formDoc.data();

  if(formDocData === undefined){
    return undefined;
  }

  const formDocDataExists = formDocData as CisFormDataNoId

  return {...formDocDataExists, formId: formDoc.id};
};

const createForm = async (formData: CisFormDataNoId) => {
  const newForm = driveThruFormCollection().doc();

  const newFormData ={
    ...formData,
    createdAt: FieldValue.serverTimestamp(),
  }
  await newForm.set(newFormData);

  return newForm.id;
};

const updateForm = async (id: string, formData: DocumentData) => {
  const writeUpdate = await driveThruFormCollection()
    .doc(id)
    .set(formData, { merge: true });

  return writeUpdate;
};


const deleteForm = async (id: string) => {
  const deleteDoc = await driveThruFormCollection().doc(id).delete();
  return deleteDoc;
};

export const driveThruForms = {
  readById: readById,
  createForm: createForm,
  updateForm: updateForm,
  deleteForm: deleteForm,
};