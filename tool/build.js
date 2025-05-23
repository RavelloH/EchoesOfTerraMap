const fs = require("fs");

const mapDir = "./map";
const mapFiles = fs.readdirSync(mapDir);
let mapFileNames = mapFiles.map((file) => file.replace(".png", ""));
mapFileNames = mapFiles.map((file) => file.split("_"));
let index = {};
let roomList = [];
mapFileNames.forEach((file) => {
  if (!index[file[1]]) {
    index[file[1]] = {};
  }
  if (!index[file[1]][file[2]]) {
    index[file[1]][file[2]] = [];
  }
  index[file[1]][file[2]].push(file.join("_"));
  roomList.push(file[2]);
});

let zjson = fs.readFileSync("./terra.json").toString();
zjson = JSON.parse(zjson);

index["z-index"] = {};
roomList.forEach((r) => {
  zjson["room_b"][r]
    ? (index["z-index"][r] = zjson["room_b"][r].zIndex)
    : (index["z-index"][r] = zjson["region_s"][r].zIndex);
});

fs.writeFileSync("./index.json", JSON.stringify(index, null, 2), "utf-8");
