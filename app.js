const Koa=require('koa')
const Router=require('koa-router')
const app =new Koa();

const router=new Router();

router.get('/', (ctx, next) => {
    // ctx.router available
    ctx.body='<h1>hello</h1>'
});


router.get('/api', (ctx, next) => {
    // ctx.router available
    ctx.body={
        data:[1,2,3]
    }
});



app
  .use(router.routes())
  .use(router.allowedMethods());

if(!module.parent){
    app.listen(3000,()=>{
        console.log('服务已启动');
    })
}else{
    module.exports=app;
}