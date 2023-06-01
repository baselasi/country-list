import React, { createElement, useState } from "react";
import { DebounceInput } from "react-debounce-input";

export default function List(){
    const [list, setlist]= React.useState([])            //list
    const [myList, setMylist]= React.useState([])
    const url= 'https://algochurn-server.onrender.com/practice/countries'
    const fetchData= async(value) =>{                           //fetch data and transfer it into js array then asagin this array to my list state
        const dataJs= await fetch(`${url}/${value}`)
        const data= await dataJs.json()
        let newlist=data.countries
        setlist((list)=>list=newlist.slice())               //remembre to use slice() to pass the data from one array to another
    }
    function creatMylist(e){                                    //asgin the choosen input to my list
        const listItem= e.target.id
        setMylist((myList)=>[...myList,listItem])
    }
    function deleteItem(item){
        setMylist((myList)=>myList.filter((obj)=>obj !==item))   //delete the contry from the choosen contry list
    }
    return(
        <div>
            <DebounceInput                          //create a debounce input with a 0.5 sec timeout and min imput of 3 caracters
            debounceTimeout={500}
            minLength={3}
            type="text"
            onChange={(e)=>fetchData(e.target.value)}
            />
            <div>
                <ul>
                {list.map((el)=><li onClick={()=>creatMylist(event)} id={el} key={el}>{el}</li>)} 
                </ul>
            </div>
            <div>
                <p>MY LIST</p>
                <ul>
                    { myList.map((el)=><li key={el}>{el}<span onClick={()=>deleteItem(el)}>x</span></li>)}
                </ul>
            </div>
        </div>
    )
}