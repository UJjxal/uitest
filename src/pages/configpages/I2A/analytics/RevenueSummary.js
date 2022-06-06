import React,{useState, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import {Card, Row, Col, Skeleton} from 'antd';
import { getDataset } from "../../../../services/I2AService";
import "./css.css";
//let defColors=["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff", "#ABC4FF"];

function TopSummaryAreaChart(){
    let option = {
        grid:{left:0, right:0, top:0, bottom:0},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          show:false
        },
        yAxis: {
          type: 'value',
          show:false
        },
        series: [
          {
            data: [0, 10, 20, 10, 20, 15],
            type: 'line',
            smooth:false,
            showSymbol:false,
            areaStyle: {},
            color: '#B6D0E2',
          }
        ]
      };
    return(
        <ReactECharts option={option} style={{height: '40px'}} />
    )
}

function BusinessSnapshot(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_business_snapshot").then(({data})=>{
            setResult(data.response[0]);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <Card 
            className='shadow-sm'
            title="Business Snapshot" 
            size="small"
            bodyStyle={{padding:'10px 0 0 0'}}
            actions={[
                <div className='text-center'>
                    2021
                </div>
            ]}
        >
            {loading?(
                <div className='pl10 pr10 pt3 pb5'>
                    <Skeleton active />
                </div>
            ):(
                <div>
                    <div className='text-center'>
                        <div className='fs11'>AUM as of 13/1/21</div>
                        <div className='fs16 bold600'>{result.aum_as_of_31_12_2021}</div>
                        <div className='fs11 mt10'>
                            <Row gutter={[16, 16]} style={{marginBottom:0}}>
                                <Col span="6">
                                    <div className='lbl-ht1'>Changes<br />from 2020</div>
                                    <div className='bold600'>{(result.change_from_2020*100).toFixed(2)}%</div>
                                </Col>
                                <Col span="6">
                                    <div className='lbl-ht1'>Market<br />Growth Rate</div>
                                    <div className='bold600'>{(result.market_grwoth_rate*100).toFixed(2)}%</div>
                                </Col>
                                <Col span="6">
                                    <div className='lbl-ht1'>Net Flows</div>
                                    <div className='bold600'>{result.net_flows}</div>
                                </Col>
                                <Col span="6">
                                    <div className='lbl-ht1'>Net Flows<br />in %</div>
                                    <div className='bold600'>{(result.net_flows_*100).toFixed(2)}%</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <TopSummaryAreaChart />
                </div>
            )}
        </Card>
    )
}

function ClientStatistics(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_client_statistics").then(({data})=>{
            setResult(data.response[0]);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <Card 
            className='shadow-sm'
            title="Client Statistics" 
            size="small"
            bodyStyle={{padding:'10px 0 0 0'}}
            actions={[
                <div className='text-center'>
                    2021
                </div>
            ]}
        >
            {loading?(
                <div className='pl10 pr10 pt3 pb5'>
                    <Skeleton active />
                </div>
            ):(
                <div>
                    <div className='text-center'>
                        <div className='fs11'>Client as of 13/1/21</div>
                        <div className='fs16 bold600'>{result.clients_as_of_31_12_2021}</div>
                        <div className='fs11 mt10'>
                            <Row gutter={[16, 16]} style={{marginBottom:0}}>
                                <Col span="6">
                                    <div className='lbl-ht1'>New Clients</div>
                                    <div className='bold600'>{result.new_clients}</div>
                                </Col>
                                <Col span="6">
                                    <div className='lbl-ht1'>Lost Clients</div>
                                    <div className='bold600'>{result.lost_clients}</div>
                                </Col>
                                <Col span="6">
                                    <div className='lbl-ht1'>Prospects</div>
                                    <div className='bold600'>{result.prospects}</div>
                                </Col>
                                <Col span="6">
                                    <div className='lbl-ht1'>Conversion<br />Rate %</div>
                                    <div className='bold600'>{(result.conversion_rate*100).toFixed(2)}%</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <TopSummaryAreaChart />
                </div>
            )}
        </Card>
    )
}

