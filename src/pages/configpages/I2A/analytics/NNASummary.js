import React,{useState, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import {Card, Switch, Skeleton} from 'antd';
import { getDataset } from "../../../../services/I2AService";
import "./css.css";

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

function YtdNna(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_ytd_nna").then(({data})=>{
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
            title="YTD NNA" 
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
                    <div className='text-center mb15'>
                        <div className='fs11'>Actual's 2021</div>
                        <div className='fs16 bold600'>{result.actual_s_2021_}</div>
                        <div className='fs11 mt5'>Changes from 2020</div>
                        <div className='fs11 bold600'>{result.change_from_2020} &nbsp;&nbsp;&nbsp;&nbsp; {(result.change_from_2020_*100).toFixed(2)}%</div>
                    </div>
                    <TopSummaryAreaChart />
                </div>
            )}
        </Card>
    )
}

function YtdAdvisoryNna(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_ytd_advisory_nna").then(({data})=>{
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
            title="YTD ADVISORY NNA" 
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
                    <div className='text-center mb15'>
                        <div className='fs11'>Actual's 2021</div>
                        <div className='fs16 bold600'>{result.actual_s_2021_}</div>
                        <div className='fs11 mt5'>Changes from 2020</div>
                        <div className='fs11 bold600'>{result.change_from_2020} &nbsp;&nbsp;&nbsp;&nbsp; {(result.change_from_2020_*100).toFixed(2)}%</div>
                    </div>
                    <TopSummaryAreaChart />
                </div>
            )}
        </Card>
    )
}

function YtdBrokerageNna(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_ytd_brokerage_nna").then(({data})=>{
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
            title="YTD BROKERAGE NNA" 
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
                    <div className='text-center mb15'>
                        <div className='fs11'>Actual's 2021</div>
                        <div className='fs16 bold600'>{result.actual_s_2021_}</div>
                        <div className='fs11 mt5'>Changes from 2020</div>
                        <div className='fs11 bold600'>{result.change_from_2020} &nbsp;&nbsp;&nbsp;&nbsp; {(result.change_from_2020_*100).toFixed(2)}%</div>
                    </div>
                    <TopSummaryAreaChart />
                </div>
            )}
        </Card>
    )
}

