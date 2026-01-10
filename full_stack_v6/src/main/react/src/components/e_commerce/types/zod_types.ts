import { z } from "zod";

type Address = {
  id?: number | undefined;
  addressType?:
    | ("BILLING" | "RESIDENTIAL" | "POSTAL" | "OFFICE" | "SHIPPING")
    | undefined;
  street: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  version?: number | undefined;
  auditMetaData?: AuditMetaData | undefined;
};
type AuditMetaData = Partial<{
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}>;
type Image = Partial<{
  id: number;
  fileName: string;
  contentType: string;
  downloadUrl: string;
  version: number;
  auditMetaData: AuditMetaData;
}>;
type Product = {
  id?: number | undefined;
  name: string;
  description: string;
  price?: number | undefined;
  discountedPrice?: number | undefined;
  stock?: number | undefined;
  category: Category;
  images?: Array<Image> | undefined;
  version?: number | undefined;
  auditMetaData?: AuditMetaData | undefined;
};
type Category = {
  id?: number | undefined;
  name: string;
  version?: number | undefined;
};
type Seller = Partial<{
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  addresses: Array<Address>;
  user: User;
  version: number;
  auditMetaData: AuditMetaData;
  products: Array<Product>;
}>;
type User = {
  id?: number | undefined;
  username: string;
  password: string;
  email: string;
  enabled?: boolean | undefined;
  roles?: Array<Role> | undefined;
  credentialsNonExpired?: boolean | undefined;
  accountNonExpired?: boolean | undefined;
  accountNonLocked?: boolean | undefined;
};
type Role = Partial<{
  id: number;
  role:
    | "ROLE_CUSTOMER"
    | "ROLE_USER"
    | "ROLE_SELLER"
    | "ROLE_ADMIN"
    | "ROLE_MODERATOR";
}>;
type Cart = Partial<{
  id: number;
  cartItems: Array<CartItem>;
  totalPrice: number;
  auditMetaData: AuditMetaData;
}>;
type CartItem = Partial<{
  id: number;
  product: Product;
  quantity: number;
  price: number;
  discount: number;
  auditMetaData: AuditMetaData;
  discountedPrice: number;
}>;
type Customer = Partial<{
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  addresses: Array<Address>;
  user: User;
  version: number;
  auditMetaData: AuditMetaData;
  cart: Cart;
  orders: Array<Order>;
}>;
type Order = Partial<{
  id: number;
  orderId: string;
  orderStatus: "NEW" | "PENDING" | "SHIPPED" | "COMPLETED" | "CANCELLED";
  payment: Payment;
  orderItems: Array<OrderItem>;
  totalPrice: number;
  shippingPrice: number;
  version: number;
}>;
type Payment = Partial<{
  id: number;
  paymentIdentifier: string;
  paymentType: "CREDIT_CARD" | "CASH" | "PAYPAL" | "BANK_TRANSFER";
  paymentStatus: "PENDING" | "CREATED" | "COMPLETED" | "FAILED" | "CANCELLED";
  paymentDetails: PaymentDetails;
  amount: number;
  paymentGatewayName: string;
  paymentGatewayStatus: string;
  paymentGatewayMessage: string;
  paymentGatewayErrorDescription: string;
  version: number;
}>;
type PaymentDetails = Partial<{
  cardHolderName: string;
  cardType: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}>;
type OrderItem = Partial<{
  id: number;
  product: Product;
  quantity: number;
  orderItemTotalPrice: number;
  version: number;
  auditMetaData: AuditMetaData;
}>;
type PageProduct = Partial<{
  totalPages: number;
  totalElements: number;
  size: number;
  content: Array<Product>;
  number: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: PageableObject;
  empty: boolean;
}>;
type SortObject = Partial<{
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}>;
type PageableObject = Partial<{
  offset: number;
  sort: SortObject;
  paged: boolean;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
}>;
type PageCategory = Partial<{
  totalPages: number;
  totalElements: number;
  size: number;
  content: Array<Category>;
  number: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: PageableObject;
  empty: boolean;
}>;

const UserCreateRequest = z
  .object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string(),
    enabled: z.boolean().optional(),
    credentialsNonExpired: z.boolean().optional(),
    accountNonExpired: z.boolean().optional(),
    accountNonLocked: z.boolean().optional(),
  })
  .strict()
  .passthrough();
