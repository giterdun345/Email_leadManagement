
import ReactECharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';

import { Row, Col } from 'antd'

const option_bar = {
  xAxis: {
      type: 'category',
      data: ['Template 1', 'Template 2', 'Template 3, Template 4']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [120, 200, 150, 80],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
      }
  }]
};

const option_line = {
  xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [25, 25, 30, 35, 55, 40, 50],
      type: 'line',
      smooth: true
  }]
};

const option_calendar = {
  visualMap: {
      show: false,
      min: 0,
      max: 10000
  },
  calendar: {
      range: 'Campaign 1'
  },
  series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: [10, 20, 20, 30]
  }
};

const option_small_gauge = {
  tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
  },
  series: [{
      name: 'Pressure',
      type: 'gauge',
      progress: {
          show: true
      },
      detail: {
          valueAnimation: true,
          formatter: '{value}'
      },
      data: [{
          value: 50,
          name: 'Sent Today'
      }]
  }]
}


const Dashboard= ()=>{
  return(
    <>
    <Row>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      <ReactECharts
        option={option_small_gauge}
        notMerge={true}
        // lazyUpdate={true}
        // theme={"theme_name"}
        // onChartReady={this.onChartReadyCallback}
        // onEvents={EventsDict}
        // opts={}
      />
    </Col>
    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
    <ReactECharts
        option={option_line}
        notMerge={true}
        // lazyUpdate={true}
        // theme={"theme_name"}
        // onChartReady={this.onChartReadyCallback}
        // onEvents={EventsDict}
        // opts={}
      />
    </Col>
    {/* <Col xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
    fgh
    </Col> */}
  </Row>
  <Row>
    <ReactECharts
    echarts={echarts}
    option={option_calendar}
    notMerge={true}
    lazyUpdate={true}
    // theme={"theme_name"}
    // onChartReady={this.onChartReadyCallback}
    // onEvents={EventsDict}
    // opts={}
    />
  </Row>
  <Row>
  <ReactECharts
      echarts={echarts}
      option={option_bar}
      // notMerge={true}
      // lazyUpdate={true}
      // theme={"theme_name"}
      // onChartReady={this.onChartReadyCallback}
      // onEvents={EventsDict}
      // opts={}
      />
  </Row>
  </>
  )
}

export default Dashboard