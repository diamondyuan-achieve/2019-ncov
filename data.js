const request = require("umi-request").default;
const $ = require("cheerio");
const fs = require("fs");
const path = require("path");

const loadNews = async data => {
  const newsList = Array.from($(data).find(".block___wqUAz"));
  const result = [];
  newsList.forEach(news => {
    const leftTimeNode = $(news).find(".leftTime___2zf53");

    let leftTime;
    if (leftTimeNode.children().length == 2) {
      leftTime = leftTimeNode.children().text();
    } else {
      leftTime = leftTimeNode
        .text()
        .replace("月 ", "-")
        .replace("日", " ");
    }

    let topicTitle = $(news)
      .find(".topicTitle___2ovVO")
      .text();
    if (topicTitle.startsWith("最新")) {
      topicTitle = topicTitle.slice(2);
    }

    let topicContent = $(news)
      .find(".topicContent___1KVfy")
      .text();

    let topicFrom = $(news)
      .find(".topicFrom___3xlna")
      .text()
      .replace("信息来源：", "");

    result.push({
      leftTime,
      topicTitle,
      topicContent,
      topicFrom
    });
  });
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
  const cityList = Array.from(
    $(data)
      .find(".descBox___3dfIo")
      .find(".descList___3iOuI")
  );
  const result = [];
  cityList.map(city => {
    const data = $(city).text();
    result.push({
      data
    });
  });
  if (result.length === 0) {
    throw new Error("fetch error");
  }
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