function AdvisoryVsBrokerageChart(){
    const [result, setResult]=useState({nna:[], b_nna:[], a_nna:[]});
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        setLoading(true);
        getDataset("wm_advisory_vs_brokerage_nna").then(({data})=>{
            let nna=[], b_nna=[], a_nna=[];
            b_nna=data.response.filter(v=>v.filter==='Brokerage NNA').map(v=>v.net_new_asset_value);
            a_nna=data.response.filter(v=>v.filter==='Advisory NNA').map(v=>v.net_new_asset_value);
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
          name:"Net New Asset Value",
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

function Top10RepIdsChart(){
    const [filterType, setFilterType]=useState('Advisory');

    const [repids, setRepIds]=useState([]);
    const [loading, setLoading]=useState(true);

    const getRepIds=()=>{
        let tbl=filterType==='Advisory'?'wm_advisor_nna_by_repid_ytd_copy':'wm_nna_by_repid_ytd';
        setLoading(true);
        getDataset(tbl).then(({data})=>{
            let rec=data.response.map(v=>{return {name:v.repid, value:v.nna}});
            setRepIds(rec);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(()=>{
        getRepIds();
    }, [filterType]);

    let option = {
        grid:{left:60, right:30, top:30, bottom:55},
        tooltip: {
			trigger: 'item'
		},
        xAxis: {
          type: 'category',
          data: repids.map(v=>v.name),
          axisLabel:{rotate:0, interval:0, fontSize:10},
          show:false,
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
          },
          show:false,
        },
        series: [
          {
            data: repids.map(v=>v.value),
            type: 'scatter',
            color:'#FFB16D',
            label:{
                show:true,
                align:'center',
                verticalAlign:'middle',
                //rotate:90,
                position: 'inside',
                formatter:(params)=>{
                    return `{black|${params.name}\n\n$${(params.value/1000000).toFixed(2)}M}`;
                },
                rich:{black:{color:'#000'}}
            },
            symbolSize: function (data) {
                return Math.sqrt(data)/10;
            },
          }
        ]
    };
    return(
        <Card className='shadow-sm' size="small">
            <div className='d-flex align-items-center justify-content-between'>
                <div></div>
                <div className='text-center bold600'>
                    Top 10 Rep ID by {filterType==='Advisory'?'Advisory YTD': 'YTD NNA'}
                </div>

                <div>
                    <div className='d-flex align-items-center ant-switch-color-checked-always'>
                        <div>
                            Advisory YTD
                        </div>
                        <div className='pl5 pr5'>
                            <Switch checked={filterType==='NNA'} onChange={checked=>setFilterType(checked?'NNA':'Advisory')} />
                        </div>
                        <div>
                            YTD NNA
                        </div>
                    </div>
                </div>
            </div>

            {loading?(
                <Skeleton active paragraph={{rows:11}} />
            ):(
                <ReactECharts option={option} style={{height:'400px'}} />
            )}
        </Card>
    )
}

function Top10ClientsChart(props){
    const {type}=props;
    const [filterType, setFilterType]=useState('YTD');

    const [clients, setClients]=useState([]);
    const [loading, setLoading]=useState(true);

    let colors=['#043365', '#043365', '#365C84', '#365C84', '#6885A3', '#6885A3', '#9BADC1', '#9BADC1', '#CDD6E0', '#CDD6E0'];

    const getClients=()=>{
        let tbl='';
        switch(type){
            case 'Inflows':
                tbl=filterType==='YTD'?'wm_nna_inflows_ytd':'wm_nna_inflows_dec_21';
            break;

            default:
                tbl=filterType==='YTD'?'wm_nna_outflows_ytd':'wm_nna_outflows_dec_21';
        }

        setLoading(true);
        getDataset(tbl).then(({data})=>{
            let records=data.response.map(v=>{return {name:v.client, value:v.total_nna_nna_}});
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
    }

    useEffect(()=>{
        getClients();
    }, [filterType]);

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
        <Card className='shadow-sm' size="small">
            <div className='d-flex align-items-center justify-content-between'>
                <div></div>
                <div className={`text-center bold600 ${type==='Inflows'?'text-success':'text-danger'}`}>
                    NNA {type} - {filterType==='Month'?'Dec 21':'YTD'}
                </div>

                <div>
                    <div className='d-flex align-items-center ant-switch-color-checked-always'>
                        <div>
                            YTD
                        </div>
                        <div className='pl5 pr5'>
                            <Switch checked={filterType==='Month'} onChange={checked=>setFilterType(checked?'Month':'YTD')} />
                        </div>
                        <div>
                            Dec 21
                        </div>
                    </div>
                </div>
            </div>

            {loading?(
                <Skeleton active paragraph={{rows:11}} />
            ):(
                <ReactECharts option={option} style={{height:'400px'}} />
            )}

            <div className='text-center'>Client</div>
        </Card>
    )
}

function Top10HouseholdsChart(props){
    const {type}=props;
    const [filterType, setFilterType]=useState('YTD');

    const [households, setHouseholds]=useState([]);
    const [loading, setLoading]=useState(true);

    let colors=['#043365', '#043365', '#365C84', '#365C84', '#6885A3', '#6885A3', '#9BADC1', '#9BADC1', '#CDD6E0', '#CDD6E0'];

    const getHouseholds=()=>{
        let tbl='';
        switch(type){
            case 'Inflows':
                tbl=filterType==='YTD'?'wm_nna_inflows_households_ytd':'wm_nna_inflows_households_monthly';
            break;

            default:
                tbl=filterType==='YTD'?'wm_nna_outflows_households_ytd':'wm_nna_outflows_households_monthly';
        }

        setLoading(true);
        getDataset(tbl).then(({data})=>{
            let records=data.response.map(v=>{return {name:v.client, value:v.total_nna_nna_}});
            records.sort((a,b)=>b.value-a.value);
            setHouseholds(records);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(()=>{
        getHouseholds();
    }, [filterType]);

    let option={
        grid:{left:0, right:0, top:0, bottom:0},
        color:colors,
        series: [
          {
            type: 'treemap',
            nodeClick:false,
            roam:false,
            breadcrumb:{show:false},
            width:'100%',
            height:'100%',
            data: households.map(v=>{return {name:v.name, value:v.value}}),
            label:{
                show:true,
                verticalAlign:'middle',
                //rotate:90,
                position: 'inside',
                formatter:(params)=>{
                    if(params.dataIndex<=5){
                        return `{white|${params.name}\n\n$${(params.value/1000).toFixed(2)}K}`;
                    }else{
                        return `{black|${params.name}\n\n$${(params.value/1000).toFixed(2)}K}`;
                    }
                },
                rich:{white:{color:'#fff'}, black:{color:'#000'}}
            }
          }
        ]
    };
    return(
        <Card className='shadow-sm' size="small">
            <div className='d-flex align-items-center justify-content-between pb15'>
                <div></div>
                <div className={`text-center bold600 ${type==='Inflows'?'text-success':'text-danger'}`}>
                    NNA {type} - {filterType==='Month'?'Dec 21':'YTD'}
                </div>

                <div>
                    <div className='d-flex align-items-center ant-switch-color-checked-always'>
                        <div>
                            YTD
                        </div>
                        <div className='pl5 pr5'>
                            <Switch checked={filterType==='Month'} onChange={checked=>setFilterType(checked?'Month':'YTD')} />
                        </div>
                        <div>
                            Dec 21
                        </div>
                    </div>
                </div>
            </div>

            {loading?(
                <Skeleton active paragraph={{rows:11}} />
            ):(
                <ReactECharts option={option} style={{height:'400px'}} />
            )}
        </Card>
    )
}


const NNASummary=()=>{
    return (
        <div className='p15'>
            <div className='row mb30'>
                <div className='col-md-4'>
                    <YtdNna />
                </div>

                <div className='col-md-4'>
                    <YtdAdvisoryNna />
                </div>

                <div className='col-md-4'>
                    <YtdBrokerageNna />
                </div>
            </div>

            <div className='row mb30'>
                <div className='col-md-12'>
                    <Card className='shadow-sm' size="small">
                        <div className='text-center'>
                            <div className='bold600'>Advisory Vs Brokerage NNA</div>
                            <div>Year 2021</div>
                        </div>
                        <AdvisoryVsBrokerageChart />
                    </Card>
                </div>
            </div>

            <div className='row mb30'>
                <div className='col-md-12'>
                    <Top10RepIdsChart />
                </div>
            </div>

            <div className='row mb30'>
                <div className='col-md-12 mb10 text-center'>
                    <h4>NNA by Top 10 Clients</h4>
                </div>

                <div className='col-md-6'>
                    <Top10ClientsChart type="Inflows" />
                </div>

                <div className='col-md-6'>
                    <Top10ClientsChart type="Outflows" />
                </div>
            </div>

            <div className='row mb30'>
                <div className='col-md-12 mb10 text-center'>
                    <h4>NNA by Top 10 Households</h4>
                </div>

                <div className='col-md-6'>
                    <Top10HouseholdsChart type="Inflows" />
                </div>

                <div className='col-md-6'>
                    <Top10HouseholdsChart type="Outflows" />
                </div>
            </div>

            <div>&nbsp;</div>
        </div>
    );
}

export default NNASummary;