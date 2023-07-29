
import React,{useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Main = () => {
    const inputRef = useRef(0);
    const navigate = useNavigate()
    const fibonacciRequest =()=>{
        console.log("Clicked")
        // Using useref here to get input field because there is no need of using usestate where we are just concerned about the final data sumitted
        const inputNumber = inputRef.current.value;
        if(inputNumber>0){
            // Simple post request
            axios.post('http://localhost:8000/getResult',{
                number: inputNumber
            }).then(res=>{
                console.log("response from backedn", res?.data?.Result)
                if(res?.data?.Result?.length>0){
                    // Because I am not using any state management tool, so either I could have passed data to child component but as mentioned in the task, I have to make seprate page. So, I stored the response from Backend in local storage and navigating to different page to show Numbers
                    localStorage.setItem("Array",JSON.stringify(res.data.Result))
                    navigate('/getResult')
                }
            })
            .catch(err=>{console.log(err)})
        }
        else{
            alert("Enter valid number")
        }
       
    }
  return (
    <>
   
    <div >Enter Number</div>
    <input type='text' ref={inputRef} placeholder='Enter Valid Number' />
    <button onClick={fibonacciRequest}>Get Result</button>
    </>
  )
}

export default Main