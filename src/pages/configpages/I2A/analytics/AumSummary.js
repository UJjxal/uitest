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

function YtdAum(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_ytd_aum_21_vs_20").then(({data})=>{
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
            title="YTD AUM" 
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

function YtdAdvisoryAum(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_ytd_advisory_aum_21_vs_20").then(({data})=>{
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
            title="YTD ADVISORY AUM" 
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

function YtdBrokerageAum(){
    const [result, setResult]=useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        getDataset("wm_ytd_brokerage_aum_21_vs_20").then(({data})=>{
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
            title="YTD BROKERAGE AUM" 
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
                <Skeleton active paragraph={{rows:11}} />
            ):(
                <ReactECharts option={option} style={{height: '400px'}} />
            )}
        </div>
    );
}

function AdvisoryVsBrokerageChart(){
    const [result, setResult]=useState({nna:[], b_nna:[], a_nna:[]});
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        setLoading(true);
        getDataset("wm_advisory_vs_brokerage_aum").then(({data})=>{
            let nna=[], b_nna=[], a_nna=[];
            b_nna=data.response.filter(v=>v.type==='Brokerage Monthly AUM (Actuals)').map(v=>v.monthly_aum_actuals_);
            a_nna=data.response.filter(v=>v.type==='Advisory Monthly AUM (Actuals)').map(v=>v.monthly_aum_actuals_);
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
                <Skeleton active paragraph={{rows:11}} />
            ):(
                <ReactECharts option={option} style={{height: '400px'}} />
            )}
        </div>
    )
}

function Top10Chart(props){
    const {type}=props;
    const [filterType, setFilterType]=useState('Month');

    const [records, setRecords]=useState([]);
    const [loading, setLoading]=useState(true);

    let colors=['#043365', '#043365', '#365C84', '#365C84', '#6885A3', '#6885A3', '#9BADC1', '#9BADC1', '#CDD6E0', '#CDD6E0'];

    const getRecords=()=>{
        let tbl='';
        switch(type){
            case 'Clients':
                tbl=filterType==='YTD'?'wm_top_10_clients_by_month_aum':'wm_top_10_clients_by_month_aum';
            break;

            default:
                tbl=filterType==='YTD'?'wm_top_10_households_by_month_aum':'wm_top_10_households_by_month_aum';
        }

        setLoading(true);
        getDataset(tbl).then(({data})=>{
            let rec=data.response.map(v=>{return {name:type==='Clients'?v.client:v.household, value:v.monthly_aum_actuals_}});
            rec.sort((a,b)=>b.value-a.value);
            rec.forEach((v,i)=>{
                v.name=v.name.replace(/\s/g, '\n');
                v.value={value:v.value, itemStyle:{color:colors[i]}}
            })
            setRecords(rec);
        }).catch(e=>{
            console.log(e);
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(()=>{
        getRecords();
    }, [filterType]);

    let option = {
        grid:{left:80, right:30, top:30, bottom:55},
        tooltip: {
			trigger: 'item'
		},
        xAxis: {
          type: 'category',
          data: records.map(v=>v.name),
          axisLabel:{rotate:0, interval:0, fontSize:10},
        },
        yAxis: {
          type: 'value',
          name:`${filterType==='YTD'?'YTD':'Monthly'} AUM (Actuals)`,
          nameLocation:'middle',
          nameGap:60,
          nameTextStyle:{fontWeight:'normal'},
          axisLabel:{
            formatter:(value)=>{
                return parseInt(value/1000)+'K';
            }
          }
        },
        series: [
          {
            data: records.map(v=>v.value),
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
            <div className='d-flex1 align-items-center1 justify-content-between1'>
                {/* <div></div> */}
                <div className={`text-center bold600`}>
                    Top 10 {type} by {filterType==='Month'?'Month':'YTD'} - AUM
                </div>

                <div className='d-none'>
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

            <div className='text-center'>{type}</div>
        </Card>
    )
}

const AumSummary=()=>{
    useEffect(()=>{
    }, [])


    return (
        <div className='p15'>
            <div className='row mb30'>
                <div className='col-md-4'>
                    <YtdAum />
                </div>

                <div className='col-md-4'>
                    <YtdAdvisoryAum />
                </div>

                <div className='col-md-4'>
                    <YtdBrokerageAum />
                </div>
            </div>

            <div className='row mb30'>
                <div className='col-md-8'>
                    <Card className='shadow-sm' size="small">
                        <div className='text-center'>
                            <div className='bold600'>Advisory Vs Brokerage AUM</div>
                            <div>Year 2021</div>
                        </div>
                        <AdvisoryVsBrokerageChart />
                    </Card>
                </div>

                <div className='col-md-4'>
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
                <div className='col-md-6'>
                    <Top10Chart type="Clients" />
                </div>

                <div className='col-md-6'>
                    <Top10Chart type="Households" />
                </div>
            </div>
            <div>&nbsp;</div>
        </div>
    );
}

export default AumSummary;