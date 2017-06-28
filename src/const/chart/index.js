/**
 * Created by Yinxiong on 2017/5/30.
 */

export const COLORS = ['#7be7bd', '#6dbaf6', '#fec460', '#fdac90', '#acacac', '#ffd740', '#96a8ea', '#e38365', '#ad98ea', '#8297bf', '#f76556', '#61b9c3']

export const STOCK_CHART_CONFIG = {
  stockChart: true,
  rangeSelector: {
    inputEnabled: false,
    enabled: false
  }
}

export const STOCK_COLUMN_CONFIG = {
  chart: {
    type: 'column'
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
    valueDecimals: 0
  },
  plotOptions: {
    column: {
      stacking: 'normal'
    }
  },
  legend: {
    reversed: true,
    enabled: true
  },
  xAxis: {
    type: 'datetime',
    labels: {
      format: '{value:%m-%d}',
      align: 'center'
    }
  }
}

export const WEEK_CHART_TIPS = {
  tooltip: {
    xDateFormat: '第%W周 %Y-%m-%d'
  },
  xAxis: {
    tickInterval: 7 * 24 * 36e5, // one week
    labels: {
      format: '{value:%W周}'
    }
  }
}

export const PIE_CHART_CONFIG = {
  chart: {
    type: 'pie'
  },
  tooltip: {
    headerFormat: '<span>{series.name}</span><br>',
    pointFormat: '{point.name}: <b>{point.y}</b>'
  },
  plotOptions: {
    pie: {
      size: '50%',
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  }
}

export const COLUMN_CHART_CONFIG = {
  chart: {
    type: 'column'
  },
  plotOptions: {
    column: {
      maxPointWidth: 50,
      dataLabels: {
        enabled: true
      }
    }
  }
}
