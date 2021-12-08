<template>
  <div class="admin-pages">
    <Pagetitle
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="Cadastros & CIA"
    />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Artigos" active>
            <ArticleAdmin/>
          </b-tab>
          <b-tab title="Categorias" active>
            <CategoryAdmin/>
          </b-tab>
          <b-tab title="Usuários" active>
            <UserAdmin/>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import Pagetitle from "../template/PageTitle.vue";

import ArticleAdmin from "./ArticleAdmin.vue";
import CategoryAdmin from "./CategoryAdmin.vue";
import UserAdmin from "./UserAdmin.vue";

export default {
  name: "AdminPages",
  components: { Pagetitle, ArticleAdmin, CategoryAdmin, UserAdmin },
};
</script>

<style>
</style>