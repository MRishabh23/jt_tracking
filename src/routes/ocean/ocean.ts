export const referenceList = (refList: any) => {
  const rList = refList.map((item: any, index: number) => {
    return {
      key: index,
      carrier: item.carrier,
      createdAt: item.createdAt,
      error: item.error,
      lastCrawledAt: item.lastCrawledAt,
      queue:  item.queue === "1" && item.error==="" 
          ? "Normal"
          : item.queue === "2" 
          ? "Adaptive"
          : "RNF",
      referenceNumber: item.referenceNumber,
      referenceType: item.referenceType,
      status: item.status,
      subscriptionId: item.subscriptionId,
      updatedAt: item.updatedAt
    };
  });
  return rList;
};
