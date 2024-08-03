import { useEffect, useState } from "react";
import { link } from "./Link";

function YourOrder() {
  const [loading, setloading] = useState();
  const [orders, setOrders] = useState();
  useEffect(() => {
    async function getOrders() {
      setloading(true);
      const orders = await fetch(`${link}/api/get/orders`, {
        method: "GET",
      });
      const res = await orders.json();
      setOrders(res);
      setloading(false);
    }
    getOrders();
  }, [loading]);
  return (
    <>
      <table className="text-base w-full">
        <thead className="bg-slate-50 p-2 ">
          <tr>
            <th>product</th>
            <th>price</th>
            <th>color</th>
            <th>quantity</th>
            <th>status</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders &&
            orders.length > 0 &&
            orders.map((order, i) => (
              <tr className="p-2 my-3">
                <td>{order.product[0].title}</td>
                <td>{order.product[0].price}</td>
                <td>
                  <div
                    className="h-5 w-5 rounded-full "
                    style={{ backgroundColor: order.product[0].color }}
                  ></div>
                </td>
                <td>{order.product[0].quantity}</td>

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

export default YourOrder;
