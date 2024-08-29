function include(scriptUrl){
    document.write('<script src="'+scriptUrl+'"></script>')
}
var content = document.getElementById('content')
include('Script/Page2/Menu.js');
include('Script/Page2/console.js');
include('Script/Page2/StartUp.js');
include('Script/Page2/Skills.js');
include('Script/Page2/Inventory.js');
include('Script/Page2/Monsters.js');
include('Script/Page2/Forest.js');