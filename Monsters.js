var monsters = [
    { id: "M001", health: 10, acc: 3, attack: 2, attackspeed: 1500, defense: 1, reward: {Money:10, exp: 2, lootid: [100000,200000], amount: [2], change: [50] }, currenthealth: 10, bio: "Forest", name: "Stump", level: 1 },
    { id: "M002", health: 20, acc: 3, attack: 3, attackspeed: 2000, defense: 2, reward: {Money:20, exp: 5, lootid: [4002], amount: [1], change: [30] }, currenthealth: 20, bio: "Forest", name: "Goblin", level: 2 },
    { id: "M003", health: 30, acc: 4, attack: 5, attackspeed: 2500, defense: 3, reward: {Money:50, exp: 10, lootid: [4003], amount: [3], change: [40] }, currenthealth: 30, bio: "Cave", name: "Orc", level: 3 },
    { id: "M004", health: 15, acc: 1, attack: 2, attackspeed: 1800, defense: 1, reward: {Money:40, exp: 3, lootid: [4004], amount: [2], change: [60] }, currenthealth: 15, bio: "Forest", name: "Wolf", level: 5 },
    { id: "M005", health: 25, acc: 5, attack: 4, attackspeed: 2200, defense: 4, reward: {Money:100, exp: 8, lootid: [4005], amount: [1], change: [70] }, currenthealth: 25, bio: "Mountain", name: "Bear", level: 4 },
    { id: "M006", health: 40, acc: 6, attack: 6, attackspeed: 3000, defense: 5, reward: {Money:1000, exp: 15, lootid: [4006], amount: [2], change: [50] }, currenthealth: 40, bio: "Cave", name: "Dragon", level: 5 },
    { id: "M007", health: 50, acc: 7, attack: 8, attackspeed: 3500, defense: 6, reward: {Money:30, exp: 20, lootid: [4007], amount: [3], change: [60] }, currenthealth: 50, bio: "Forest", name: "Giant Spider", level: 6 },
    { id: "M008", health: 35, acc: 4, attack: 7, attackspeed: 2700, defense: 3, reward: {Money:50, exp: 12, lootid: [4008], amount: [1], change: [55] }, currenthealth: 35, bio: "Mountain", name: "Rock Golem", level: 3 },
    { id: "M009", health: 45, acc: 5, attack: 9, attackspeed: 3200, defense: 4, reward: {Money:10, exp: 18, lootid: [4009], amount: [2], change: [65] }, currenthealth: 45, bio: "Forest", name: "Forest Troll", level: 4 },
    { id: "M010", health: 55, acc: 8, attack: 10, attackspeed: 4000, defense: 7, reward: {Money:200, exp: 25, lootid: [4010], amount: [1], change: [75] }, currenthealth: 55, bio: "Cave", name: "Cave Hydra", level: 7 }
];
var combat = false;
var MobAttacking = 0;
var pattacking = 0;


function MonsterSpawner(MOD){
    let Main = document.getElementById('contentmain');
    Monster = `<div id='currentm'>`
    Monster += `<label class='MonsterName'>${MOD.name}</label><BR>`
    Monster += `<label class='MonsterHP' id='HP${MOD.id}'></label><BR>`
    Monster += `<button id='Button${MOD.id}' class='AttackButton' onclick='Attack("${MOD.id}")' id='Patt${MOD.id}'>Attack</button><span id='ptimer'>2s</span><br>`
    Monster += `<label class='Attacking'>`
    Monster += `${MOD.name} speed: <label id='attacktime'>${MOD.attackspeed/1000}S</label</label>`
    Monster += `</div>`;
    Main.innerHTML+=Monster
    MonsterCheck(MOD)
}

function MonsterCheck(MOD){
    let MM = document.getElementById('currentm');
    if(MOD.currenthealth<=0&&combat){
        consoletext = `You have slained the ${MOD.name} and have gained ${MOD.reward.exp} exp`
        Change = Math.floor(Math.random()*100)
        if(Change<=MOD.reward.change){
            cd = Math.ceil(Math.random()*MOD.reward.Money)
            consoletext+= ` and ${cd} coins`
            gainCoins(cd)
        }
        MOD.reward.lootid.forEach(id => {
            console.log(id)
            Change = Math.floor(Math.random()*100)
            if(Change<=MOD.reward.change){
                additem(id)
            }    
        });
        addToConsole(consoletext)
        skillExpGain(0,MOD.reward.exp)
        MM.innerHTML = "";
        combat = false;
    }
    else{
        document.getElementById(`HP${MOD.id}`).innerHTML = `Health: ${MOD.currenthealth}`
    }
}

function Attack(MOD){
    MOD = monsters.find(m=>m.id===MOD)
    document.getElementById(`Button${MOD.id}`).disabled = true
    AttackChange = Math.floor(Math.random()*(StrCheck()+(DexCheck()*1.5)))
    totalDamage = AttackDMG();
    if(AttackChange>=MOD.defense){
        MOD.currenthealth-=totalDamage
        skillExpGain(1,Math.ceil(totalDamage/2))
        addToConsole(`You have dealt ${totalDamage} damage to ${MOD.name}`)
        MonsterCheck(MOD)
    }
    else{
        addToConsole(`You have failed to attack the ${MOD.name}`)
    }
    if(!combat){
        MAttack(MOD)
    }
    PAttackButton(MOD)
}
function PAttackButton(MOD){
    try{ptime = document.getElementById('ptimer');}
    catch{combat=false;return}
    if(PlayerAttackspeed>pattacking){
        setTimeout(()=>{
            pattacking+=100;
            PAttackButton(MOD)
        },100)
    }
    else{
        if(document.getElementById(`Button${MOD.id}`)){
            document.getElementById(`Button${MOD.id}`).disabled = false
        }
        pattacking = 0;
    }
    if(ptime){
        ptime.innerHTML = (PlayerAttackspeed - pattacking)/1000
    }

}

function MAttack(MOD){
    combat = true
    MobAttacking = 0
    if(combat&&document.getElementById(`currentm`)){
        MHC = Math.floor(MOD.acc*1.6)
        MDMG = Math.floor(Math.random()*MOD.attack)
        if(MHC > DEX.level&&MDMG>0){
            Damage(MDMG,MOD)
        }
        else{
            addToConsole(`The ${MOD.name} missed`)
        }
        MonsterAttackAnim(MOD)
    }
}


async function MonsterAttackAnim(MOD){
    if(combat&&document.getElementById('attacktime')){
        if(MobAttacking < MOD.attackspeed){
            setTimeout(() => {
                MobAttacking+= 100
                MonsterAttackAnim(MOD)
            }, 100);
        }
        else{
            if(IsDeath){return}
            MAttack(MOD)
        }
        if(document.getElementById('attacktime')){
            document.getElementById('attacktime').innerHTML = (MOD.attackspeed - MobAttacking)/1000
        }
    }
    else{
        combat = false
    }
}

function Damage(amount,MOD){
    HP.current-=amount
    if(HP.current>0){
        consoletext = `The ${MOD.name} dealt ${amount} damage to you`
    }
    else{
        combat = false
        consoletext = `The ${MOD.name} dealt ${amount} damage to you and killed you`
    }
    updateSkillsDisplay()
    addToConsole(consoletext)

}
function HealthCheck(){
    if(HP.current<=0){
        combat = false
        if(document.getElementById('contentmain')){document.getElementById('contentmain').innerHTML=`<button id='end' onclick='Start(3)'>Start over</button>`}
        
    }
}

