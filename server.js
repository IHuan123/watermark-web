const child_process = require('child_process');
const child = child_process.spawn('npm',['run','dev'],{stdio:'inherit'})

child.on('close',code => {
    //执行完成
})