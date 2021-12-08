<template>
  <div class="home">
    <Pagetitle
      icon="fa fa-home"
      main="Dashboard"
      sub="Base de Conhecimento WEB"
    />
    <div class="stats">
      <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50"/>
      <Stat title="Artigos" :value="stat.articles" icon="fa fa-file" color="#3bc480"/>
      <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd"/>
    </div>
  </div>
</template>

<script>
import Pagetitle from "@/components/template/PageTitle.vue";
import Stat from "./Stat.vue";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { Pagetitle, Stat },
  data: function () {
    return {
      stat: {},
    };
  },
  methods: {
    getStats() {
      axios.get(`${baseApiUrl}/stats`).then((res) => (this.stat = res.data));
    },
  },

  //Metodo de ciclo de vida, chamando uma função quando o componente for enderizado
  mounted() {
    this.getStats();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>