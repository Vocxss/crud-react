import type { IChapter, IClass } from "../types";

export const createChapter = (data: IChapter): IClass | null => {
  const existingData = localStorage.getItem("class_data");
  if (existingData) {
    const existingDataParsed: IClass = JSON.parse(existingData);
    const nextChapterId =
      existingDataParsed.chapters.reduce(
        (maxId: number, chapter: IChapter) => Math.max(maxId, chapter.id),
        0,
      ) + 1;

    existingDataParsed.chapters.push({ ...data, id: nextChapterId });
    localStorage.setItem("class_data", JSON.stringify(existingDataParsed));
    return existingDataParsed;
  } else {
    const newData: IClass = {
      id: 1,
      name: "Pemrograman Web A",
      description:
        "Mata kuliah Pemrograman Web merupakan mata kuliah keahlian yang merancang pemahaman dan keterampilan mahasiswa dalam membangun aplikasi web modern secara full-stack. Pembelajaran diawali dari penguasaan front-end development, mencakup struktur semantik HTML5, penataan tampilan dan desain responsif menggunakan CSS3 beserta framework-nya, hingga implementasi interaktivitas halaman web client-side berbasis JavaScript dan library pendukung.",
      sks: 3,
      chapters: [{ ...data, id: 1 }],
    };
    localStorage.setItem("class_data", JSON.stringify(newData));
    return newData;
  }
};

export const deleteChapter = (id: number): IClass | null => {
  const existingData = localStorage.getItem("class_data");
  if (!existingData) return null;

  const existingDataParsed: IClass = JSON.parse(existingData);
  if (existingData) {
    const filteredData = existingDataParsed.chapters.filter(
      (chapter: IChapter) => chapter.id !== id,
    );
    const updatedData = { ...existingDataParsed, chapters: filteredData };
    localStorage.setItem("class_data", JSON.stringify(updatedData));
    return updatedData;
  }
  return null;
};

export const updateChapter = (
  id: number,
  data: IChapter,
): IClass | null => {
  const existingData = localStorage.getItem("class_data");
  if (!existingData) return null;

  const existingDataParsed: IClass = JSON.parse(existingData);
  if (existingData) {
    const chapterIndex = existingDataParsed.chapters.findIndex(
      (chapter: IChapter) => chapter.id === id
    );

    if (chapterIndex !== -1) {
      const materials = existingDataParsed.chapters[chapterIndex].materials;
      existingDataParsed.chapters[chapterIndex] = { ...data, id, materials };
      localStorage.setItem("class_data", JSON.stringify(existingDataParsed));
      return existingDataParsed;
    } else {
      alert("Data tidak ditemukan");
    }
  }
  return null;
};
