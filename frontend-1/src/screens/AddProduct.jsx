import { useState } from 'react';
import Success from '../components/Success';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/product.slice';

export default function AddProduct() {
  const [name, setname] = useState('');
  const [price, setprice] = useState();
  const [countinstock, setcountinstock] = useState();
  const [imageurl, setimageurl] = useState('');
  const [category, setcategory] = useState('');
  const [description, setdescription] = useState('');
  const [type, settype] = useState(''); 
  const [season, setseason] = useState(''); 
  const [sort, setsort] = useState(''); 
  const [rating, setrating] = useState(); 


  const dispatch = useDispatch();

  const addproductstate = useSelector((state) => state.productReducer);
  const { success, error, loading } = addproductstate;

  const addproduct = (e) => {
    e.preventDefault();
    const product = {
      name: name,
      image: imageurl,
      category: category,
      description: description,
      price: price,
      countInStock: countinstock,
      type: type,
      season: season,
      sort: sort,
      rating: rating
    };

    dispatch(addProduct(product));
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        {success && <Success success="Product Added Successfully" />}
        {loading && <Loader />}
        {error && <Error error="Something went wrong" />}

        <h2 className="text-2xl font-semibold mb-4">Добавить продукт</h2>
        <form onSubmit={addproduct}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Название</label>
            <input
              type="text"
              className="form-input w-full"
              placeholder="Название"
              required
              value={name}
              onChange={(e) => {
                setname(e.target.value);
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
                setprice(e.target.value);
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
                setdescription(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Ссылка на изображение</label>
            <input
              type="text"
              required
              className="form-input w-full"
              placeholder="Ссылка на изображение"
              value={imageurl}
              onChange={(e) => {
                setimageurl(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Категория</label>
            <input
              type="text"
              required
              className="form-input w-full"
              placeholder="Категория"
              value={category}
              onChange={(e) => {
                setcategory(e.target.value);
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
              value={countinstock}
              onChange={(e) => {
                setcountinstock(e.target.value);
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
            Добавить продукт
          </button>
        </form>
      </div>
    </div>
  );
}
