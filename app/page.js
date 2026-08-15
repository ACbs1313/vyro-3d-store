import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { products } from "../lib/products";

export default function Home(){
  return <><Nav/>
    <main>
      <section className="hero"><div className="container hero-grid">
        <div>
          <span className="kicker">Made to order · 3D printed</span>
          <h1 className="h1">Made to Order.<br/>Printed for You.</h1>
          <p className="lead">Discover unique 3D-printed products carefully made to order and shipped directly to your door.</p>
          <div className="hero-actions"><Link className="primary" href="/shop">Shop Products</Link><Link className="ghost-btn" href="/about">How It Works</Link></div>
        </div>
        <div className="hero-art"><img src={products[0].image} alt={products[0].name}/></div>
      </div></section>
      <section className="section"><div className="container">
        <div className="section-head"><div><p className="muted">Popular right now</p><h2 className="h2">Featured Products</h2></div><Link href="/shop" className="ghost-btn">View all</Link></div>
        <div className="product-grid">{products.map(p=><article className="card" key={p.id}><Link href={`/product/${p.slug}`}><div className="card-img"><img src={p.image} alt={p.name}/></div></Link><div className="card-body"><div className="card-row"><h3 style={{margin:0}}>{p.name}</h3><span className="price">€{p.price.toFixed(2)}</span></div><p className="muted">{p.description}</p><div className="card-row"><span className="pill">{p.category}</span><Link href={`/product/${p.slug}`} className="ghost-btn">View</Link></div></div></article>)}</div>
      </div></section>
      <section className="section" style={{background:"#f7f7f7"}}><div className="container">
        <div className="section-head"><div><p className="muted">Why VYRO</p><h2 className="h2">Simple. Precise. Made for you.</h2></div></div>
        <div className="split"><div className="feature"><h3>Made to Order</h3><p className="muted">Your product is printed after you order it, not pulled from a warehouse shelf.</p></div><div className="feature"><h3>Quality Checked</h3><p className="muted">Every print goes through a quick quality check before shipping.</p></div><div className="feature"><h3>Unique Designs</h3><p className="muted">Modern objects designed to look good and be useful.</p></div><div className="feature"><h3>Shipped to You</h3><p className="muted">Once your print is ready, we package it and send it on its way.</p></div></div>
      </div></section>
      <section className="section"><div className="container"><div className="panel"><p className="muted">How it works</p><h2 className="h2">Choose → Order → Print → Ship</h2><p className="lead">You order online. We print in our own workshop. You get the finished product.</p></div></div></section>
    </main><Footer/></>
}