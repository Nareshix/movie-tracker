<script>
    let { data } = $props();
  </script>


  <ul>
    {#each data.Anime as anime}
    <img src={anime.backdrop_path} alt="">
      <li>{anime.backdrop_path}</li>
    {/each}
  </ul>

  