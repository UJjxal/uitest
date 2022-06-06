import React, { useEffect, useState } from "react";
import axios from "axios";
import Frame from "../../../components/Frame";
import tableauService from "../../../services/tableauService";

import Loader from "../../../utilities/Loader";

  const RweTableau = (props) => {
 
      const [link, setLink]= useState("#");
      const [tableauLoading, setTableauLoading] = useState(false);
      const tableauLink1=
        "https://tableau.incedolabs.com/trusted/<ticket>/views/PNC/AnamolyDetector/vikashupadhyay/PNCAnamolyDetector?iframeSizedToWindow=true&:embed=y";
      const tableauLink2=
        "https://tableau.incedolabs.com/trusted/<ticket>/views/DQM_V2/StatusDashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";
      const tableauLink3 = 
        "https://tableau.incedolabs.com/trusted/<ticket>/views/DQM_V2/QADashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";
      const advisor_dashboard1=
      "https://tableau.incedolabs.com/trusted/<ticket>/t/USBank/views/Updated_SalesDashboard/AW6_RevenueSummary_Dashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";

      const advisor_dashboard4="https://tableau.incedolabs.com/trusted/<ticket>/t/USBank/views/SalesDashboard_Jan212022/RevenueSummary_Dashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link";
        useEffect(() => {
          getTableauToken();
        }, [])
  

  const getTableauToken = async () => {
    setTableauLoading(true);
    let data={username: "incedo.dev"}
    tableauService.getTableauToken(data).then((response) => {
      console.log("TABLEAU RESPONSE", response);
      if (response.data.code === 200) {
        let newlink=advisor_dashboard4.replace("<ticket>", response.data.response);
        console.log("TABLEAU LINK", newlink);
      
        setLink(newlink);
        setTableauLoading(false);
      }
    })
  };

       return (
      <React.Fragment>
        {tableauLoading ?<Loader style={{ margin: "10% 40%" }} />
                        :<Frame link={link} />
                       
                        }

     </React.Fragment>
    );
  }

export default RweTableau;
