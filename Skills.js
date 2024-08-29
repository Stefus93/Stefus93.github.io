var Skills = [
    { SkillId:0, name: "Player",       level: 1, currentExp: 0, maxExp: 10 },
    { SkillId:1, name: "Strength",     level: 1, currentExp: 0, maxExp: 10, upgradeable:true },
    { SkillId:2, name: "Dexterity",    level: 1, currentExp: 0, maxExp: 10, upgradeable:true },
    { SkillId:3, name: "Constitution", level: 1, currentExp: 0, maxExp: 10, upgradeable:true },
    { SkillId:7, name: "Health",       Max: 10, current: 10, currentExp: 0, maxExp: 10, level: 1 },
    { SkillId:8, name: "Stamina",      Max: 10, current: 10, currentExp: 0, maxExp: 10, level: 1 }
];
var SkillPoints = 3;
var playerSkill = Skills.find(skill => skill.SkillId === 0);
var STR = Skills.find(skill => skill.SkillId === 1);
var DEX = Skills.find(skill => skill.SkillId === 2);
var CON = Skills.find(skill => skill.SkillId === 3);
var HP = Skills.find(skill => skill.SkillId === 7);
var STA= Skills.find(skill => skill.SkillId === 8);
var IsDeath = false
var PlayerAttackspeed = 2000;


function updateSkillsDisplay() {
    HealthCheck()
    document.getElementById('player-skill').innerHTML = `Level: ${playerSkill.level}(${playerSkill.currentExp}/${playerSkill.maxExp})`;
    document.getElementById('health-skill').innerHTML = `Health: ${HP.current}/${HP.Max}`;
    document.getElementById('stamina-skill').innerHTML = `Stamina: ${STA.current}/${STA.Max}`;
    document.getElementById('coins-display').innerHTML = `Coins: ${coins}`
}
function AttackDMG() {
    // Calculate base attack damage
    let RNGDamage = Math.ceil(Math.random() * StrCheck())
    let step2dama = Math.ceil(RNGDamage/DexCheck())
    let baseDamage = Math.floor((Math.random() * StrCheck()) / (DexCheck() / 2)) + Math.ceil(StrCheck()/ 2);
    // Sum up the ATT stat from all equipped items
    let equippedAttackBonus = 0;
    Inventory.forEach(item => {
        if (item.inuse && item.ATT) {
            equippedAttackBonus += item.ATT;
        }
    });

    // Add the equipped attack bonus to the base damage
    let totalDamage = baseDamage + equippedAttackBonus;
    if(totalDamage<=0){totalDamage=1}
    return totalDamage;
}
///Stats Check
    //Str check
function StrCheck(){
    let TotalStr = STR.level + EquipStrCheck();
    return TotalStr
}
function EquipStrCheck(){
    let equippedBonus = 0;
    Inventory.forEach(item => {
        if (item.inuse && item.STR) {
            equippedBonus += item.STR;
        }
    });
    return equippedBonus
}

    /// DEX checking
function DexCheck(){
    let totaldex = DEX.level + EquipDexCheck();
    return totaldex
}
function EquipDexCheck(){
    Stat = DEX
    let equippedBonus = 0;
    Inventory.forEach(item => {
        if (item.inuse && item.DEX) {
            equippedBonus += item.DEX;
        }
    });
    return equippedBonus
}

    //CON Checking
function ConCheck(){
    let TotalCon = CON.level + EquipConCheck();
    return TotalCon
}
function EquipConCheck(){
    let equippedBonus = 0;
    Inventory.forEach(item => {
        if (item.inuse && item.CON) {
            equippedBonus += item.CON;
        }
    });
    return equippedBonus
}

