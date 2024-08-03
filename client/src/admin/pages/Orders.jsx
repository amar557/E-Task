import { useEffect, useState } from "react";
import { link } from "../../pages/Link";

function Products() {
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(false);
  const [status, setStatus] = useState({ id: "", status: "" });

  useEffect(() => {
    async function getOrders() {
      const orders = await fetch(`${link}/api/status/${status.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
      const res = await orders.json();
      console.log(res);
      setOrders(res);
    }
    getOrders();
  }, [status]);
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
  }, [status, loading]);
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
            <th>update status</th>
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
                <td>
                  <select
                    name=""
                    id=""
                    onChange={(e) =>
                      setStatus({ status: e.target.value, id: order._id })
                    }
                  >
                    <option value="in-progress">in progress</option>
                    <option value="pending">pending</option>
                    <option value="dispatch">dispatch</option>
                    <option value="delivered">delivered</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;
