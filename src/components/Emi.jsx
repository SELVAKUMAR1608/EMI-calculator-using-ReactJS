import React, { useEffect } from 'react'
import { useState } from 'react';
import './emi.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);



function Emi() {
    let[amount,setamount]=useState({min:0,max:0});
    let[loanRange,setloanrange]=useState(0);
    let[interest,setinterest]=useState(0);
    let[tenure,settenure]=useState(12);
    let[emi,setemi]=useState(0);
    let[interestAmount,setinterestamount]=useState(0);
    let[totalAmount,settotalamount]=useState(0);

    let p=loanRange;
    let ir=interest/(12*100);
    let nm=tenure;

    let amountSelect=(minValue,maxValue)=>{
        setamount({...amount, min:minValue, max:maxValue})
    }
    console.log(amount);

   let getRange=(e)=>{
        setloanrange(e.target.value)
    }
    console.log(loanRange);

    let getInterest=(e)=>{
          setinterest(e.target.value);
    }
    console.log(interest);

   let getTenure=(e)=>{
       settenure(e.target.value);
    }
    console.log(tenure);

    let calculateEmi=()=>{
     
      let emiFormula=(p*ir*Math.pow(1+ir,nm))/(Math.pow(1+ir,nm)-1)
      setemi(Math.round(emiFormula) )
    }


    let calculateInterestAmount=()=>{
      let interestAmountFormula=p*ir*nm;
      setinterestamount(Math.round(interestAmountFormula));
    }
    console.log(interestAmount);

    let calculateTotalAmount=()=>{
      let totalAmountFormula=Number(loanRange )+Number(interestAmount) ;
      settotalamount(Math.round( totalAmountFormula))
    }
    
    useEffect(()=>{
      if(interest>0 ||amount>0 ){
        calculateEmi();
        calculateInterestAmount();
        calculateTotalAmount();
      }
    },[interest,amount,tenure])
    console.log(emi);

    const chartData = {
      labels: ['Principal Amount', 'Interest Amount', 'Total Amount Payable'],
      datasets: [
        {
          data:loanRange === 0 && interestAmount === 0 && totalAmount === 0 ?[1]: [loanRange, interestAmount, totalAmount], 
          backgroundColor: loanRange === 0 && interestAmount === 0 && totalAmount === 0 ? 'orange' :['#0088FE', '#FF8042', '#00C49F'],
          hoverBackgroundColor: loanRange === 0 && interestAmount === 0 && totalAmount === 0 ? 'orange': ['#0077E6', '#FF7042', '#00B495'],
        },
      ],
    };
   
    
  return (
    <section className='calculatorContainer'>
      <div className='backgroundContainer'>
        <h4>HOME LOAN EMI CALCULATOR</h4>
        <h1 className='title'>Calculate Home Loan EMI</h1>
        <p>Use our Home Loan Calculator to get insights on your loan plan! Just select an amount, set an approximate interest rate and loan tenure. The Home Loan EMI Calculator will estimate the monthly EMI amount & total Interest payable till the end of the loan tenure</p>
      </div>
      <div className='mainContainer'>

         <div className='leftContainer'>
         <div className='radioAmountContainer'>
        <h3>Select the loan amount range</h3>
        <input type="radio" id='onecrore' name='option' value={0-10000000} onChange={()=>amountSelect(0,10000000)}/>
        <label htmlFor="onecrore">0-1crore</label>

        <input type="radio" id='fivecrore' name='option' value={10000000-50000000} onChange={()=>amountSelect(10000000,50000000)}/>
        <label htmlFor="fivecrore">1crore-5crore</label>

        <input type="radio" id='tencrore' name='option' value={50000000-100000000} onChange={()=>amountSelect(50000000,100000000)}/>
        <label htmlFor="tencrore">5crore-10crore</label>
        </div>
    


        <div className='Container'>
        <h3>Loan Amount</h3>
        <h3 className='display'>₹{loanRange}</h3>
        <input type="range" id='range' min={amount.min} max={amount.max} step={100000} value={loanRange} onChange={getRange}/>
        </div>
      

        <div className='Container'>
        <h3>Illustrative <span className='interest'>Interest Rate</span> p.a.</h3>
        <h3 className='display'>{interest}%</h3>
        <input type="range" id='range' min={1} max={20} step={0.25} value={interest} onChange={getInterest}  />
        </div>
        

        <div className='Container'>
        <h3>Tenure</h3>
        <h3 className='display'>{tenure} months</h3>
        <input type="range" id='range' min={12} max={48} step={1} value={tenure} onChange={getTenure}/>
        </div>
       
      </div>
         
         </div>


        <div className='rightContainer'>
          <div className='displayContainer'>

            <div className='amountContainer'>

            <div className='principalAmount'>
            <p>principal amount</p>
            <h3 className='display'>₹{loanRange}</h3>
          </div>
          <div className='interestAmount'>
          <p>Interest amount</p>
          <h3 className='display'>₹{interestAmount}</h3>
          </div>

          <div className='totalAmount'>
          <p>Total amount payable</p>
          <h3 className='display'>₹{totalAmount}</h3>
          </div>

            </div>

            <div className='chartContainer'>
      <Doughnut data={chartData} />
    </div> 
       </div>
       <div className='emiDisplayContainer'>
       <div className='emi'>
        <h3 >Your Monthly EMI is <span className='displayEmi'>₹{emi}</span></h3>
        
        </div>
        <button type='sumit' id='applyButton'>APPLY FOR HOME LOAN</button>
       </div>
        
          {/* <div className='chartContainer'>
      <Doughnut data={chartData} />
    </div>  */}

          
        
        </div>
       
        

    </section>
    
  )
}

export default Emi