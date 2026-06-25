"use client";

type Props={

tab:"claim"|"admin";

setTab:(t:"claim"|"admin")=>void;

};

export default function Tabs({

tab,

setTab

}:Props){

return(

<div className="flex rounded-2xl bg-white p-2 shadow">

<button

onClick={()=>setTab("claim")}

className={`flex-1 rounded-xl py-4 transition

${tab==="claim"

?"bg-rose-500 text-white"

:"text-rose-500"}

`}>

🎁 Nhận Code

</button>

<button

onClick={()=>setTab("admin")}

className={`flex-1 rounded-xl py-4 transition

${tab==="admin"

?"bg-rose-500 text-white"

:"text-rose-500"}

`}>

📊 Quản lý

</button>

</div>

)

}