"use client";
import { notFound } from "next/navigation";
import { useState } from "react";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import CartButton from "../../../components/CartButton";
import { getProduct } from "../../../lib/products";
import Link from "next/link";

export default function ProductPage({params}){
 const p=getProduct(params.slug); if(!p) return notFound();
 const [color,setColor]=useState(p.colors[0]); const [size,setSize]=useState(p.sizes[0]); const [customText,setCustomText]=useState(""); const [quantity,setQuantity]=useState(1);
 const options={color,size,customText,quantity};
 return <><Nav/><main className="product-page"><div className="container product-grid-large"><div><img className="product-main-img" src={p.image} alt={p.name}/></div><div>
   <span className="pill">{p.category}</span><h1 className="h2" style={{marginTop:14}}>{p.name}</h1><p style={{fontSize:24,fontWeight:800}}>€{p.price.toFixed(2)}</p><p className="lead">{p.description}</p>
   <div className="field"><label>Color</label><div className="option-grid">{p.colors.map(c=><button className={"option "+(color===c?"active":"")} onClick={()=>setColor(c)} key={c}>{c}</button>)}</div></div>
   <div className="field"><label>Size</label><div className="option-grid">{p.sizes.map(s=><button className={"option "+(size===s?"active":"")} onClick={()=>setSize(s)} key={s}>{s}</button>)}</div></div>
   {p.customization&&<div className="field"><label>Custom text</label><input maxLength={30} value={customText} onChange={e=>setCustomText(e.target.value)} placeholder="Enter text for your print"/></div>}
   <div className="field"><label>Quantity</label><div className="qty"><button onClick={()=>setQuantity(Math.max(1,quantity-1))}>−</button><strong>{quantity}</strong><button onClick={()=>setQuantity(quantity+1)}>+</button></div></div>
   <div className="notice">Made to order · {p.productionTime} · Material: {p.material}</div>
   <div className="buy-row"><CartButton product={p} options={options}/><Link className="ghost-btn" href="/cart">View Cart</Link></div>
 </div></div></main><Footer/></>
}