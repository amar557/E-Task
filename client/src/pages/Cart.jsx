import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Decrement, Increment } from "../Redux/cart.slice";
import { useNavigate } from "react-router";
import { link } from "./Link";
function Cart() {
  const select = useSelector((item) => item.cartSlice.items);
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
    product: [],
  });
  const navigate = useNavigate();
  const handleChanges = function (e) {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
      product: select,
    });
  };
  const handleSubmitOrder = async function (e) {
    e.preventDefault();
    const order = await fetch(`${link}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const res = await order.json();
    if (order.ok) {
      setOrderData({
        name: "",
        phone: "",
        address: "",
        product: [],
      });
    }
    console.log(res);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(select[0].id);
  }, []);
  return (
    <div>
      <Navbar />
      <button
        className="text-base font-medium  bg-black text-white px-4 py-2 rounded-md"
        onClick={() => navigate("/your-orders")}
      >
        your orders
      </button>
      <div className="flex items-center justify-between w-11/12 mx-auto">
        {select &&
          select.length > 0 &&
          select.map((product) => (
            <div className="flex  items-start justify-start md:justify-between my-5 lg:flex-row flex-row md:flex-col lg:items-center lg:border-0 md:border text-base grow">
              <div className="md:basis-5/12  flex items-center gap-5 lg:border-b-0 border-b-0 md:border-b ">
                <img src={product.image} alt="" className="w-32 h-full" />

                <span className="md:block hidden">
                  <p className="font-bold  text-sm">{product.title}</p>
                  <p className="space-x-2 text-sm font-bold text-[#0f172a6b] my-1">
                    <span>color:</span>
                    <button
                      className="text-sm h-5 w-5 rounded-full "
                      style={{ backgroundColor: product.color }}
                    >
                      j
                    </button>
                  </p>
                </span>
              </div>
              <div className="flex md:flex-row  flex-col md:ps-0 ps-4  justify-between  lg:w-3/5 md:w-full md:pe-5 lg:border-0 lg:py-0  py-4">
                <span className="md:hidden block">
                  <p className="font-bold  text-sm">{product.title}</p>
                  <p className="space-x-2 text-sm font-bold text-[#0f172a6b] my-1">
                    <span>size:</span>
                    <span className="text-sm">{0}</span>
                  </p>
                  <div className="space-x-2 my-2 text-[#00000080]">
                    <button className="text-lg ">
                      <FiEdit />
                    </button>
                    <button
                      className="text-lg "
                      // onClick={() => dispatch(DeleteItem(id))}
                    >
                      {/* <RiDeleteBin6Line /> */}
                    </button>
                  </div>
                </span>
                <div className="space-x-3 text-start basis-1/6 md:border-y-0  border-y border-dashed md:mb-0 mb-2 py-1 md:py-0">
                  {/* <span className={`${isDiscount ? "line-through" : ""}`}>
                  Rs.{product.price}
                </span> */}
                </div>
                <div className="border px-3 py-1 flex items-center justify-between gap-3 rounded-3xl border-black mb-1 md:mb-0  basis-[10%]">
                  <button onClick={() => dispatch(Decrement(product.id))}>
                    <FaMinus />
                  </button>
                  <span className="font-medium">{product.quantity}</span>

                  <button onClick={() => dispatch(Increment(product.id))}>
                    <FaPlus />
                  </button>
                </div>
                <div className="basis-1/6 text-start md:text-center md:border-t-0 border-t border-dashed">
                  Rs.{product.price}
                </div>
              </div>
            </div>
          ))}

        <form action="" className="text-base w-1/3">
          <label
            htmlFor=""
            className="block text-sm capitalize font-semibold my-2"
          >
            Name*
          </label>
          <input
            type="text"
            name="name"
            value={orderData.name}
            onChange={handleChanges}
            className="block p-2 placeholder:capitalize border rounded-md focus:border-blue-200 focus:border outline-none bg-slate-50 w-full"
            placeholder="name"
            id=""
          />
          <label
            htmlFor=""
            className="block text-sm capitalize font-semibold my-2"
          >
            address*
          </label>
          <input
            type="text"
            name="address"
            value={orderData.address}
            onChange={handleChanges}
            className="block p-2 placeholder:capitalize border rounded-md focus:border-blue-200 focus:border outline-none bg-slate-50 w-full"
            placeholder="name"
            id=""
          />
          <label
            htmlFor=""
            className="block text-sm capitalize font-semibold my-2"
          >
            phone number*
          </label>
          <input
            type="number"
            name="phone"
            value={orderData.phone}
            onChange={handleChanges}
            className="block p-2 placeholder:capitalize border rounded-md focus:border-blue-200 focus:border outline-none bg-slate-50 w-full"
            placeholder="phone"
            id=""
          />
          <button
            onClick={handleSubmitOrder}
            className="bg-black text-white uppercase text-sm font-medium w-full  py-2 rounded-md my-2"
          >
            confirm order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
