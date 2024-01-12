'use client'

// import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
// import 'animate.css'
// import { useMemo, useState } from 'react'

// export default function Page() {
//   const TOTAL_STEP = 2
//   const [prevStep, setPrevStep] = useState(1)
//   const [step, setStep] = useState(0)
//   const [animating, setAnimating] = useState(false)
//   const activeList = useMemo(() => [step, prevStep], [step, prevStep])
//   const handleNextStep = () => {
//     setAnimating(true)
//     setPrevStep(step)
//     setStep((step + 1) % TOTAL_STEP)
//     setTimeout(() => {
//       setAnimating(false)
//     }, 300)
//   }
//   return (
//     <>
//       <div className="relative min-h-screen">
//         <Card
//           isBlurred
//           className={`w-[420px] absolute right-[200px] top-1/2 -translate-y-1/2 p-6  `}
//         >
//           <CardHeader>header</CardHeader>
//           <CardBody>
//             <div className=" relative clearfix">
//               {step === 0 && (
//                 <div
//                   className={` animate__animated ${
//                     animating &&
//                     (prevStep === 1
//                       ? 'animate__fadeInLeft'
//                       : 'animate__fadeOutLeft') + ' absolute'
//                   }`}
//                 >
//                   <div>test</div>
//                   <Button onClick={handleNextStep}>Next</Button>
//                 </div>
//               )}
//               {step === 1 && (
//                 <div
//                   className={`absolute animate__animated ${
//                     animating &&
//                     (prevStep === 0
//                       ? 'animate__fadeInRight'
//                       : 'animate__fadeOutRight') + ' absolute'
//                   }`}
//                 >
//                   <div>test 2</div>
//                   <Button onClick={handleNextStep}>Back</Button>
//                 </div>
//               )}
//             </div>
//           </CardBody>
//         </Card>
//       </div>
//     </>
//   )
// }

// Slider.js

import React, { useState, useEffect } from 'react'

const InfiniteScrollList = () => {
  const [startIndex, setStartIndex] = useState(1)
  const endIndex = 100
  const totalItems = 100

  useEffect(() => {
    const handleScroll = () => {
      if (isBottom()) {
        setStartIndex(
          (prevIndex) => (prevIndex + totalItems) % endIndex || endIndex,
        )
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isBottom = () => {
    return (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    )
  }

  const renderItems = () => {
    const items = []
    const end =
      startIndex + totalItems <= endIndex ? startIndex + totalItems : endIndex
    for (let i = startIndex; i <= end; i++) {
      items.push(<div key={i}>{i}</div>)
    }
    return items
  }

  return (
    <div style={{ height: '1000px' }}>
      {/* Placeholder height for scrolling */}
      <div>{renderItems()}</div>
    </div>
  )
}

export default InfiniteScrollList
