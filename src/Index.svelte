<script>
  import cities from "./data/city.json";
</script>

<div class="">
  <h1>疫情状况</h1>
  {#each cities as city}
    <div>{city.provinceName} {city.tags}</div>
  {/each}
</div>
