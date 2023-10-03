<template>
  <div class="primary semi-circulo">
    <RoundSlider
      :max="max"
      :read-only="true"
      :tooltip-format="tooltipChange"
      :value="value"
      border-color="#80DDDF"
      border-width="2"
      circle-shape="half"
      handle-size="+7"
      line-cap="line"
      min="0"
      path-color="#80dedf99"
      radius="100"
      range-color="#007073"
      tooltip-color="#FFF"
    />
  </div>
</template>

<script>
export default {
  name: 'Elipse',
  props: {
    value: { type: Number, default: 50 },
    max: { type: Number, default: 100 }
  },
  methods: {
    tooltipChange(e) {
      return e.value + ' €'
    }
  }
}
</script>

<style lang="scss" scoped>
.semi-circulo {
  width: 201px;
  height: 101px;
  background: #5cb85c;
  -moz-border-radius: 100px 100px 0 0;
  -webkit-border-radius: 100px 100px 0 0;
  border-radius: 100px 100px 0 0;
}
</style>
