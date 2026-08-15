 "use client";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function Checkout(){
 const [cart,setCart]=useState([]);
 const [loading,setLoading]=useState(false);
 const [method,setMethod]=useState("bank");
 const [form,setForm]=useState({name:"",email:"",phone:"",address:"",city:"",postal:"",country:"Germany"});
 useEffect(()=>setCart(JSON.parse(localStorage.getItem("vyro-cart")||"[]")),[]);
 const subtotal=cart.reduce((s,i)=>s+i.product.price*i.quantity,0);
 const shipping=subtotal>=50?0:4.99;
 const total=subtotal+shipping;

 function update(k,v){setForm({...form,[k]:v})}

 function placeOrder(){
   if(!cart.length) return alert("Your cart is empty.");
   if(!form.name||!form.email||!form.address||!form.city||!form.postal) return alert("Please complete all required fields.");
   setLoading(true);

   const orders=JSON.parse(localStorage.getItem("vyro-orders")||"[]");
   const id=`VYRO-${Date.now().toString().slice(-6)}`;
   const order={
     id,
     createdAt:new Date().toISOString(),
     customer:form,
     items:cart,
     subtotal,
     shipping,
     total,
     paymentMethod:method,
     paymentStatus:"Pending",
     status:"Order Received",
     trackingNumber:"",
     shippingProvider:"",
     notes:[]
   };

   orders.unshift(order);
   localStorage.setItem("vyro-orders",JSON.stringify(orders));
   localStorage.removeItem("vyro-cart");
   window.dispatchEvent(new Event("vyro-cart"));
   window.location.href=`/success?order=${encodeURIComponent(id)}`;
 }

 return <><Nav/><main className="checkout-page"><div className="container">
   <h1 className="h2">Checkout</h1>
   <div className="checkout-layout">
     <div className="panel">
       <h3>Delivery Information</h3>
       <div className="form-grid">
         <div className="field"><label>Full name *</label><input value={form.name} onChange={e=>update("name",e.target.value)} /></div>
         <div className="field"><label>Email *</label><input type="email" value={form.email} onChange={e=>update("email",e.target.value)} /></div>
         <div className="field"><label>Phone</label><input value={form.phone} onChange={e=>update("phone",e.target.value)} /></div>
         <div className="field"><label>Country</label><input value={form.country} onChange={e=>update("country",e.target.value)} /></div>
         <div className="field full"><label>Street + house number *</label><input value={form.address} onChange={e=>update("address",e.target.value)} /></div>
         <div className="field"><label>City *</label><input value={form.city} onChange={e=>update("city",e.target.value)} /></div>
         <div className="field"><label>Postal code *</label><input value={form.postal} onChange={e=>update("postal",e.target.value)} /></div>
       </div>

       <h3 style={{marginTop:28}}>Payment Method</h3>
       <div className="option-grid">
         <button className={"option "+(method==="bank"?"active":"")} onClick={()=>setMethod("bank")}>Bank Transfer</button>
         <button className={"option "+(method==="cod"?"active":"")} onClick={()=>setMethod("cod")}>Cash / Pay on Delivery</button>
       </div>

       {method==="bank" && <div className="notice">
         <strong>Bank transfer</strong><br/>
         After placing the order, we will show the order number and payment instructions. Your order stays <b>Payment Pending</b> until the payment is confirmed by the store admin.
       </div>}
       {method==="cod" && <div className="notice">
         <strong>Pay on delivery</strong><br/>
         Payment is collected when the order is delivered. This option can be disabled by the store owner if needed.
       </div>}
     </div>

     <div className="panel">
       <h3>Order Summary</h3>
       {cart.map(i=><div className="summary-row" key={i.key}><span>{i.product.name} × {i.quantity}</span><strong>€{(i.product.price*i.quantity).toFixed(2)}</strong></div>)}
       <div className="summary-row"><span>Shipping</span><strong>€{shipping.toFixed(2)}</strong></div>
       <div className="summary-total"><span>Total</span><span>€{total.toFixed(2)}</span></div>
       <button className="primary" style={{width:"100%",marginTop:18}} onClick={placeOrder} disabled={loading}>
         {loading?"Creating Order…":"Place Order"}
       </button>
       <p className="muted" style={{fontSize:12,marginTop:12}}>No Stripe or card processor is used in this version.</p>
     </div>
   </div>
 </div></main><Footer/></>
}