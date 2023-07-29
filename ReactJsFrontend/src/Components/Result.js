import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Result = () => {
    const [arr,setArr] = useState([])
    const navigate = useNavigate()
    // When we first land on this rout, I will retrieve data from local storage by using useEffect hook and then just storing it in out state.
    useEffect(()=>{
        let localStArr = JSON.parse(localStorage.getItem("Array"))
        if(localStArr !== undefined){
            setArr(localStArr)
        }
    },[])
  return (
    <>
    <div>Result</div>
    {/* Showing the updated state here */}
    {arr?.length>0 ? arr.map((elem)=>{
        return elem + ','
    }) : "Try Again"}

    <button style={{display:"block"}}onClick={()=>{navigate('/')}}>Go Back</button>
    </>
  )
}

export default Result