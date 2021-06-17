import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    carrito: []
    // carrito: [{nombre: 'carlos', descrip:'asdasdasd', precio: 100, cant: 10},{nombre: 'carlos', descrip:'asdasdasd', precio: 100, cant: 10},{nombre: 'carlos', descrip:'asdasdasd', precio: 100, cant: 10},{nombre: 'carlos', descrip:'asdasdasd', precio: 100, cant: 10},]
  },
  mutations: {
    agregarProducto(state, params) {
      if (params.prod && params.cant) {
        const id = this.getters.buscarProducto(params.prod.nombre); 
        if(id == -1){
          params.prod.cant = parseInt(params.cant);
          state.carrito.push(params.prod)
        }else{
          state.carrito[id].cant += parseInt(params.cant);
        }
      }else{
        console.error('Error')
      }
    },
    reset(state){
      state.carrito = [];
    },
    sumar(state, index){
      if(state.carrito[index]){
        state.carrito[index].cant++;
      }
    },
    eliminarProducto(state, index){
      if(state.carrito[index]){
        state.carrito.splice(index, 1);
      }
    }
  },
  getters: {
    carrito: state => {
      return state.carrito;
    },
    buscarProducto: (state) => (nombreBuscado) => {
      return state.carrito.findIndex(prod => prod.nombre == nombreBuscado);
    },
    precioTotal: (state) =>{
      let total = 0;

      for (let item of state.carrito) {
        total += (item.cant * item.precio);
      }
      return total;
    },
    getCantidad: (state) => (nombreBuscado) => {
      const prod = state.carrito.find(prod => prod.nombre == nombreBuscado);
      let cant = 0;
      if(prod){
        cant = prod.cant;
      }
      return cant;
    }
  },
  actions: {
    Sumar({ commit }, index){
      commit('sumar', index);
    },
    AgregarProducto({ commit }, params){
      commit('agregarProducto', params);
    }
  }
})