"use strict";

let contentJSON;
let itemData = {};

function initUtility() {
  let seasonCrops = {
    spring: [],
    summer: [],
    fall: [],
    winter: [],
  };

  const cropGrowthRanges = {
    short: {
      min: Number(shortCropRangeMinEl.value),
      max: Number(shortCropRangeMaxEl.value),
    },
    medium: {
      min: Number(mediumCropRangeMinEl.value),
      max: Number(mediumCropRangeMaxEl.value),
    },
    long: {
      min: Number(longCropRangeMinEl.value),
      max: Number(longCropRangeMaxEl.value),
    },
  };

  //gold per day price multipliers based on if a crop can regrow or not
  // const priceMultiplier = {
  //   regular: {
  //     crop: getRandomIntegerInRange(Number(regularGPDCropPriceMultiplierMinEl.value), Number(regularGPDCropPriceMultiplierMaxEl.value)),
  //     seed: getRandomIntegerInRange(Number(regularGPDSeedPriceMultiplierMinEl.value), Number(regularGPDSeedPriceMultiplierMaxEl.value)),
  //   },
  //   regrow: {
  //     crop: getRandomIntegerInRange(Number(regrowthGPDCropPriceMultiplierMinEl.value), Number(regrowthGPDCropPriceMultiplierMaxEl.value)),
  //     seed: getRandomIntegerInRange(Number(regrowthGPDSeedPriceMultiplierMinEl.value), Number(regrowthGPDSeedPriceMultiplierMaxEl.value)),
  //   },
  // };

  //separate each crop/seed into seasons
  for (const seedIdx in baseData.cropData) {
    baseData.cropData[seedIdx]
      .split("/")[1]
      .split(" ")
      .forEach((season) => {
        seasonCrops[season].push(seedIdx);
      });
  }

  console.log("Seed Indexes Per Season:");
  console.log(seasonCrops);

  //loop through each season
  for (const season in seasonCrops) {
    console.log(season.toUpperCase());

    const seasonCropPool = shuffleArray(seasonCrops[season]);
    const totalSeasonCrops = seasonCropPool.length;

    //set number of crops per season that are allowed to regrow or have extra harvest yields
    const totalExtraYieldCropsMultiplier = parseFloat(totalExtraYieldCropsMultiplierEl.value).toFixed(2);
    let totalExtraYieldCrops = Math.ceil(totalSeasonCrops * (totalExtraYieldCropsMultiplier * 0.01));
    const totalRegrowthCropsPercentage = Number(totalRegrowthCropsPercentageEl.value);
    let totalRegrowthCrops = Math.ceil(totalSeasonCrops * (totalRegrowthCropsPercentage * 0.01));
    console.log("Total regrowth crops for season: ", totalRegrowthCrops);

    //set how many crops per season will fall into short, medium, and long-term harvests
    const totalShortCropsPercentage = Number(totalShortCropsPercentageEl.value) * 0.01;
    const totalLongCropsPercentage = Number(totalLongCropsPercentageEl.value) * 0.01;
    let totalShortCrops = Math.ceil(totalSeasonCrops * totalShortCropsPercentage);
    let totalLongCrops = Math.ceil(totalSeasonCrops * totalLongCropsPercentage);
    //medium crop percentage will end up being percentage (difference) leftover after removing long and short crop percentages
    const totalMediumCropsPercentage = 1 - (totalShortCropsPercentage + totalLongCropsPercentage);
    let totalMediumCrops = Math.ceil(totalSeasonCrops * totalMediumCropsPercentage);

    const totalCropTypeSums = totalShortCrops + totalMediumCrops + totalLongCrops;

    //if the sum of calculated harvest categories does not equal actual crops in season
    //remove/add difference from medium harvest length crops
    if (totalCropTypeSums > totalSeasonCrops) totalMediumCrops -= totalCropTypeSums - totalSeasonCrops;
    if (totalCropTypeSums < totalSeasonCrops) totalMediumCrops += totalSeasonCrops - totalCropTypeSums;
    console.log("season crop type totals: ", { totalShortCrops, totalMediumCrops, totalLongCrops });
    console.log("total crops per season: ", totalShortCrops + totalMediumCrops + totalLongCrops);

    //loop through each season array of crop/seed indexes
    for (let seasonCropIdx = 0; seasonCropIdx < seasonCropPool.length; seasonCropIdx++) {
      console.log("_______________________");
      const seedIdx = seasonCropPool[seasonCropIdx];
      const objId = baseData.cropData[seedIdx].split("/")[3];
      let item = {
        cropData: baseData.cropData[seedIdx].split("/"),
        seedObjectData: baseData.seedObjectData[seedIdx].split("/"),
        cropObjectData: baseData.cropObjectData[objId].split("/"),
      };
      console.log(item.cropObjectData[0]);

      //generate random growth (harvest) times for different crops
      //manually set Parsnip to be a short-term crop since it's the only crop
      //you have access to start making money from at the start of new game
      let totalGrowthTime = getRandomIntegerInRange(cropGrowthRanges.medium.min, cropGrowthRanges.medium.max);
      if (totalShortCrops || seedIdx === "472") {
        //for all crops that are NOT Parsnip
        if (seedIdx !== "472") {
          totalGrowthTime = getRandomIntegerInRange(cropGrowthRanges.short.min, cropGrowthRanges.short.max);
        } else {
          //for Parsnip
          totalGrowthTime = 4;
        }
        totalShortCrops--;
      } else if (totalLongCrops) {
        totalGrowthTime = getRandomIntegerInRange(cropGrowthRanges.long.min, cropGrowthRanges.long.max);
        totalLongCrops--;
      }
      console.log("total growth time: ", totalGrowthTime, " days");

      //dynamically generate growth stages
      let growthStagesArr = item.cropData[0].split(" ");
      let averageGrowthStageDays = Math.floor(totalGrowthTime / growthStagesArr.length);
      growthStagesArr.map((_val, idx, arr) => (arr[idx] = averageGrowthStageDays));

      for (let i = 0; i < growthStagesArr.length; i++) {
        growthStagesArr[i] = averageGrowthStageDays;
      }

      //if total sum of growth stages is less than total grow time, remove the difference from last stage
      const growthStagesSum = growthStagesArr.reduce((prev, curr) => prev + curr, 0);
      const lastGrowthStageIdx = growthStagesArr.length - 1;
      if (growthStagesSum < totalGrowthTime) {
        growthStagesArr[lastGrowthStageIdx] += totalGrowthTime - growthStagesSum;
      }

      //if last growth stage is at least 2 days higher than previous day,
      //distribute excess to previous day
      const growthDayDiff = growthStagesArr[lastGrowthStageIdx] - growthStagesArr[lastGrowthStageIdx - 1];
      if (growthDayDiff > 1) {
        growthStagesArr[lastGrowthStageIdx]--;
        growthStagesArr[lastGrowthStageIdx - 1]++;
      }
      //shuffles array so growth stage positions are randomized
      item.cropData[0] = shuffleArray(growthStagesArr).join(" ");

      //set up dynamic description for seeds
      let cropSeasons = item.cropData[1]
        .split(" ")
        .map((season) => capitalize(season))
        .join(", ");
      let seedDescription = `Plant these in ${replaceLast(cropSeasons, ",", " or")}. `;
      seedDescription += `Takes ${totalGrowthTime} ${totalGrowthTime < 2 ? "day" : "days"} to mature`;

      //if crop is regrowth capable or on a trellis
      const isTrellisCrop = JSON.parse(item.cropData[7]);
      if (totalRegrowthCrops || isTrellisCrop) {
        //if more crops are allowed to be given regrowth capabilities, set regrowth time to be between 25% - 35% of total grow time.
        item.cropData[4] = Math.ceil(totalGrowthTime * getRandomFloatInRange(0.25, 0.42));
        console.log("regrowth: ", item.cropData[4], "days");

        //set crop and seed sell prices
        const seedPriceMultiplier = getRandomIntegerInRange(Number(regrowthGPDSeedPriceMultiplierMinEl.value), Number(regrowthGPDSeedPriceMultiplierMaxEl.value));
        const cropPriceMultiplier = getRandomIntegerInRange(Number(regrowthGPDCropPriceMultiplierMinEl.value), Number(regrowthGPDCropPriceMultiplierMaxEl.value));
        item.seedObjectData[1] = Math.ceil(totalGrowthTime * seedPriceMultiplier);
        item.cropObjectData[1] = Math.ceil(totalGrowthTime * cropPriceMultiplier);
        console.log("seed price multiplier: ", seedPriceMultiplier);
        console.log("crop price multiplier: ", cropPriceMultiplier);
        console.log(`seed purchase price (total growth time x seed price multiplier): ${item.seedObjectData[1]}g`);
        console.log(`crop sell price     (total growth time x crop price multiplier): ${item.cropObjectData[1]}g`);

        //append season text with regrowth verbiage
        seedDescription += `, but keeps producing after that.${isTrellisCrop ? " Grows on a trellis." : ""}`;
        totalRegrowthCrops--;
      } else {
        //if crop is NOT regrowth capable, set crop to not regrow
        item.cropData[4] = -1;
        console.log("no regrowth");

        //set crop and seed sell prices
        const seedPriceMultiplier = getRandomIntegerInRange(Number(regularGPDSeedPriceMultiplierMinEl.value), Number(regularGPDSeedPriceMultiplierMaxEl.value));
        const cropPriceMultiplier = getRandomIntegerInRange(Number(regularGPDCropPriceMultiplierMinEl.value), Number(regularGPDCropPriceMultiplierMaxEl.value));
        item.seedObjectData[1] = Math.ceil(totalGrowthTime * seedPriceMultiplier);
        item.cropObjectData[1] = Math.ceil(totalGrowthTime * cropPriceMultiplier);
        console.log("seed price multiplier: ", seedPriceMultiplier);
        console.log("crop price multiplier: ", cropPriceMultiplier);
        console.log(`seed purchase price (total growth time x seed price multiplier): ${item.seedObjectData[1]}g`);
        console.log(`crop sell price     (total growth time x crop price multiplier): ${item.cropObjectData[1]}g`);

        //append period to season text
        seedDescription += `.`;
      }

      //store updated
      item.seedObjectData[5] = seedDescription;
      console.log("seed description: ", seedDescription);

      // if crop is allowed to have extra chance for multiple harvesting
      const allowRandomExtraYields = allowRandomExtraYieldsEl.checked;
      if (allowRandomExtraYields && totalExtraYieldCrops) {
        let minHarvest = getRandomIntegerInRange(1, 3);
        let maxHarvest = getRandomIntegerInRange(minHarvest, 3);
        let chanceForExtraCrops = getRandomFloatInRange(0.1, 0.3);
        item.cropData[6] = `true ${minHarvest} ${maxHarvest} 0 ${chanceForExtraCrops}`;

        //reduce crop sell price due to multiple harvest chance
        item.cropObjectData[1] = Math.ceil(item.cropObjectData[1] * (1 - chanceForExtraCrops));

        totalExtraYieldCrops--;
      }
      setItemData(seedIdx, item);
    }
    console.log("------ End Season ------");
  }

  function setItemData(seedIdx, item) {
    itemData[seedIdx] = item;
    console.log(seedIdx, ":", item);
  }
}

