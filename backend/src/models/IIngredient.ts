export interface IIngredient {
    uuid: string,
    description: string,
    unit: string,
    valuePerUnit: number
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}