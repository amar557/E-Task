import { useEffect, useState } from "react";
import { link } from "../../pages/Link";
function DispatchedOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    async function fetchOrders(status) {
      try {
        const response = await fetch(`${link}/api/status?status=${status}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const orders = await response.json();
        setOrders(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }
    fetchOrders("dispatch");
  }, []);
  return (
    <>
      <table className="text-base w-full">
        <thead className="bg-slate-50 p-2 ">
          <tr>
            <th>#</th>
            <th>customer name</th>
            <th>product</th>
            <th>price</th>
            <th>color</th>
            <th>quantity</th>

            <th>customer address</th>
            <th>customer phone</th>
            <th>status</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders &&
            orders.length > 0 &&
            orders.map((order, i) => (
              <tr className="p-2 my-3">
                <td>{i + 1}</td>
                <td>{order.name}</td>

                <td>{order.product[0].title}</td>
                <td>{order.product[0].price}</td>
                <td>
                  <div
                    className="h-5 w-5 rounded-full "
                    style={{ backgroundColor: order.product[0].color }}
                  ></div>
                </td>
                <td>{order.product[0].quantity}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{order.status}</td>
                <td>
                  <img
                    src={order.product[0].image}
                    className="h-10 w-8"
                    alt="Example "
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default DispatchedOrders;
