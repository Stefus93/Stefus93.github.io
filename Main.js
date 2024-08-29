function include(scriptUrl){
    document.write('<script src="'+scriptUrl+'"></script>')
}
var content = document.getElementById('content')
include('Menu.js');
include('console.js');
include('StartUp.js');
include('Skills.js');
include('Inventory.js');
include('Monsters.js');
include('Forest.js');