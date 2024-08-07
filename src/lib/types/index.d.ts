interface AppState {
  isUserLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
  username?: string;

  setAppState: ({
    isUserLoggedIn,
    accessToken,
    refreshToken,
    username,
  }: AppState) => void;
}

interface PageProps {
  selectedMenuId: number;
  menuItems: MenuItem[];
  username: string;
}

interface DataTableProps<T> {
  title?: string;
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
  memberName: string;
  memberPhone: string;
  memberEmail: string;
  deliverTo: string;
  deliverAt: string;
};

type Invoice = {
  id: number;
  orderId: number;
  paymentDate: string;
  invoiceDate: string;
  orderDate: string;
  orderValue: number;
  status: string;
};

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
  cost: number;
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

type TimelineItem = {
  status: string;
  title: string;
};

type ProductFilter = {
  filter: string;
  count: number;
  productIds: string[];
};
