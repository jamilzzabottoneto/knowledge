<template>
  <footer class="footer">
    <span class="titulo"
      >&copy; Copyright <strong> Jamil Zabotto Neto </strong> 2021</span
    >

    <a class="redes">
      <i class="fa fa-github fa-lg"></i>
      <i class="fa fa-linkedin fa-lg"></i>
    </a>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

footer.footer > span.titulo {
  flex-grow: 1;
  text-align: center;
}

footer.footer > a.redes {
  justify-self: flex-end;
  align-items: center;
  margin-right: 20px;
}

footer.footer > a.redes i {
  margin: 10px;
}
</style>