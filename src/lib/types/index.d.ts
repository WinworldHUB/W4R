interface AppState {
  isUserLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;

  setAppState: ({
    isUserLoggedIn,
    accessToken,
    refreshToken,
  }: AppState) => void;
}

interface PageProps {
  selectedMenuId: number;
  menuItems: MenuItem[];
}

interface DataTableProps<T> {
  isEditable?: boolean;
  data: T[];
  onCreateClick?: VoidFunction;
  onRowClicked?: Dispatch<SetStateAction<Order>>;
  onDataImport?: (data: T[]) => void;
}

type MenuItem = {
  id: number;
  label: string;
  icon: React.ReactElement;
  route: string;
};

type OrderDeliveryDetails = {
  memberPhone: string;
  memberEmail: string;
  deliverTo: string;
  deliverAt: string;
};

// type Order = {
//   id: string;
//   orderValue: number;
//   status: string;
//   orderDate: string;
//   paymentDate?: string;
//   products?: Product[];
//   member?: Member;
//   packaging?: Packaging;
// };

type Invoice = {
  id: number;
  orderId: number;
  paymentDate: string;
  invoiceDate: string;
  orderDate: string;
  orderValue: number;
  status: string;
};

// type ProductVM = {
//   id: string;
//   internalId?: string;
//   title: string;
//   body: string;
//   category: string;
//   published: boolean;
//   size: string;
//   variants: ProductVariant[];
//   quantity: number;
//   price: number;
//   taxable: boolean;
//   featuredImage: string;
//   otherImages: string;
// };

type ProductVariant = {
  size: string;
  available: boolean;
  price: number;
  quantity: number;
};

type Packaging = {
  id: string;
  title: string;
  description: string;
  minQuantity: number;
  maxQuantity: number;
  available: boolean;
};

/** To be Removed */
interface TestUserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: TestUser[];
  support: Support;
}

interface TestUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Support {
  url: string;
  text: string;
}

interface CreatedTestUser {
  name: string;
  job: string;
  id: string;
  createdAt: Date;
}

/** To be Removed */

interface Credentials {
  email: string;
  password: string;
}
