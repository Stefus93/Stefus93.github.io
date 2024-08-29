function Start(part) {
    switch (part) {
        case 0:
            addToConsole("Welcome to Stefus's Adventures");
            setTimeout(() => {
                Start(1)
            }, 500);
            break;
        
        case 1:
            StartMenu()
            Start(2)
            break;
        case 2:
            setTimeout(()=>{
                document.getElementsByClassName("MenuList")[0].click()
            },500)
            break
        case 3:
            Startup();
            break
        default:
            addToConsole("Unknown part");
            break;
    }
}


// Call the function to add a message to the console
Start(0);

function Startup(){
    coins = 0;
    Inventoryslots.forEach(is=>{is = 2})
    Inventory = [];
    Skills.forEach(sk=>{
        sk.level = 1;
        sk.currentExp = 0;
        sk.maxExp = 10;
        if(sk.Max){
            sk.Max = 10
            sk.current = 10
        }
    })
    document.getElementById('contentmain').remove()
    updateSkillsDisplay()
}