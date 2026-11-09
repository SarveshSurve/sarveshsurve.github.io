// ===========================================================================
// National parks data. This is the only file you need to edit.
//
// 1. PARKS: change visited: false to visited: true for each park you've been to.
// 2. STATES: list every state you've visited in visitedStates, as a name
//    ("Utah") or a postal code ("UT"). States that contain a park you've
//    visited are added automatically, so you only need to list the others.
// 3. PHOTOS: put one or two photos in the repo and list them under featured.
//    "park" must match a park name below. Photos that fail to load are skipped.
//
// There are 64 national parks (Chiricahua, AZ, became the 64th on Oct 20, 2026).
// If the number changes, add or remove a line in the parks list.
// ===========================================================================
window.NP = {
  visitedStates: [
    "Arizona", "California", "Colorado", "Connecticut",
    "Delaware", "Kansas", "Kentucky", "Maine",
    "Maryland", "Massachusetts", "Missouri", "Nevada",
    "New Hampshire", "New Jersey", "New York", "North Carolina",
    "Ohio", "Pennsylvania", "Rhode Island", "Utah",
    "Vermont", "Virginia", "West Virginia", "Wisconsin"
  ],

  featured: [
    // { park: "Zion", photo: "np_photo_1.jpg", caption: "Short caption" },
    // { park: "Acadia", photo: "np_photo_2.jpg", caption: "Short caption" },
  ],

  parks: [
    { name: "Acadia", st: ["ME"], visited: true },
    { name: "American Samoa", st: ["AS"], visited: false },
    { name: "Arches", st: ["UT"], visited: true },
    { name: "Badlands", st: ["SD"], visited: false },
    { name: "Big Bend", st: ["TX"], visited: false },
    { name: "Biscayne", st: ["FL"], visited: false },
    { name: "Black Canyon of the Gunnison", st: ["CO"], visited: false },
    { name: "Bryce Canyon", st: ["UT"], visited: true },
    { name: "Canyonlands", st: ["UT"], visited: true },
    { name: "Capitol Reef", st: ["UT"], visited: true },
    { name: "Carlsbad Caverns", st: ["NM"], visited: false },
    { name: "Channel Islands", st: ["CA"], visited: false },
    { name: "Chiricahua", st: ["AZ"], visited: false },
    { name: "Congaree", st: ["SC"], visited: false },
    { name: "Crater Lake", st: ["OR"], visited: false },
    { name: "Cuyahoga Valley", st: ["OH"], visited: false },
    { name: "Death Valley", st: ["CA", "NV"], visited: false },
    { name: "Denali", st: ["AK"], visited: false },
    { name: "Dry Tortugas", st: ["FL"], visited: false },
    { name: "Everglades", st: ["FL"], visited: false },
    { name: "Gates of the Arctic", st: ["AK"], visited: false },
    { name: "Gateway Arch", st: ["MO"], visited: false },
    { name: "Glacier", st: ["MT"], visited: false },
    { name: "Glacier Bay", st: ["AK"], visited: false },
    { name: "Grand Canyon", st: ["AZ"], visited: true },
    { name: "Grand Teton", st: ["WY"], visited: false },
    { name: "Great Basin", st: ["NV"], visited: true },
    { name: "Great Sand Dunes", st: ["CO"], visited: false },
    { name: "Great Smoky Mountains", st: ["TN", "NC"], visited: false },
    { name: "Guadalupe Mountains", st: ["TX"], visited: false },
    { name: "Haleakalā", st: ["HI"], visited: false },
    { name: "Hawaiʻi Volcanoes", st: ["HI"], visited: false },
    { name: "Hot Springs", st: ["AR"], visited: false },
    { name: "Indiana Dunes", st: ["IN"], visited: false },
    { name: "Isle Royale", st: ["MI"], visited: false },
    { name: "Joshua Tree", st: ["CA"], visited: true },
    { name: "Katmai", st: ["AK"], visited: false },
    { name: "Kenai Fjords", st: ["AK"], visited: false },
    { name: "Kings Canyon", st: ["CA"], visited: false },
    { name: "Kobuk Valley", st: ["AK"], visited: false },
    { name: "Lake Clark", st: ["AK"], visited: false },
    { name: "Lassen Volcanic", st: ["CA"], visited: false },
    { name: "Mammoth Cave", st: ["KY"], visited: true },
    { name: "Mesa Verde", st: ["CO"], visited: false },
    { name: "Mount Rainier", st: ["WA"], visited: false },
    { name: "New River Gorge", st: ["WV"], visited: true },
    { name: "North Cascades", st: ["WA"], visited: false },
    { name: "Olympic", st: ["WA"], visited: false },
    { name: "Petrified Forest", st: ["AZ"], visited: false },
    { name: "Pinnacles", st: ["CA"], visited: false },
    { name: "Redwood", st: ["CA"], visited: false },
    { name: "Rocky Mountain", st: ["CO"], visited: true },
    { name: "Saguaro", st: ["AZ"], visited: true },
    { name: "Sequoia", st: ["CA"], visited: false },
    { name: "Shenandoah", st: ["VA"], visited: true },
    { name: "Theodore Roosevelt", st: ["ND"], visited: false },
    { name: "Virgin Islands", st: ["VI"], visited: false },
    { name: "Voyageurs", st: ["MN"], visited: false },
    { name: "White Sands", st: ["NM"], visited: false },
    { name: "Wind Cave", st: ["SD"], visited: false },
    { name: "Wrangell–St. Elias", st: ["AK"], visited: false },
    { name: "Yellowstone", st: ["WY", "MT", "ID"], visited: false },
    { name: "Yosemite", st: ["CA"], visited: false },
    { name: "Zion", st: ["UT"], visited: true }
  ]
};
