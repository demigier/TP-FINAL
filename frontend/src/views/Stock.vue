<template>
  <div class="stock">
    <h1>Stock</h1>
    <br />
    <ProductoCarga :producto="actual" />
    <ProductoListado :productos="productos" @paraEditar="prodAct = $event" />
  </div>
</template>

<script>
import ProductoCarga from "../components/ProductoCarga.vue";
import ProductoListado from "../components/ProductoListado.vue";
import {getStock} from "../../db/server.js"

export default {
  name: "Stock",
  components: { ProductoListado, ProductoCarga },
  data() {
    return {
      prodAct: {
        _id: null,
        nombre: "",
        descrip: "",
        precio: "",
        stock: 0,
      },
      productos: [],
    };
  },
  computed: {
    actual() {
      return this.prodAct;
    },
  },
  created: async function () {
    this.productos = await getStock();
  },
  methods:{
    getProductos: async function(){
      this.productos = await getStock();
    }
  }
};
</script>

<style></style>
