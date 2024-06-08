import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../redux/product.slice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import background_1 from '../assets/Blackgroud img 1.svg';
import background_2 from '../assets/Blackgroud img 2.svg';
import '../css/fonts.css'

const categories = [
  { id: 0, name: 'Тюльпаны' },
  { id: 1, name: 'Розы' },
  { id: 2, name: 'ЛОТОС' },
  { id: 2, name: 'РОМАШКИ' },
  { id: 2, name: 'ГОРШКИ' },
];
export default function HomeScreen() {
  const [prod, setProducts] = useState([]);
  const loginReducer = useSelector((state) => state.loginReducer);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {  currentUser } = loginReducer;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    dispatch(getAllProducts());
    axios.get('http://127.0.0.1:8000/api/product').then((e) => {
        setProducts(e.data)
    })
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.jwtToken) {
      navigate("/")
      
    }
  }, [navigate]);

  const filteredProducts = prod.filter((product) => {
    if (selectedCategory) {
      return product.category === (selectedCategory.name).toString();
    }
    return true;
  });

  return (
    <div className='mt-10'>
      <img className='absolute bottom-0 left-0' src={background_1} alt='' />
      <img className='absolute top-[30vh] right-0' src={background_2} alt='' />
      <ul className='flex justify-center gap-8 top-[-8vh] relative'>
        {categories.map((category) => (
          <li key={category.id} className='cursor-pointer text-stone-500 hover:text-black transition-all duration-300 ease-in-out font-next'>
            <a href="#" onClick={() => handleCategoryClick(category)}>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-3 gap-4 w-full mt-4 px-[20vw]">
        {
          filteredProducts.map((product) => {
            console.log(product.price)
            return(
            <div key={product.id} className={"w-[20vw] m-2" + product.id}>
              <div className="shadow p-3 bg-white rounded">
              <div className="text-left">
                    <div>
                      <Link to={`product/${product.id}`}>
                        <div className="text-center">
                          <img
                            src={product.image}
                            className="img-fluid w-60 h-60 mx-auto"
                            alt={product.name}
                          />
                        </div>
                        <h1 className="text-xl font-semibold font-next">{product.name}</h1>
                        <h1 className="text-lg font-semibold">{product.price} P</h1>
                        <h1 className='font-next'>ID: {product.id}</h1>
                        <h1 className='font-next'>ВИД: {product.type}</h1>
                        <h1 className='font-next'>Категория: {product.category}</h1>
                        <h1 className='font-next'>СОРТ: {product.sort}</h1>
                        <h1 className='font-next'>СЕЗОН ЦВЕТЕНИЯ: {product.season}</h1>
                        <button className='bg-[#9E1B3B] px-7 py-2 rounded-3xl text-white mt-5 font-next'>Купить</button>
                      </Link>
                    </div>
                  </div>
              </div>
            </div>
          )})
        }
      </div>
    </div>
  );
}
