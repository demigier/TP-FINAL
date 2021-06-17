<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><b-icon icon="shop"></b-icon> Home</router-link> | <!-- pagina principal -->
      <router-link to="/catalog"><b-icon icon="card-list"></b-icon> Catálogo</router-link> | <!-- listado de productos -->
      <router-link to="/stock"><b-icon icon="person"></b-icon> Stock</router-link> |
      <router-link to="/cart"><b-icon icon="cart"></b-icon> Carrito</router-link> <!-- perfil -->
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