const AuditMetaData: z.ZodType<AuditMetaData> = z
  .object({
    createdBy: z.string(),
    createdDate: z.string().datetime({ offset: true }),
    lastModifiedBy: z.string(),
    lastModifiedDate: z.string().datetime({ offset: true }),
  })
  .strict()
  .passthrough();
const Address: z.ZodType<Address> = z
  .object({
    id: z.number().int().optional(),
    addressType: z
      .enum(["BILLING", "RESIDENTIAL", "POSTAL", "OFFICE", "SHIPPING"])
      .optional(),
    street: z.string().min(5).max(2147483647),
    city: z.string().min(2).max(2147483647),
    state: z.string().min(2).max(2147483647),
    country: z.string().min(2).max(2147483647),
    pinCode: z.string().min(4).max(2147483647),
    version: z.number().int().optional(),
    auditMetaData: AuditMetaData.optional(),
  })
  .strict()
  .passthrough();
const Role: z.ZodType<Role> = z
  .object({
    id: z.number().int(),
    role: z.enum([
      "ROLE_CUSTOMER",
      "ROLE_USER",
      "ROLE_SELLER",
      "ROLE_ADMIN",
      "ROLE_MODERATOR",
    ]),
  })
  .strict()
  .passthrough();
const User: z.ZodType<User> = z
  .object({
    id: z.number().int().optional(),
    username: z.string().min(1).max(100),
    password: z.string().min(2).max(100),
    email: z.string().min(0).max(100).email(),
    enabled: z.boolean().optional(),
    roles: z.array(Role).optional(),
    credentialsNonExpired: z.boolean().optional(),
    accountNonExpired: z.boolean().optional(),
    accountNonLocked: z.boolean().optional(),
  })
  .strict()
  .passthrough();
const Category: z.ZodType<Category> = z
  .object({
    id: z.number().int().optional(),
    name: z.string().min(2).max(100),
    version: z.number().int().optional(),
  })
  .strict()
  .passthrough();
const Image: z.ZodType<Image> = z
  .object({
    id: z.number().int(),
    fileName: z.string(),
    contentType: z.string(),
    downloadUrl: z.string(),
    version: z.number().int(),
    auditMetaData: AuditMetaData,
  })
  .strict()
  .passthrough();
const Product: z.ZodType<Product> = z
  .object({
    id: z.number().int().optional(),
    name: z.string().min(3).max(255),
    description: z.string().min(10).max(600),
    price: z.number().optional(),
    discountedPrice: z.number().optional(),
    stock: z.number().int().optional(),
    category: Category,
    images: z.array(Image).optional(),
    version: z.number().int().optional(),
    auditMetaData: AuditMetaData.optional(),
  })
  .strict()
  .passthrough();
