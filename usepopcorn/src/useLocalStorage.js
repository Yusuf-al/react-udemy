import { useEffect, useState } from "react";

export function useLocalStorage (initialValue,key){

     const [value, setValue] = useState(function(){
    const storedData = localStorage.getItem(key)
    return storedData ? JSON.parse(storedData) : initialValue ;
  });

  useEffect(function(){
    localStorage.setItem("Watched",JSON.stringify(value))
  },[value])

  return [value,setValue]
}