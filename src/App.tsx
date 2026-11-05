import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import type { ChapterMaterialCategory, IChapter, IClass } from "./lib/types";
import { Card } from "./components/card";
import { BookOpenCheck, FileText, Loader2, Trash2 } from "lucide-react";
import { FormModal } from "./components/formModal";
import {
  createChapter,
  deleteChapter,
  updateChapter,
} from "./lib/services/chapterService";
import { Input, SelectInput } from "./components/input";
import { Modal } from "./components/modal";
import { createMaterial, deleteMaterial } from "./lib/services/materialService";

const categoryOptions: ChapterMaterialCategory[] = ["MATERIAL", "ASSIGNMENT"];

function App() {
  const [data, setData] = useState<IClass | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [chapterInput, setChapterInput] = useState<IChapter>({
    id: 0,
    title: "",
    description: "",
    materials: [],
  });

  const [materialInput, setMaterialInput] = useState({
    id: 0,
    name: "",
    description: "",
    fileUrl: "",
    category: "MATERIAL" as ChapterMaterialCategory,
  });

  useEffect(() => {
    const response = localStorage.getItem("class_data");
    setData(response ? JSON.parse(response) : null);

    const load = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(load);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center py-4 h-screen font-mono font-medium text-sm text-foreground bg-background overflow-x-hidden">
        <Navbar />
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <Loader2 className="animate-spin" size={32} />
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 min-h-screen font-mono font-medium text-sm text-foreground bg-background gap-8">
      <Navbar />
      {!data ? (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Data kosong</h1>
          <p>Sepertinya data belum ditambahkan.</p>
          <FormModal
            title="Tambah Data"
            onSubmit={() => {
              const updatedData = createChapter(chapterInput);
              setData(updatedData);
            }}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="nama">Nama Bab</label>
              <Input
                type="text"
                value={chapterInput.title}
                onChange={(e) =>
                  setChapterInput({ ...chapterInput, title: e.target.value })
                }
                label="nama"
              />
            </div>
            <div className="flex flex-col gap-2 h-max">
              <label htmlFor="nama">Deskripsi Bab</label>
              <textarea
                className="h-24 px-4 py-2 rounded-4xl outline outline-primary-50 border border-primary/30"
                value={chapterInput.description}
                onChange={(e) =>
                  setChapterInput({
                    ...chapterInput,
                    description: e.target.value,
                  })
                }
                name="deskripsi"
              />
            </div>
          </FormModal>
        </div>
      ) : (
        <div className="flex flex-col items-center-center gap-8 md:w-3/5 w-4/5 min-h-screen">
          <div className="z-50 fixed bottom-4 right-4">
            <FormModal
              title="Tambah Bab Baru"
              onSubmit={() => {
                const updatedData = createChapter(chapterInput);
                setData(updatedData);
                setChapterInput({
                  id: 0,
                  title: "",
                  description: "",
                  materials: [],
                });
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="nama">Nama Bab</label>
                <Input
                  type="text"
                  value={chapterInput.title}
                  onChange={(e) =>
                    setChapterInput({ ...chapterInput, title: e.target.value })
                  }
                  label="nama"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="nama">Deskripsi Bab</label>
                <textarea
                  className="h-24 px-4 py-2 rounded-4xl outline outline-primary-50 border border-primary/30"
                  name="deskripsi"
                  value={chapterInput.description}
                  onChange={(e) =>
                    setChapterInput({
                      ...chapterInput,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </FormModal>
          </div>
          <h1 className="font-bold text-3xl text-primary text-start w-full">
            {data.name}
          </h1>
          <Card>
            <h2 className="text-lg font-bold pb-2 border-b border-primary">
              Info Matakuliah
            </h2>
            <p className="text-sm">{data.description}</p>
          </Card>
          {data.chapters.length > 0 && (
            <Card>
              {data.chapters.map((chapter) => (
                <div key={chapter.id} className="flex flex-col gap-3">
                  <div className="flex md:flex-row flex-col md:gap-0 gap-2 justify-between md:items-center">
                    <h3 className="text-lg font-bold pb-2 border-b border-primary">
                      {chapter.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <FormModal
                        title="Tambah materi"
                        onSubmit={() => {
                          const updatedData = createMaterial(
                            chapter.id,
                            materialInput,
                          );
                          setData(updatedData);
                          setMaterialInput({
                            id: 0,
                            name: "",
                            description: "",
                            fileUrl: "",
                            category: "MATERIAL",
                          });
                        }}
                      >
                        <div className="flex flex-col gap-2">
                          <label htmlFor="nama">Nama Materi</label>
                          <Input
                            type="text"
                            value={materialInput.name}
                            onChange={(e) =>
                              setMaterialInput({
                                ...materialInput,
                                name: e.target.value,
                              })
                            }
                            label="nama"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="deskripsi">Deskripsi Materi</label>
                          <textarea
                            className="h-24 px-4 py-2 rounded-4xl outline outline-primary-50 border border-primary/30"
                            value={materialInput.description}
                            onChange={(e) =>
                              setMaterialInput({
                                ...materialInput,
                                description: e.target.value,
                              })
                            }
                            name="deskripsiMateri"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="fileUrl">URL File</label>
                          <Input
                            type="text"
                            value={materialInput.fileUrl}
                            onChange={(e) =>
                              setMaterialInput({
                                ...materialInput,
                                fileUrl: e.target.value,
                              })
                            }
                            label="fileUrl"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="category">Kategori</label>
                          <SelectInput
                            options={categoryOptions}
                            value={materialInput.category}
                            onChange={(value) =>
                              setMaterialInput({
                                ...materialInput,
                                category: value as ChapterMaterialCategory,
                              })
                            }
                            label="category"
                          />
                        </div>
                      </FormModal>
                      <FormModal
                        title="Edit"
                        onOpen={() =>
                          setChapterInput({
                            id: chapter.id,
                            title: chapter.title,
                            description: chapter.description,
                            materials: chapter.materials,
                          })
                        }
                        onSubmit={() => {
                          const updatedData = updateChapter(
                            chapter.id,
                            chapterInput,
                          );
                          setData(updatedData);
                          setChapterInput({
                            id: 0,
                            title: "",
                            description: "",
                            materials: [],
                          });
                        }}
                      >
                        <div className="flex flex-col gap-2">
                          <label htmlFor="nama">Nama Bab</label>
                          <Input
                            type="text"
                            value={chapterInput.title}
                            onChange={(e) =>
                              setChapterInput({
                                ...chapterInput,
                                title: e.target.value,
                              })
                            }
                            label="nama"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="nama">Deskripsi Bab</label>
                          <textarea
                            className="h-24 px-4 py-2 rounded-4xl outline outline-primary-50 border border-primary/30"
                            value={chapterInput.description}
                            onChange={(e) =>
                              setChapterInput({
                                ...chapterInput,
                                description: e.target.value,
                              })
                            }
                            name="deskripsi"
                          />
                        </div>
                      </FormModal>
                      <Modal
                        title="Hapus"
                        onClick={() => {
                          const updatedData = deleteChapter(chapter.id);
                          setData(updatedData);
                        }}
                      >
                        <h2 className="text-lg font-bold mb-2">Hapus Bab</h2>

                        <p className="text-sm text-muted-foreground">
                          Pastikan bab yang dipilih sudah tepat
                        </p>
                      </Modal>
                    </div>
                  </div>
                  <p className="text-sm">{chapter.description}</p>
                  <div className="grid grid-rows-auto gap-2">
                    {chapter.materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex justify-between items-center text-sm gap-3 p-4 text-primary hover:shadow-md hover:shadow-primary/15 border border-primary/10 transition-all hover:-translate-y-0.5 rounded-2xl"
                      >
                        <a
                          href={"#"}
                          className="flex items-center gap-4 w-full"
                        >
                          <div className="flex items-center gap-4">
                            <span className="flex justify-center items-center text-sm w-10 h-10 p-2 rounded-lg bg-primary/20 text-primary">
                              {material.category === "MATERIAL" ? (
                                <FileText />
                              ) : (
                                <BookOpenCheck />
                              )}
                            </span>
                            <p className="font-bold">
                              {material.category === "MATERIAL"
                                ? "Materi"
                                : "Tugas"}
                              : {material.name}
                            </p>
                          </div>
                        </a>
                        <Modal
                          icon={<Trash2 />}
                          onClick={() => {
                            const updatedData = deleteMaterial(
                              chapter.id,
                              material.id,
                            );
                            setData(updatedData);
                          }}
                        >
                          <h2 className="text-lg font-bold mb-2">
                            Hapus Materi
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Pastikan materi yang dipilih sudah tepat
                          </p>
                        </Modal>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
