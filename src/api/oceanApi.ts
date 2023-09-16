import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carrierListAction, latencyListAction } from "../store/actions/ocean.action";

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
  totalRecordCount?: string | null;
}

export async function oceanCalls(data: OceanProp) {
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
      username: import.meta.env.VITE_REST_DEV_USERNAME,
      password: import.meta.env.VITE_REST_DEV_PASSWORD,
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
  //const [carrierList, setCarrierList] = useState<string[]>([]);
  //const [carrError, setCarrError] = useState("");
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
            //setCarrierList(result.response.sort());
            carrActData.carrList = result.response.sort();
            dispatch(carrierListAction(carrActData));
          } else {
            throw { message: result.response };
          }
        })
        .catch((err) => {
          //setCarrError(err.message);
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
  //return {carrierList, carrError};
  return {carrierList};
};

export const useLatencyList = (data: OceanProp) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [latError, setLatError] = useState("");
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
        //setLatError(err.message);
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
