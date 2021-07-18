const simpleGit = require("simple-git");

const git = simpleGit({
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
})


exports.getRemoteList = () => {
    return new Promise((resolve)=>{
        git.remote((err, data)=>{
            if(err){
                throw err;
            }else{
                let res = data ||'';
                resolve(res.split('\n'));
            }
        });
    })
}

exports.addRemote = () => {
    return new Promise((resolve)=>{
        git.remote(['add', 'templateupstream', 'https://github.com/melodyWxy/melody-template-store.git'], (err, data)=>{
            if(err){
                throw err;
            }else{
                resolve(data);
            }
        })
    })
}

exports.fetchRemote = () => {
    return new Promise((resolve)=>{
        git.fetch(['templateupstream'], (err, data)=>{
            if(err){
                throw err;
            }else{
                resolve(data);
            }
        })
    })
}

exports.getBranchs = () => {
    return new Promise((resolve)=>{
        git.remote(['show', 'templateupstream'], (err, data)=>{
            if(err){
                throw err;
            }else{
                
                const stringList = (data||'').split('\n');
                const branchs = stringList.filter(item => item.includes('tracked'));
                const res = branchs.map((item)=>{
                    return item.replace('tracked', '').trim();
                })
                    .filter(item=>item.includes('template'))
                    .map(item => item.replace('template/', ''))

                resolve(res);
            }
        })
    })
}

exports.deleteRemote =  () => {
    return new Promise((resolve)=>{
        git.remote(['remove', 'templateupstream'], (err, data)=>{
            if(err){
                throw err;
            }else{
                resolve(data);
            }
        })
    })
}

exports.clone = (branch) => {
    return new Promise((resolve)=>{
        git.clone('https://github.com/melodyWxy/melody-template-store.git', ['-b', `template/${branch}`], (err, data)=>{
            if(err){
                throw err;
            }else{
                const git = simpleGit({
                    baseDir: `${process.cwd()}/melody-template-store`,
                    binary: 'git',
                    maxConcurrentProcesses: 6,
                })
                git.remote(['remove', 'origin'], (err, res)=>{
                    if(err){
                        throw err;
                    }else{
                        resolve(res);
                    }
                })
            }
        })
    })
}