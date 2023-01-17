/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, Box } from 'theme-ui';
import { NFTStorage } from "nft.storage";
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import escrowABI from "../../artifacts/escrow.json";
import tokenABI from "../../artifacts/erc20.json";
import { escrowAddress } from "../../config";
const tokenAddress = "0x10Eb05edeA0F1d0dB7907d23541607F07CC6c35E"




const MintFile = () => {
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

  const uploadNFTContent = async (inputFile) => {
    const { recipient, amount } = formInput;
    if (!recipient || !amount) return;
    const nftStorage = new NFTStorage({ token: APIKEY, });
    try {
      console.log("Trying to upload file to ipfs");
      setTxStatus("Uploading Item to IPFS & Filecoin via NFT.storage.");
      console.log("close to metadata");
      const metaData = await nftStorage.store({
        name,
        description: name,
        image: inputFile,
      });
      setMetaDataURl(metaData.url);
      console.log("metadata is: ", { metaData });
      return metaData;
    } catch (error) {
      setErrorMessage("Could store file to NFT.Storage - Aborted file upload.");
      console.log("Error Uploading Content", error);
    }
  };


  const sendTxToBlockchain = async () => {
    console.log("Entered function");
    //const { recipient, agent, amount } = formInput;
    const recipient = formInput.recipient.toString();
    const agent = formInput.agent.toString();
    const amount  = formInput.amount;
    if (!recipient || !amount) return;
    console.log("After input check");

    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })

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
      const contract = new ethers.Contract(
        tokenAddress,
        tokenABI,
        provider.getSigner()
    );
      console.log("Connected to contract", tokenAddress);

      const Tx = await contract.mint(recipient, amount, {
        gasLimit: 900000,
      });
      console.log("File successfully created and added to Blockchain");
      await Tx.wait();
      setTxStatus("Token minted successfully!");
      //alert("Pool created successfully!")
      return Tx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }
  };

  return (
    <Box as="section"  sx={styles.section}>
<div className="bg-purple-100 text-4xl text-center text-black font-bold pt-10">
        <h1> Mint PaySmart Token (PST)</h1>
      </div>
      <div className="bg-purple-100 text-xl text-center text-black font-bold pt-10">
        <h3> Minting done by Minter only</h3>
      </div>
      <div className="flex justify-center bg-purple-100">
        <div className="w-1/2 flex flex-col pb-12 ">
        <input
            placeholder="Recipient"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, recipient: e.target.value })}
          />

                  <input
            placeholder="Amount"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, amount: e.target.value })}
          />


          <div className="MintNFT text-xl text-black">
          <br />
            {txStatus && <p className="text-xl">{txStatus}</p>}
            <br />
            {txURL && <p><a href={txURL} className="text-blue">See the mint transaction</a></p>}
        
          </div>

          <button type="button" onClick={(e) => sendTxToBlockchain()} className="font-bold mt-20 bg-purple-700 text-white text-2xl rounded p-4 shadow-lg">
            Mint Token
          </button>
        </div>
      </div>
    </Box>

  );
};
export default MintFile;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
};
