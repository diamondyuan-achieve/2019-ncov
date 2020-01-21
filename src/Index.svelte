<script>
  import cities from "./data/cityList.json";
</script>

<div class="">
  <h1>疫情状况</h1>
  {#each cities as city}
    <div>{city.data}</div>
  {/each}
</div>
