// ===========================================================================
// National parks data. This is the only file you need to edit.
//
// 1. PARKS: change visited: false to visited: true for each park you've been to.
// 2. STATES: list every state you've visited in visitedStates, as a name
//    ("Utah") or a postal code ("UT"). States that contain a park you've
//    visited are added automatically, so you only need to list the others.
// 3. LABELS: every park you mark visited gets a dot and a name on the map.
// 4. PHOTOS: put one or two photos in the repo and list them under featured.
//    "park" must match a park name below. Photos that fail to load are skipped.
//
// "xy" is where the park's dot goes on the map (in the map file's own coordinate
// space, from approximate park centers). Parks outside the map (American Samoa,
// U.S. Virgin Islands) have xy: null and show only in the checklist.
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
    { name: "Acadia", st: ["ME"], xy: [941.2, 110.6], visited: true },
    { name: "American Samoa", st: ["AS"], xy: null, visited: false },
    { name: "Arches", st: ["UT"], xy: [260.6, 287.3], visited: true },
    { name: "Badlands", st: ["SD"], xy: [392, 185.9], visited: false },
    { name: "Big Bend", st: ["TX"], xy: [354.6, 515.4], visited: false },
    { name: "Biscayne", st: ["FL"], xy: [825.4, 574.6], visited: false },
    { name: "Black Canyon of the Gunnison", st: ["CO"], xy: [292.6, 295.3], visited: false },
    { name: "Bryce Canyon", st: ["UT"], xy: [211.2, 306], visited: true },
    { name: "Canyonlands", st: ["UT"], xy: [252.9, 298.5], visited: true },
    { name: "Capitol Reef", st: ["UT"], xy: [230.2, 293.1], visited: true },
    { name: "Carlsbad Caverns", st: ["NM"], xy: [337, 447.3], visited: false },
    { name: "Channel Islands", st: ["CA"], xy: [65.3, 358.8], visited: false },
    { name: "Chiricahua", st: ["AZ"], xy: [242.5, 440.1], visited: false },
    { name: "Congaree", st: ["SC"], xy: [781.8, 394.9], visited: false },
    { name: "Crater Lake", st: ["OR"], xy: [72.2, 149.2], visited: false },
    { name: "Cuyahoga Valley", st: ["OH"], xy: [741.6, 228.3], visited: false },
    { name: "Death Valley", st: ["CA", "NV"], xy: [123.6, 320.2], visited: false },
    { name: "Denali", st: ["AK"], xy: [109.1, 527.6], visited: false },
    { name: "Dry Tortugas", st: ["FL"], xy: [771.6, 606.1], visited: false },
    { name: "Everglades", st: ["FL"], xy: [809.3, 584.8], visited: false },
    { name: "Gates of the Arctic", st: ["AK"], xy: [98.8, 492.6], visited: false },
    { name: "Gateway Arch", st: ["MO"], xy: [600, 303.7], visited: false },
    { name: "Glacier", st: ["MT"], xy: [227.5, 49.6], visited: false },
    { name: "Glacier Bay", st: ["AK"], xy: [166.2, 557.5], visited: false },
    { name: "Grand Canyon", st: ["AZ"], xy: [206.8, 339.9], visited: true },
    { name: "Grand Teton", st: ["WY"], xy: [259.5, 170.2], visited: false },
    { name: "Great Basin", st: ["NV"], xy: [180.3, 267.9], visited: true },
    { name: "Great Sand Dunes", st: ["CO"], xy: [329.3, 318.8], visited: false },
    { name: "Great Smoky Mountains", st: ["TN", "NC"], xy: [725.6, 359.9], visited: false },
    { name: "Guadalupe Mountains", st: ["TX"], xy: [328.2, 452.2], visited: false },
    { name: "Haleakalā", st: ["HI"], xy: [302.9, 562.4], visited: false },
    { name: "Hawaiʻi Volcanoes", st: ["HI"], xy: [323.9, 592.6], visited: false },
    { name: "Hot Springs", st: ["AR"], xy: [552.7, 400.1], visited: false },
    { name: "Indiana Dunes", st: ["IN"], xy: [648.4, 230.4], visited: false },
    { name: "Isle Royale", st: ["MI"], xy: [611.8, 86.6], visited: false },
    { name: "Joshua Tree", st: ["CA"], xy: [128.6, 376.8], visited: true },
    { name: "Katmai", st: ["AK"], xy: [92.5, 566.4], visited: false },
    { name: "Kenai Fjords", st: ["AK"], xy: [113.9, 554.5], visited: false },
    { name: "Kings Canyon", st: ["CA"], xy: [96, 300.7], visited: false },
    { name: "Kobuk Valley", st: ["AK"], xy: [80.6, 493.8], visited: false },
    { name: "Lake Clark", st: ["AK"], xy: [98.9, 546.7], visited: false },
    { name: "Lassen Volcanic", st: ["CA"], xy: [66.9, 205.8], visited: false },
    { name: "Mammoth Cave", st: ["KY"], xy: [674.9, 330.4], visited: true },
    { name: "Mesa Verde", st: ["CO"], xy: [275.1, 325.2], visited: false },
    { name: "Mount Rainier", st: ["WA"], xy: [101.7, 65.2], visited: false },
    { name: "New River Gorge", st: ["WV"], xy: [761.6, 303.3], visited: true },
    { name: "North Cascades", st: ["WA"], xy: [120.9, 27.3], visited: false },
    { name: "Olympic", st: ["WA"], xy: [82.7, 33.4], visited: false },
    { name: "Petrified Forest", st: ["AZ"], xy: [245.2, 369.8], visited: false },
    { name: "Pinnacles", st: ["CA"], xy: [48, 295.7], visited: false },
    { name: "Redwood", st: ["CA"], xy: [31.4, 176.3], visited: false },
    { name: "Rocky Mountain", st: ["CO"], xy: [332.4, 259], visited: true },
    { name: "Saguaro", st: ["AZ"], xy: [216.6, 430.7], visited: true },
    { name: "Sequoia", st: ["CA"], xy: [94, 307.5], visited: false },
    { name: "Shenandoah", st: ["VA"], xy: [806.5, 280.2], visited: true },
    { name: "Theodore Roosevelt", st: ["ND"], xy: [382.3, 112], visited: false },
    { name: "Virgin Islands", st: ["VI"], xy: null, visited: false },
    { name: "Voyageurs", st: ["MN"], xy: [545.4, 81.3], visited: false },
    { name: "White Sands", st: ["NM"], xy: [305.5, 430.2], visited: false },
    { name: "Wind Cave", st: ["SD"], xy: [375.7, 188.9], visited: false },
    { name: "Wrangell–St. Elias", st: ["AK"], xy: [142.4, 542.4], visited: false },
    { name: "Yellowstone", st: ["WY", "MT", "ID"], xy: [265.2, 152.4], visited: false },
    { name: "Yosemite", st: ["CA"], xy: [84.6, 273.1], visited: false },
    { name: "Zion", st: ["UT"], xy: [195.3, 309.9], visited: true }
  ]
};
