<template>
  <div class="titleArea">
    <p id="pageTitle">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
.titleArea {
  height: 45px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
  background: rgb(26, 92, 255);
  box-shadow: 2px 2px 10px rgba(61, 61, 61, 0.582);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.titleArea p {
  color: rgb(255, 255, 255);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
}
@media (min-width: 600px) {
  .titleArea {
    justify-content: center;
  }
}
</style>
