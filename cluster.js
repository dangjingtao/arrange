const cluster=require('cluster')
const os=require('os')
const numCpus=os.cpus().length;
const process=require('process');

console.log(`服务器cpu核心数`,numCpus)

let workers={}
if(cluster.isMaster){
    // 主进程分支
    // 当被进程杀死时,自动重启
    cluster.on('death',function(worker){
        worker=cluster.fork();
        workers[worker.pid]=worker;
    })
    // 复制多个进程
    for(let i=0;i<numCpus;i++){
        let worker=cluster.fork();
        workers[worker.pid]=worker;
    }

}else{
    // 工作进程
    const app =require('./app');
    // 注册一个测试中间件
    app.use(async (ctx,next)=>{
        console.log('worker'+cluster.worker.id+',PID:'+process.pid);
        next();
    });
    app.listen(3000);
}

// 杀死进程时（ctrl+c）
process.on('SIGTERM',function(){
    for(let pid in workers){
        process.kill(pid)
    }
    process.exit(0);
})

require('./test')