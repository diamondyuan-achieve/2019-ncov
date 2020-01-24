const request = require("umi-request").default;
const $ = require("cheerio");
const fs = require("fs");
const path = require("path");

const loadNews = async data => {
  const newsList = data
    .match(/window.getTimelineService = (.*?)}catch/)[0]
    .slice(28, -6);
  const result = JSON.parse(newsList).map(o => ({
    leftTime: o.pubDateStr,
    topicTitle: o.title,
    topicContent: o.summary,
    topicFrom: o.infoSource
  }));
  if (result.length === 0) {
    throw new Error("fetch error");
  }
  console.log(`Get ${result.length} news`);
  fs.writeFileSync(
    path.resolve(__dirname, "./src/data/newsList.json"),
    JSON.stringify(result, null, 2)
  );
};
const loadCityList = async data => {
  const cityList = data
    .match(/window.getAreaStat = (.*?)}catch/)[0]
    .slice("window.getAreaStat = ".length, -1 - "}catc".length);
  const result = JSON.parse(cityList).map(o => {
    return {
      data: `${o.provinceName} 确诊 ${o.confirmedCount} 例。`
    };
  });
  console.log(JSON.parse(cityList));
  console.log(`Get ${result.length} city data`);
  fs.writeFileSync(
    path.resolve(__dirname, "./src/data/cityList.json"),
    JSON.stringify(result, null, 2)
  );
};

const loadInfo = async data => {
  const time = $(data)
    .find(".mapTitle___2QtRg")
    .text();
  const confirmedNumber = $(data)
    .find(".confirmedNumber___3WrF5")
    .text();
  fs.writeFileSync(
    path.resolve(__dirname, "./src/data/info.json"),
    JSON.stringify(
      {
        confirmedNumber,
        time
      },
      null,
      2
    )
  );
};

(async () => {
  const data = await request("https://3g.dxy.cn/newh5/view/pneumonia");
  await loadNews(data);
  await loadCityList(data);
  await loadInfo(data);
  console.log("success");
})();