const Seller: z.ZodType<Seller> = z
  .object({
    id: z.number().int(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    addresses: z.array(Address),
    user: User,
    version: z.number().int(),
    auditMetaData: AuditMetaData,
    products: z.array(Product),
  })
  .strict()
  .passthrough();
const CartItem: z.ZodType<CartItem> = z
  .object({
    id: z.number().int(),
    product: Product,
    quantity: z.number().int(),
    price: z.number(),
    discount: z.number(),
    auditMetaData: AuditMetaData,
    discountedPrice: z.number(),
  })
  .strict()
  .passthrough();
const Cart: z.ZodType<Cart> = z
  .object({
    id: z.number().int(),
    cartItems: z.array(CartItem),
    totalPrice: z.number(),
    auditMetaData: AuditMetaData,
  })
  .strict()
  .passthrough();
const PaymentDetails: z.ZodType<PaymentDetails> = z
  .object({
    cardHolderName: z.string(),
    cardType: z.string(),
    cardNumber: z.string(),
    expiryDate: z.string(),
    cvv: z.string(),
  })
  .strict()
  .passthrough();
const Payment: z.ZodType<Payment> = z
  .object({
    id: z.number().int(),
    paymentIdentifier: z.string().uuid(),
    paymentType: z.enum(["CREDIT_CARD", "CASH", "PAYPAL", "BANK_TRANSFER"]),
    paymentStatus: z.enum([
      "PENDING",
      "CREATED",
      "COMPLETED",
      "FAILED",
      "CANCELLED",
    ]),
    paymentDetails: PaymentDetails,
    amount: z.number(),
    paymentGatewayName: z.string(),
    paymentGatewayStatus: z.string(),
    paymentGatewayMessage: z.string(),
    paymentGatewayErrorDescription: z.string(),
    version: z.number().int(),
  })
  .strict()
  .passthrough();
const OrderItem: z.ZodType<OrderItem> = z
  .object({
    id: z.number().int(),
    product: Product,
    quantity: z.number().int(),
    orderItemTotalPrice: z.number(),
    version: z.number().int(),
    auditMetaData: AuditMetaData,
  })
  .strict()
  .passthrough();
const Order: z.ZodType<Order> = z
  .object({
    id: z.number().int(),
    orderId: z.string().uuid(),
    orderStatus: z.enum([
      "NEW",
      "PENDING",
      "SHIPPED",
      "COMPLETED",
      "CANCELLED",
    ]),
    payment: Payment,
    orderItems: z.array(OrderItem),
    totalPrice: z.number(),
    shippingPrice: z.number(),
    version: z.number().int(),
  })
  .strict()
  .passthrough();
const Customer: z.ZodType<Customer> = z
  .object({
    id: z.number().int(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    addresses: z.array(Address),
    user: User,
    version: z.number().int(),
    auditMetaData: AuditMetaData,
    cart: Cart,
    orders: z.array(Order),
  })
  .strict()
  .passthrough();
const saveProduct_Body = z
  .object({ product: Product, images: z.array(z.instanceof(File)).optional() })
  .strict()
  .passthrough();
const addImagesToAProduct_Body = z
  .object({ files: z.array(z.instanceof(File)) })
  .strict()
  .passthrough();
const LoginRequest = z
  .object({ username: z.string(), password: z.string() })
  .strict()
  .passthrough();
const LoginResponse = z
  .object({ jwt: z.string(), username: z.string(), roles: z.array(z.string()) })
  .strict()
  .passthrough();
const SortObject: z.ZodType<SortObject> = z
  .object({ empty: z.boolean(), sorted: z.boolean(), unsorted: z.boolean() })
  .strict()
  .passthrough();
const PageableObject: z.ZodType<PageableObject> = z
  .object({
    offset: z.number().int(),
    sort: SortObject,
    paged: z.boolean(),
    pageSize: z.number().int(),
    pageNumber: z.number().int(),
    unpaged: z.boolean(),
  })
  .strict()
  .passthrough();
const PageProduct: z.ZodType<PageProduct> = z
  .object({
    totalPages: z.number().int(),
    totalElements: z.number().int(),
    size: z.number().int(),
    content: z.array(Product),
    number: z.number().int(),
    sort: SortObject,
    first: z.boolean(),
    last: z.boolean(),
    numberOfElements: z.number().int(),
    pageable: PageableObject,
    empty: z.boolean(),
  })
  .strict()
  .passthrough();
const OrderHistory = z
  .object({
    id: z.number().int(),
    orderId: z.string().uuid(),
    orderStatus: z.enum([
      "NEW",
      "PENDING",
      "SHIPPED",
      "COMPLETED",
      "CANCELLED",
    ]),
    customerId: z.number().int(),
    paymentId: z.number().int(),
    totalPrice: z.number(),
    shippingPrice: z.number(),
  })
  .strict()
  .passthrough();
const PageCategory: z.ZodType<PageCategory> = z
  .object({
    totalPages: z.number().int(),
    totalElements: z.number().int(),
    size: z.number().int(),
    content: z.array(Category),
    number: z.number().int(),
    sort: SortObject,
    first: z.boolean(),
    last: z.boolean(),
    numberOfElements: z.number().int(),
    pageable: PageableObject,
    empty: z.boolean(),
  })
  .strict()
  .passthrough();

export const schemas = {
  UserCreateRequest,
  AuditMetaData,
  Address,
  Role,
  User,
  Category,
  Image,
  Product,
  Seller,
  CartItem,
  Cart,
  PaymentDetails,
  Payment,
  OrderItem,
  Order,
  Customer,
  saveProduct_Body,
  addImagesToAProduct_Body,
  LoginRequest,
  LoginResponse,
  SortObject,
  PageableObject,
  PageProduct,
  OrderHistory,
  PageCategory,
};
