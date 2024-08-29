var coins = 0;
var Inventory = [];
var Inventoryslots = [2,2,2];
var items = [
    {id:100000,invid:0,inuse:false,amount:0,type:0,SubType:0,LVL:1,STR:1,DEX:0,CON:0,ATT:1,DEF:0,price:10,name:`Basic Sword`},
    {id:100001,invid:0,inuse:false,amount:0,type:0,SubType:0,LVL:2,STR:2,DEX:0,CON:0,ATT:2,DEF:0,price:30,name:`Iron Sword`},
    {id:100002,invid:0,inuse:false,amount:0,type:0,SubType:1,LVL:1,STR:0,DEX:0,CON:0,ATT:0,DEF:1,price:10,name:`Basic Armour`},
    {id:200000,invid:0,inuse:false,amount:0,type:1,SubType:0,LVL:1,STR:0,DEX:0,CON:0,ATT:5,DEF:0,price:10,name:`Basic Health potion`},
];
var subtype = [`Equipment`, `Useable`, `Etc`];
function gainCoins(amount){
    coins+=amount;
    addToConsole("You have gained "+amount+" Coins")
    updateSkillsDisplay();
}
function additem(itemId, Shop) {
    let item = items.find(i => i.id === itemId);
    if (!item) return;
    

    let slotused = 0;
    if (item.type === 0) {
        // Clone the item to avoid modifying the original object
        let newItem = { ...item };

        if (!Shop) {
            // Apply random adjustments to stats only if Shop is false
            const adjustStat = (stat) => {
                return stat ? stat + Math.floor(Math.random() * 3) - 2 : stat;
            };

            newItem.STR = adjustStat(newItem.STR);
            newItem.DEX = adjustStat(newItem.DEX);
            newItem.CON = adjustStat(newItem.CON);
            newItem.ATT = adjustStat(newItem.ATT);
            newItem.DEF = adjustStat(newItem.DEF);

            // Ensure the stats are not below a minimum value, like 0
            newItem.STR = Math.max(0, newItem.STR || 0);
            newItem.DEX = Math.max(0, newItem.DEX || 0);
            newItem.CON = Math.max(0, newItem.CON || 0);
            newItem.ATT = Math.max(0, newItem.ATT || 0);
            newItem.DEF = Math.max(0, newItem.DEF || 0);
        }
        Inventory.forEach(i => {
            if (i.type === newItem.type) {
                slotused++;
            }
        });

        if (slotused < Inventoryslots[newItem.type]) {
            // Assign a unique id to the new item instance
            newItem.invid = Inventory.length ? Math.max(...Inventory.map(i => i.invid)) + 1 : 1;

            Inventory.push(newItem);
            addToConsole(newItem.name + ` has been added to inventory${Shop ? '' : ' with modified stats'}.`);
        } else {
            addToConsole('Inventory full');
        }
    }
    if(item.type === 1){
        // if(Inventory)
        let newItem = { ...item };
        inuseslot = Inventory.find(use=>use.id === newItem.id)
        if(inuseslot){inuseslot.amount++;addToConsole(`${inuseslot.name} added to inventory`);return;}
        else{
            Inventory.forEach(i => {
                if (i.type === newItem.type) {
                    slotused++;
                }
            });
            console.log(slotused)
        }
        console.log(newItem.ATT);
        if (slotused < Inventoryslots[newItem.type]) {
            // Assign a unique id to the new item instance
            newItem.invid = Inventory.length ? Math.max(...Inventory.map(i => i.invid)) + 1 : 1;
            newItem.amount = 1
            Inventory.push(newItem);
            addToConsole(newItem.name + ` has been added to inventory`);
        }

    }
}
additem(200000)
additem(100000)
additem(100000)
additem(200000)
function OpenInv(Type, evt) {
    let subtype = [`Equipment`, `Useable`, `Etc`];
    let Main = document.getElementById('contentmain');

    if (!Type) {
        selection = "Inventory";
        Main.innerHTML = "<span id='topbar'>" + selection + "</span>";
        Main.innerHTML += `<div id='Tt' style='display:block;width:100%;'></div>`;
        let Width = 100 / subtype.length;
        subtype.forEach(ST => {
            document.getElementById(`Tt`).innerHTML += `<span class='ttsel' onclick='OpenInv("${ST}",event)' style='width:${Width}%;'>${ST}</span>`;
        });
    } else {
        if (evt) {
            let ml = document.getElementsByClassName('ttsel');
            for (let i = 0; i < ml.length; i++) {
                ml[i].className = ml[i].className.replace(" active", "");
            }
            evt.currentTarget.className += " active";
        }

        if (!document.getElementById(`SubContent`)) {
            Main.innerHTML += `<div id='SubContent'></div>`;
        }

        let sc = document.getElementById(`SubContent`);
        sc.innerHTML = "";
        sc.innerHTML += `<div id='precont' style='font-size:16px;border-bottom:1px solid #00ff00;border-top:1px solid #00ff00;'>${Type}</div>`;
        let ItemList = `<div id='container'>`;
        if(Type=== subtype[0]){
            Inventory.forEach(item => {
                if (item.type === 0) {
                    let buttontext = item.inuse ? `Unequip` : `Equip`;
                    ItemList += `<div class='ItemDisplay' id="${item.invid}">`;
                    ItemList += `<span>${item.name} <button class='Equipbut' onclick='Equip(${item.invid})'>${buttontext}</button></span><br>`;
                    ItemList += `<span>`;
                    if (item.STR) { ItemList += `STR: ${item.STR} `; }
                    if (item.DEX) { ItemList += `DEX: ${item.DEX} `; }
                    if (item.CON) { ItemList += `CON: ${item.CON} `; }
                    if (item.ATT) { ItemList += `ATT: ${item.ATT} `; }
                    if (item.DEF) { ItemList += `DEF: ${item.DEF} `; }
                    ItemList += `</span></div>`;
                }
            })
        }
        if(Type === subtype[1]){
            Inventory.forEach(item => {
                if (item.type === 1) {
                ItemList += `<div class='ItemDisplay' id="${item.invid}">`;
                ItemList += `<span>${item.name} heals ${item.ATT} (${item.amount})<button class='Equipbut' onclick='Use(${item.id})'>Use</button></span><br>`;
                ItemList += `</div>`;
                }
            })
        }
        ItemList += `</div>`;
        sc.innerHTML += ItemList;
    }
}
function Use(itemID){
    ItemUse = Inventory.find(i=>i.id===itemID)
    switch(ItemUse.SubType){
        case 0:
            HP.current+=ItemUse.ATT
            if(HP.current>HP.Max){
                HP.current=HP.Max
            }
        case 1:
            STA.current+=ItemUse.ATT
            if(STA.current>STA.Max){
                STA.current=STA.Max
            }
        default:
            break
    }
    ItemUse.amount--
    if(ItemUse.amount<=0){
        removeItem(itemID)
    }
    updateSkillsDisplay()
    OpenInv('Useable')
}
function removeItem(itemId){
    Inventory = Inventory.filter(item => item.id !== itemId);
}
function OpenShop(Type, evt) {
    let Main = document.getElementById('contentmain');
    let subtype = [`Equipment`, `Useable`, `Etc`];  // Assuming these are the subtypes you are using
    
    if (!Type) {
        selection = "Shop";
        Main.innerHTML = "<span id='topbar'>" + selection + "</span>";
        Main.innerHTML += `<div id='Tt' style='display:block;width:100%;'></div>`;
        let Width = 100 / subtype.length;
        subtype.forEach(ST => {
            document.getElementById(`Tt`).innerHTML += `<span class='ttsel' onclick='OpenShop("${ST}",event)' style='width:${Width}%;'>${ST}</span>`;
        });
    } else {
        if (evt) {
            ml = document.getElementsByClassName('ttsel');
            for (i = 0; i < ml.length; i++) {
                ml[i].className = ml[i].className.replace(" active", "");
            }
            evt.currentTarget.className += " active";
        }
        
        let playerLevel = Skills.find(skill => skill.SkillId === 0).level;
        let itemsList = "";
        if(Type===`Equipment`){
            items.forEach(it => {
                if (it.type === subtype.indexOf(Type) && playerLevel >= it.LVL) {
                    itemsList += `<div class='shop-item'>
                        <strong>${it.name}</strong> - Level: ${it.LVL}, Price: ${it.price} coins<br>
                        Stats: ${it.STR ? `STR: ${it.STR} ` : ''}${it.DEX ? `DEX: ${it.DEX} ` : ''}${it.CON ? `CON: ${it.CON} ` : ''}
                        ${it.ATT ? `ATT: ${it.ATT} ` : ''}${it.DEF ? `DEF: ${it.DEF} ` : ''}<br>`
                    if(coins >= it.price){
                        itemsList += `<button class='ShopBut' onclick='buyItem(${it.id})'>Buy</button>`
                    }
                    itemsList += `</div>`
                }
            });
        }
        if(Type===`Useable`){
            items.forEach(it => {
                if(it.SubType===0){healtype = `Health`}
                if(it.SubType===1){healtype = `Stamina`}
                if (it.type === subtype.indexOf(Type)&&playerLevel >= it.LVL){
                    itemsList += `<div class='shop-item'>`
                    itemsList += `<strong>${it.name}</strong><BR>`
                    itemsList += `<span> Heals ${it.ATT} ${healtype} `
                    if(coins>=it.price){
                        itemsList += `<button class='ShopBut' onclick='buyItem(${it.id})'>Buy</button> for ${it.price} coins`
                    }
                    itemsList += `</span>`
                }
            })    
        }
        itemsList += `</div>`
        if (!document.getElementById('SubContent')) {
            Main.innerHTML += `<div id='SubContent'></div>`;
        }
        let sc = document.getElementById('SubContent');
        sc.innerHTML = itemsList || "<div>No items available for this category or your level is too low.</div>";
    }
}

function buyItem(itemId) {
    let item = items.find(i => i.id === itemId);
    if (item && coins >= item.price) {
        coins -= item.price;
        additem(itemId, true);  // Add item to inventory without stat adjustments (Shop = true)
        updateSkillsDisplay();  // Update display to reflect changes in coins and inventory
        addToConsole(`You purchased ${item.name} for ${item.price} coins.`);
    } else {
        addToConsole("You don't have enough coins to buy this item.");
    }
    OpenShop(subtype[item.type])

}

function Equip(NUM){
    let item = Inventory.find(i=>i.invid===NUM)
    if(!item){return}
    else{
        if(!item.inuse){
            Inventory.forEach(i=>{
                if(i.SubType===item.SubType){
                    i.inuse = false
                }
            })
            item.inuse = true;
        }
        else{
            item.inuse = false;
        }
    }
    OpenInv(`Equipment`)
}