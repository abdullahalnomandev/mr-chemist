import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IProduct } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';

type TFile = { path: string } | undefined;

const createProductIntoDB = async (file: TFile, payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find().populate('treatment'), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate('treatment');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};

const getProductBySlug = async (slug: string) => {
  const result = await Product.findOne({ slug }).populate('treatment');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
  const isExist = await Product.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Product not found');

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  return result;
};

const deleteMultipleProductsFromDB = async (ids: string[]) => {
  const result = await Product.deleteMany({ _id: { $in: ids } });
  if (result.deletedCount === 0) throw new AppError(httpStatus.NOT_FOUND, 'Products not found');

  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  getProductBySlug,
  updateProductIntoDB,
  deleteProductFromDB,
  deleteMultipleProductsFromDB,
};
