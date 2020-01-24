<script>
  import cities from "./data/cityList.json";
  import info from "./data/info.json";
  import newsList from "./data/newsList.json";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import "dayjs/locale/zh-cn";
  dayjs.extend(relativeTime);

  function refresh() {
    document.documentElement.scrollTop = 0;
    window.location.reload(true);
  }
</script>

<style type="text/postcss">
  .refresh-button {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 90%;
    margin: 10px 5%;
    @apply bg-blue-700 rounded-lg text-white h-12;
  }
</style>

<div class="p-3">
  <p>数据来源于丁香园, 每 10 分钟同步一次。</p>
  <p class="text-sm text-gray-500">{info.time}</p>
  <p class="text-sm">{info.confirmedNumber}</p>
</div>

<div class="bg-white">
  <div
    class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2"
    role="alert">
    <p class="font-bold">疫情状况</p>
  </div>
  <div class="p-3">
    {#each cities as city}
      <div>{city.data}</div>
    {/each}
  </div>

</div>

<div class="bg-white pb-10">
  <div
    class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2"
    role="alert">
    <p class="font-bold">实时新闻</p>
  </div>
  <div class="p-3">
    {#each newsList as news}
      <h2 class="font-medium text-lg mb-1">{news.topicTitle}</h2>
      <p class="text-sm text-gray-500 mb-1">
        {dayjs(news.leftTime)
          .locale('zh-cn')
          .fromNow()}
        <span class="pl-2">
          {dayjs(news.leftTime).format('MM-DD HH:mm:ss')}
        </span>
      </p>
      <p class="leading-normal text-grey-darker mb-1">{news.topicContent}</p>
      <p class="text-sm text-gray mb-4">来源: {news.topicFrom}</p>
    {/each}
  </div>
</div>

<button class="refresh-button" on:click={refresh}>刷新数据</button>
