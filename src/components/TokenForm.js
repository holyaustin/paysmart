/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, Box } from 'theme-ui';
import { NFTStorage } from "nft.storage";
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import tokenABI from "../../artifacts/erc20.json";
import escrowABI from "../../artifacts/escrow.json";
import { escrowAddress } from "../../config2";
const tokenAddress = "0x10Eb05edeA0F1d0dB7907d23541607F07CC6c35E"

const TokenForm = () => {
  const navigate = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ recipient: "",  agent: "", amount: "" });

  const handleFileUpload = (event) => {
    console.log("file for upload selected...");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const sendTxToBlockchain = async () => {
    console.log("Entered function");
    const recipient = formInput.recipient.toString();
    const agent = formInput.agent.toString();
    const amount  = formInput.amount;
    if (!recipient || !amount) return;
    console.log("After input check");

    try {
      setTxStatus("Adding transaction to Polygon Mumbai Blockchain.");
      console.log("Before web3 modal");
      const web3Modal = new Web3Modal();
      console.log("Before connection");
      const connection = await web3Modal.connect();
      
      console.log("Before provider");
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.providers.Web3Provider(connection);
      console.log("Before connectedContract");
      const contract = new ethers.Contract(escrowAddress , escrowABI, provider.getSigner());
      console.log("Connected to contract", escrowAddress );
      console.log("Variables are ", escrowAddress, recipient, agent, amount  );
      const contract2 = new ethers.Contract(
        tokenAddress,
        tokenABI,
        provider.getSigner()
    );
      const Tx1 = await contract2.approve(escrowAddress, amount, {gasLimit: 900000,
      });

      const Tx = await contract.deposit(tokenAddress, recipient, agent, amount, {gasLimit: 900000,
      });
      console.log("File successfully created and added to Blockchain");
      await Tx.wait();
      setTxStatus("New Pool created successfully.");
      return Tx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }
  };

  return (
    <Box as="section"  sx={styles.section}>
            <div className="bg-purple-100 text-4xl text-center text-black font-bold pt-10">
        <h1> Create Pool PST Token</h1>
      </div>
      
      <div className="flex justify-center bg-purple-100">
        <div className="w-1/2 flex flex-col pb-12 ">
        <input
            placeholder="Recipient Address"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, recipient: e.target.value })}
          />
                  <input
            placeholder="Agent Address"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, agent: e.target.value })}
          />
                  <input
            placeholder="Amount"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, amount: e.target.value })}
          />
         
          <div className="MintNFTtext-xl text-black">
          <br />
          <br />
            {txStatus && <p className="text-xl">{txStatus}</p>}
            <br />

          </div>

          <button type="button" onClick={(e) => sendTxToBlockchain()} className="font-bold mt-20 bg-purple-700 text-white text-2xl rounded p-4 shadow-lg">
            Create Pool PST Token
          </button>
        </div>
      </div>
    </Box>

  );
};
export default TokenForm;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
};
