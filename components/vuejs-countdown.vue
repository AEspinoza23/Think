<template>
  <div>
    <slot :days="days" :hours="hours" :minutes="minutes" :seconds="seconds" name="default" />
  </div>
</template>

<script>
export default {
  name: 'VueJsCountdown',
  props: {
    deadline: {
      type: [String, Date],
      required: true
    }
  },
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000),
      date: null,
      diff: 0,
      interval: null
    }
  },
  computed: {
    seconds() {
      return Math.trunc(this.diff) % 60
    },
    minutes() {
      return Math.trunc(this.diff / 60) % 60
    },
    hours() {
      return Math.trunc(this.diff / 60 / 60) % 24
    },
    days() {
      return Math.trunc(this.diff / 60 / 60 / 24)
    }
  },
  watch: {
    now() {
      this.diff = this.date - this.now
      if (this.diff <= 0) {
        this.diff = 0
        // Remove interval
        this.interval = null
      }
    }
  },
  created() {
    this.date = Math.trunc(new Date(this.deadline) / 1000)
    if (!this.date) {
      console.warn(`Invalid deadline: "${this.deadline}"  value`)
    }
    this.interval = setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000)
    }, 1000)
  },

  destroyed() {
    this.interval = null
  }
}
</script>
