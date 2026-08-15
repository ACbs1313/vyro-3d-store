"use client";
import { useEffect, useMemo, useState } from "react";

const statuses=["Order Received","Preparing","Printing","Quality Check","Ready to Ship","Shipped","Delivered","Cancelled"];

export default function Admin(){
 const [pass,setPass]=useState(""); const [auth,setAuth]=useState(false);
 const [orders,setOrders]=useState([]);
 const [filter,setFilter]=useState("All");
 const [selected,setSelected]=useState(null);

 useEffect(()=>{setOrders(JSON.parse(localStorage.getItem("vyro-orders")||"[]"));},[]);
 function save(next){setOrders(next);localStorage.setItem("vyro-orders",JSON.stringify(next));}
 function update(id,patch){const next=orders.map(o=>o.id===id?{...o,...patch}:o);save(next);setSelected(next.find(o=>o.id===id)||null);}
 function updateNote(id,note){
   const o=orders.find(x=>x.id===id); if(!o) return;
   const next=orders.map(x=>x.id===id?{...x,notes:[...(x.notes||[]),{note,createdAt:new Date().toISOString()}]}:x);
   save(next); setSelected(next.find(x=>x.id===id));
 }
 if(!auth) return <main className="section"><div className="container"><div className="panel" style={{maxWidth:430,margin:"80px auto"}}>
   <h1 className="h2" style={{fontSize:34}}>Private Admin</h1>
   <p className="muted">This starter protects the admin area with a simple local password screen. Use real server-side auth before accepting live orders.</p>
   <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Admin password" style={{width:"100%"}}/>
   <button className="primary" style={{marginTop:12,width:"100%"}} onClick={()=>setAuth(true)}>Open Dashboard</button>
 </div></div></main>;

 const filtered=filter==="All"?orders:orders.filter(o=>o.status===filter);
 const revenue=orders.filter(o=>o.paymentStatus==="Paid").reduce((s,o)=>s+Number(o.total),0);
 return <div className="admin-wrap">
  <aside className="admin-side"><div className="logo">VYRO</div><p className="muted">Private Admin</p>
   <a href="#dashboard">Dashboard</a><a href="#orders">Orders</a><a href="#print">Print Queue</a><a href="/">Back to Store</a>
  </aside>
  <main className="admin-main">
   <h1 id="dashboard" className="h2" style={{fontSize:42}}>Order Control Center</h1>
   <p className="muted">Everything for your order, printing and shipping workflow.</p>

   <div className="stats" style={{margin:"22px 0"}}>
    <div className="stat">Total Orders<strong>{orders.length}</strong></div>
    <div className="stat">To Print<strong>{orders.filter(o=>["Order Received","Preparing"].includes(o.status)).length}</strong></div>
    <div className="stat">Printing<strong>{orders.filter(o=>o.status==="Printing").length}</strong></div>
    <div className="stat">Paid Revenue<strong>€{revenue.toFixed(2)}</strong></div>
   </div>

   <div className="panel" id="orders">
    <div className="section-head"><div><p className="muted">All customer orders</p><h2 className="h2" style={{fontSize:30}}>Orders</h2></div></div>
    <div className="admin-toolbar">
      <select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option>{statuses.map(s=><option key={s}>{s}</option>)}</select>
    </div>
    {!filtered.length?<p className="muted">No orders yet. New customer orders will appear here.</p>:
    <div style={{overflowX:"auto"}}><table className="table"><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Payment</th><th>Production</th><th>Open</th></tr></thead>
    <tbody>{filtered.map(o=><tr key={o.id}><td>#{o.id}</td><td>{o.customer.name}<br/><span className="muted">{o.customer.email}</span></td><td>€{Number(o.total).toFixed(2)}</td><td><button className="status" onClick={()=>update(o.id,{paymentStatus:o.paymentStatus==="Paid"?"Pending":"Paid"})}>{o.paymentStatus}</button></td><td><span className="status">{o.status}</span></td><td><button className="ghost-btn" onClick={()=>setSelected(o)}>Details</button></td></tr>)}</tbody></table></div>}
   </div>

   <div className="panel" id="print" style={{marginTop:20}}>
    <p className="muted">Production workflow</p><h2 className="h2" style={{fontSize:30}}>Print Queue</h2>
    {orders.filter(o=>["Order Received","Preparing","Printing"].includes(o.status)).map(o=><div key={o.id} className="feature" style={{marginTop:10}}>
      <div className="card-row"><strong>#{o.id}</strong><span className="status">{o.status}</span></div>
      <p><strong>{o.items.map(i=>`${i.product.name} × ${i.quantity}`).join(", ")}</strong></p>
      <p className="muted">{o.customer.name} · {o.paymentStatus} · {o.paymentMethod==="bank"?"Bank Transfer":"Pay on Delivery"}</p>
      <button className="primary" onClick={()=>update(o.id,{status:o.status==="Order Received"?"Preparing":o.status==="Preparing"?"Printing":"Quality Check"})}>
        {o.status==="Order Received"?"Start Preparing":o.status==="Preparing"?"Start Printing":"Finished Printing"}
      </button>
    </div>)}
   </div>

   {selected&&<div className="panel" style={{marginTop:20}}>
    <div className="card-row"><div><p className="muted">Order details</p><h2 style={{margin:0}}>#{selected.id}</h2></div><button className="ghost-btn" onClick={()=>setSelected(null)}>Close</button></div>
    <p><strong>{selected.customer.name}</strong><br/>{selected.customer.email}<br/>{selected.customer.phone}<br/>{selected.customer.address}, {selected.customer.postal} {selected.customer.city}, {selected.customer.country}</p>
    <h3>Items</h3>{selected.items.map(i=><div className="summary-row" key={i.key}><span>{i.product.name} × {i.quantity}<br/><span className="muted">{i.options?.color} · {i.options?.size}{i.options?.customText?` · ${i.options.customText}`:""}</span></span><strong>€{(i.product.price*i.quantity).toFixed(2)}</strong></div>)}
    <div className="field"><label>Production status</label><select value={selected.status} onChange={e=>update(selected.id,{status:e.target.value})}>{statuses.map(s=><option key={s}>{s}</option>)}</select></div>
    <div className="field"><label>Shipping provider</label><input defaultValue={selected.shippingProvider} onBlur={e=>update(selected.id,{shippingProvider:e.target.value})}/></div>
    <div className="field"><label>Tracking number</label><input defaultValue={selected.trackingNumber} onBlur={e=>update(selected.id,{trackingNumber:e.target.value})}/></div>
    <div className="feature"><strong>Internal Notes</strong>{(selected.notes||[]).map((n,i)=><p key={i} className="muted">{n.note}</p>)}<input id="admin-note" placeholder="Add private note"/><button className="ghost-btn" style={{marginTop:8}} onClick={()=>{const el=document.getElementById("admin-note");if(el.value.trim()){updateNote(selected.id,el.value.trim());el.value=""}}}>Add Note</button></div>
   </div>}
  </main>
 </div>
}