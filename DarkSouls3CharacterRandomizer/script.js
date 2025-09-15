document.addEventListener('DOMContentLoaded', () => {
    const armorEl = document.getElementById('armor');
    const ring1El = document.getElementById('ring1');
    const ring2El = document.getElementById('ring2');
    const ring3El = document.getElementById('ring3');
    const ring4El = document.getElementById('ring4');
    const weaponEl = document.getElementById('weapon');
    const casterWeaponEl = document.getElementById('caster-weapon');
    const spellsListEl = document.getElementById('spells-list');
    const spellTypeLabelEl = document.getElementById('spell-type-label');
    const casterWeaponSectionEl = document.getElementById('caster-weapon-section');

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
    const rerollSpellsBtn = document.getElementById('reroll-spells');
    const generateLoadoutBtn = document.getElementById('generate-loadout');

    let armorData;
    let ringsData;
    let weaponsData;
    let spellsData;
    let casterWeaponsData;
    let currentSpellType = '';

    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

    function generateArmor() {
        if (!armorData) return;
        const randomArmor = getRandomElement(armorData);
        armorEl.textContent = randomArmor.name;
        armorLink.href = randomArmor.link;
    }

    function generateRing(ringEl, ringLink) {
        if (!ringsData) return;
        const randomRing = getRandomElement(ringsData);
        ringEl.textContent = randomRing.name;
        ringLink.href = randomRing.link;
    }

    function generateWeapon() {
        if (!weaponsData) return;
        const randomWeapon = getRandomElement(weaponsData);
        weaponEl.textContent = randomWeapon.name;
        weaponLink.href = randomWeapon.link;
    }

    function generateSpells() {
        if (!spellsData) return;

        const spellRoll = Math.floor(Math.random() * 4);
        let selectedSpells = [];
        let spellType = '';

        if (spellRoll === 1) { // Sorceries
            spellType = 'Sorcery';
            const sorceries = spellsData.filter(spell => spell.type === 'Sorcery');
            const numberOfSpells = Math.floor(Math.random() * 3) + 1;
            const spellsCopy = [...sorceries];
            for (let i = 0; i < numberOfSpells; i++) {
                if (spellsCopy.length === 0) break;
                const randomIndex = Math.floor(Math.random() * spellsCopy.length);
                selectedSpells.push(spellsCopy.splice(randomIndex, 1)[0]);
            }
        } else if (spellRoll === 2) { // Pyromancies
            spellType = 'Pyromancy';
            const pyromancies = spellsData.filter(spell => spell.type === 'Pyromancy');
            const numberOfSpells = Math.floor(Math.random() * 3) + 1;
            const spellsCopy = [...pyromancies];
            for (let i = 0; i < numberOfSpells; i++) {
                if (spellsCopy.length === 0) break;
                const randomIndex = Math.floor(Math.random() * spellsCopy.length);
                selectedSpells.push(spellsCopy.splice(randomIndex, 1)[0]);
            }
        } else if (spellRoll === 3) { // Miracles
            spellType = 'Miracle';
            const miracles = spellsData.filter(spell => spell.type === 'Miracle');
            const numberOfSpells = Math.floor(Math.random() * 3) + 1;
            const spellsCopy = [...miracles];
            for (let i = 0; i < numberOfSpells; i++) {
                if (spellsCopy.length === 0) break;
                const randomIndex = Math.floor(Math.random() * spellsCopy.length);
                selectedSpells.push(spellsCopy.splice(randomIndex, 1)[0]);
            }
        } else { // None
            spellType = 'None';
        }

        currentSpellType = spellType;
        spellsListEl.innerHTML = '';
        if (selectedSpells.length > 0) {
            selectedSpells.forEach(spell => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${spell.link}" target="_blank">${spell.name}</a>`;
                spellsListEl.appendChild(li);
            });
        }

        spellTypeLabelEl.textContent = `Spells: (${currentSpellType})`;
        generateCasterWeapon();
    }

    function generateCasterWeapon() {
        if (!casterWeaponsData || currentSpellType === 'None') {
            casterWeaponSectionEl.style.display = 'none';
            return;
        }
        casterWeaponSectionEl.style.display = 'block';

        let casterWeaponName = 'None';
        let casterWeaponLink = '#';
        let applicableWeapons = [];

        if (currentSpellType === 'Sorcery') {
            applicableWeapons = casterWeaponsData.filter(weapon => weapon.type === 'Staff');
        } else if (currentSpellType === 'Pyromancy') {
            applicableWeapons = casterWeaponsData.filter(weapon => weapon.type === 'Flame');
        } else if (currentSpellType === 'Miracle') {
            applicableWeapons = casterWeaponsData.filter(weapon => weapon.type === 'Chime' || weapon.type === 'Talisman');
        }

        if (applicableWeapons.length > 0) {
            const randomWeapon = getRandomElement(applicableWeapons);
            casterWeaponName = randomWeapon.name;
            casterWeaponLink = randomWeapon.link;
        }

        casterWeaponEl.textContent = casterWeaponName;
        casterWeaponLink.href = casterWeaponLink;
    }

    function randomizeAll() {
        generateArmor();
        generateRing(ring1El, ring1Link);
        generateRing(ring2El, ring2Link);
        generateRing(ring3El, ring3Link);
        generateRing(ring4El, ring4Link);
        generateWeapon();
        generateSpells();
    }

    Promise.all([
        fetch('/EnigmaMachineRandomizerHub.github.io.dev/DarkSouls3CharacterRandomizer/armor.json').then(res => res.json()),
        fetch('/EnigmaMachineRandomizerHub.github.io.dev/DarkSouls3CharacterRandomizer/rings.json').then(res => res.json()),
        fetch('/EnigmaMachineRandomizerHub.github.io.dev/DarkSouls3CharacterRandomizer/weapons.json').then(res => res.json()),
        fetch('/EnigmaMachineRandomizerHub.github.io.dev/DarkSouls3CharacterRandomizer/spells.json').then(res => res.json()),
        fetch('/EnigmaMachineRandomizerHub.github.io.dev/DarkSouls3CharacterRandomizer/casterWeapons.json').then(res => res.json())
    ]).then(([armor, rings, weapons, spells, casterWeapons]) => {
        armorData = armor;
        ringsData = rings;
        weaponsData = weapons;
        spellsData = spells;
        casterWeaponsData = casterWeapons;

        randomizeAll();

        rerollArmorBtn.addEventListener('click', generateArmor);
        rerollRing1Btn.addEventListener('click', () => generateRing(ring1El, ring1Link));
        rerollRing2Btn.addEventListener('click', () => generateRing(ring2El, ring2Link));
        rerollRing3Btn.addEventListener('click', () => generateRing(ring3El, ring3Link));
        rerollRing4Btn.addEventListener('click', () => generateRing(ring4El, ring4Link));
        rerollWeaponBtn.addEventListener('click', generateWeapon);
        rerollSpellsBtn.addEventListener('click', generateSpells);
        rerollCasterWeaponBtn.addEventListener('click', generateCasterWeapon);
        generateLoadoutBtn.addEventListener('click', randomizeAll);
    }).catch(error => {
        console.error('Error loading data:', error);
        alert('Failed to load necessary data. Please check the console for more details and ensure all .json files are present and correctly formatted.');
    });
});