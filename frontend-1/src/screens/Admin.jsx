import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminScreen() {
  const currentUser = useSelector((state) => state.loginReducer.currentUser);

  // const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    console.log('currentUser:', currentUser);
    if (currentUser) {
      console.log('is_staff:', currentUser.is_staff);
      if (!currentUser.is_staff) {
        console.log('Redirecting to home screen');
        window.location.href = '/';
      }
    } else {
      console.log('Redirecting to home screen');
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="mt-3">
      <div className="flex justify-center">
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Админ панель
          </h2>
          <ul className="admin p-2 bg-gray-100 rounded flex space-x-2">
            <li>
              <Link
                to="/admin/userslist"
                className="text-black block py-2 px-4 hover:bg-gray-200 rounded"
              >
                Список пользователей
              </Link>
            </li>
            <li>
              <Link
                to="/admin/productslist"
                className="text-black block py-2 px-4 hover:bg-gray-200 rounded"
              >
                Сприсок товаров
              </Link>
            </li>
            <li>
              <Link
                to="/admin/addnewproduct"
                className="text-black block py-2 px-4 hover:bg-gray-200 rounded"
              >
                Добавить новый товар
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orderslist"
                className="text-black block py-2 px-4 hover:bg-gray-200 rounded"
              >
                Список заказов
              </Link>
            </li>
          </ul>

          {/* Switch */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
