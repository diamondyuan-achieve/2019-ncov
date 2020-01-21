<script>
  import Index from "./Index.svelte";
  import Router from "svelte-spa-router";

  const routes = {
    // Exact path
    "/": Index
  };
</script>

<Router {routes} />
