 "use client";
import { useState } from "react";

export default function CartButton({product, options}) {
  const [added,setAdded]=useState(false);
  function add(){
    const cart=JSON.parse(localStorage.getItem("vyro-cart")||"[]");
    const key=[product.id,options?.color,options?.size,options?.customText].join("|");
    const found=cart.find(i=>i.key===key);
    if(found) found.quantity += options.quantity||1;
    else cart.push({key,product,options,quantity:options.quantity||1});
    localStorage.setItem("vyro-cart",JSON.stringify(cart));
    window.dispatchEvent(new Event("vyro-cart"));
    setAdded(true); setTimeout(()=>setAdded(false),1200);
  }
  return <button className="primary" onClick={add}>{added?"Added ✓":"Add to Cart"}</button>
}