"use client";
import { supabase } from "@/lib/initSupabase";
import React, { useState } from "react";

export default function UploadFile() {
  const [fileToUpload, setFileToUpload] = useState();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const file = fileToUpload.target.files[0];
    const bucket = "first-bucket";
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);
    console.log("data", data);
  };

  const handleGetBucketList = async () => {
    const { data, error } = await supabase.storage.listBuckets();
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleGetBucketList}>Get bucket list</button>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFileToUpload(e)} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
