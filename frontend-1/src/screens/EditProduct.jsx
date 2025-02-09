import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Error from '../components/Error';
import Loader from '../components/Loader';
import Success from '../components/Success';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../redux/product.slice';

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productReducer);

  const { product, error, loading } = productState;

  const updateProductState = useSelector((state) => state.productReducer);

  const {
    success,
    error: updateError,
    loading: updateLoading,
  } = updateProductState;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [type, settype] = useState(''); 
  const [season, setseason] = useState(''); 
  const [sort, setsort] = useState(''); 
  const [rating, setrating] = useState(); 

  useEffect(() => {
    if (product) {
      if (product.id == id) {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImageUrl(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        settype(product.type);
        setseason(product.season);
        setsort(product.sort);
        setrating(product.rating);
      } else {
        dispatch(getProductById(id));
      }
    } else {
      dispatch(getProductById(id));
    }
    console.log(product);
  }, [dispatch, product]);

  function editProduct(e) {
    e.preventDefault();
    const updatedProduct = {
      name,
      price,
      description,
      countInStock,
      category,
      image: imageUrl,
    };

    dispatch(updateProduct(id, updatedProduct));
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        {loading && <Loader />}
        {updateLoading && <Loader />}
        {updateError && <Error error="Something went wrong" />}
        {success && <Success success="Product Updated Successfully" />}
        {error && <Error error="Something went wrong" />}
        {product && (
          <div>
            <form onSubmit={editProduct}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Название</label>
                <input
                  type="text"
                  className="form-input w-full"
                  placeholder="Название"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Цена</label>
                <input
                  type="number"
                  className="form-input w-full"
                  placeholder="Цена"
                  value={price}
                  required
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Описание
                </label>
                <input
                  type="text"
                  required
                  className="form-input w-full"
                  placeholder="Описание"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Ссылка на изображение
                </label>
                <input
                  type="text"
                  required
                  className="form-input w-full"
                  placeholder="Ссылка на изображение"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Категория
                </label>
                <input
                  type="text"
                  required
                  className="form-input w-full"
                  placeholder="Категория"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Колличество
                </label>
                <input
                  type="number"
                  required
                  className="form-input w-full"
                  placeholder="Колличество"
                  value={countInStock}
                  onChange={(e) => {
                    setCountInStock(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Тип
                </label>
                <input
                  type="text"
                  required
                  className="form-input w-full"
                  placeholder="Тип"
                  value={type}
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Сезон
                </label>
                <input
                  type="text"
                  required
                  className="form-input w-full"
                  placeholder="Сезон"
                  value={season}
                  onChange={(e) => {
                    setseason(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Сорт
                </label>
                <input
                  type="text"
                  required
                  className="form-input w-full"
                  placeholder="Сорт"
                  value={sort}
                  onChange={(e) => {
                    setsort(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Рэйтинг
                </label>
                <input
                  type="text"
                  required
                  className="form-input w-full"
                  placeholder="Рэйтинг"
                  value={rating}
                  onChange={(e) => {
                    setrating(e.target.value);
                  }}
                />
              </div>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="submit"
              >
                Редактировать
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
