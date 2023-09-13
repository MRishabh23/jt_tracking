export const listCreation = (referenceList: any) => {
    const list = referenceList
      .map((item: any, index: number) => {
         return {
          key: index,
          subscriptionId: item.subscriptionId,
          carrier: item.carrier,
          reference: item.reference,
          active: item.status,
          carwlQueue: item.carwlQueue,
          lastCrawled: item.lastCrawled,
          lastUpdated: item.lastUpdated,
          createdOn: item.createdOn
        };
      });
  
    return list;
  };
  