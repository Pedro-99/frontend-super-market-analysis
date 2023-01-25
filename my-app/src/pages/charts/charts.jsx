import React from 'react';
import Layout from '../../layouts/layout';
import VerticalBarChart from '../../components/charts/verticalBarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import HorizontalBarChar from '../../components/charts/horizontalBarChar';

export default function Charts() {
    return (

        <Layout>
            <div >
                <h1 className='text-warning text-center m-5'>Super Market Charts analisys</h1>
                <br />
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col mb-5">
                            <DoughnutChart />

                        </div>
                        <div className="col mb-5 ">
                            <VerticalBarChart />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col mb-5">
                            <HorizontalBarChar />

                        </div>
                        <div className="col ">
                        

                        </div>
                        

                    </div>
                </div>
            </div>
        </Layout>

    )
}
