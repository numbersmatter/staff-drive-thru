import type { DocumentData } from "firebase-admin/firestore";
import { dataPoint, mainDb } from "~/server/database/mainDb.server";



const driveThruFormCollection = () =>
  dataPoint<DocumentData>(`${mainDb}/driveThruForms`);



const readById = async (id: string) => {
  const formDoc = await driveThruFormCollection().doc(id).get();

  return formDoc.data();
};

const createForm = async (formData: DocumentData) => {
  const newForm = driveThruFormCollection().doc();
  await newForm.set(formData);

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