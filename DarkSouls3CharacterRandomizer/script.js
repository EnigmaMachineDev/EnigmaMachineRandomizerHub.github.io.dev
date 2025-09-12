document.addEventListener('DOMContentLoaded', () => {
    const armorEl = document.getElementById('armor');
    const ring1El = document.getElementById('ring1');
    const ring2El = document.getElementById('ring2');
    const ring3El = document.getElementById('ring3');
    const ring4El = document.getElementById('ring4');
    const weaponEl = document.getElementById('weapon');
    const casterWeaponEl = document.getElementById('caster-weapon');

    const armorLink = document.getElementById('armor-link');
    const ring1Link = document.getElementById('ring1-link');
    const ring2Link = document.getElementById('ring2-link');
    const ring3Link = document.getElementById('ring3-link');
    const ring4Link = document.getElementById('ring4-link');
    const weaponLink = document.getElementById('weapon-link');
    const casterWeaponLink = document.getElementById('caster-weapon-link');

    const rerollArmorBtn = document.getElementById('reroll-armor');
    const rerollRing1Btn = document.getElementById('reroll-ring1');
    const rerollRing2Btn = document.getElementById('reroll-ring2');
    const rerollRing3Btn = document.getElementById('reroll-ring3');
    const rerollRing4Btn = document.getElementById('reroll-ring4');
    const rerollWeaponBtn = document.getElementById('reroll-weapon');
    const rerollCasterWeaponBtn = document.getElementById('reroll-caster-weapon');
    const generateLoadoutBtn = document.getElementById('generate-loadout');

    let data = {};

    fetch('randomizer.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            randomizeAll();
        });

    function getRandomItem(category) {
        const items = data[category];
        return items[Math.floor(Math.random() * items.length)];
    }

    function setItem(element, linkElement, category) {
        const item = getRandomItem(category);
        element.textContent = item.name;
        if (item.link) {
            linkElement.href = item.link;
        } else if (item.url) {
            linkElement.href = item.url;
        }
    }

    function randomizeAll() {
        setItem(armorEl, armorLink, 'Armor');
        setItem(ring1El, ring1Link, 'Rings');
        setItem(ring2El, ring2Link, 'Rings');
        setItem(ring3El, ring3Link, 'Rings');
        setItem(ring4El, ring4Link, 'Rings');
        setItem(weaponEl, weaponLink, 'Weapons');
        setItem(casterWeaponEl, casterWeaponLink, 'CasterWeapons');
    }

    rerollArmorBtn.addEventListener('click', () => setItem(armorEl, armorLink, 'Armor'));
    rerollRing1Btn.addEventListener('click', () => setItem(ring1El, ring1Link, 'Rings'));
    rerollRing2Btn.addEventListener('click', () => setItem(ring2El, ring2Link, 'Rings'));
    rerollRing3Btn.addEventListener('click', () => setItem(ring3El, ring3Link, 'Rings'));
    rerollRing4Btn.addEventListener('click', () => setItem(ring4El, ring4Link, 'Rings'));
    rerollWeaponBtn.addEventListener('click', () => setItem(weaponEl, weaponLink, 'Weapons'));
    rerollCasterWeaponBtn.addEventListener('click', () => setItem(casterWeaponEl, casterWeaponLink, 'CasterWeapons'));
    generateLoadoutBtn.addEventListener('click', randomizeAll);
});