function AdvisorGrowthAttrition(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_ag_a").then(({data})=>{
            setResult(data.response[0]);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <Card 
            className='shadow-sm'
            title="Advisor Growth & Attrition" 
            size="small"
            bodyStyle={{padding:'10px 0 0 0'}}
            actions={[
                <div className='text-center'>
                    2021
                </div>
            ]}
        >
            {loading?(
                <div className='pl10 pr10 pt3 pb5'>
                    <Skeleton active />
                </div>
            ):(
                <div>
                    <div className='text-center'>
                        <div className='fs11'>Advisor left as of 13/1/21</div>
                        <div className='fs16 bold600'>{result.advisors_left_in_2021}</div>
                        <div className='fs11 mt10'>
                            <Row gutter={[16, 16]} style={{marginBottom:0}}>
                                <Col span="8">
                                    <div className='lbl-ht1'>New Advisor<br />Joined in 2021</div>
                                    <div className='bold600'>{result.new_advisors_in_2021}</div>
                                </Col>
                                <Col span="8">
                                    <div className='lbl-ht1'>Advisor<br />Leads in 2021</div>
                                    <div className='bold600'>{result.advisors_leads_in_2021}</div>
                                </Col>
                                <Col span="8">
                                    <div className='lbl-ht1'>Lead<br />Conversion Rate %</div>
                                    <div className='bold600'>{(result.lead_conversion_ratio*100).toFixed(2)}%</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <TopSummaryAreaChart />
                </div>
            )}
        </Card>
    )
}

function YtdGdc(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_ytd_gdc").then(({data})=>{
            setResult(data.response[0]);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <Card 
            className='shadow-sm mb20'
            title="YTD GDC" 
            size="small"
        >
            {loading?(
                <div className='pl10 pr10 pt3 pb5'>
                    <Skeleton active paragraph={{rows:1}} />
                </div>
            ):(
                <div className='d-flex justify-content-center pt15 pb15'>
                    <div className='pr30 text-center'>
                        <div className='fs11 mb15'>Actual's (2021)</div>
                        <div className='fs16 bold600'>{result.actual_s_2021_}</div>
                    </div>
                    <div className='pl30 text-center'>
                        <div className='fs11 mb15'>Changes from 2020</div>
                        <div className='bold600 pt3'>
                            {result.change_from_2020} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {(result.change_from_2020_*100).toFixed(2)}%
                        </div>
                    </div>
                </div>
            )}
        </Card>
    )
}

function YtdAdvisoryGdc(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_ytd_advisory_gdc").then(({data})=>{
            setResult(data.response[0]);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <Card 
            className='shadow-sm mb20'
            title="YTD ADVISORY GDC" 
            size="small"
        >
            {loading?(
                <div className='pl10 pr10 pt3 pb5'>
                    <Skeleton active paragraph={{rows:1}} />
                </div>
            ):(
                <div className='d-flex justify-content-center pt15 pb15'>
                    <div className='pr30 text-center'>
                        <div className='fs11 mb15'>Actual's (2021)</div>
                        <div className='fs16 bold600'>{result.actual_s_2021_}</div>
                    </div>
                    <div className='pl30 text-center'>
                        <div className='fs11 mb15'>Changes from 2020</div>
                        <div className='bold600 pt3'>
                            {result.change_from_2020} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {(result.change_from_2020_*100).toFixed(2)}%
                        </div>
                    </div>
                </div>
            )}
        </Card>
    )
}

