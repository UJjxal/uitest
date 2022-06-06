window.globalConfig = {
	projectId: 110,
	contextpath:'/cl',
	url: '/cl/',
	apiRoot: 'https://demo.incedolabs.com/cl-api/',	
	airflowUrl: '',
	s3BaseUrl: '',
	envName: 'Client Demo',
	LDAPGroups: {
		'Admin': ['LightHouse-Admin', 'Admin', 'ADMIN', 'LH-Admin', 'LH-Admin01', 'LH-Admin02'],
		'Executive': ['Executive', 'LightHouse-Executive', 'LH-Executive', 'EXECUTIVE'],
		'Data Scientist': ['Data Scientist', 'LH-Data Scientist', 'Analyst', 'ANALYST'],
		'Data Engineering': ['Data Engineering'],
    },
    SSO:'',
	HeaderDomainBased:false,
	Deep_Analysis:"http://public.tableau.com/views/RegionalSampleWorkbook/Storms?:embed=yes&:tabs=yes&:toolbar=yes",
	summaryInsights: false,
	insightsAction: true,
	SSO_URL_GOOGLE:"https://incedolighthouse.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=https://idsp.incedolabs.com/cl/?provider=cognito&response_type=TOKEN&client_id=1vnacc7dtb1qdcr7e2tqj2hb5d&scope=aws.cognito.signin.user.admin email openid phone profile",
	SSO_URL_OTHER:"https://incedolighthouse.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=onelogin&redirect_uri=https://idsp.incedolabs.com/cl/?provider=cognito&response_type=TOKEN&client_id=1vnacc7dtb1qdcr7e2tqj2hb5d&scope=aws.cognito.signin.user.admin email openid phone profile",
	Advisor_Dashboard:"https://tableau.incedolabs.com/t/USBank/views/Assetmark_Dashboard/AdvisorDashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link"
};
