import React from 'react'
import {Spinner} from "@heroui/react";
export default function Loading() {
  return (
    <div>
      <div className='h-screen flex justify-center items-center'>
              <Spinner classNames={{label: "text-foreground mt-4"}} label="Loading" variant="spinner" size='lg'/>

      </div>
    </div>
  )
}
