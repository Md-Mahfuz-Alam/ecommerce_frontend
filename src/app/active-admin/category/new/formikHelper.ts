
interface DataType {
  key: string;
  id: string;
  name: string;
  action: JSX.Element;
}
export const initialValues = (category: DataType | null) => {
    return {
      id:category?.id,
      name: category?.name
    };

};