function DisplaySkills() {
    let Main = document.getElementById('contentmain');
    selection = "Skills";
    Main.innerHTML = "<span id='topbar'>" + selection + "</span>";
    
    let skillsList = "<div id='skills-list'>";
    let skillPointsStyle = SkillPoints === 0 ? "style='color: red;'" : "";

    skillsList += `<div class='skill'><strong>Skill Points</strong>: <label ${skillPointsStyle}>${SkillPoints}</label></div>`;
    Skills.forEach(skill => {
        switch(skill.SkillId){
            case 0:
                skillsList += `<div class='skill'>
                <strong>Level: </strong>${skill.level} (${skill.currentExp}/${skill.maxExp})`;
                break
            case 1:
                skillsList += `<div class='skill'>
                    <strong>${skill.name}:</strong>  ${skill.level+EquipStrCheck()}(${skill.level}+${EquipStrCheck()})`;
                    break
            case 2:
                skillsList += `<div class='skill'>
                    <strong>${skill.name}:</strong>  ${skill.level+EquipDexCheck()}(${skill.level}+${EquipDexCheck()})`;
                    break
            case 3:
                skillsList += `<div class='skill'>
                    <strong>${skill.name}:</strong>  ${skill.level+EquipConCheck()}(${skill.level}+${EquipConCheck()})`;
                    break
            case 7:
                skillsList += `<div class='skill'>
                    <strong>${skill.name}:</strong>  (${skill.current}/${skill.Max})`;
                        break
            case 8:
                skillsList += `<div class='skill'>
                    <strong>${skill.name}:</strong>  (${skill.current}/${skill.Max})`;
                        break
        }
        if (SkillPoints >= skill.level && skill.upgradeable) {
            skillsList += ` <span class='upgrade-button' onclick='addSkillPoint(${skill.SkillId})'>Add point</span>`;
        }

        skillsList += `</div>`;
    });

    // Conditionally change the color of skill points to red if they are 0
    skillsList += "</div>";

    Main.innerHTML += skillsList;
}


function DisplayTraining() {
    let Main = document.getElementById('contentmain');
    selection = "Training";
    Main.innerHTML = "<span id='topbar'>" + selection + "</span>";
    
    let trainingList = "<div id='training-list'>";
    Skills.forEach(skill => {
        if(skill.upgradeable){
            let shortName = skill.name.substring(0, 3).toUpperCase();
            let trainingCost = (skill.maxExp - skill.currentExp) * skill.level;
            trainingList += `<div class='skill'>
                <strong>${shortName}</strong> - Level: ${skill.level} (${skill.currentExp}/${skill.maxExp})
                (Cost: ${trainingCost} coins)`;
            if (coins >= trainingCost) {
                trainingList += ` <span class='train-button' onclick='trainSkill(${skill.SkillId})'>Train</span>`;
            }
        }
        trainingList += `</div>`;
    });
    trainingList += "</div>";

    Main.innerHTML += trainingList;
}

function addSkillPoint(skillId) {
    let skill = Skills.find(s => s.SkillId === skillId);
    if (SkillPoints >= skill.level && skill) {
        skill.currentExp = skill.maxExp
        SkillPoints -= skill.level;  // Decrease available skill points
        LevelUp(skillId)
        DisplaySkills();   // Refresh the skill list to update the display
        addToConsole(`${skill.name} upgraded to level ${skill.level}`);
    } else {
        addToConsole("No skill points available or invalid skill.");
    }
}
function trainSkill(skillId) {
    let skill = Skills.find(s => s.SkillId === skillId);
    if (skill) {
        // Calculate the cost based on the formula
        let trainingCost = (skill.maxExp - skill.currentExp) * skill.level;

        if (coins >= trainingCost) {
            coins -= trainingCost;          // Deduct coins
            skill.currentExp = skill.maxExp; // Set current EXP to max to trigger level up
            LevelUp(skillId);               // Level up the skill
            DisplayTraining();              // Refresh the training menu
            addToConsole(`Trained ${skill.name} to level ${skill.level} for ${trainingCost} coins.`);
        } else {
            addToConsole("Not enough coins to train this skill.");
        }
    } else {
        addToConsole("Skill not found.");
    }
}
function skillExpGain(skillId, Exp){
    let skill = Skills.find(s => s.SkillId === skillId);
    let level = Skills.find(s => s.name === 'Player');
    skill.currentExp += Exp
    level.currentExp += 1;
    LevelUp(skillId)
    LevelUp(level.SkillId)
}

function LevelUp(skillId){
    let skill = Skills.find(s => s.SkillId === skillId);
    leveled = false
    while(skill.currentExp>=skill.maxExp){
        skill.currentExp-=skill.maxExp
        skill.level++
        skill.maxExp += Math.floor(skill.maxExp/2)
        leveled = true
        if(skillId === 0){
            Addstats()
        }
    }
    if(leveled){
        if(skill.name==="Player"){text = "You have reached lvl "+ skill.level}
        else{text = skill.name+" Reached lvl "+ skill.level}
        addToConsole(`************`)
        addToConsole(text)
        addToConsole(`************`)
    }
    updateSkillsDisplay();        
}
function Addstats(){
    SkillPoints+=2
    HP.current+=  CON.level+playerSkill.level
    HP.Max+=      CON.level+playerSkill.level
    STA.current+= CON.level+playerSkill.level
    STA.Max+=     CON.level+playerSkill.level
    updateSkillsDisplay();
}

// Call this function to initialize the display
document.addEventListener("DOMContentLoaded", function() {
    updateSkillsDisplay();
});
