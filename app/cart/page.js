 "use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function Cart(){
 const [cart,setCart]=useState([]);
 useEffect(()=>{setCart(JSON.parse(localStorage.getItem("vyro-cart")||"[]"));},[]);
 const refresh=()=>{const c=JSON.parse(localStorage.getItem("vyro-cart")||"[]");setCart(c);window.dispatchEvent(new Event("vyro-cart"));};
 const subtotal=cart.reduce((s,i)=>s+i.product.price*i.quantity,0);
 function change(key,delta){const c=[...cart];const i=c.find(x=>x.key===key);i.quantity=Math.max(1,i.quantity+delta);localStorage.setItem("vyro-cart",JSON.stringify(c));refresh();}
 function remove(key){const c=cart.filter(x=>x.key!==key);localStorage.setItem("vyro-cart",JSON.stringify(c));refresh();}
 return <><Nav/><main className="cart-page"><div className="container"><h1 className="h2">Your Cart</h1>{!cart.length?<div className="empty"><p className="muted">Your cart is empty.</p><Link className="primary" href="/shop">Shop Products</Link></div>:<div className="cart-layout"><div className="panel">{cart.map(i=><div className="cart-item" key={i.key}><img src={i.product.image} alt={i.product.name}/><div><strong>{i.product.name}</strong><div className="muted">€{i.product.price.toFixed(2)} · {i.options?.color} · {i.options?.size}{i.options?.customText?` · ${i.options.customText}`:""}</div><div className="qty" style={{marginTop:8}}><button onClick={()=>change(i.key,-1)}>−</button><strong>{i.quantity}</strong><button onClick={()=>change(i.key,1)}>+</button><button className="ghost-btn" onClick={()=>remove(i.key)}>Remove</button></div></div><strong>€{(i.product.price*i.quantity).toFixed(2)}</strong></div>)}</div><div className="panel"><h3>Summary</h3><div className="summary-row"><span>Subtotal</span><strong>€{subtotal.toFixed(2)}</strong></div><div className="summary-row"><span>Shipping</span><span>Calculated at checkout</span></div><div className="summary-total"><span>Total</span><span>€{subtotal.toFixed(2)}</span></div><Link className="primary" style={{display:"block",textAlign:"center",marginTop:18}} href="/checkout">Checkout</Link></div></div>}</div></main><Footer/></>
}