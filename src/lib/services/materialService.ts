import type { IChapter, IClass, IMaterial } from "../types";

const getClassData = (): IClass | null => {
  const existingData = localStorage.getItem("class_data");
  return existingData ? JSON.parse(existingData) : null;
};

export const createMaterial = (
  chapterId: number,
  data: IMaterial,
): IClass | null => {
  const classData = getClassData();
  if (!classData) return null;

  const chapter = classData.chapters.find(
    (item: IChapter) => item.id === chapterId,
  );
  if (!chapter) {
    alert("Chapter tidak ditemukan");
    return null;
  }

  const nextMaterialId =
    chapter.materials.reduce(
      (maxId: number, material: IMaterial) => Math.max(maxId, material.id),
      0,
    ) + 1;

  chapter.materials.push({ ...data, id: nextMaterialId });
  localStorage.setItem("class_data", JSON.stringify(classData));
  return classData;
};

export const deleteMaterial = (
  chapterId: number,
  materialId: number,
): IClass | null => {
  const classData = getClassData();
  if (!classData) return null;

  const chapter = classData.chapters.find((item) => item.id === chapterId);
  if (!chapter) {
    alert("Chapter tidak ditemukan");
    return null;
  }

  chapter.materials = chapter.materials.filter(
    (material) => material.id !== materialId,
  );
  localStorage.setItem("class_data", JSON.stringify(classData));
  return classData;
};
