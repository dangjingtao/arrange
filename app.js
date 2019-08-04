const Koa=require('Koa')
const app =new Koa();

app.use(async (ctx,next)=>{
    Math.random()>0.9?aaa():2
    await next();
    ctx.response.type='text/html';
    ctx.response.body='<h1>hello</h1>';
})

if(!module.parent){
    app.listen(3000,()=>{
        console.log('服务已启动');
    })
}else{
    module.exports=app;
}