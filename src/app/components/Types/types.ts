interface CreateCategoriesModalProps {
  isOpen: boolean;
  onCancel: () => void;
  initialValues: { id: string | undefined; name: string | undefined } | null;
  handleSubmit: (formData: any, formikBag: any) => void;
  title: string;
}

interface Image {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity_available: number;
  seller: {
    id: string;
    username: string;
  };
  seller_id: number;
  category: {
    id: string;
    name: string;
  };
  images: [];
}

interface ModalType {
  isOpen: boolean;
  title?: string;
  onCancel: () => void;
  handleSubmit: (formData: any) => void;
  initialValues: Record<string, any>;
}

interface CategoryType {
  id: string;
  name: string;
}
