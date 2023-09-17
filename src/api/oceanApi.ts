import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carrierListAction, latencyListAction, referenceListAction } from "../store/actions/ocean.action";

export interface OceanProp {
  type: string;
  mode: string;
  currentUser?: string | null;
  report?: string | null;
  carriers?: string[] | null;
  referenceType?: string | null;
  searchQuery?: string | null;
  timeCategory?: string | null;
  active?: string | null;
  limit?: number;
  page?: number;
  totalRecordCount?: string | null;
}

async function oceanCalls(data: OceanProp) {
  const user = localStorage.getItem("Username");
  if (user !== null && user !== undefined && user !== "") {
    data.currentUser = user;
  }
  return axios({
    url: import.meta.env.VITE_REST_URL,
    timeout: 300000,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    auth: {
      username: import.meta.env.VITE_REST_USERNAME,
      password: import.meta.env.VITE_REST_PASSWORD,
    },
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export const useCarrierList = () => {
  const carrierList = useSelector((state: any) => state.ocean.carrierList)
  const dispatch = useDispatch();
  const data = {type: "CARRIER_LIST", mode: "OCEAN"};
  const carrActData = {
    carrList: [],
    error: ""
  }
  useEffect(() => {
    let ignore = false;
    const carrierCall = async () => {
      await oceanCalls(data)
        .then((res) => {
          const result = res.data;
          if (result.statusCode === "200") {
            carrActData.carrList = result.response.sort();
            dispatch(carrierListAction(carrActData));
          } else {
            throw { message: result.response };
          }
        })
        .catch((err) => {
          carrActData.error = err.message;
          dispatch(carrierListAction(carrActData));
        });
    };
    if(!ignore && data.type !== "" && carrierList.length === 0){
      carrierCall();
    }

    return () => {
      ignore = true;
    }
  },[]);
  return {carrierList};
};

export const useLatencyList = (data: OceanProp) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const latActData = {
    error: ""
  }
  useEffect(() => {
    let ignore = false;
    const defaultCall = async() => {
      setLoading(false);
      await oceanCalls(data)
      .then((res) => {
        if (res.status === 200 && res.data.statusCode === "200") {
          const result = res.data;
          setList(result.response);
          setLoading(true);
        } else {
          throw { message: res.message };
        }
      })
      .catch((err) => {
        setLoading(true);
        latActData.error = err.message;
        dispatch(latencyListAction(latActData));
      });
    }
    if(!ignore && data.type !== "") {
      defaultCall();
    }

    return () => {
      ignore = true;
    }
  },[data])

  return {list, loading };
}

export const useReferenceListCount = (data: OceanProp, page: number) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const refActData = {
    error: ""
  }
  useEffect(() => {
    let ignore = false;
    const defaultCall = async() => {
      await oceanCalls(data)
      .then((res) => {
        if (res.status === 200 && res.data.statusCode === "200") {
          const result = res.data;
          setCount(result.response[0].count);
        } else {
          throw { message: res.message };
        }
      })
      .catch((err) => {
        refActData.error = err.message;
        dispatch(referenceListAction(refActData));
      });
    }
    if(!ignore && data.type !== "" && data.totalRecordCount === "true" && page === 1) {
      defaultCall();
    }
    console.log("inside count hook", count)
    return () => {
      ignore = true;
    }
  },[data])

  return { count };
}

export const useReferenceList = (data: OceanProp, page: number) => {
  const [list, setList] = useState([]);
  const [frame, setFrame] = useState("default");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const refActData = {
    error: ""
  }
  let newData = data;
  if(data.searchQuery === undefined || data.searchQuery === null || data.searchQuery === ""){
    if(page > 1){
      newData = {...newData, page: page};
    }else{
      newData = {...newData, page: 1};
    }
  }
  useEffect(() => {
    let ignore = false;
    const defaultCall = async() => {
      setLoading(false);
      await oceanCalls(newData)
      .then((res) => {
        if (res.status === 200 && res.data.statusCode === "200") {
          const result = res.data;
          setList(result.response);
          setLoading(true);
        } else {
          throw { message: res.message };
        }
      })
      .catch((err) => {
        setLoading(true);
        refActData.error = err.message;
        dispatch(referenceListAction(refActData));
      });
    }
    if(!ignore && data.type !== "") {
      defaultCall();
      if(data.searchQuery !== undefined && data.searchQuery !== null && data.searchQuery !== ""){
        setFrame("search");
      }
    }
    return () => {
      ignore = true;
    }
  },[data, page])

  return {list, loading, frame };
}
