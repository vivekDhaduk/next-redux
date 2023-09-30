'use client';

import styles from './page.module.css'

import type { RootState } from './GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './GlobalRedux/Features/counter/counterSlice';
import { useEffect } from 'react';
import { getProducts } from './GlobalRedux/Features/fakeStore/fakeStoreSlice';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const products = useSelector((state: RootState) => state.fakeStore.products);
  const loading = useSelector((state: RootState) => state.fakeStore.loading);
  console.log(products,"products");
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])

  if(loading){
    return <h1>loading...</h1>
  }

  return (
    <main className={styles.main}>
      <button 
        className={styles.button}
        onClick={() => dispatch(increment())}
      >Increment</button>
      <span>{count}</span>
      <button 
        className={styles.button}
        onClick={() => dispatch(decrement())}
      >Decrement</button>
      <button 
        className={styles.button}
        onClick={() => dispatch(incrementByAmount(2))}
      >Increment by 2</button>
    </main>
  )
}
