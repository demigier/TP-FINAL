<template>
  <div class="listado">
    <div class="hay" v-if="this.stock.length > 0">
      <h1>LISTADO</h1>
      <b-container>
        <b-row cols="3">
          <b-col v-for="(prod, index) in stock" v-bind:key="prod.id">
              <b-card-group columns id="listado">
                <b-card
                  id="carta"
                  :title="prod.nombre"
                  img-src="https://picsum.photos/600/300/?image=25"
                  img-alt="Imagen"
                  img-top
                  style="max-width: 20rem"
                  align="center"
                >
                  <b-card-text>
                    {{ prod.descrip }}
                  </b-card-text>
                  <b-card-text>
                    Stock: {{ prod.stock }} unidades disponibles
                  </b-card-text>
                  <b-card-text>
                    Precio unitario: ${{ prod.precio }}
                  </b-card-text>
                  <b-form-input type="number" placeholder='Seleccione la cantidad deseada...' min="1" :max="prod.stock" v-model="cant[index]"/>
                  <b-button @click="addToCart(prod, index)" variant="primary">
                    <b-icon icon="cart-plus"></b-icon>
                  </b-button>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </b-container>
      </div>

    <div class="noHay" v-if="this.stock.length == 0">
      <h1>Listado vacio</h1>
    </div>
  </div>
</template>
<script>
//import axios from "axios";
import {getActivos} from "../../db/server.js";
import { mapState, mapGetters } from 'vuex'

export default {
  name: "Home",
  data() {
    return {
      stock: [],
      cant: []
    };
  },
  created: async function () {
    this.stock = await getActivos();
    for (let i = 0; i < this.stock.length; i++) {
      this.cant.push(0);
    }
  },
  computed:{
    ...mapState(['carrito']), ...mapGetters(['carrito', 'getCantidad']),
  },
  methods: {
    addToCart(producto, i) {
      if(producto.nombre && producto.stock && producto.descrip && producto.precio && this.cant){
        let suma = parseInt(this.getCantidad(producto.nombre)) + parseInt(this.cant[i]);
        if(producto.stock >= suma){
          this.$vToastify.info('El producto fue añadido al carrito con éxito');
          this.$store.dispatch('AgregarProducto', {prod: producto, cant: this.cant[i]});
          this.carrito.splice(this.carrito.length)
        }else{
        this.$vToastify.error('Stock insuficiente');  
        }
      }else{
        this.$vToastify.error('ERROR: no se pudo añadir al producto')
      }
    },
    existe(){
      return this.stock.length > 0
    }
  },
};
</script>

<style scoped>
#carta{
  height: 550px;
}
#listado {
  margin: 5%;
}
</style>