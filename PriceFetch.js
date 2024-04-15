const ethers = require("ethers");
const {
    factoryAddress,
    routerAddress,
    fromAddress,
    toAddress,
} = require("./AddressList");

const {erc20ABI,factoryABI,pairABI,routerABI} = require("./AbiInfo");

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");
//const factoryInstance = new ethers.Contract(factoryAddress,factoryABI,provider); // we are making instance of contract factory address

const routerInstance = new ethers.Contract(routerAddress,routerABI,provider);

const priceFetch = async(humanFormat) => {
    const token0Instance = new ethers.Contract(fromAddress,erc20ABI,provider); //used to talk to token1 contract
    const token1Instance = new ethers.Contract(toAddress,erc20ABI,provider);

    const decimal1 = await token0Instance.decimals();
    const decimal2 = await token1Instance.decimals();
    console.log(decimal1,decimal2);
    const amountIn = ethers.utils.parseUnits(humanFormat,decimal1).toString();

    const amountOut = await routerInstance.getAmountsOut(amountIn,[fromAddress,toAddress]);
    const humanOutput = ethers.utils.formatUnits(amountOut[1].toString(),decimal2);

    console.log(humanOutput);
}
humanFormat = "100";
priceFetch(humanFormat);