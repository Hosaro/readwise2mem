import { useEffect, useState } from "react";
import { supabase } from "../supabaseConfig.js";
import { DateTime } from "luxon";
import {
  exportAllReadwise,
  exportReadwiseAfterDate,
} from "../controllers/readwiseController";
import Button from "./Button.jsx";
import CryptoJS from "crypto-js";

const ImportRM = ({ memApiKey, lastFetched, readwiseApiKey }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);
  // const [lastFetched, setLastFetched] = useState("");
  const [importAllBtn, setImportAllBtn] = useState(false);

  const decrypt = (data) => {
    const decrypted = CryptoJS.AES.decrypt(
      data,
      import.meta.env.VITE_ENCRYPTION_KEY
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  // const getApiKey = async () => {
  //   const { data } = await supabase.from("profiles").select("*");
  //   const user = data[0];
  //   setUser(user);
  //   console.log(user);
  // };

  const updateLastFetched = async () => {
    const newDate = DateTime.now();
    // console.log(newDate.toISO());
    const updatedDate = await supabase
      .from("profiles")
      .update({ last_fetched: newDate.toISO() })
      .eq("id", user.id);
  };

  const fetchReadwise = async () => {
    // const {
    //   mem_api_key: memApiKey,
    //   readwise_api_key: readwiseApiKey,
    //   last_fetched: lastFetched,
    // } = user;
    const lastFetchedMs = DateTime.fromISO(lastFetched).ts;
    // const exportAll = await exportAllReadwise(readwiseApiKey, memApiKey);
    const exportAfterDate = await exportReadwiseAfterDate(
      decrypt(readwiseApiKey),
      lastFetchedMs,
      decrypt(memApiKey)
    );
    console.log("export started");
  };
  // To decoment after -- update DB user profile date last fetched
  // updateLastFetched();

  useEffect(() => {
    // getApiKey();
  }, []);

  return (
    <div>
      <main>
        <Button
          text="TEST"
          fonction="Test import button"
          onClick={fetchReadwise}
        />
      </main>
    </div>
  );
};
export default ImportRM;