async function parseJsonFile(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(JSON.parse(e.target.result.toString()));
    };
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
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

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloatInRange(min, max) {
  return parseFloat(Math.random() * (max - min) + min).toFixed(2);
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function replaceLast(string, search, replace) {
  return string.replace(new RegExp(search + "([^" + search + "]*)$"), replace + "$1");
}

//get elements from HTML
const saveBtn = document.getElementById("saveBtn");
const fileUpload = document.getElementById("file-upload");
const totalRegrowthCropsPercentageEl = document.getElementById("totalRegrowthCropsPercentage");
const totalShortCropsPercentageEl = document.getElementById("totalShortCropsPercentage");
const totalLongCropsPercentageEl = document.getElementById("totalLongCropsPercentage");
const shortCropRangeMinEl = document.getElementById("shortCropRangeMin");
const shortCropRangeMaxEl = document.getElementById("shortCropRangeMax");
const mediumCropRangeMinEl = document.getElementById("mediumCropRangeMin");
const mediumCropRangeMaxEl = document.getElementById("mediumCropRangeMax");
const longCropRangeMinEl = document.getElementById("longCropRangeMin");
const longCropRangeMaxEl = document.getElementById("longCropRangeMax");
const regularGPDCropPriceMultiplierMinEl = document.getElementById("regularGPDCropPriceMultiplierMin");
const regularGPDCropPriceMultiplierMaxEl = document.getElementById("regularGPDCropPriceMultiplierMax");
const regularGPDSeedPriceMultiplierMinEl = document.getElementById("regularGPDSeedPriceMultiplierMin");
const regularGPDSeedPriceMultiplierMaxEl = document.getElementById("regularGPDSeedPriceMultiplierMax");
const regrowthGPDCropPriceMultiplierMinEl = document.getElementById("regrowthGPDCropPriceMultiplierMin");
const regrowthGPDCropPriceMultiplierMaxEl = document.getElementById("regrowthGPDCropPriceMultiplierMax");
const regrowthGPDSeedPriceMultiplierMinEl = document.getElementById("regrowthGPDSeedPriceMultiplierMin");
const regrowthGPDSeedPriceMultiplierMaxEl = document.getElementById("regrowthGPDSeedPriceMultiplierMax");
const allowRandomExtraYieldsEl = document.getElementById("allowRandomExtraYields");
const extraYieldContainer = document.getElementById("extraYieldContainer");
const totalExtraYieldCropsMultiplierEl = document.getElementById("totalExtraYieldCropsMultiplier");
const outputPreviewContainer = document.getElementById("outputPreviewContainer");
const outputPreview = document.getElementById("outputPreview");
const copyToClipboard = document.getElementById("copyToClipboard");

//EVENT LISTENERS
fileUpload.addEventListener("change", async (e) => {
  saveBtn.style.display = "";

  initUtility();

  contentJSON = await parseJsonFile(e.target.files[0]);

  let entriesCropData = {};
  let entriesObjectData = {};

  //build the 'Entries' json objects
  for (const index in itemData) {
    //"Target": "Data/ObjectInformation"
    let cropItemIdx = itemData[index].cropData[3];
    entriesObjectData[index] = itemData[index].seedObjectData.join("/");
    entriesObjectData[cropItemIdx] = itemData[index].cropObjectData.join("/");

    //"Target": "Data/Crops"
    entriesCropData[index] = itemData[index].cropData.join("/");
  }

  contentJSON.Changes.map((changeObj) => {
    if (changeObj["When"] && changeObj["When"]["Balance Mode"] === "Dynamic") {
      //insert new object data into 'Entries' for objects
      if (changeObj.Target === "Data/ObjectInformation") changeObj.Entries = entriesObjectData;
      //insert new crop data into 'Entries' for crops
      if (changeObj.Target === "Data/Crops") changeObj.Entries = entriesCropData;
    }
  });

  console.log(contentJSON);
  outputPreview.innerHTML = JSON.stringify(contentJSON, null, 2);
  outputPreviewContainer.style.display = "block";
});

saveBtn.addEventListener("click", () => {
  //get final json from output textarea in case any specific fields were updated manually
  saveTemplateAsFile("content.json", JSON.parse(outputPreview.innerText));
});

allowRandomExtraYieldsEl.addEventListener("change", (e) => {
  if (e.target.checked) extraYieldContainer.style.display = "block";
  else extraYieldContainer.style.display = "none";
});

copyToClipboard.addEventListener("click", () => {
  navigator.clipboard.writeText(outputPreview.innerText);
});

const baseData = {
  //https://stardewcommunitywiki.com/Modding:Crop_data
  //[0]Growth Stages/[1]Growth Seasons/[2]Sprite Sheet Index/[3]Harvest Item Index/[4]Regrow After Harvest (-1 = no regrow)/[5]Harvest Method (0 = no scythe needed)/[6]Chance For Extra Harvest/[7]Raised Seeds (true if trellis item)/[8]Tint Color
  cropData: {
    299: "1 2 2 2/summer/39/300/-1/1/false/false/false",
    301: "1 1 2 3 3/fall/38/398/3/0/true 1 1 0 .2/true/false",
    302: "1 1 2 3 4/summer fall/37/304/1/0/false/true/false",
    347: "2 4 6 6 6/spring winter/32/417/-1/0/false/false/false",
    425: "1 4 4 3/fall/31/595/-1/0/false/false/true 187 0 255 119 137 255 71 227 255 255 127 144 205 178 255 140 119 255",
    427: "1 1 2 2/spring/26/591/-1/0/false/false/true 255 186 255 223 191 255 255 246 0 255 80 0 255 158 193",
    429: "1 2 2 2/spring/27/597/-1/0/false/false/true 35 127 255 109 131 255 112 207 255 191 228 255 94 121 255 40 150 255",
    431: "1 2 3 2/summer/30/421/-1/0/false/false/false",
    433: "1 2 2 3 2/spring summer fall/40/433/2/0/true 3 3 0 .02/false/false",
    453: "1 2 2 2/summer/28/376/-1/0/false/false/true 255 0 0 254 254 254 255 170 0",
    455: "1 2 3 2/summer/29/593/-1/0/false/false/true 0 208 255 99 255 210 255 212 0 255 144 122 255 0 238 206 91 255",
    472: "1 1 1 1/spring/0/24/-1/0/true 1 1 0 .2/false/false",
    473: "1 1 1 3 4/spring/1/188/3/0/false/true/false",
    474: "1 2 4 4 1/spring summer/2/190/-1/0/false/false/false",
    475: "1 1 1 2 1/spring/3/192/-1/0/true 1 1 0 .2/false/false",
    476: "1 1 1 1/spring winter/4/248/-1/0/false/false/false",
    477: "1 2 2 1/spring fall/5/250/-1/1/true 1 1 0 .03/false/false",
    478: "2 2 2 3 4/spring fall/6/252/-1/0/false/false/false",
    479: "1 2 3 3 3/spring summer fall/7/254/-1/0/false/false/false",
    480: "2 2 2 2 3/summer/8/256/4/0/true 1 1 0 .05/false/false",
    481: "1 3 3 4 2/summer/9/258/4/0/true 3 3 0 .02/false/false",
    482: "1 1 1 1 1/summer/10/260/3/0/true 1 1 0 .03/false/false",
    483: "1 1 1 1/spring summer fall winter/11/262/-1/1/false/false/false",
    484: "2 1 2 1/spring/12/264/-1/0/true 1 1 0 .2/false/false",
    485: "2 1 2 2 2/summer fall/13/266/-1/0/false/false/false",
    486: "2 3 2 3 3/summer fall/14/268/-1/0/false/false/false",
    487: "2 3 3 3 3/summer fall/15/270/4/0/false/false/false",
    488: "1 1 1 1 1/summer fall/16/272/5/0/true 1 1 0 .002/false/false",
    489: "2 2 1 2 1/spring fall/17/274/-1/0/false/false/false",
    490: "1 2 3 4 3/fall/18/276/-1/0/false/false/false",
    491: "1 1 1 1/spring fall/19/278/-1/0/false/false/false",
    492: "1 3 3 3/fall/20/280/-1/0/true 1 1 0 .1/false/false",
    493: "1 2 1 1 2/fall/21/282/5/0/true 2 2 0 .1/false/false",
    494: "1 1 2 2/spring fall/22/284/-1/0/true 1 1 0 .2/false/false",
    495: "3 4/spring/23/16/-1/0/false/false/false",
    496: "3 4/summer/23/396/-1/0/false/false/false",
    497: "3 4/fall/23/404/-1/0/false/false/false",
    498: "3 4/winter/23/412/-1/0/false/false/false",
    499: "2 7 7 7 5/summer fall/24/454/7/0/false/false/false",
    745: "1 1 2 2 2/spring summer/36/400/4/0/true 1 1 0 .02/false/false",
    802: "2 2 2 3 3/summer fall winter/41/90/3/0/false/false/false",
    831: "1 2 3 4/summer/42/830/-1/0/true 1 1 0 .2/false/false",
    833: "1 3 3 4 3/spring summer/43/832/7/0/false/false/false",
  },
  //[0]English Name/[1]Sell Price (Seed Cost)/[2]Edibility/[3]Seed Category/[4]Display Name/[5]Description
  seedObjectData: {
    299: "Amaranth Seeds/35/-300/Seeds -74/Amaranth Seeds/",
    301: "Grape Starter/30/-300/Seeds -74/Grape Starter/",
    302: "Hops Starter/30/-300/Seeds -74/Hops Starter/",
    347: "Rare Seed/200/-300/Seeds -74/Rare Seed/Takes almost all season to grow.",
    425: "Fairy Seeds/100/-300/Seeds -74/Fairy Seeds/",
    427: "Tulip Bulb/10/-300/Seeds -74/Tulip Bulb/",
    429: "Jazz Seeds/15/-300/Seeds -74/Jazz Seeds/",
    431: "Sunflower Seeds/20/-300/Seeds -74/Sunflower Seeds/",
    433: "Coffee Bean/15/-300/Seeds -74/Coffee Bean/",
    453: "Poppy Seeds/50/-300/Seeds -74/Poppy Seeds/",
    455: "Spangle Seeds/25/-300/Seeds -74/Spangle Seeds/",
    472: "Parsnip Seeds/10/-300/Seeds -74/Parsnip Seeds/",
    473: "Bean Starter/30/-300/Seeds -74/Bean Starter/",
    474: "Cauliflower Seeds/40/-300/Seeds -74/Cauliflower Seeds/",
    475: "Potato Seeds/25/-300/Seeds -74/Potato Seeds/",
    476: "Garlic Seeds/20/-300/Seeds -74/Garlic Seeds/",
    477: "Kale Seeds/35/-300/Seeds -74/Kale Seeds/",
    478: "Rhubarb Seeds/50/-300/Seeds -74/Rhubarb Seeds/",
    479: "Melon Seeds/40/-300/Seeds -74/Melon Seeds/",
    480: "Tomato Seeds/25/-300/Seeds -74/Tomato Seeds/",
    481: "Blueberry Seeds/40/-300/Seeds -74/Blueberry Seeds/",
    482: "Pepper Seeds/20/-300/Seeds -74/Pepper Seeds/",
    483: "Wheat Seeds/5/-300/Seeds -74/Wheat Seeds/Harvest with the scythe.",
    484: "Radish Seeds/20/-300/Seeds -74/Radish Seeds/",
    485: "Red Cabbage Seeds/50/-300/Seeds -74/Red Cabbage Seeds/",
    486: "Starfruit Seeds/200/-300/Seeds -74/Starfruit Seeds/",
    487: "Corn Seeds/75/-300/Seeds -74/Corn Seeds/",
    488: "Eggplant Seeds/10/-300/Seeds -74/Eggplant Seeds/",
    489: "Artichoke Seeds/15/-300/Seeds -74/Artichoke Seeds/",
    490: "Pumpkin Seeds/50/-300/Seeds -74/Pumpkin Seeds/",
    491: "Bok Choy Seeds/25/-300/Seeds -74/Bok Choy Seeds/",
    492: "Yam Seeds/30/-300/Seeds -74/Yam Seeds/",
    493: "Cranberry Seeds/120/-300/Seeds -74/Cranberry Seeds/",
    494: "Beet Seeds/10/-300/Seeds -74/Beet Seeds/",
    495: "Spring Seeds/35/-300/Seeds -74/Spring Seeds/An assortment of wild spring seeds.",
    496: "Summer Seeds/55/-300/Seeds -74/Summer Seeds/An assortment of wild summer seeds.",
    497: "Fall Seeds/45/-300/Seeds -74/Fall Seeds/An assortment of wild fall seeds.",
    498: "Winter Seeds/30/-300/Seeds -74/Winter Seeds/An assortment of wild winter seeds.",
    499: "Ancient Seeds/30/-300/Seeds -74/Ancient Seeds/",
    745: "Strawberry Seeds/0/-300/Seeds -74/Strawberry Seeds/",
    802: "Cactus Seeds/0/-300/Seeds -74/Cactus Seeds/Can only be grown indoors.",
    831: "Taro Tuber/20/-300/Seeds -74/Taro Tuber/Grows faster if planted near a body of water.",
    833: "Pineapple Seeds/240/-300/Seeds -74/Pineapple Seeds/",
  },
  //[0]English Name/[1]Sell Price (Seed Cost)/[2]Edibility/[3]Seed Category/[4]Display Name/[5]Description
  cropObjectData: {
    16: "Wild Horseradish/50/5/Basic -81/Wild Horseradish/A spicy root found in the spring.",
    18: "Daffodil/30/0/Basic -81/Daffodil/A traditional spring flower that makes a nice gift.",
    20: "Leek/60/16/Basic -81/Leek/A tasty relative of the onion.",
    22: "Dandelion/40/10/Basic -81/Dandelion/Not the prettiest flower, but the leaves make a good salad.",
    24: "Parsnip/35/10/Basic -75/Parsnip/A spring tuber closely related to the carrot. It has an earthy taste and is full of nutrients.",
    78: "Cave Carrot/25/12/Basic -81/Cave Carrot/A starchy snack found in caves. It helps miners work longer.",
    90: "Cactus Fruit/75/30/Basic -79/Cactus Fruit/The sweet fruit of the prickly pear cactus.",
    92: "Sap/2/-1/Basic -81/Sap/A fluid obtained from trees.",
    188: "Green Bean/40/10/Basic -75/Green Bean/A juicy little bean with a cool, crisp snap.",
    190: "Cauliflower/175/30/Basic -75/Cauliflower/Valuable, but slow-growing. Despite its pale color, the florets are packed with nutrients.",
    192: "Potato/80/10/Basic -75/Potato/A widely cultivated tuber.",
    248: "Garlic/60/8/Basic -75/Garlic/Adds a wonderful zestiness to dishes. High quality garlic can be pretty spicy.",
    250: "Kale/110/20/Basic -75/Kale/The waxy leaves are great in soups and stir frys.",
    252: "Rhubarb/220/-300/Basic -79/Rhubarb/The stalks are extremely tart, but make a great dessert when sweetened.",
    254: "Melon/250/45/Basic -79/Melon/A cool, sweet summer treat.",
    256: "Tomato/60/8/Basic -75/Tomato/Rich and slightly tangy, the Tomato has a wide variety of culinary uses.",
    257: "Morel/150/8/Basic -81/Morel/Sought after for its unique nutty flavor.",
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
    281: "Chanterelle/160/30/Basic -81/Chanterelle/A tasty mushroom with a fruity smell and slightly peppery flavor.",
    282: "Cranberries/75/15/Basic -79/Cranberries/These tart red berries are a traditional winter food.",
    283: "Holly/80/-15/Basic -81/Holly/The leaves and bright red berries make a popular winter decoration.",
    284: "Beet/100/12/Basic -75/Beet/A sweet and earthy root vegetable. As a bonus, the leaves make a great salad.",
    300: "Amaranth/150/20/Basic -75/Amaranth/A purple grain cultivated by an ancient civilization.",
    304: "Hops/25/18/Basic -75/Hops/A bitter, tangy flower used to flavor beer.",
    376: "Poppy/140/18/Basic -80/Poppy/In addition to its colorful flower, the Poppy has culinary and medicinal uses.",
    396: "Spice Berry/80/10/Basic -79/Spice Berry/It fills the air with a pungent aroma.",
    398: "Grape/80/15/Basic -79/Grape/A sweet cluster of fruit.",
    399: "Spring Onion/8/5/Basic -81/Spring Onion/These grow wild during the spring.",
    400: "Strawberry/120/20/Basic -79/Strawberry/A sweet, juicy favorite with an appealing red color.",
    402: "Sweet Pea/50/0/Basic -80/Sweet Pea/A fragrant summer flower.",
    404: "Common Mushroom/40/15/Basic -81/Common Mushroom/Slightly nutty, with good texture.",
    406: "Wild Plum/80/10/Basic -79/Wild Plum/Tart and juicy with a pungent aroma.",
    408: "Hazelnut/90/12/Basic -81/Hazelnut/That's one big hazelnut!",
    410: "Blackberry/20/10/Basic -79/Blackberry/An early-fall treat.",
    412: "Winter Root/70/10/Basic -81/Winter Root/A starchy tuber.",
    414: "Crystal Fruit/150/25/Basic -79/Crystal Fruit/A delicate fruit that pops up from the snow.",
    416: "Snow Yam/100/12/Basic -81/Snow Yam/This little yam was hiding beneath the snow.",
    417: "Sweet Gem Berry/3000/-300/Basic -17/Sweet Gem Berry/It's by far the sweetest thing you've ever smelled.",
    418: "Crocus/60/0/Basic -80/Crocus/A flower that can bloom in the winter.",
    421: "Sunflower/80/18/Basic -80/Sunflower/A common misconception is that the flower turns so it's always facing the sun.",
    433: "Coffee Bean/15/-300/Seeds -74/Coffee Bean/Plant in spring or summer to grow a coffee plant. Place five beans in a keg to make coffee.",
    454: "Ancient Fruit/550/-300/Basic -79/Ancient Fruit/It's been dormant for eons.",
    591: "Tulip/30/18/Basic -80/Tulip/The most popular spring flower. Has a very faint sweet smell.",
    593: "Summer Spangle/90/18/Basic -80/Summer Spangle/A tropical bloom that thrives in the humid summer air. Has a sweet, tangy aroma.",
    595: "Fairy Rose/290/18/Basic -80/Fairy Rose/An old folk legend suggests that the sweet smell of this flower attracts fairies.",
    597: "Blue Jazz/50/18/Basic -80/Blue Jazz/The flower grows in a sphere to invite as many butterflies as possible.",
    771: "Fiber/1/-300/Basic -16/Fiber/Raw material sourced from plants.",
    815: "Tea Leaves/50/-300/Basic -75/Tea Leaves/The young leaves of the tea plant. Can be brewed into the popular, energizing beverage.",
    830: "Taro Root/100/15/Basic -75/Taro Root/This starchy root is one of the most ancient crops.",
    832: "Pineapple/300/55/Basic -79/Pineapple/A sweet and tangy tropical treat.",
    889: "Qi Fruit/1/1/Basic -79/Qi Fruit/Mr. Qi has challenged you to ship 500 of these strange melons.",
  },
  goodObjectData: {
    303: "Pale Ale/300/20/Basic -26/Pale Ale/Drink in moderation./drink/0 0 0 0 0 0 0 0 0 0 0/0",
    340: "Honey/100/-300/Basic -26/Honey/It's a sweet syrup produced by bees.",
    346: "Beer/200/20/Basic -26/Beer/Drink in moderation./drink/0 0 0 0 0 0 0 0 0 0 0/0",
    395: "Coffee/150/1/Crafting/Coffee/It smells delicious. This is sure to give you a boost./drink/0 0 0 0 0 0 0 0 0 1 0/120",
    459: "Mead/200/30/Basic -26/Mead/A fermented beverage made from honey. Drink in moderation./drink/0 0 0 0 0 0 0 0 0 0 0/0",
    614: "Green Tea/100/5/Basic -26/Green Tea/A pleasant, energizing beverage made from lightly processed tea leaves./drink/0 0 0 0 0 0 0 30 0 0 0/360",
  },
};
