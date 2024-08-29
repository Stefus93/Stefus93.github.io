var MenuType = ["Skills","Training","Forest","Inventory","Shop"]
function StartMenu(){
    if(!document.getElementById('sidebar')){content.innerHTML+= "<div id='sidebar'></div>"}
    else{
        document.getElementById('sidebar').innerHTML="";
    }
    for(i=0;i<MenuType.length;i++){
        document.getElementById('sidebar').innerHTML+= "<span class='MenuList' onclick='Menu(\""+MenuType[i]+"\",event)'>"+MenuType[i]+"</span>"
    }
}

function Menu(selection, evt) {
    if (evt) {
        ml = document.getElementsByClassName('MenuList');
        for (i = 0; i < ml.length; i++) {
            ml[i].className = ml[i].className.replace(" active", "");
        }
        evt.currentTarget.className += " active";
    }
    if (!document.getElementById('contentmain')) {
        content.innerHTML += "<div id='contentmain'></div>";
    }
    let Main = document.getElementById('contentmain');
    Main.innerHTML = "<span id='topbar'>" + selection + "</span>";
    combat = false
    switch (selection) {
        case MenuType[0]:
            DisplaySkills();
            break;
        case MenuType[1]:
            DisplayTraining(); // Handle Training menu
            break;
        case MenuType[2]:
            addToConsole(MenuType[2] + " Is under construction")
            OpenForest();
            break
        case MenuType[3]:
            addToConsole(MenuType[3] + " Is under construction")
            OpenInv();
            break
        case MenuType[4]:
            addToConsole(MenuType[4] + " Is under construction")
            OpenShop();
            break
        default:
            addToConsole("No selection yet");
    }
}

function OpenShop(Type,evt){
    let Main = document.getElementById('contentmain');

    if (!Type) {
        selection = "Shop";
        Main.innerHTML = "<span id='topbar'>" + selection + "</span>";
        Main.innerHTML += `<div id='Tt' style='display:block;width:100%;'></div>`;
        let Width = 100 / subtype.length;
        subtype.forEach(ST => {
            document.getElementById(`Tt`).innerHTML += `<span class='ttsel' onclick='OpenShop("${ST}",event)' style='width:${Width}%;'>${ST}</span>`;
        });
    }   
    else{
        if(Type === subtype[0]){
            Type = 0
            Level = Skills.find(skill => skill.SkillId === 0).level
            items.forEach(it=>{
                if(it.type === Type&&Level>=it.LVL){
                    console.log(it)
                }
            })
        }
    }
}