<script>
  import cities from "./data/cityList.json";
  import newsList from "./data/newsList.json";
</script>

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

<div class="bg-white">
  <div
    class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2"
    role="alert">
    <p class="font-bold">实时新闻</p>
  </div>
  <div class="p-3">
    {#each newsList as news}
      <h2 class="font-medium text-lg mb-1">{news.topicTitle}</h2>
      <p class="text-sm text-gray-500 mb-1">{news.leftTime}</p>
      <p class="leading-normal text-grey-darker mb-1">{news.topicContent}</p>
      <p class="text-sm text-gray mb-4">来源: {news.topicFrom}</p>
    {/each}
  </div>

</div>
