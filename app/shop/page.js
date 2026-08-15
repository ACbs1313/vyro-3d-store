 "use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { products } from "../../lib/products";

export default function Shop(){
 const [q,setQ]=useState(""); const [cat,setCat]=useState("All"); const [sort,setSort]=useState("featured");
 const categories=["All",...new Set(products.map(p=>p.category))];
 const list=useMemo(()=>products.filter(p=>(cat==="All"||p.category===cat)&&p.name.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>sort==="low"?a.price-b.price:sort==="high"?b.price-a.price:0),[q,cat,sort]);
 return <><Nav/><main className="section"><div className="container">
   <div className="section-head"><div><p className="muted">Shop</p><h1 className="h2">Products</h1></div></div>
   <div className="admin-toolbar"><input className="field" style={{margin:0,flex:1}} placeholder="Search products…" value={q} onChange={e=>setQ(e.target.value)}/><select value={cat} onChange={e=>setCat(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div>
   <div className="product-grid">{list.map(p=><article className="card" key={p.id}><Link href={`/product/${p.slug}`}><div className="card-img"><img src={p.image} alt={p.name}/></div></Link><div className="card-body"><div className="card-row"><h3 style={{margin:0}}>{p.name}</h3><span className="price">€{p.price.toFixed(2)}</span></div><p className="muted">{p.description}</p><div className="card-row"><span className="pill">{p.productionTime}</span><Link className="primary" href={`/product/${p.slug}`}>View</Link></div></div></article>)}</div>
 </div></main><Footer/></>
}