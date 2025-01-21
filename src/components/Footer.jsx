import React from 'react'
import { footerLinks } from '../constants'

export const Footer = () => {
  return (
    <footer className='py-5 px-5 sm:px-10'>
        <div className='screen-max-width'>
            <div>
                <p className='text-xs text-gray font-semibold'>
                    More ways to shop: &nbsp;
                    <span className='underline text-blue'>
                        Find an Apple Store
                    </span>
                    &nbsp; or &nbsp;
                    <span className='underline text-blue'>
                        Other retailer 
                    </span>
                    &nbsp; near you.
                </p>

                <p className='text-xs text-gray font-semibold'>
                    Or call 1-800-003-8888.
                </p>
            </div>

            <div className='h-[1px] bg-neutral-700 my-5 w-[98%]'/>

            <div className='flex md:flex-row flex-col md:items-center justify-between'>
                <p className='text-xs text-gray font-semibold'>Copyright © 2024 Apple Inc. All rights reserved.</p>
                <div className='flex'>
                    { footerLinks.map( (link, i) => (
                        <p className='text-xs text-gray font-semibold'>{ link }&nbsp;
                            {i < footerLinks.length - 1 && ( 
                                <span>|&nbsp;</span>
                            )}
                        </p>
                    )) }
                </div>
            </div>
        </div>
    </footer>
  )
}
