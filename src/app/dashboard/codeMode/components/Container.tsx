import React from 'react'
import Estadistica from './Estadistica';
import PaginasSecundarias from './PaginasSecundarias';

const Container = () => {
  return (
    <div className="w-1/4 flex flex-1 flex-col gap-2 fixed top-0 left-0 z-50">
        <Estadistica />
        <PaginasSecundarias />
    </div>
  )
}

export default Container