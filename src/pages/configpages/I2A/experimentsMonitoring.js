import React,{ useState, useEffect } from 'react';
import { Card, Icon, Button, MenuItem, InputAdornment, Select, FormControl, OutlinedInput } from "@material-ui/core";
import { Table, Tooltip, DatePicker } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { CONTEXT } from "../../../config";
import Loader, { ShimmerLoaderTable } from '../../../utilities/Loader';
import { listExperimentsMonitoring } from "../../../services/I2AService";

const ExperimentsMonitoring = () => {
    const currentYear = new Date().getFullYear();
    const [isLoading, setIsLoading] = useState(false);
    const [monitoringData, setMonitoringData] = useState({ header: [], data: [], headerInfo: {}, cardHoverInfo: [] });
    const [rawData, setRawData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedYear, setSelectedYear] = useState({currentPeriodStartDate: '', currentPeriodEndDate: ''});

    const headerInfo = [
        {
            icon: 'flask.svg',
            title: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[0].cardName : '-',
            desc: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[0].cardDesc : '-',
            value: monitoringData.headerInfo?.totalExpCount ?? '-',
            unit: '',
            counts: '',
            TestControl: monitoringData.headerInfo?.testVsControlExpCount ?? '-',
            ABTesting: monitoringData.headerInfo?.abExpCount ?? '-',
            PrePost: monitoringData.headerInfo?.prePostExpCount ?? '-'
        },
        {
            icon: 'experiment_success.svg',
            title: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[2].cardName : '-',
            desc: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[2].cardDesc : '-',
            value: (`totalExpWinCount` in monitoringData.headerInfo) ? Math.round((monitoringData.headerInfo.totalExpWinCount / monitoringData.headerInfo.totalExpCount) * 100) : '-',
            unit: '%',
            counts: (monitoringData.headerInfo?.totalExpWinCount ?? '-') + ' of ' + (monitoringData.headerInfo?.totalExpCount ?? '-') + ' experiments',
            TestControl: (monitoringData.headerInfo?.testVsControlExpWinCount ?? '-') + '/' + (monitoringData.headerInfo?.testVsControlExpCount ?? '-'),
            ABTesting: (monitoringData.headerInfo?.abExpWinCount ?? '-') + '/' + (monitoringData.headerInfo?.abExpCount ?? '-'),
            PrePost: (monitoringData.headerInfo?.prePostExpWinCount ?? '-') + '/' + (monitoringData.headerInfo?.prePostExpCount ?? '-')
        },
        {
            icon: 'population_icon.svg',
            title: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[5].cardName : '-',
            desc: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[5].cardDesc : '-',
            value: shortInt(monitoringData.headerInfo?.expAvgPopulation) ?? '-',
            unit: '',
            counts: '',
            TestControl: shortInt(monitoringData.headerInfo?.testVsControlExpAvgPopulation) ?? '-',
            ABTesting: shortInt(monitoringData.headerInfo?.abExpAvgPopulation) ?? '-',
            PrePost: shortInt(monitoringData.headerInfo?.prePostExpAvgPopulation) ?? '-'
        },
        {
            icon: 'action_ratio_icon.svg',
            title: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[1].cardName : '-',
            desc: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[1].cardDesc : '-',
            value: `${monitoringData.headerInfo?.totalExpCount ?? '-'}:${monitoringData.headerInfo?.totalActionCount ?? '-'}`,
            unit: '',
            counts: '',
            TestControl: `${monitoringData.headerInfo?.testVsControlExpCount ?? '-'}:${monitoringData.headerInfo?.testVsControlExpActionCount ?? '-'}`,
            ABTesting: `${monitoringData.headerInfo?.abExpCount ?? '-'}:${monitoringData.headerInfo?.abExpActionCount ?? '-'}`,
            PrePost: `${monitoringData.headerInfo?.prePostExpCount ?? '-'}:${monitoringData.headerInfo?.prePostExpActionCount ?? '-'}`
        },
        {
            icon: 'average_icon.svg',
            title: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[3].cardName : '-',
            desc: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[3].cardDesc : '-',
            value: (`totalExpAvgDuration` in monitoringData.headerInfo) ? Math.round(monitoringData.headerInfo.totalExpAvgDuration) : '-',
            unit: ' days',
            counts: '',
            TestControl: (`testVsControlExpAvgDuration` in monitoringData.headerInfo && monitoringData.headerInfo.testVsControlExpAvgDuration) ? Math.round(monitoringData.headerInfo.testVsControlExpAvgDuration) + ` D` : '-',
            ABTesting: (`abExpAvgDuration` in monitoringData.headerInfo && monitoringData.headerInfo.abExpAvgDuration) ? Math.round(monitoringData.headerInfo.abExpAvgDuration) + ` D` : '-',
            PrePost: (`prePostExpAvgDuration` in monitoringData.headerInfo && monitoringData.headerInfo.prePostExpAvgDuration) ? Math.round(monitoringData.headerInfo.prePostExpAvgDuration) + ` D` : '-'
        },
        {
            icon: 'velocity_icon.svg',
            title: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[4].cardName : '-',
            desc: monitoringData.cardHoverInfo.length ? monitoringData.cardHoverInfo[4].cardDesc : '-',
            value: monitoringData.headerInfo?.totalVelocity ?? '-',
            unit: '',
            counts: '',
            TestControl: monitoringData.headerInfo?.testVsControlVelocity ?? '-',
            ABTesting: monitoringData.headerInfo?.abVelocity ?? '-',
            PrePost: monitoringData.headerInfo?.prePostVelocity ?? '-'
        }
    ]

    const fetchExperimentsMonitoring = (currentPeriodStartDate, currentPeriodEndDate) => {
        setIsLoading(true);
        const data = { currentPeriodStartDate, currentPeriodEndDate };
        
        listExperimentsMonitoring(data)
            .then(({ data }) => {
                if (data.code === 200) {
                    setMonitoringData({data: data.response.data, headerInfo:isJsonString(data.response.header), cardHoverInfo: data.response.cardHoverInfo});
                    setRawData(data.response.data);
                    setSelectedYear({ currentPeriodStartDate, currentPeriodEndDate })
                }else{
                    setMonitoringData({ header: [], data: [], headerInfo: {}, cardHoverInfo: [] });
                    setRawData([]);
                }
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }

    const getOption = (jsonStr) => {
        let data = isJsonString(jsonStr);
        let chartStr = (`series` in data) ? data : { xAxis: { data: [] }, series: [{ data: [], markLine: { data: [{ xAxis: '' }] } }] };
        //let idx = (chartStr.xAxis.data).indexOf(chartStr.series[0].markLine.data.xAxis);
        const option = {
            xAxis: {
                show: false,
                type: 'category',
            },
            yAxis: {
                show: true,
                type: 'value',
                showGrid: false,
                splitLine: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitNumber: 3,
                fontSize: 8,
                fontSize: 10,
                axisLabel: {
                    formatter: function (value) { return shortInt(value) }
                }
            },
            grid: {
                top: '10%',
                bottom: '10%',
                right: '10%',
                left: '10%'
            },
            visualMap: {
                show: false,
                dimension: 0,
            },
            series: chartStr.series.map((item, i) => ({
                data: item.data,
                name: item.name,
                type: 'line',
                showSymbol: false,
                itemStyle: {
                    normal: {
                        color: (item.name).includes(`Desired`) ? '#BDBDBD' : (item.name).includes(`Test`) ? '#365C84' : '#DA8A8A',
                        lineStyle: {
                            width: i === 0 ? 1 : 2,
                            color: (item.name).includes(`Desired`) ? '#BDBDBD' : (item.name).includes(`Test`) ? '#365C84' : '#DA8A8A'
                        }
                    }
                }
            }))
        };
        return option;
    }

    const tableHeader = (headerData) => {
		return [
                {
                    title: `Treatment`,
					dataIndex: `expName`,
					key: `expName`,
                    width: 150,
                    sorter: (a, b) => a.expName.length - b.expName.length
				},
                {
                    title: `Experiment`,
					dataIndex: `expType`,
					key: `expType`,
                    align: `center`,
                    width: 180,
                    sorter: (a, b) => a.expType.length - b.expType.length
				},
                {

                    title: `Duration`,
					dataIndex: `expDuration`,
					key: `expDuration`,
                    align: `center`,
                    width: 100,
                    render: (_, record) => {
						return <p className="text-muted mx-auto mb-0">
                                    <span className="d-block rounded-circle mx-auto mb-1" 
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            border: '2px solid #043365',
                                            padding: '2px'
                                        }}>
                                        <span className="d-block rounded-circle" 
                                          style={{
                                              backgroundImage: `conic-gradient(#043365 ${Math.round((record.expCompletedDuration/record.expTotalDays) * 100)}%, #fff 0)`,
                                              width: '16px',
                                              height: '16px'
                                            }}></span>
                                    </span>
                                    {`${record.expCompletedDuration}/${record.expTotalDays} days`}
                                </p>
                    },
				},
                {
                    title: `Performance`,
					dataIndex: `performance`,
					key: `performance`,
                    align: `center`,
                    width: 250,
					render: (_, record) => {
						return <h6>{`Desired ${record.keyMetric} = ${record.desiredGoalValue} ${record.metricUnit} `}</h6>
                    },
				},
                {
                    title: `KPI Tree - Node`,
					dataIndex: `treeName`,
					key: `treeName`,
                    width: 150,
                    render: (_, record) => record.treeName.replace('KPI Tree :', ''),
                    sorter: (a, b) => a.treeName.length - b.treeName.length
				},
                {
                    title: `Cohort`,
					dataIndex: `cohortType`,
					key: `cohortType`,
                    width: 150,
                    sorter: (a, b) => a.cohortType.length - b.cohortType.length
				},
			
        ];
    };

	const searchAction = (val) => {
        setSearchText(val);
        let filtered = rawData;
        console.log('value', val);
        if(val.length > 0){
            filtered = filtered.filter(item => item.expName.toLowerCase().includes(val.toLowerCase()));
            setMonitoringData({...monitoringData, data:filtered})
            return
		}
        setMonitoringData({...monitoringData, data:filtered})
	}

    const handleYearChange = (date) => {
        if(date){
            fetchExperimentsMonitoring(date[0]._d.toISOString(), date[1]._d.toISOString());
        }
    }

    useEffect(() => {
        fetchExperimentsMonitoring("2022-01-01T00:00:00", "2022-12-31T00:00:00");
    }, [])


    return (
        <div className="container-fluid p-4">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="font-weight-bold mb-4">Experiments Monitoring</h4>
                </div>
                <div className="col-md-6 text-md-right">
                    <DatePicker.RangePicker size="middle" style={{ width: "15rem" }}
                        value={selectedYear.currentPeriodStartDate && selectedYear.currentPeriodEndDate
                            ? [moment(selectedYear.currentPeriodStartDate), moment(selectedYear.currentPeriodEndDate)] : null
                        }
                        onChange={date => handleYearChange(date)}
                    />
                </div>
                {isLoading ? <Loader className="mx-auto" /> : 
                    rawData.length > 0 ? <>
                        <div className="col-md-12 mb-3">
                            <div className="d-flex flex-wrap justify-content-center w-100 border rounded py-2">
                                {headerInfo.map((item, i) => (
                                    <Card key={i} className="d-flex monitoring-card">
                                        <div className="pr-2 d-flex align-items-center"><img src={`${CONTEXT}/${item.icon}`} alt="experiments" /></div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-top action-card-header">
                                                <div className="flex-grow-1">
                                                    <h6 className="fs14 mb-0">{item.title}</h6>
                                                </div>
                                                <Tooltip placement="right" title={<a className="font-weight-normal">{item.desc}</a>}>
                                                    <Icon className="p-0 text-primary-blue fs20">info_outline</Icon>
                                                </Tooltip>
                                            </div>
                                            <div className="d-flex align-items-end ml-2">
                                                <h1 className="mb-0 text-dark font-weight-normal">{item.value+item.unit}</h1>
                                                <h6 className="fs14 mb-1 ml-3">{item.counts}</h6>
                                            </div>
                                            <div className="d-flex ml-2">
                                                <p className="w-50 fs12 text-muted font-weight-normal mb-0">
                                                    <span className='d-block'>Test vs Control</span>
                                                    <span className='d-block'>A/B Testing</span>
                                                    <span className='d-block'>Pre/Post Analysis</span>
                                                </p>
                                                <p className="w-50 fs12 text-muted font-weight-normal mb-0 pl-4">
                                                    <span className='d-block'>{item.TestControl}</span>
                                                    <span className='d-block'>{item.ABTesting}</span>
                                                    <span className='d-block'>{item.PrePost}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-12 mb-5">
                            <div className="row justify-content-between border rounded mx-0 mb-1 py-3" style={{backgroundColor: '#F2F5F7'}}>
                                <div className="col-md-5">
                                    <FormControl variant="outlined" style={{ width: "15rem" }}>
                                        <OutlinedInput
                                            placeholder="Search Actions"
                                            value={searchText}
                                            onChange={(e) => searchAction(e.target.value)}
                                            className="pr-0"
                                            style={{ minWidth: "233px", height: "2.1rem" }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    {searchText !== '' &&
                                                    <Button color="primary" className="outline-none" onClick={() => searchAction('')}>
                                                        <Icon className="align-middle" title="Search Actions">close</Icon>
                                                    </Button>
                                                    }
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <Button color="primary" className="outline-none">
                                        <Icon className="align-middle font-weight-bold" title="Search Actions">filter_list</Icon>
                                    </Button>
                                </div>
                                <div className="col-md-5 text-md-right d-none">
                                    <FormControl className="text-left" variant="outlined" style={{ width: "15rem" }}>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            style={{ minWidth: "220px", height: "2.1rem" }}
                                            defaultValue={`Sort By`}
                                            //onChange={event => func(event.target.value)}
                                        >
                                            {
                                                ["Sort By"].map((item, i) => (
                                                    <MenuItem key={i} value={item}>{item}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <Table
                                showSorterTooltip={false}
                                rowKey={record => record.variantId}
                                className="table-theme-bordered"
                                pagination={true}
                                tableLayout={`fixed`}
                                dataSource={(monitoringData.data).filter((v,i,a)=>a.findIndex(v2=>(v2.expId===v.expId))===i)}
                                columns={tableHeader(monitoringData.header)}
                                expandable={{
                                    expandedRowRender: record => {
                                        return <table className='table border-0'>
                                            <tbody>
                                                {monitoringData.data.filter(exp => exp.expId === record.expId).map((item, i) =>
                                                    <tr key={i}>
                                                        <td width="50" className="border-0 align-middle">&nbsp;</td>
                                                        <td width="170" className="border-0 align-middle">
                                                            <p className="text-muted">{item.variantName}</p>
                                                        </td>
                                                        <td width="180" align='center' className="border-0 align-middle">
                                                            <Icon className="text-primary-blue">groups</Icon>
                                                            <p className="fs12">{item.split}% of {item.expPopulation}</p>
                                                        </td>
                                                        <td width="100" className="border-0 align-middle">&nbsp;</td>
                                                        <td width="300" className="border-0 align-middle">
                                                            <ReactEcharts className="row border rounded py-2 m-0" style={{ height: '90px', width: '300px' }} option={getOption(item.chartData)} />
                                                        </td>
                                                        <td width="150" className="border-0 align-middle">
                                                            <p className="text-muted">{item.nodeName}</p>
                                                        </td>
                                                        <td width="150" className="border-0 align-middle">
                                                            <p style={{ width: '150px' }} className="text-muted">{item.cohortName}</p>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    },
                                    rowExpandable: record => record.variantName !== '',
                                }}
                            />
                        </div>
                    </>
                    :
                    <div className="w-100 row align-items-center justify-content-center my-5">
                        <div className="col-md-4">
                            <img className="w300" src={`${CONTEXT}/empty-state.svg`} alt="Empty State" />
                        </div>
                        <div className="col-md-4 text-center">
                            <h4>No Experiments!</h4>
                            <p className="fs16">There are no Experiments which are currently running or completed. The performance of all the running or completed actions will automatically show-up on this view.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ExperimentsMonitoring;

function isJsonString(str){
    if (typeof str!=="string"){
        return str;
    }
    try{
        var json = JSON.parse(str);
        return json; //(typeof json === 'object');
    }
    catch (error){
        return [];
    }
}

function shortInt(value){
    let n = Math.abs(value);
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
}