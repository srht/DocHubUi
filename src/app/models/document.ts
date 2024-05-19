
import { Category } from "./category";
import { Tag } from "./tag";


export class Document {
    id!: string;
    title!: string;
    description!: string;
    filePath!: string;
    documentType!: string;
    createdAt!: string;
    updatedAt!: string;
    tags!: Tag[];
    categories!:Category[];
}

