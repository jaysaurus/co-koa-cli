module.exports=function(){var a=this;this.each=(async(a,t)=>{a&&a.length&&await Promise.all(a.map(async a=>{await t(a)}))}),this.reduce=(async(t,i,s)=>(await a.each(t,async a=>{s=await i(s,a)}),s))};