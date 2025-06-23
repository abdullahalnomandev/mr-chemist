import { Product } from "../Product/product.model";
import { CreateOrderPayload, RoyalMailEntry } from "./order.interface";
import { Order } from "./order.model";

// Generate Order ID
const findLastOrderId = async (): Promise<string | undefined> => {
  const lastOrder = await Order.findOne({}, { orderId: 1, _id: 0 })
    .sort({ createdAt: -1 }) 
    .lean();

  return lastOrder?.orderId;
};

export const generateOrderId = async (): Promise<string> => {
  const lastId = await findLastOrderId(); 

  let numericPart = 0;

  if (lastId) {
    numericPart = parseInt(lastId) || 0;
  }

  const newIdNumber = numericPart + 1;
  const newId = newIdNumber.toString().padStart(3, '0'); 

  return newId;
};


// Build Order Items
export const buildOrderItems = async (items: CreateOrderPayload['items']) => {
  const productIds = items.map((item) => item.id);
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== items.length) {
    throw new Error('Some products not found');
  }

  return items.map((item) => {
    const product = products.find((p) => p._id.toString() === item.id);
    if (!product) throw new Error(`Product ${item.id} not found`);

    let price = product.basePrice;
    let variant = null;

    if (item.variant_id) {
      variant = product.variants?.find((v) => v?._id?.toString() === item.variant_id);
      if (!variant) throw new Error(`Variant ${item.variant_id} not found in product ${item.id}`);
      price = variant.price;
    }

    const quantity = item.quantity;
    const taxRate = 0.01;
    const taxAmount = price * quantity * taxRate;

    return {
      product: product._id,
      variant,
      productBasePrice: product.basePrice,
      name: product.name,
      quantity,
      taxRate,
      taxAmount,
      type: variant?.type,
      unit: variant?.unit,
      price,
      value: variant?.value,
    };
  });
};

export const getRoyalMailStatusByDates = (data: RoyalMailEntry): string => {
  if (data.shippedOn) return "shipped";
  if (data.manifestedOn) return "manifested";
  if (data.printedOn) return "printed";
  if (data.createdOn) return "new";
  return "new"; // fallback if nothing found
};
