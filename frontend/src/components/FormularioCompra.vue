<template>
  <div class="form" v-if="activar">
    <b-container>
      <b-row cols="3" align-h="center"> 
        <b-col cols="5">
          <b-card-group responsive columns id="listado">
            <b-card
              id="carta"
              :title="titulo"
              style="width: 100%"
              align="center"
            >
              <b-form-input class="formulario" type="text" placeholder="Ingrese su nombre completo..." v-model="nombre"/>
              <b-form-input class="formulario" type="text" placeholder="Ingrese su telefono..." v-model="telefono"/>
              <b-form-input class="formulario" type="email" placeholder="Ingrese su mail..." v-model="mail"/>
              <b-button class="formulario" @click="finalizar" variant="primary" >FINALIZAR COMPRA</b-button>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import {finalizarCompra, generarOrden} from "../../db/server.js";

export default {
  name: "FormularioCompra",
  props: ["activar"],
  data() {
    return {
      finalizo: false,
      titulo: "Ingrese sus datos para la compra",
      nombre: "",
      telefono: "",
      mail: "",
    };
  },
  computed: {
    ...mapState(["carrito"]), ...mapGetters(["carrito", "precioTotal"]),
  },
  methods: {
    finalizar() {
      if (this.$store.getters.carrito.length > 0 && this.nombre && this.telefono && this.mail) {
        if(this.validEmail(this.mail)){
          if (confirm("Confirmar la compra")) {
            var items = [];
            this.$store.getters.carrito.forEach((item) => {
              items.push({
                id: item._id,
                cant: item.cant,
              });
            });
            finalizarCompra(items).then(() => {
              this.$vToastify.success("Compra realizada con éxito!");
              generarOrden(this.nombre, this.telefono, this.mail, this.precioTotal, items).then(()=>{
                this.$parent.reset();
                this.$parent.finalizo = false;
              });
            });
          }
        }else{
          this.$vToastify.error("Mail invalido");
        }
      }else{
        this.$vToastify.error("No dejes campos vacios");
      }
    },    
    
    validEmail: function (email) {
      //eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
};
</script>

<style>
  .formulario{
    margin: 10px
  }
  #carta{
    height: 300px;
  }
  #listado {
    margin: 5%;
  }
</style>