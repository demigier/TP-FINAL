<template>
  <div>
    <div class="hay" v-if="carrito.length > 0">
      <h1>Listado del carrito</h1>
      <b-list-group>
          <b-list-group-item v-for="(item, index) in carrito" v-bind:key="item._id">
              <p> {{ item.nombre }} | Precio: ${{ precios[index] }} | Precio Unit: {{item.precio}} | Cant: {{ item.cant }} | <b-icon icon="bag-plus" @click="sumar(index)"></b-icon> | <b-icon icon="trash" @click="eliminar(index)" ></b-icon> </p>
          </b-list-group-item> 
      </b-list-group>

      TOTAL A ABONAR: ${{ precioTotal }}
      <b-button pill variant="primary" class="buttons" v-if="!finalizo" @click="continuar">CONTINUAR COMPRA</b-button>
      <b-button pill variant="secondary" class="buttons" @click="reset">RESETEAR CARRITO</b-button>
    </div> 

    <div class="noHay" v-if="carrito.length == 0">
      <h1>Tu carrito está vacío</h1>
    </div>

    <FormularioCompra :activar="finalizo" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import {getProducto} from "../../db/server.js";
import FormularioCompra from "../components/FormularioCompra.vue"

export default {
    name: 'Carrito',
    components: {FormularioCompra},
    data() {
      return {
        precios: [],
        finalizo: false
      };
    },
    computed:{
        ...mapState(['carrito']), ...mapGetters(['carrito', 'precioTotal']),
    },
    methods: {
      getNombre: async function (id) {
        getProducto(id).then(result=>{
          console.log(result.nombre)
          return 'result.nombre';
        })
      },
      sumar(index){
        this.$store.dispatch('Sumar', index);
        this.$forceUpdate();
        this.carrito.splice(this.carrito.length);
        this.calcularPrecios();
      },
      eliminar(index){
        this.$store.commit('eliminarProducto', index);
        this.$vToastify.info('Producto eliminado con éxito');
      },
      continuar(){
        if (confirm("Continuar con la compra")){
          this.finalizo = true;
        }
      },
      calcularPrecio(cant, precio){
        return cant * precio;
      },
      calcularPrecios(){
        this.precios = [];
        for (let i = 0; i < this.carrito.length; i++) {
          this.precios.push(this.calcularPrecio(this.carrito[i].cant, this.carrito[i].precio));
        }
      },
      reset(){
      this.$store.commit('reset');
      this.$vToastify.info('Carrito reseteado con éxito')
      },
    },
    created(){
      this.calcularPrecios();
    }
}
</script>

<style>
  .buttons{
    margin: 10px
  }
  FormularioCompra{
    width: 100%
  }
</style>