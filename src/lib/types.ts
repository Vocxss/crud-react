export interface IClass {
    id: number;
    name: string;
    description: string;
    sks: number;
    chapters: IChapter[];
}

export interface IChapter {
    id: number;
    title: string;
    description: string;
    materials: IMaterial[];
}

export interface IMaterial {
    id: number;
    name: string;
    description: string;
    fileUrl: string;
    category: ChapterMaterialCategory;
}

export type ChapterMaterialCategory = "MATERIAL" | "ASSIGNMENT";