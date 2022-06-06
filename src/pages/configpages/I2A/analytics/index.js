import React,{useState, useEffect} from 'react';
import "./css.css";
import RevenueSummary from './RevenueSummary';
import NNASummary from './NNASummary';
import AumSummary from './AumSummary';
import KPISummary from './KPISummary';
import {Tabs} from 'antd';
const {TabPane}=Tabs;

const Index=()=>{
    const [tab, setTab]=useState('1');

    useEffect(()=>{
    }, [])


    return (
        <div className="container-fluid px-5 py-4 bold500">
            <div style={{marginTop:'-12px'}}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h4 className="font-weight-bold">Project Management Analytics</h4>
                    </div>
                    <div>
                        <Tabs activeKey={tab} onChange={k=>setTab(k)}>
                            <TabPane tab="Revenue Summary" key="1">
                            </TabPane>
                            <TabPane tab="NNA Summary" key="2">
                            </TabPane>
                            <TabPane tab="AUM Summary" key="3">
                            </TabPane>
                            <TabPane tab="KPI Summary" key="4">
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>

            <div>
                {tab==='1' && <RevenueSummary />}
                {tab==='2' && <NNASummary />}
                {tab==='3' && <AumSummary />}
                {tab==='4' && <KPISummary />}
            </div>
        </div>
    );
}

export default Index;