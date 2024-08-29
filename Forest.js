function OpenForest(){
    selection = "Forest";
    mlist = [];
    monsters.forEach(M=>{
        if(M.bio === selection&&playerSkill.level>=M.level){
            mlist.push(M.id)
        }
    })
    MonsterId = mlist[Math.floor(Math.random()*mlist.length)]
    Monster = monsters.find(m=>m.id===MonsterId)
    let Main = document.getElementById('contentmain');
    Main.innerHTML = "<span id='topbar'>" + selection + "</span>";
    Monster.currenthealth = Monster.health
    MonsterSpawner(Monster)
}
