<template>
  <client-only>
    <div>
      <Apexchart :options="chartOptions" :series="series" type="area" width="100%"></Apexchart>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'Chart',
  props: {
    balances: { type: Object, default: () => {}}
  },
  data() {
    return {
      chartOptions: {
        zoom: {
          show: false
        },
        grid: {
          show: true,
          strokeDashArray: 3
        },
        xaxis: {
          labels: {
            show: false
          }
        },
        yaxis: {
          opposite: true,
          labels: {
            show: true,
            style: {
              colors: this.$vuetify.theme.dark ? 'white' : 'black'
            }
          }
        },
        chart: {
          id: 'vuechart-example',
          background: 'transparent',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: undefined,
          width: 1,
          dashArray: 0
        },
        tooltip: {
          enabled: true
        },
        theme: {
          mode: this.$vuetify.theme.dark ? 'dark' : 'light'
        },
        markers: {
          size: [3, 3, 3],
          hover: {
            size: undefined,
            sizeOffset: 3
          },
          radius: 100,
          colors: undefined,
          strokeWidth: 1,
        },
        legend: {
          show: true,
          horizontalAlign: 'left',
          fontSize: '14px',
          fontWeight: 700,
          fontFamily: 'Roboto, sans-serif',
          width: this.$vuetify.breakpoint.width / 2,
          markers: {
            width: 4,
            height: 14
          }
        }
      },

      series: [
        {
          name: 'Importe Disponible',
          data: [0, 0, 0, 0, 0, 0, 0],
          color: '#80DDDF'
        },
        {
          name: 'Importe Retenido',
          data: [0, 0, 0, 0, 0, 0, 0],
          color: '#00BBBF'
        },
        {
          name: 'Saldo Virtual',
          data: [0, 0, 0, 0, 0, 0, 0],
          color: '#007073'
        },
      ]
    }
  },
  watch: {
    balances(val) {
      this.series = [
        {
          name: 'Importe Disponible',
          data: val.available,
          color: '#80DDDF'
        },
        {
          name: 'Importe Retenido',
          data: val.locked,
          color: '#00BBBF'
        },
        {
          name: 'Saldo Virtual',
          data: val.virtual,
          color: '#007073'
        },
      ]
    }
  },
  mounted() {
    this.series = [
      {
        name: 'Importe Disponible',
        data: this.balances.available,
        color: '#80DDDF'
      },
      {
        name: 'Importe Retenido',
        data: this.balances.locked,
        color: '#00BBBF'
      },
      {
        name: 'Saldo Virtual',
        data: this.balances.virtual,
        color: '#007073'
      },
    ]
  }
}
</script>
