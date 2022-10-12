import React from 'react'
//import { contractAddress  } from './abi';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { useState } from 'react';
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
        <div  className='relative mt-5'>
            <button onClick={connection}> Mint</button>
            <div className="input">
                <input type="Enter the name" onChange={e => setName(e.target.value)} />
            </div>
            <div className="button">
                <input type="text" onChange={e => { setensname(e.target.value) }} />
                <button onClick={getname}> get Wallet Address</button>
            </div>
        </div>
    )
}

export default Name;