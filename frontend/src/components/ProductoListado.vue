<template>
  <div class="producto-listado">
    <h2>Listado de Productos</h2>
    <b-table-simple hover small caption-top responsive striped>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th colspan="1">Nombre</b-th>
          <b-th colspan="1">Descripción</b-th>
          <b-th colspan="1">Precio</b-th>
          <b-th colspan="1">Stock</b-th>
          <b-th colspan="2">Acción</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="producto in productos" :key="producto._id">
          <b-th colspan="1">{{ producto.nombre }}</b-th>
          <b-th colspan="1">{{ producto.descrip }}</b-th>
          <b-th colspan="1">$ {{ producto.precio }}</b-th>
          <b-th colspan="1">{{ producto.stock }}</b-th>
          <b-th colspan="1">
            <b-button pill variant="info" @click="editar(producto)">
              <b-icon icon="pencil-square"></b-icon>
            </b-button>
          </b-th>
          <b-th colspan="1">
            <b-button pill variant="danger" v-show="producto.activo" @click="eliminar(producto._id)">
              <b-icon icon="trash"></b-icon>
            </b-button>
            <b-button pill variant="danger" v-show="!producto.activo" @click="reactivar(producto._id)">
              <b-icon icon="arrow-counterclockwise"></b-icon>
            </b-button>
          </b-th>
        </b-tr>
      </b-tbody>
      <b-tfoot>
      </b-tfoot>
    </b-table-simple>
  </div>
</template>

<script>
import {activacionProducto} from "../../db/server.js"

export default {
  name: "ProductoListado",
  props: ["productos"],
  data() {
    return {};
  },
  methods: {
    editar(producto) {
      this.$emit("paraEditar", { ...producto });
    },
    eliminar(id) {
      if (confirm("Eliminar " + `${id}` + "?")) {
        activacionProducto(id);
        this.$parent.getProductos();
        this.$vToastify.success("Producto eliminado con éxito!");
      }
    },
    reactivar(id) {
      if (confirm("Reactivar " + `${id}` + "?")) {
        activacionProducto(id);
        this.$parent.getProductos();
        this.$vToastify.success("Producto reactivado con éxito!");
      }
    },
  },
};
</script>

<style scoped></style>