function AumBreakupChart(){
    const [result, setResult]=useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        setLoading(true);
        getDataset("wm_aum_breakup").then(({data})=>{
            setResult(data.response);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    let option={
		tooltip:{
		  trigger: 'item'
		},
		legend:{
		  bottom: '0%',
		  left: 'center'
		},
		series:[
		  {
			name: "",
			type: 'pie',
			label:{
				formatter:(params)=>{
					return params.percent+'%'; //params.name+' '+
				}
			},
			data:result.map(v=>{return {value:v.aum, name:v.type}}),
            color:["#B6D0E2", "#ffc107"],
		  }
		]
	};

    return(
        <div>
            {loading?(
                <Skeleton active paragraph={{rows:6}} />
            ):(
                <ReactECharts option={option} style={{height: '253px'}} />
            )}
        </div>
    );
}

function AdvisoryVsBrokerageChart(){
    const [result, setResult]=useState({nna:[], b_nna:[], a_nna:[]});
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        setLoading(true);
        getDataset("wm_advisory_vs_brokerage_gdc").then(({data})=>{
            let nna=[], b_nna=[], a_nna=[];
            b_nna=data.response.filter(v=>v.filter==='Brokerage GDC').map(v=>v.gdc);
            a_nna=data.response.filter(v=>v.filter==='Advisory GDC').map(v=>v.gdc);
            nna=b_nna.map((v,i)=>v+a_nna[i]);
            setResult({nna, b_nna, a_nna});
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    let option = {
        grid:{left:60, right:40, top:30, bottom:60},
        legend:{
			bottom:'0', left:'center', icon:'roundRect', itemGap:25,
		},
        tooltip: {
			trigger: 'item'
		},
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yAxis: {
          type: 'value',
          name:"GDC",
          nameLocation:'middle',
          nameGap:40,
          nameTextStyle:{fontWeight:'normal'},
          axisLabel:{
            formatter:(value)=>{
                return parseInt((value/1000000))+'M';
            }
          }
        },
        series: [
          {
            name:"NNA",
            data: result.nna,
            type: 'line',
            smooth:true,
            symbol:'circle',
            symbolSize:8,
            color: '#ffc107',
          },
          {
            name:"Brokerage NNA",
            data: result.b_nna,
            type: 'bar',
            color: '#B6D0E2',
          },
          {
            name:"Advisory NNA",
            data: result.a_nna,
            type: 'bar',
            color: '#191970',
          }
        ]
    };

    return(
        <div>
            {loading?(
                <Skeleton active paragraph={{rows:6}} />
            ):(
                <ReactECharts option={option} style={{height: '400px'}} />
            )}
        </div>
    )
}

function Top10Chart(props){
    const {type}=props;
    const [clients, setClients]=useState([]);
    const [loading, setLoading]=useState(true);

    let colors=['#043365', '#043365', '#365C84', '#365C84', '#6885A3', '#6885A3', '#9BADC1', '#9BADC1', '#CDD6E0', '#CDD6E0'];

    useEffect(()=>{
        setLoading(true);
        let tbl=type==='YTD'?'wm_top_10_reps_by_ytd_gdc':'wm_top_10_reps_by_ytd_advisory_gdc';
        getDataset(tbl).then(({data})=>{
            let records=data.response.map(v=>{return {name:v.rep_id, value:v.gross_comm_fee_amt_actuals_}});
            records.sort((a,b)=>b.value-a.value);
            records.forEach((v,i)=>{
                v.name=v.name.replace(/\s/g, '\n');
                v.value={value:v.value, itemStyle:{color:colors[i]}}
            })
            setClients(records);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    let option = {
        grid:{left:60, right:30, top:30, bottom:55},
        tooltip: {
			trigger: 'item'
		},
        xAxis: {
          type: 'category',
          data: clients.map(v=>v.name),
          axisLabel:{rotate:0, interval:0, fontSize:10},
        },
        yAxis: {
          type: 'value',
          name:"Total NNA",
          nameLocation:'middle',
          nameGap:40,
          nameTextStyle:{fontWeight:'normal'},
          axisLabel:{
            formatter:(value)=>{
                return parseInt(value/1000)+'K';
            }
          }
        },
        series: [
          {
            data: clients.map(v=>v.value),
            type: 'bar',
            label:{
                show:true,
                verticalAlign:'middle',
                rotate:90,
                position: 'inside',
                formatter:(params)=>{
                    if(params.dataIndex<=5){
                        return `{white|$${(params.value/1000).toFixed(2)}K}`;
                    }else{
                        return `{black|$${(params.value/1000).toFixed(2)}K}`;
                    }
                },

                rich:{white:{color:'#fff'}, black:{color:'#000'}}

            }
          }
        ]
    };
    return(
        <div>
            {loading?(
                <Skeleton active paragraph={{rows:6}} />
            ):(
                <ReactECharts option={option} style={{height:'400px'}} />
            )}
        </div>
    )
}

const RevenueSummary=()=>{
    return (
        <div className='p15'>
            <div className='row mb30'>
                <div className='col-md-4'>
                    <BusinessSnapshot />
                </div>

                <div className='col-md-4'>
                    <ClientStatistics />
                </div>

                <div className='col-md-4'>
                    <AdvisorGrowthAttrition />
                </div>
            </div>

            <div className='row mb30'>
                <div className='col-md-6'>
                    <YtdGdc />
                    <YtdAdvisoryGdc />
                </div>

                <div className='col-md-6'>
                    <Card className='shadow-sm' size="small">
                        <div className='text-center'>
                            <div className='bold600'>AUM's Breakup</div>
                            <div>Client</div>
                        </div>
                        <AumBreakupChart />
                    </Card>
                </div>
            </div>

            <div className='row mb30'>
                <div className='col-md-12'>
                    <Card className='shadow-sm' size="small">
                        <div className='text-center'>
                            <div className='bold600'>Advisory Vs Brokerage GDC</div>
                            <div>Year 2021</div>
                        </div>
                        <AdvisoryVsBrokerageChart />
                    </Card>
                </div>
            </div>

            <div className='row mb30'>
                <div className='col-md-6'>
                    <Card className='shadow-sm' size="small">
                        <div className='text-center bold600'>Top 10 Reps by YTD GDC</div>
                        <Top10Chart type="YTD" />
                        <div className='text-center'>Client</div>
                    </Card>
                </div>

                <div className='col-md-6'>
                    <Card className='shadow-sm' size="small">
                        <div className='text-center bold600'>Top 10 Reps by YTD Advisory GDC</div>
                        <Top10Chart type="YTD_Advisory" />
                        <div className='text-center'>Client</div>
                    </Card>
                </div>
            </div>

            <div>&nbsp;</div>
        </div>
    );
}

export default RevenueSummary;