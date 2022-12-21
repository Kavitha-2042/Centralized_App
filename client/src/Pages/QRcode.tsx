import React, { useState, useEffect } from "react";
import { useQRCode } from "react-qrcode";
import Header from "../Components/Header";
import axios from "axios";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";



const QRcode = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("")

  useEffect(() => {
    const value = localStorage.getItem("email");
    axios
      .post("/user/qrcode", { email: value })
      .then((response) => {
        if (response) {
          setAddress(response.data.address);
          setBalance(response.data.balance)
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const dataUrl = useQRCode(address);
  // const dataUrl = useQRCode("https://www.npmjs.com/package/react-qrcode?activeTab=readme")

  const downloadHandler = (e: any) => {
    e.preventDefault();
    saveAs(dataUrl as string, "qrcode.png");
  };

//   const shareHandler = (e:any) =>{
//     e.preventDefault()
    
//   }

  return (
    <div>
      <Header />
      <div className="m-9 mt-20">
        <h1 className="text-4xl ">Scan your QR code!</h1>
        <div>{/* dataUrl: {dataUrl} */}</div>
        <img
          src={dataUrl}
          alt="/"
          className="place-content-center flex justify-center content-center m-auto mt-14 "
        />
        <Button
          variant="contained"
          color="primary"
          href={dataUrl}
          onClick={downloadHandler}
        >
          Download
        </Button>
        {/* <Button
          style={{
            marginLeft: "10px",
          }}
          variant="contained"
          href={dataUrl}
          onClick={shareHandler}
        >
          Share
        </Button> */}

{/* https://goerli.etherscan.io/address/0x47f4d3fad99e81e54e391E91ae7781547B51B238 */}

        <div>
            <h1 className="mt-10 text-xl">Your balance is: {balance} GoerliETH</h1>
        </div>
      </div>
    </div>
  );
};

export default QRcode;
