/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, Box } from 'theme-ui';
import { NFTStorage } from "nft.storage";
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
//import axios from 'axios'
//import { rgba } from 'polished';
//import { Wallet, providers } from "ethers";

import escrowABI from "../../artifacts/escrow.json";
import tokenABI from "../../artifacts/erc20.json";
import { escrowAddress } from "../../config";
//import { tokenAddress } from "../../config";
const tokenAddress = "0x10Eb05edeA0F1d0dB7907d23541607F07CC6c35E"
//const erc220 = "0x10Eb05edeA0F1d0dB7907d23541607F07CC6c35E"

const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4Zjc4ODAwMkUzZDAwNEIxMDI3NTFGMUQ0OTJlNmI1NjNFODE3NmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzA1NjE4NzM4MCwibmFtZSI6InBlbnNpb25maSJ9.agI-2V-FeK_eVRAZ-T6KGGfE9ltWrTUQ7brFzzYVwdM";

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
      //const web3Modal = new Web3Modal();
      console.log("Before connection");
      //const connection = await web3Modal.connect();
      
      console.log("Before provider");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //const provider = new ethers.providers.Web3Provider(connection);
      console.log("Before connectedContract");
      //const connectedContract = new ethers.Contract(tokenAddress, tokenABI.abi, provider);
      const contract = new ethers.Contract(
        tokenAddress,
        tokenABI,
        provider.getSigner()
    );
      console.log("Connected to contract", tokenAddress);
      //console.log("IPFS blockchain uri is ", metadata.url);

      const Tx = await contract.mint(recipient, amount);
      console.log("File successfully created and added to Blockchain");
      await Tx.wait();
      alert("Pool created successfully!")
      return Tx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    console.log("image ipfs path is", imgViewString);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://mumbai.polygonscan.com/tx/${mintNFTTx.hash}`);
    setTxStatus("File addion was successfully!");
    console.log("Preview details completed");
  };

  const mintNFTFile = async (e, uploadedFile) => {
    //e.preventDefault();
    // 1. upload File content via NFT.storage
    //const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on Polygon
    //const mintNFTTx = await sendTxToBlockchain();

    // 3. preview the minted nft
   //previewNFT(metaData, mintNFTTx);

    //4. Mint Reward
    //mintReward();

    //5. navigate("/explore");
    //navigate.push('/dashboard')
   // alert("Pool created successfully!")
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    console.log("urlArray = ", urlArray);
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    console.log("ipfsGateWayURL = ", ipfsGateWayURL)
    return ipfsGateWayURL;
  };

  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-purple-100 text-4xl text-center text-black font-bold pt-10">
        <h1> Add File</h1>
      </div>
      <div className="flex justify-center bg-purple-100">
        <div className="w-1/2 flex flex-col pb-12 ">
        <input
            placeholder="Recipient"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, recipient: e.target.value })}
          />
                  <input
            placeholder="Agent"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, agent: e.target.value })}
          />
                  <input
            placeholder="Amount"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, amount: e.target.value })}
          />


          <div className="MintNFTtext-xl text-black">
            {txStatus && <p>{txStatus}</p>}
            <br />
            {metaDataURL && <p className="text-blue"><a href={metaDataURL} className="text-blue">Metadata on IPFS</a></p>}
            <br />
            {txURL && <p><a href={txURL} className="text-blue">See the mint transaction</a></p>}
            <br />
            {errorMessage}

            <br />
            {imageView && (
            <iframe
              className="mb-10"
              title="File"
              src={imageView}
              alt="File preview"
              frameBorder="0"
              scrolling="auto"
              height="50%"
              width="100%"
            />
            )}

          </div>

          <button type="button" onClick={(e) => sendTxToBlockchain()} className="font-bold mt-20 bg-purple-700 text-white text-2xl rounded p-4 shadow-lg">
            Publish File
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
