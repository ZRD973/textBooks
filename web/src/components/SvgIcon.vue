<template>
  <svg :class="className" xmlns="http://www.w3.org/2000/svg">
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink"/>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',

  props: {
    name: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: null
    }
  },

  computed: {
    iconPath () {
      try {
        let icon = require(`@/assets/icons/${this.name}.svg`)
        if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
          icon = icon.default
        }
        return icon.url
      } catch (error) {
        return require('@/assets/icons/menu.svg').default.url
      }
    },

    className () {
      return 'svg-icon svg-icon--' + this.name
    }
  }
}
</script>

<style>
  .svg-icon {
    fill: currentColor;
    height: 24px;
    width: 24px;
  }
</style>
