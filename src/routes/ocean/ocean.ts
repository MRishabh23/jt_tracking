export const listCreation = (latencyList: any) => {
  const list = latencyList
    .sort(function (a: any, b: any) {
      const nameA = a.carrier.toUpperCase(); // ignore upper and lowercase
      const nameB = b.carrier.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    .map((item: any, index: number) => {
      let totalCount: number = 0;
      if (item.first !== null && item.first !== undefined) {
        totalCount += +item.first;
      }
      if (item.second !== null && item.second !== undefined) {
        totalCount += +item.second;
      }
      if (item.third !== null && item.third !== undefined) {
        totalCount += +item.third;
      }
      if (item.fourth !== null && item.fourth !== undefined) {
        totalCount += +item.fourth;
      }
      if (item.fifth !== null && item.fifth !== undefined) {
        totalCount += +item.fifth;
      }
      if (item.sixth !== null && item.sixth !== undefined) {
        totalCount += +item.sixth;
      }
      if (item.seventh !== null && item.seventh !== undefined) {
        totalCount += +item.seventh;
      }
      if (item.eight !== null && item.eight !== undefined) {
        totalCount += +item.eight;
      }
      if (item.ninth !== null && item.ninth !== undefined) {
        totalCount += +item.ninth;
      }
      return {
        key: index,
        carrier: item.carrier,
        refType:
          item.refType === "BOOKING_NUMBER"
            ? "Booking"
            : item.refType === "CONTAINER_NUMBER"
            ? "Container"
            : "BillOfLading",
        total: totalCount,
        zeroToOne:
          item.first !== null && item.first !== undefined ? +item.first : 0,
        oneToTwo:
          item.second !== null && item.second !== undefined ? +item.second : 0,
        twoToFour:
          item.third !== null && item.third !== undefined ? +item.third : 0,
        fourToEight:
          item.fourth !== null && item.fourth !== undefined ? +item.fourth : 0,
        eightToTwelve:
          item.fifth !== null && item.fifth !== undefined ? +item.fifth : 0,
        twelveToSixteen:
          item.sixth !== null && item.sixth !== undefined ? +item.sixth : 0,
        sixteenToTwentyFour:
          item.seventh !== null && item.seventh !== undefined
            ? +item.seventh
            : 0,
        twentyFourToFourtyEight:
          item.eight !== null && item.eight !== undefined ? +item.eight : 0,
        fourtyEightAbove:
          item.ninth !== null && item.ninth !== undefined ? +item.ninth : 0,
      };
    });

  return list;
};
