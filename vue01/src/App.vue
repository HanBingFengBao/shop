<template>
  <router-view></router-view>
</template>

<script>


export default {

}
</script>

<style scoped>
header {
  line-height: 1.3;
  max-height: 100vh;

}

#app {
  display: block;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  position: fixed;
  /* Fixed position */
  top: 0;
  /* Align to the top */
  left: 0;
  /* Align to the left */
  background-color: white;
  /* Background color for the nav */
  z-index: 1000;
  /* Ensure the nav is above other content */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Optional: add a shadow */
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 3rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 0;
  }
}
</style>

