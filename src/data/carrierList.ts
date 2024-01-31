export const carriers = {
  FKConfig: {
    CarrierConfig: {
      ATLAS: {
        mode: "AIR",
        status: "Operational",
      },
      HAPAG: {
        mode: "OCEAN",
        status: "Operational",
      },
      CATHY: {
        mode: "AIR",
        status: "Operational",
      },
      "CMA-CGM": {
        mode: "OCEAN",
        status: "Operational",
      },
      ONE: {
        mode: "OCEAN",
        status: "minor outage",
      },
      COSCO: {
        mode: "OCEAN",
        status: "Operational",
      },
    },
  },
};

export const getOceanCarriers = (carriersObj: any) => {
  const oceanCarriers = [];
  for (const carrier in carriersObj.FKConfig.CarrierConfig) {
    if (carriersObj.FKConfig.CarrierConfig[carrier].mode === "OCEAN") {
      oceanCarriers.push({
        key: carrier + "_" + carriersObj.FKConfig.CarrierConfig[carrier].status,
        carrierName: carrier,
        status: carriersObj.FKConfig.CarrierConfig[carrier].status,
      });
    }
  }
  return oceanCarriers;
}

// const currentTable: any = {
//   ONE_08_12_2023: {
//     carrierName: "ONE",
//     status: "Partial Outage",
//     reportedOn: "08-12-2023",
//     issue: "Currently under analysis",
//     update: "Currently under analysis",
//     eta: "Currently under analysis",
//   },
//   COSCO_17_12_2023: {
//     carrierName: "COSCO",
//     status: "Degraded Performance",
//     reportedOn: "17-12-2023",
//     issue: "blah blah blah......19th dec 2023",
//     update: "currently we are fixing",
//     eta: "",
//   },
//   ONE_09_12_2023: {
//       carrierName: "ONE",
//       status: "Partial Outage",
//       reportedOn: "09-12-2023",
//       issue: "Currently under analysis",
//       update: "Currently under analysis",
//       eta: "Currently under analysis",
//   },
//   COSCO_19_12_2023: {
//       carrierName: "COSCO",
//       status: "Degraded Performance",
//       reportedOn: "19-12-2023",
//       issue: "blah blah blah......19th dec 2023",
//       update: "currently we are fixing",
//       eta: "",
//   },
// };

// const historicalTable: any = {
//   MSC_10_2023: {
//     MSC_8_10_2023: {
//       carrierName: "MSC",
//       status: "Partial Outage",
//       reportedOn: "8-10-2023",
//       issue: "blah blah blah......9th oct 2023",
//       update: "currently we are fixing",
//       resolution: "Something was done",
//       resolvedOn: "10TH OCT 2023",
//     },
//     MSC_17_10_2023: {
//       carrierName: "MSC",
//       status: "degraded performance",
//       reportedOn: "17th oct 2023",
//       issue: "blah blah blah......19th oct 2023",
//       update: "currently we are fixing",
//       resolution: "Something was done",
//       resolvedOn: "10TH OCT 2023",
//     },
//   },
//   ACL_11_2023: {
//     ACL_8_11_2023: {
//       carrierName: "ACL",
//       status: "partial outage",
//       reportedOn: "8th NOV 2023",
//       issue: "blah blah blah......9th NOV 2023",
//       update: "currently we are fixing",
//       resolution: "Something was done",
//       resolvedOn: "10TH OCT 2023",
//     },
//     ACL_17_11_2023: {
//       carrierName: "ACL",
//       status: "degraded performance",
//       reportedOn: "17th NOV 2023",
//       issue: "blah blah blah......19th NOV 2023",
//       update: "currently we are fixing",
//       resolution: "Something was done",
//       resolvedOn: "10TH OCT 2023",
//     },
//   },
//   MSC_11_2023: {
//     MSC_8_11_2023: {
//       carrierName: "MSC",
//       status: "partial outage",
//       reportedOn: "8th NOV 2023",
//       issue: "blah blah blah......9th NOV 2023",
//       update: "currently we are fixing",
//       resolution: "Something was done",
//       resolvedOn: "10TH OCT 2023",
//     },
//     MSC_17_11_2023: {
//       carrierName: "MSC",
//       status: "Degraded Performance",
//       reportedOn: "17-11-2023",
//       issue: "blah blah blah......19th NOV 2023",
//       update: "currently we are fixing",
//       resolution: "Something was done",
//       resolvedOn: "10TH OCT 2023",
//     },
//   },
// };


export const getCurrentIncident = (currentTable: any) => {
const currentArray: any = [];

for (const entryKey in currentTable) {
  const [carrier, day, month, year] = entryKey.split("_");

  const formattedEntry = {
    key: entryKey,
    carrier: carrier,
    day: day,
    month: month,
    year: year,
    status: currentTable[entryKey].status,
    issue: currentTable[entryKey].issue,
    eta: currentTable[entryKey].eta,
    reportedOn: currentTable[entryKey].reportedOn,
    update: currentTable[entryKey].update,
  };

  currentArray.push(formattedEntry);
}
return currentArray;
}


export const fetchPastIncidents = (historicalTable: any, carrier: any, month: any, year: any) => {
    const pastArray: any = [];
  if (month === undefined && year === undefined) {
    for (const entryKey in historicalTable) {
      const [Tcarrier, Tmonth, Tyear] = entryKey.split("_");

        if(Tcarrier.toUpperCase() === carrier.toUpperCase())
        {
            for (const entryKeyInner in historicalTable[entryKey]) {
                const [Icarrier, Iday, Imonth, Iyear] = entryKey.split("_");
                const formattedEntry = {
                    key: entryKeyInner,
                    carrier: Icarrier,
                    day: Iday,
                    month: Imonth,
                    year: Iyear,
                    status: historicalTable[entryKey][entryKeyInner].status,
                    issue: historicalTable[entryKey][entryKeyInner].issue,
                    resolution: historicalTable[entryKey][entryKeyInner].resolution,
                    resolvedOn: historicalTable[entryKey][entryKeyInner].resolvedOn,
                    reportedOn: historicalTable[entryKey][entryKeyInner].reportedOn,
                    update: historicalTable[entryKey][entryKeyInner].update,
                  };
                  pastArray.push(formattedEntry);
            }
      }
    }
  } else {
    for (const entryKey in historicalTable) {
        const [Tcarrier, Tmonth, Tyear] = entryKey.split("_");
          if(Tcarrier.toUpperCase() === carrier.toUpperCase() && Tmonth === month && Tyear === year)
          {
              for (const entryKeyInner in historicalTable[entryKey]) {
                  const [Icarrier, Iday, Imonth, Iyear] = entryKey.split("_");
                  const formattedEntry = {
                      key: entryKeyInner,
                      carrier: Icarrier,
                      day: Iday,
                      month: Imonth,
                      year: Iyear,
                      status: historicalTable[entryKey][entryKeyInner].status,
                      issue: historicalTable[entryKey][entryKeyInner].issue,
                      resolution: historicalTable[entryKey][entryKeyInner].resolution,
                      resolvedOn: historicalTable[entryKey][entryKeyInner].resolvedOn,
                      reportedOn: historicalTable[entryKey][entryKeyInner].reportedOn,
                      update: historicalTable[entryKey][entryKeyInner].update,
                    };
                    pastArray.push(formattedEntry);
              }
        }
      }
  }
  return pastArray;
};

