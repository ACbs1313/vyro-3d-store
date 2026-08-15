 "use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [count,setCount]=useState(0);
  useEffect(()=>{
    const update=()=>setCount(JSON.parse(localStorage.getItem("vyro-cart")||"[]").reduce((a,i)=>a+i.quantity,0));
    update(); window.addEventListener("vyro-cart",update); return()=>window.removeEventListener("vyro-cart",update);
  },[]);
  return <div className="nav"><div className="container nav-inner">
    <Link href="/" className="logo">VYRO</Link>
    <div className="nav-links"><Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/about">About</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link></div>
    <div className="nav-actions"><Link className="icon-btn" href="/shop">Search</Link><Link className="icon-btn" href="/account">Account</Link><Link className="primary" href="/cart">Cart ({count})</Link></div>
  </div></div>
}