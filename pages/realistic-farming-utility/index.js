"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let contentJSON;
let fileUpload = document.getElementById("file-upload");
let generateBtn = document.getElementById("generate");
fileUpload.addEventListener("change", (e) => __awaiter(void 0, void 0, void 0, function* () {
    contentJSON = yield parseJsonFile(e.target.files[0]);
    console.log(contentJSON);
    generateBtn.style.display = "";
    initUtility();
}));
const initUtility = () => {
    let totalSeasonCrops = {
        spring: [],
        summer: [],
        fall: [],
        winter: [],
    };
    Object.keys(cropData).forEach((seedIdx) => {
        var _a;
        console.log(cropData[seedIdx]);
        console.log(seedData[seedIdx]);
        const cropDataArr = cropData[seedIdx].split("/");
        const seedDataArr = (_a = seedData[seedIdx]) === null || _a === void 0 ? void 0 : _a.split("/");
        //crop data
        // const _CropGrowthStagesArr: string[] = cropDataArr[0].split(" ");
        // const _CropTotalGrowthStages: number = _CropGrowthStagesArr.length;
        const _CropGrowthSeasons = cropDataArr[1].split(" ");
        // const _CropSpriteIndex: number = cropDataArr[2];
        const _CropHarvestIndex = cropDataArr[3];
        // const _CropRegrowthTime: number = cropDataArr[4];
        // const _CropHarvestMethod: number = cropDataArr[5];
        // const _CropChanceForExtraHarvest: string[] = cropDataArr[6].split(" ");
        // const _CropRaisedSeeds: boolean = cropDataArr[7];
        // const _CropTintColor = cropDataArr[8];
        // //seed data
        // const _SeedInternalName = seedDataArr[0];
        // const _SeedSellPrice = seedDataArr[1];
        // const _SeedEdibility = seedDataArr[2];
        // const _SeedCategory = seedDataArr[3];
        // const _SeedDisplayName = seedDataArr[4];
        // const _SeedDescription = seedDataArr[5];
        _CropGrowthSeasons.forEach((season) => {
            var _a;
            totalSeasonCrops[season].push(((_a = harvestData[_CropHarvestIndex]) === null || _a === void 0 ? void 0 : _a.split("/")[0]) +
                " - " +
                _CropHarvestIndex);
        });
    });
    console.log({ totalSeasonCrops });
};
generateBtn.addEventListener("click", () => {
    saveTemplateAsFile("content.json", contentJSON);
});
function parseJsonFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve(JSON.parse(e.target.result.toString()));
            };
            fileReader.onerror = (error) => reject(error);
            fileReader.readAsText(file);
        });
    });
}
const saveTemplateAsFile = (filename, dataObjToWrite) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite)], {
        type: "text/json",
    });
    const link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");
    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    link.dispatchEvent(evt);
    link.remove();
};
const cropData = {
    299: "1 1 1 2/summer/39/300/3/1/false/false/false",
    301: "1 1 2 2 2/fall/38/398/4/0/true 1 1 0 .2/true/false",
    302: "2 3 3 3 4/summer fall/37/304/3/0/false/true/false",
    425: "1 4 4 3/fall/31/595/-1/0/false/false/true 187 0 255 119 137 255 71 227 255 255 127 144 205 178 255 140 119 255",
    427: "2 2 2 2/spring/26/591/-1/0/false/false/true 255 186 255 223 191 255 255 246 0 255 80 0 255 158 193",
    429: "1 2 2 2/spring/27/597/-1/0/false/false/true 35 127 255 109 131 255 112 207 255 191 228 255 94 121 255 40 150 255",
    431: "2 2 2 2/summer/30/421/-1/0/false/false/false",
    433: "5 5 5 5 6/spring summer fall/40/433/4/0/true 3 3 0 .02/false/false",
    453: "1 2 2 2/summer/28/376/-1/0/false/false/true 255 0 0 254 254 254 255 170 0",
    455: "1 2 3 2/summer/29/593/-1/0/false/false/true 0 208 255 99 255 210 255 212 0 255 144 122 255 0 238 206 91 255",
    472: "3 4 4 4/spring/0/24/-1/0/true 1 1 0 .2/false/false",
    473: "1 1 1 1 2/spring/1/188/3/0/false/true/false",
    474: "3 4 4 5 5/spring summer/2/190/7/0/false/false/false",
    475: "1 2 2 2 2/spring/3/192/-1/0/true 1 1 0 .2/false/false",
    476: "6 7 7 7/spring winter/4/248/-1/0/false/false/false",
    477: "1 2 2 2/spring fall/5/250/5/1/true 1 1 0 .03/false/false",
    478: "1 2 2 2 2/spring fall/6/252/-1/0/false/false/false",
    479: "4 4 4 5 5/spring summer fall/7/254/10/0/false/false/false",
    480: "1 2 2 2 2/summer/8/256/4/0/true 1 1 0 .05/false/false",
    481: "1 2 2 3 2/summer/9/258/5/0/true 3 3 0 .02/false/false",
    482: "1 2 4 4 4/summer/10/260/3/0/true 1 1 0 .03/false/false",
    483: "7 7 7 7/spring summer fall winter/11/262/-1/1/false/false/false",
    484: "1 1 1 1/spring/12/264/-1/0/true 1 1 0 .2/false/false",
    485: "1 1 1 2 2/summer fall/13/266/4/0/false/false/false",
    486: "3 4 4 4 4/summer fall/14/268/-1/0/false/false/false",
    487: "2 1 1 1 1/summer fall/15/270/-1/0/false/false/false",
    488: "1 1 1 1 1/summer fall/16/272/5/0/true 1 1 0 .002/false/false",
    489: "2 2 1 2 1/spring fall/17/274/4/0/false/false/false",
    490: "1 2 3 3 3/fall/18/276/10/0/false/false/false",
    491: "1 1 1 1/spring fall/19/278/3/0/false/false/false",
    492: "1 3 3 3/fall/20/280/-1/0/true 1 1 0 .1/false/false",
    493: "1 1 1 1 2/fall/21/282/5/0/true 2 2 0 .1/false/false",
    494: "1 1 2 2/spring fall/22/284/4/0/true 1 1 0 .2/false/false",
    347: "2 4 6 6 6/spring winter/32/417/-1/0/false/false/false",
    495: "3 4/spring/23/16/-1/0/false/false/false",
    496: "3 4/summer/23/396/-1/0/false/false/false",
    497: "3 4/fall/23/404/-1/0/false/false/false",
    498: "3 4/winter/23/412/-1/0/false/false/false",
    499: "3 6 7 7 5/summer fall/24/454/14/0/false/false/false",
    745: "1 2 2 2 2/spring summer/36/400/5/0/true 1 1 0 .02/false/false",
    802: "3 3 3 3 3/summer fall winter/41/90/5/0/false/false/false",
    831: "1 2 3 4/summer/42/830/-1/0/true 1 1 0 .2/false/false",
    833: "2 4 4 4 4/spring summer/43/832/-1/0/false/false/false",
    885: "1 2 2 2/spring summer fall winter/44/771/-1/1/true 4 7 0 .01/false/false",
    890: "1 1 1 1/spring summer fall winter/47/889/-1/0/false/false/false",
};
const seedData = {
    299: "Amaranth Seeds/35/-300/Seeds -74/Amaranth Seeds/Plant these in the summer. Takes 5 days to grow and continues to produce after first harvest.",
    301: "Grape Starter/30/-300/Seeds -74/Grape Starter/Plant these in the fall. Takes 8 days to grow and continues to produce after first harvest. Grows on a trellis.",
    302: "Hops Starter/30/-300/Seeds -74/Hops Starter/Plant these in summer or fall. Takes 15 days to grow and continues to produce after first harvest. Grows on a trellis.",
    347: "Rare Seed/200/-300/Seeds -74/Rare Seed/Sow in winter or spring. Takes almost all season to grow.",
    425: "Fairy Seeds/100/-300/Seeds -74/Fairy Seeds/Plant in fall. Takes 12 days to produce a mysterious flower. Assorted Colors.",
    427: "Tulip Bulb/10/-300/Seeds -74/Tulip Bulb/Plant in spring. Takes 8 days to produce a colorful flower.",
    429: "Jazz Seeds/15/-300/Seeds -74/Jazz Seeds/Plant in spring. Takes 7 days to produce a blue puffball flower.",
    431: "Sunflower Seeds/20/-300/Seeds -74/Sunflower Seeds/Plant in summer. Takes 8 days to produce a large sunflower. Yields more seeds at harvest.",
    433: "Coffee Bean/15/-300/Seeds -74/Coffee Bean/Plant in spring, summer, or fall to grow a coffee plant. Place five beans in a keg to make coffee.",
    453: "Poppy Seeds/50/-300/Seeds -74/Poppy Seeds/Plant in summer. Produces a bright red flower in 7 days.",
    455: "Spangle Seeds/25/-300/Seeds -74/Spangle Seeds/Plant in summer. Takes 8 days to produce a vibrant tropical flower. Assorted colors.",
    472: "Parsnip Seeds/10/-300/Seeds -74/Parsnip Seeds/Plant these in the spring. Takes 15 days to mature.",
    473: "Bean Starter/30/-300/Seeds -74/Bean Starter/Plant these in the spring. Takes 6 days to mature and continues to produce after first harvest. Grows on a trellis.",
    474: "Cauliflower Seeds/40/-300/Seeds -74/Cauliflower Seeds/Plant these in spring or summer. Takes 21 days to grow and continues to produce after first harvest.",
    475: "Potato Seeds/25/-300/Seeds -74/Potato Seeds/Plant these in the spring. Takes 9 days to mature and has a chance of yielding multiple potatoes at harvest.",
    476: "Garlic Seeds/20/-300/Seeds -74/Garlic Seeds/Plant these in winter or spring. Takes 27 days to mature.",
    477: "Kale Seeds/35/-300/Seeds -74/Kale Seeds/Plant these in spring or fall. Takes 7 days to mature and continues to produce after first harvest.",
    478: "Rhubarb Seeds/50/-300/Seeds -74/Rhubarb Seeds/Plant these in spring or fall. Takes 9 days to mature.",
    479: "Melon Seeds/40/-300/Seeds -74/Melon Seeds/Plant these in spring, summer, or fall. Takes 22 days to mature and continues to produce after first harvest.",
    480: "Tomato Seeds/25/-300/Seeds -74/Tomato Seeds/Plant these in the summer. Takes 9 days to mature and continues to produce after first harvest.",
    481: "Blueberry Seeds/40/-300/Seeds -74/Blueberry Seeds/Plant these in the summer. Takes 10 days to mature and continues to produce after first harvest.",
    482: "Pepper Seeds/20/-300/Seeds -74/Pepper Seeds/Plant these in the summer. Takes 15 days to mature and continues to produce after first harvest.",
    483: "Wheat Seeds/5/-300/Seeds -74/Wheat Seeds/Plant these in any season. Takes 28 days to mature. Harvest with the scythe.",
    484: "Radish Seeds/20/-300/Seeds -74/Radish Seeds/Plant these in the spring. Takes 4 days to mature.",
    485: "Red Cabbage Seeds/50/-300/Seeds -74/Red Cabbage Seeds/Plant these in summer or fall. Takes 7 days to mature and continues to produce after first harvest.",
    486: "Starfruit Seeds/200/-300/Seeds -74/Starfruit Seeds/Plant these in summer or fall. Takes 19 days to mature.",
    487: "Corn Seeds/75/-300/Seeds -74/Corn Seeds/Plant these in the summer or fall. Takes 6 days to mature.",
    488: "Eggplant Seeds/10/-300/Seeds -74/Eggplant Seeds/Plant these in summer or fall. Takes 5 days to mature and continues to produce after first harvest.",
    489: "Artichoke Seeds/15/-300/Seeds -74/Artichoke Seeds/Plant these in spring or fall. Takes 8 days to mature and continues to produce after first harvest.",
    490: "Pumpkin Seeds/50/-300/Seeds -74/Pumpkin Seeds/Plant these in the fall. Takes 12 days to mature and continues to produce after first harvest.",
    491: "Bok Choy Seeds/25/-300/Seeds -74/Bok Choy Seeds/Plant these in spring or fall. Takes 4 days to mature and continues to produce after first harvest.",
    492: "Yam Seeds/30/-300/Seeds -74/Yam Seeds/Plant these in the fall. Takes 10 days to mature.",
    493: "Cranberry Seeds/120/-300/Seeds -74/Cranberry Seeds/Plant these in the fall. Takes 6 days to mature and continues to produce after first harvest.",
    494: "Beet Seeds/10/-300/Seeds -74/Beet Seeds/Plant these in spring or fall. Takes 6 days to mature.",
    495: "Spring Seeds/35/-300/Seeds -74/Spring Seeds/An assortment of wild spring seeds.",
    496: "Summer Seeds/55/-300/Seeds -74/Summer Seeds/An assortment of wild summer seeds.",
    497: "Fall Seeds/45/-300/Seeds -74/Fall Seeds/An assortment of wild fall seeds.",
    498: "Winter Seeds/30/-300/Seeds -74/Winter Seeds/An assortment of wild winter seeds.",
    499: "Ancient Seeds/30/-300/Seeds -74/Ancient Seeds/Plant these in summer or fall.",
    745: "Strawberry Seeds/0/-300/Seeds -74/Strawberry Seeds/Plant these in spring or summer. Takes 9 days to mature and continues to produce after first harvest.",
    802: "Cactus Seeds/0/-300/Seeds -74/Cactus Seeds/Can only be grown indoors. Takes 15 days to mature and continues to produce after first harvest.",
    831: "Taro Tuber/20/-300/Seeds -74/Taro Tuber/Plant these in warm weather. Takes 10 days to mature. Grows faster if planted near a body of water.",
    833: "Pineapple Seeds/240/-300/Seeds -74/Pineapple Seeds/Plant these in warm weather. Takes 18 days to mature.",
};
const harvestData = {
    24: "Parsnip/35/10/Basic -75/Parsnip/A spring tuber closely related to the carrot. It has an earthy taste and is full of nutrients.",
    90: "Cactus Fruit/75/30/Basic -79/Cactus Fruit/The sweet fruit of the prickly pear cactus.",
    188: "Green Bean/40/10/Basic -75/Green Bean/A juicy little bean with a cool, crisp snap.",
    190: "Cauliflower/175/30/Basic -75/Cauliflower/Valuable, but slow-growing. Despite its pale color, the florets are packed with nutrients.",
    192: "Potato/80/10/Basic -75/Potato/A widely cultivated tuber.",
    248: "Garlic/60/8/Basic -75/Garlic/Adds a wonderful zestiness to dishes. High quality garlic can be pretty spicy.",
    250: "Kale/110/20/Basic -75/Kale/The waxy leaves are great in soups and stir frys.",
    252: "Rhubarb/220/-300/Basic -79/Rhubarb/The stalks are extremely tart, but make a great dessert when sweetened.",
    254: "Melon/250/45/Basic -79/Melon/A cool, sweet summer treat.",
    256: "Tomato/60/8/Basic -75/Tomato/Rich and slightly tangy, the Tomato has a wide variety of culinary uses.",
    258: "Blueberry/50/10/Basic -79/Blueberry/A popular berry reported to have many health benefits. The blue skin has the highest nutrient concentration.",
    260: "Hot Pepper/40/5/Basic -79/Hot Pepper/Fiery hot with a hint of sweetness.",
    262: "Wheat/25/-300/Basic -75/Wheat/One of the most widely cultivated grains. Makes a great flour for breads and cakes.",
    264: "Radish/90/18/Basic -75/Radish/A crisp and refreshing root vegetable with hints of pepper when eaten raw.",
    266: "Red Cabbage/260/30/Basic -75/Red Cabbage/Often used in salads and coleslaws. The color can range from purple to blue to green-yellow depending on soil conditions.",
    268: "Starfruit/750/50/Basic -79/Starfruit/An extremely juicy fruit that grows in hot, humid weather. Slightly sweet with a sour undertone.",
    270: "Corn/50/10/Basic -75/Corn/One of the most popular grains. The sweet, fresh cobs are a summer favorite.",
    272: "Eggplant/60/8/Basic -75/Eggplant/A rich and wholesome relative of the tomato. Delicious fried or stewed.",
    274: "Artichoke/160/12/Basic -75/Artichoke/The bud of a thistle plant. The spiny outer leaves conceal a fleshy, filling interior.",
    276: "Pumpkin/320/-300/Basic -75/Pumpkin/A fall favorite, grown for its crunchy seeds and delicately flavored flesh. As a bonus, the hollow shell can be carved into a festive decoration.",
    278: "Bok Choy/80/10/Basic -75/Bok Choy/The leafy greens and fibrous stalks are healthy and delicious.",
    280: "Yam/160/18/Basic -75/Yam/A starchy tuber with a lot of culinary versatility.",
    282: "Cranberries/75/15/Basic -79/Cranberries/These tart red berries are a traditional winter food.",
    284: "Beet/100/12/Basic -75/Beet/A sweet and earthy root vegetable. As a bonus, the leaves make a great salad.",
    300: "Amaranth/150/20/Basic -75/Amaranth/A purple grain cultivated by an ancient civilization.",
    304: "Hops/25/18/Basic -75/Hops/A bitter, tangy flower used to flavor beer.",
    376: "Poppy/140/18/Basic -80/Poppy/In addition to its colorful flower, the Poppy has culinary and medicinal uses.",
    398: "Grape/80/15/Basic -79/Grape/A sweet cluster of fruit.",
    400: "Strawberry/120/20/Basic -79/Strawberry/A sweet, juicy favorite with an appealing red color.",
    417: "Sweet Gem Berry/3000/-300/Basic -17/Sweet Gem Berry/It's by far the sweetest thing you've ever smelled.",
    421: "Sunflower/80/18/Basic -80/Sunflower/A common misconception is that the flower turns so it's always facing the sun.",
    433: "Coffee Bean/15/-300/Seeds -74/Coffee Bean/Plant in spring or summer to grow a coffee plant. Place five beans in a keg to make coffee.",
    454: "Ancient Fruit/550/-300/Basic -79/Ancient Fruit/It's been dormant for eons.",
    591: "Tulip/30/18/Basic -80/Tulip/The most popular spring flower. Has a very faint sweet smell.",
    593: "Summer Spangle/90/18/Basic -80/Summer Spangle/A tropical bloom that thrives in the humid summer air. Has a sweet, tangy aroma.",
    595: "Fairy Rose/290/18/Basic -80/Fairy Rose/An old folk legend suggests that the sweet smell of this flower attracts fairies.",
    597: "Blue Jazz/50/18/Basic -80/Blue Jazz/The flower grows in a sphere to invite as many butterflies as possible.",
    815: "Tea Leaves/50/-300/Basic -75/Tea Leaves/The young leaves of the tea plant. Can be brewed into the popular, energizing beverage.",
    830: "Taro Root/100/15/Basic -75/Taro Root/This starchy root is one of the most ancient crops.",
    832: "Pineapple/300/55/Basic -79/Pineapple/A sweet and tangy tropical treat.",
};
const goodsData = {
    303: "Pale Ale/300/20/Basic -26/Pale Ale/Drink in moderation./drink/0 0 0 0 0 0 0 0 0 0 0/0",
    340: "Honey/100/-300/Basic -26/Honey/It's a sweet syrup produced by bees.",
    346: "Beer/200/20/Basic -26/Beer/Drink in moderation./drink/0 0 0 0 0 0 0 0 0 0 0/0",
    395: "Coffee/150/1/Crafting/Coffee/It smells delicious. This is sure to give you a boost./drink/0 0 0 0 0 0 0 0 0 1 0/120",
    459: "Mead/200/30/Basic -26/Mead/A fermented beverage made from honey. Drink in moderation./drink/0 0 0 0 0 0 0 0 0 0 0/0",
    614: "Green Tea/100/5/Basic -26/Green Tea/A pleasant, energizing beverage made from lightly processed tea leaves./drink/0 0 0 0 0 0 0 30 0 0 0/360",
};
