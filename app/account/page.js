 "use client";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function Account(){
 const [orders,setOrders]=useState([]);
 useEffect(()=>{
   setOrders(JSON.parse(localStorage.getItem("vyro-orders")||"[]"));
 },[]);
 return <><Nav/><main className="section"><div className="container">
   <p className="muted">Customer area</p><h1 className="h2">My Orders</h1>
   {!orders.length?<div className="empty"><p className="muted">No orders found on this device.</p><Link className="primary" href="/shop">Shop Products</Link></div>:
   <div style={{display:"grid",gap:14,marginTop:28}}>{orders.map(o=><div className="panel" key={o.id}>
     <div className="card-row"><div><strong>#{o.id}</strong><div className="muted">{new Date(o.createdAt).toLocaleString()}</div></div><span className="status">{o.status}</span></div>
     <div style={{marginTop:14}}>{o.items.map(i=><div className="summary-row" key={i.key}><span>{i.product.name} × {i.quantity}</span><strong>€{(i.product.price*i.quantity).toFixed(2)}</strong></div>)}</div>
     <div className="summary-total"><span>Total</span><span>€{o.total.toFixed(2)}</span></div>
     <p className="muted">Payment: {o.paymentMethod==="bank"?"Bank Transfer":"Pay on Delivery"} · {o.paymentStatus}</p>
   </div>)}</div>}
 </div></main><Footer/></>
}