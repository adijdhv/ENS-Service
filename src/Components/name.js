import React from 'react'
//import { contractAddress  } from './abi';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { useState } from 'react';
import "../css/input.css"
const abi = require("../abi.json")
const { ethereum } = window
//const ethers = require('ethers')
const BigNumber = ethers.BigNumber
const gr = require('graphql-request')
const { request, gql } = gr

const contractAddress = "0xd7BCDA477568810136F0f109789fD314029a2A44"


const Name = () => {

    const [Name, setName] = useState()
    const [ensname, setensname] = useState()

    const tokenURI = '0X00'
    const connection = async () => {
        // const web3 = new Web3(window.ethereum)

        const acc = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //console.log("ACcounts: ",accounts[0])
        const accounts = acc[0]
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const web3 = new Web3(provider);
        const signer = provider.getSigner(accounts)
        const instance = new ethers.Contract(contractAddress, abi, signer)
        //console.log("provider",provider)

        //const accounts = await provider.listAccounts();
        //const signerw = provider.getSigner(accounts[0]);


        

        const contractinstance = new web3.eth.Contract(abi, contractAddress)
        console.log("contract", contractinstance)


        const BigNumber = ethers.BigNumber
        const utils = ethers.utils

        const labelHash = utils.keccak256(utils.toUtf8Bytes(Name))
        console.log("LABEL HASH: ", labelHash)
        const tokenId = BigNumber.from(labelHash).toString()
        console.log("TokenId: ", tokenId)





        try {

            let data = contractinstance.methods.safeMint(accounts, tokenId, tokenURI).encodeABI();
            console.log("data: ", data)
            const feeData = await provider.getFeeData()



            console.log("from: ", accounts)
            console.log("contractAddress: ", contractAddress)
            console.log("Tokenid: ", tokenId)
            console.log("Data: ", data)
            //Creating Tx
            const tx = {
                from: accounts,
                to: contractAddress,
                // tokenid: tokenId,
                //'nonce': nonce,
                gasLimit: feeData.gasLimit,
                gasPrice: feeData.gasPrice,
                //maxFeePerGas: feeData.maxFeePerGas,
                // maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
                data: data
            };
            const transaction = await signer.sendTransaction(tx);
            console.log(transaction)

            if (transaction) {
                alert("NFT MINTED")
            }
        }

        catch (error) {
            console.log("IN ERROR")
            console.log(error);
        }

    }

    const getname = async () => {
        try {
            const acc = await window.ethereum.request({ method: 'eth_requestAccounts' });

            const accounts = acc[0]
            const provider = await window.ethereum;

            const web3 = new Web3(provider);



            const contractinstance = new web3.eth.Contract(abi, contractAddress)
            const BigNumber = ethers.BigNumber
            const utils = ethers.utils

            const labelHash = utils.keccak256(utils.toUtf8Bytes(ensname))
            console.log("LABEL HASH: ", labelHash)
            const tokenId = BigNumber.from(labelHash).toString()
            console.log("TokenId: ", tokenId)

            let AccountAddress = await contractinstance.methods.ownerOf(tokenId).call({

            })

            console.log("Address: ", AccountAddress)

        } catch (error) {
            console.log(error)
        }


    }


    return (
        <div>
        <div  className="relative w-2/4 self-center mx-auto text-center justify-center mt-5">
           
            {/* <div className="input">
                <input type="Enter the name" className="border " onChange={e => setName(e.target.value)} />
            </div>
            <div className="button">
                <input type="text" className="border" onChange={e => { setensname(e.target.value) }} />                
            </div> */}
  
            <div class="flex mt-2 flex-col ">
        <label className="block mb-2 self-start text-left w-full text-sm font-semibold ">Mint Name </label>
       <div className="flex flex-row">
        <input
                  type="text"
                  name="name"                
                  className="border boxborder rounded-lg w-full px-2 py-1"
                  placeholder=""
                  onChange={e => setName(e.target.value)}
                  required
                />
                <button  className="mint-button text-sm rounded-lg -ml-5 px-10 py-1" onClick={connection}> Mint</button>
                </div>
     </div>

            <div class="flex mt-4 flex-col ">
     <label className="block mb-2 self-start text-left w-full text-sm font-semibold ">Get Wallet Address </label>
     <div className="flex flex-row">
     <input
            type="text"
            name="description" 
            className="border boxborder rounded-lg w-full px-2 py-1"  
            placeholder=""
            onChange={e => { setensname(e.target.value) }}
            required
          />
          <button  className="mint-button w-48 rounded-lg px-2 -ml-5 text-sm py-1" onClick={getname}> Get Wallet Address</button> 
          </div>
    </div> 
    
    {/* <div className="self-center text-center justify-center">
    <div className=" mt-10">
    <button  className="bg-gray-400 text-white m-2 px-10 py-1 rounded-lg" onClick={connection}> Mint</button>
    <button  className="border border-black px-10 m-2 py-1 bg-white rounded-lg text-sm" onClick={getname}>Cancel</button> 
    </div> 

<div className="mt-1">
    <button  className="mint-button rounded-lg m-2 px-10 py-1" onClick={connection}> Mint</button>
    <button  className="border border-black px-10 m-2 py-1 bg-white rounded-lg text-sm" onClick={getname}> Get Wallet Address</button> 
    </div>
    </div> */}

        </div>
        </div>
    )
}

export default Name;