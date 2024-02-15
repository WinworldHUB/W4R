type MenuItem = {
  id: number;
  label: String;
  icon: React.ReactElement;
};

type Order = {
  id: number;
  orderValue: number;
  status: string;
  orderDate: string;
  paymentDate?: string;
};
