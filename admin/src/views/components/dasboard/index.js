import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Button, Typography, Card } from "antd";

import { Line , Doughnut } from "react-chartjs-2";
import WidgetCart from "../../components/dasboard/widgetCart"
import WidgetTotalIncome from "../../components/dasboard/widgetTotalIncome"
import WidgetNewUser from "../../components/dasboard/widgetNewUser"

import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
import { addUser, getUser } from "../../../actions/users";
import { useParams } from "react-router-dom";

const { Text } = Typography;

function Dashboard({ addUser, addUserState, getUser, getUserState }) {
//    const WidgetCart = React.lazy(() => import ("../../components/dasboard/widgetCart") );
//    const WidgetTotalIncome = React.lazy(() => import ("../../components/dasboard/widgetTotalIncome") );
//    const WidgetNewUser = React.lazy(() => import ("../../components/dasboard/widgetNewUser") );

   const dataChart = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ],
    datasets: [
      {
        label: "My First dataset",
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
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "My Second dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(192, 192, 192, 0.2)",
        borderColor: "rgba(192, 192, 192, 1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(192, 192, 192, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(192, 192, 192, 1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [3, 6, 80, 9, 56, 53, 70],
      },
    ],
    }
    const dataChart2 = {
        labels: [
          'Desktop',
          'Tablet',
          'Mobile'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

    const params = useParams();

    useEffect(() => {
        console.log("params: ", params);
        if (params.id) {
            getUser(params.id);
        }
    }, []);

    useEffect(() => {
       
    }, []);

    const style = { background: '#0092ff', padding: '8px 0' , margin : '0 0 20px 0'};
    return (
        <>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={6}>
                        <WidgetCart></WidgetCart>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <WidgetTotalIncome></WidgetTotalIncome>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <WidgetNewUser></WidgetNewUser>
                    </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={16}>
                        <Card title="Card title" bordered={false}>
                            <div className="chart1">
                                <Line id="myChart" data={dataChart} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                    <Card title=" Statistics" bordered={false}>
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
        addUserState: state.users.addUser,
        getUserState: state.users.getUser,
    };
}

export default connect(mapStateToProps, { addUser, getUser })(Dashboard);
