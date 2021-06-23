import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Button, Typography, Card, Select } from "antd";

import { Line , Doughnut } from "react-chartjs-2";
import WidgetCart from "../../components/dasboard/widgetCart"
import WidgetTotalIncome from "../../components/dasboard/widgetTotalIncome"
import WidgetNewUser from "../../components/dasboard/widgetNewUser"
import WidgetShipping from "../../components/dasboard/widgetShipping"

import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
import { fetchData } from "../../../actions/dashboard";
import { useParams } from "react-router-dom";

const { Text } = Typography;

function Dashboard({ fetchData, currentData, chartData, preData, chart2Data}) {
    const [timebt, setTimebt] = useState('week')
const { Option } = Select;

    const colorChart = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        '#C12E64',
        '#C12EB8',
        '#6E2EC1',
        '#072EF5',
        '#0FE5DE',
        '#16CD22',
        '#09510E',
        '#69A21F',
        '#919521',
        '#E17C18',
        '#C34242'
      ]
   const dataChart = {
    labels: chartData.label,
    datasets: [
      {
        label: "Products sold",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData.data,
      }
    ],
    }
    const dataChart2 = {
        labels: chart2Data.label,
        datasets: [{
          label: 'My First Dataset',
          data: chart2Data.data,
          backgroundColor: colorChart,
          hoverOffset: 4
        }]
      };

      const setTimeChange = (value) => {
          setTimebt(value)
      }

    const params = useParams();
    useEffect(() => {
        console.log("params: ", params);
        fetchData(timebt);
    }, [timebt]);


    const style = { background: '#0092ff', padding: '8px 0' , margin : '0 0 20px 0'};
    return (
        <>
        <Row >
        <Select
                                    onChange={setTimeChange}
                                    style={{ width: "100%" }}
                                    defaultValue="week"
                                >
                                    <Option value="week">Week</Option>
                                    <Option value="month">Month</Option>
                                </Select>
        </Row>
        <br></br>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={6}>
                        <WidgetCart total = {currentData.totalOrder} preTotal={preData.totalOrder}></WidgetCart>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <WidgetShipping total = {currentData.totalShipping}  preTotal={preData.totalShipping}></WidgetShipping>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <WidgetTotalIncome total = {currentData.totalIncome} preTotal={preData.totalIncome}></WidgetTotalIncome>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <WidgetNewUser  total = {currentData.totalUser} preTotal={preData.totalUser} ></WidgetNewUser>
                    </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={16}>
                        <Card title="Product Sales" bordered={false}>
                            <div className="chart1">
                                <Line id="myChart" data={dataChart} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Product Sales with category" bordered={false}>
                        <div className="chart2">
                            <Doughnut data={ dataChart2 } />
                        </div>
                    </Card>
                    </Col>
                </Row>
        </>
    );
}

function mapStateToProps(state) {
    return {
        currentData : state.dashboard.list.current,
        preData : state.dashboard.list.pre,
        chartData : state.dashboard.list.chart,
        chart2Data : state.dashboard.list.chart2
    };
}

export default connect(mapStateToProps, { fetchData })(Dashboard);
