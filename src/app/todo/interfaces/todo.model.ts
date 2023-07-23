export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  categoryId: number;
  categoryName: string | undefined;
}