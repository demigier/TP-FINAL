<template>
  <div class="producto-carga">
    <h2>Carga de Productos</h2>
    <b-card bg="">
      <b-row>
        <b-col md="6">
          <b-form>
            <b-form-group label="Nombre:" label-for="prod-nombre">
              <b-form-input
                id="prod-nombre"
                v-model="producto.nombre"
                type="text"
                placeholder="Nombre del producto"
                required
              />
            </b-form-group>
            <b-form-group label="Descripción:" label-for="prod-descrip">
              <b-form-textarea
                id="prod-descrip"
                v-model="producto.descrip"
                placeholder="Descripción del producto..."
                rows="3"
                max-rows="8"
                required
              />
            </b-form-group>
            <b-form-group label="Precio:" label-for="prod-descrip">
              <b-form-input
                id="prod-precio"
                v-model="producto.precio"
                type="text"
                placeholder="$00.00"
                required
              />
            </b-form-group>
            <b-form-group label="Cantidad:" label-for="prod-descrip">
              <b-form-input
                id="prod-cant"
                v-model="producto.stock"
                type="text"
                placeholder="Seleccione la cantidad en stock"
                required
              />
            </b-form-group>
            <br />
            <b-button pill variant="primary" v-on:click="agregar" v-show="!esEdicion"
              >Agregar</b-button
            >
            <b-button pill variant="primary" v-on:click="actualizar" v-show="esEdicion"
              >Actualizar</b-button
            >
            <b-button pill variant="secondary" v-on:click="limpiar">Limpiar</b-button>
          </b-form>
        </b-col>
        <b-col>
          <b-img
            thumbnail
            fluid
            src="https://picsum.photos/250/250/?image=54"
            alt="Imagen"
          />
        </b-col>
      </b-row>
    </b-card>
    <b-row>
      <b-col>
        <!-- {{ this.producto }} -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {createProducto, editarProducto} from "../../db/server.js"

export default {
  name: "ProductoCarga",
  props: ["producto"],
  created: function(){
    this.limpiar();
  },
  methods: {
    agregar() {
      createProducto({"nombre": this.producto.nombre, "descrip": this.producto.descrip, "stock": this.producto.stock, "precio": this.producto.precio})
      this.$vToastify.success("Producto agregado con éxito!");
      this.limpiar();
    },
    limpiar() {
      this.$parent.getProductos();
      this.producto._id = null;
      this.producto.nombre = "";
      this.producto.descrip = "";
      this.producto.precio = "";
      this.producto.stock = "";
    },
    actualizar(){
      editarProducto({"id": this.producto._id, "nombre": this.producto.nombre, "descrip": this.producto.descrip, "stock": this.producto.stock, "precio": this.producto.precio});
      this.$vToastify.success("Producto actualizado con éxito!");
      this.limpiar();
    }
  },
  computed: {
    esEdicion() {
      return this.producto._id != null;
    },
  },
};
</script>

<style scoped></style>
