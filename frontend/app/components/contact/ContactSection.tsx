'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Send, User, MessageSquare } from 'lucide-react';

const WORDS = ['Hello! 👋','Assalam Alikum! 🌙','Hella! 🔥','Shalve! ✨','Ciao! 🍕'];

function Typewriter() {
  const [wi, setWi]  = useState(0);
  const [disp, setD] = useState('');
  const [del, setDel]= useState(false);
  const [spd, setSpd]= useState(110);
  useEffect(()=>{
    const w = WORDS[wi];
    const t = setTimeout(()=>{
      if(!del){ if(disp.length<w.length){setD(w.slice(0,disp.length+1));setSpd(100);}
        else{setSpd(1800);setDel(true);} }
      else{ if(disp.length>0){setD(w.slice(0,disp.length-1));setSpd(55);}
        else{setDel(false);setWi(i=>(i+1)%WORDS.length);setSpd(280);} }
    },spd);
    return()=>clearTimeout(t);
  },[disp,del,wi,spd]);
  return <span className="text-white font-black text-5xl leading-tight chat-cursor">{disp}</span>;
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:'-80px'});
  const [form,setForm] = useState({name:'',email:'',message:''});
  const [ok,setOk] = useState(false);
  const [busy,setBusy] = useState(false);

  const submit = async(e:React.FormEvent)=>{
    e.preventDefault(); setBusy(true);
    await new Promise(r=>setTimeout(r,1500));
    setBusy(false); setOk(true);
    setTimeout(()=>setOk(false),4000);
    setForm({name:'',email:'',message:''});
  };

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — Contact info */}
          <motion.div initial={{opacity:0,x:-40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7}}>
            <p className="label-tag mb-4">GET IN TOUCH</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
              WE'D LOVE TO<br/>HEAR FROM YOU.
            </h2>
            <div className="space-y-8">
              {[
                {tag:'Feel Free To Get In Touch?', content:<><p className="text-gray-600 text-sm">401 Broadway, 24th Floor,<br/>Orchard View, London</p><motion.button className="btn btn-dark rounded-sm mt-4 text-xs" whileHover={{scale:1.03}}><MapPin size={13}/> GET DIRECTIONS</motion.button></>},
                {tag:"Let's Talk With Us?", content:<div className="space-y-1"><div className="flex items-center gap-2 text-gray-600 text-sm"><Phone size={13} className="text-[#c8102e]"/> Phone: 1-800-222-000</div><div className="flex items-center gap-2 text-gray-600 text-sm"><Phone size={13} className="text-gray-400"/> Fax: 1-800-222-002</div></div>},
                {tag:'How Can We Help You?', content:<div className="space-y-1"><a href="mailto:info@pizzao.com" className="flex items-center gap-2 text-gray-600 text-sm hover:text-[#c8102e] transition-colors"><Mail size={13} className="text-[#c8102e]"/> info@pizzao.com</a><a href="mailto:help@pizzao.com" className="flex items-center gap-2 text-gray-600 text-sm hover:text-[#c8102e] transition-colors"><Mail size={13} className="text-gray-400"/> help@pizzao.com</a></div>},
              ].map((item,i)=>(
                <motion.div key={item.tag} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*.1,duration:.6}}>
                  <p className="text-[10px] font-black text-[#c8102e] uppercase tracking-widest mb-2">{item.tag}</p>
                  {item.content}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Form card */}
          <motion.div initial={{opacity:0,x:40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7,delay:.2}}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Top: typewriter */}
              <div className="bg-[#c8102e] p-8">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">SAY</p>
                <Typewriter/>
              </div>
              {/* Form */}
              <div className="bg-[#c8102e] pb-8 px-8">
                <form onSubmit={submit} className="space-y-4">
                  {[
                    {label:'Your name',    key:'name',    type:'text',  icon:<User size={13}/>},
                    {label:'Your email',   key:'email',   type:'email', icon:<Mail size={13}/>},
                  ].map(f=>(
                    <div key={f.key} className="relative">
                      <input type={f.type} placeholder={`${f.label}*`}
                        value={(form as any)[f.key]}
                        onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                        required
                        className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 text-sm py-2.5 pr-8 outline-none focus:border-white transition-colors"/>
                      <span className="absolute right-0 top-2.5 text-white/50">{f.icon}</span>
                    </div>
                  ))}
                  <div className="relative">
                    <textarea rows={3} placeholder="Your message"
                      value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                      className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 text-sm py-2.5 pr-8 outline-none focus:border-white transition-colors resize-none"/>
                    <MessageSquare size={13} className="absolute right-0 top-2.5 text-white/50"/>
                  </div>
                  <motion.button type="submit" disabled={busy||ok}
                    className="w-full bg-white text-[#c8102e] font-black text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors mt-2 rounded-sm disabled:opacity-70"
                    whileHover={{scale:1.02}} whileTap={{scale:.98}}>
                    {busy?<span className="w-4 h-4 border-2 border-[#c8102e] border-t-transparent rounded-full animate-spin"/>:ok?'✅ MESSAGE SENT!':<><Send size={13}/> SEND MESSAGE</>}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Franchise link */}
        <motion.div className="mt-16 flex items-center gap-4 justify-center py-6 border-t border-gray-100"
          initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:.5}}>
          <span className="text-2xl">🍕</span>
          <p className="text-gray-700 text-sm font-medium">
            Looking for a franchise that focuses on quality food?{' '}
            <a href="/franchise" className="text-[#c8102e] font-black uppercase hover:underline">JOIN THE NETWORK</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
