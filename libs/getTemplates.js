const { getRemoteList, getBranchs, addRemote, fetchRemote } = require('./gitApis');

async function getTemplates(){
    const remoteList = await getRemoteList();
    if(!remoteList.includes('templateupstream')){
        await addRemote();
    }
    await fetchRemote();
    const res = await getBranchs();
    return res;
}


module.exports = getTemplates;
